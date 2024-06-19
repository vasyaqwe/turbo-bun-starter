/* eslint-disable no-restricted-properties */
import { appRouter, createTRPCContext } from "@acme/api"
import { getAuthSession, github, google, lucia } from "@acme/api/auth"
import { and, eq, oauthAccounts, users } from "@acme/db"
import { db } from "@acme/db/client"
import { trpcServer } from "@hono/trpc-server"
import { Hono } from "hono"
import { getCookie, setCookie } from "hono/cookie"
import { cors } from "hono/cors"
import { csrf } from "hono/csrf"
import { showRoutes } from "hono/dev"
import { HTTPException } from "hono/http-exception"
import { env } from "./env"

const app = new Hono()

app.use(csrf())
app.use(
   cors({
      origin: [
         env.VITE_BASE_URL,
         "https://acme-vite-turbo.vercel.app",
         "https://acme-vite-turbo-railway.vercel.app",
      ],
      credentials: true,
      maxAge: 600,
   }),
)

app.get("/", (ctx) => {
   return ctx.text("Hello Hono!")
})

app.get("/login/github/callback", async (ctx) => {
   const storedState = getCookie(ctx, "github_oauth_state")
   const { code, state } = ctx.req.query()
   // validate state
   if (
      !storedState ||
      !state ||
      storedState !== state ||
      typeof code !== "string"
   ) {
      throw new HTTPException(400, { message: "Bad request" })
   }
   try {
      const tokens = await github.validateAuthorizationCode(code)
      const githubResponse = await fetch("https://api.github.com/user", {
         headers: {
            Authorization: `Bearer ${tokens.accessToken}`,
         },
      })
      const githubUser = (await githubResponse.json()) as {
         id: number
         login: string // username
      }

      const [existingUser] = await db
         .select({ userId: oauthAccounts.userId })
         .from(oauthAccounts)
         .where(
            and(
               eq(oauthAccounts.providerId, "github"),
               eq(oauthAccounts.providerUserId, githubUser.id.toString()),
            ),
         )

      if (existingUser) {
         const session = await lucia.createSession(existingUser.userId, {})
         const sessionCookie = lucia.createSessionCookie(session.id)
         setCookie(ctx, sessionCookie.name, sessionCookie.value, {
            ...sessionCookie.attributes,
            sameSite: env.NODE_ENV === "production" ? "none" : "lax",
         })
         return ctx.redirect(`${env.VITE_BASE_URL}`)
      }

      const createdUser = await db.transaction(async (tx) => {
         const [createdUser] = await tx
            .insert(users)
            .values({
               firstName: githubUser.login,
            })
            .returning({ id: users.id })

         if (!createdUser)
            throw new HTTPException(500, {
               message: "An unknown error occurred",
            })

         await tx.insert(oauthAccounts).values({
            userId: createdUser.id,
            providerId: "github",
            providerUserId: githubUser.id.toString(),
         })

         return createdUser
      })

      const session = await lucia.createSession(createdUser.id, {})
      const sessionCookie = lucia.createSessionCookie(session.id)
      setCookie(ctx, sessionCookie.name, sessionCookie.value, {
         ...sessionCookie.attributes,
         sameSite: env.NODE_ENV === "production" ? "none" : "lax",
      })
      return ctx.redirect(`${env.VITE_BASE_URL}`)
   } catch (e) {
      throw new HTTPException(500, { message: "An unknown error occurred" })
   }
})
app.get("/login/google/callback", async (ctx) => {
   const { code, state } = ctx.req.query()
   const codeVerifier = getCookie(ctx, "google_code_verifier") ?? null
   const storedState = getCookie(ctx, "state") ?? null

   // validate state
   if (
      !code ||
      !codeVerifier ||
      !state ||
      !storedState ||
      state !== storedState
   ) {
      throw new HTTPException(400, { message: "Bad request" })
   }
   try {
      const tokens = await google.validateAuthorizationCode(code, codeVerifier)
      const googleResponse = await fetch(
         "https://www.googleapis.com/oauth2/v1/userinfo",
         {
            headers: {
               Authorization: `Bearer ${tokens.accessToken}`,
            },
         },
      )
      const googleUser = (await googleResponse.json()) as {
         id: string
         email: string
         verified_email: boolean
         name?: string
         given_name: string
         picture: string
         locale: string
      }

      const [existingUser] = await db
         .select({ userId: oauthAccounts.userId })
         .from(oauthAccounts)
         .where(
            and(
               eq(oauthAccounts.providerId, "google"),
               eq(oauthAccounts.providerUserId, googleUser.id),
            ),
         )

      if (existingUser) {
         const session = await lucia.createSession(existingUser.userId, {})
         const sessionCookie = lucia.createSessionCookie(session.id)
         setCookie(ctx, sessionCookie.name, sessionCookie.value, {
            ...sessionCookie.attributes,
            sameSite: env.NODE_ENV === "production" ? "none" : "lax",
         })
         return ctx.redirect(`${env.VITE_BASE_URL}`)
      }
      const createdUser = await db.transaction(async (tx) => {
         const [createdUser] = await tx
            .insert(users)
            .values({
               email: googleUser.email,
               firstName: googleUser.name ?? googleUser.given_name,
               avatarUrl: googleUser.picture,
               emailVerified: googleUser.verified_email,
            })
            .returning({ id: users.id })

         if (!createdUser)
            throw new HTTPException(500, {
               message: "An unknown error occurred",
            })

         await tx.insert(oauthAccounts).values({
            userId: createdUser.id,
            providerId: "google",
            providerUserId: googleUser.id,
         })

         return createdUser
      })

      const session = await lucia.createSession(createdUser.id, {})
      const sessionCookie = lucia.createSessionCookie(session.id)
      setCookie(ctx, sessionCookie.name, sessionCookie.value, {
         ...sessionCookie.attributes,
         sameSite: env.NODE_ENV === "production" ? "none" : "lax",
      })
      console.log("Created user", createdUser, "hello")
      return ctx.redirect(`${env.VITE_BASE_URL}`)
   } catch (e) {
      throw new HTTPException(500, { message: "An unknown error occurred" })
   }
})

app.use(
   "/trpc/*",
   trpcServer({
      router: appRouter,
      createContext: async (_opts, ctx) => {
         return createTRPCContext({
            session: await getAuthSession(ctx),
            honoCtx: ctx,
         })
      },
      onError({ error, path }) {
         console.error(`>>> tRPC Error on '${path}'`, error)
      },
   }),
)

app.onError((err, c) => {
   if (err instanceof HTTPException) {
      // Get the custom response
      return c.redirect(env.VITE_BASE_URL)
   }
   return c.text("An unknown error occurred", 500)
})

const isProd = env.NODE_ENV === "production"
const port = !isProd ? 3001 : process.env.PORT

if (!isProd) showRoutes(app, { verbose: true, colorize: true })

console.log(`Starting server on port ${port}`)

const server = { port, fetch: app.fetch }

export default server
