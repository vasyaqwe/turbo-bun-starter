import type { Context } from "hono"
import { db } from "@acme/db/client"
import { emails } from "@acme/emails"
import { initTRPC, TRPCError } from "@trpc/server"
import { Ratelimit } from "@unkey/ratelimit"
import SuperJSON from "superjson"
import { ZodError } from "zod"
import { type Session } from "./auth"
import { env } from "./env"

export const createTRPCContext = (opts: {
   session: Session | null
   honoCtx: Context
}) => {
   const session = opts.session
   const source = opts.honoCtx.req.header("x-trpc-source") ?? "unknown"

   console.log(">>> tRPC Request from", source, "by", session?.user)

   return {
      ...opts,
      session,
      emails,
      db,
      honoCtx: opts.honoCtx,
   }
}

const t = initTRPC.context<typeof createTRPCContext>().create({
   transformer: SuperJSON,
   errorFormatter: ({ shape, error }) => ({
      ...shape,
      data: {
         ...shape.data,
         zodError:
            error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
   }),
})

export const createCallerFactory = t.createCallerFactory

export const createTRPCRouter = t.router

export const publicProcedure = t.procedure

export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
   if (!ctx.session?.user || !ctx.session.session?.id)
      throw new TRPCError({ code: "UNAUTHORIZED" })

   return next({
      ctx: {
         session: { ...ctx.session.session, user: ctx.session.user },
      },
   })
})

const getIp = (honoCtx: Context) => {
   const forwardedFor = honoCtx.req.header("x-forwarded-for")?.split(",")[0]
   const realIp = honoCtx.req.header("x-real-ip")
   if (forwardedFor) return forwardedFor
   if (realIp) return realIp.trim()
   return null
}

export const publicRateLimitedProcedure = t.procedure.use(
   async ({ ctx, next, path }) => {
      const unkey = new Ratelimit({
         rootKey: env.UNKEY_ROOT_KEY,
         async: true,
         duration: "20s",
         limit: 2,
         namespace: `acme_${path}`,
      })

      const ip = getIp(ctx.honoCtx)
      if (!ip) return next()

      const ratelimit = await unkey.limit(ip)
      if (!ratelimit.success) {
         throw new TRPCError({
            code: "TOO_MANY_REQUESTS",
            message: `Too many requests, please try again in a bit`,
         })
      }

      return next()
   }
)
