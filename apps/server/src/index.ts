import { trpcServer } from "@hono/trpc-server"
import { Hono } from "hono"
import { cors } from "hono/cors"
import { showRoutes } from "hono/dev"
import { appRouter, createTRPCContext } from "@acme/api"
import { csrf } from "hono/csrf"
import { getAuthSession } from "@acme/api/auth"
import { env } from "./env"

const app = new Hono()

app.use(csrf())
app.use(
   cors({
      origin: env.VITE_BASE_URL,
      credentials: true,
   })
)

app.get("/", (c) => {
   return c.text("Hello Hono!")
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
   })
)

const isProd = env.NODE_ENV === "production"
const port = !isProd ? 3001 : 3000

if (!isProd) showRoutes(app, { verbose: true, colorize: true })

console.log(`Starting server on port ${port}`)

const server = { port, fetch: app.fetch, keepalive: true }

export default server
