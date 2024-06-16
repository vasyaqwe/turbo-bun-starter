import { integer, pgEnum, uuid } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { type z } from "zod"
import { expenseNames } from "../config"
import { createTable, id, lifecycleDates } from "../utils"
import { users } from "./users"

export const expenseName = pgEnum("name", expenseNames)

export const expenses = createTable("expenses", {
   id,
   userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
   amount: integer("amount").notNull(),
   name: expenseName("name").notNull(),
   ...lifecycleDates,
})

export const selectExpensesSchema = createSelectSchema(expenses)
export const insertExpenseParams = createInsertSchema(expenses).omit({
   userId: true,
})

export type ExpenseName = (typeof expenseNames)[number]
export type Expense = z.infer<typeof selectExpensesSchema>
