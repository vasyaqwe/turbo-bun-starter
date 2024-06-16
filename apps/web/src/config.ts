import { type ExpenseName } from "@acme/db/schema/expenses"

export const expenseNames = [
   "rent",
   "utilities",
   "groceries",
   "entertainment",
   "clothing",
   "transportation",
   "health",
   "insurance",
   "other",
] as const

export const expenseNamesColors: Record<ExpenseName, string> = {
   rent: "350 89% 60%",
   utilities: "293 69% 49%",
   groceries: "38 92% 50%",
   entertainment: "258 90% 66%",
   clothing: "0 56% 47%",
   transportation: "194 96% 42%",
   health: "45 93% 47%",
   insurance: "142 71% 45%",
   other: "292 84% 61%",
}
