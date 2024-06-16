import * as expenses from "./schema/expenses"
import * as users from "./schema/users"
import { env } from "./env"
import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"

const sql = neon(env.DATABASE_URL)
const db = drizzle(sql, { schema: { ...expenses, ...users } })

export { db }
