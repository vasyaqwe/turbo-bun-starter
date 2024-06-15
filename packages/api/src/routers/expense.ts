import { expenses, insertExpenseParams } from "@acme/db/schema/expenses"
import { eq } from "@acme/db"
import { createTRPCRouter, protectedProcedure } from "../trpc"

export const expense = createTRPCRouter({
   list: protectedProcedure.query(async ({ ctx }) => {
      const res = await ctx.db
         .select()
         .from(expenses)
         .where(eq(expenses.userId, ctx.session.user.id))

      return res
   }),
   list2: protectedProcedure.query(async ({ ctx }) => {
      const res = await ctx.db
         .select()
         .from(expenses)
         .where(eq(expenses.userId, ctx.session.user.id))

      return res
   }),
   insert: protectedProcedure
      .input(insertExpenseParams)
      .mutation(async ({ ctx, input }) => {
         return await ctx.db
            .insert(expenses)
            .values({ ...input, userId: ctx.session.user.id })
      }),
})
