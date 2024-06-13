import { createTRPCRouter } from "./context"
import { expense } from "./routers/expense"
import { user } from "./routers/user"

export const appRouter = createTRPCRouter({
   user,
   expense,
})

export type AppRouter = typeof appRouter
