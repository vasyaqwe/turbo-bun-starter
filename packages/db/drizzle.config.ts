import type { Config } from "drizzle-kit"
import dotenv from "dotenv"

dotenv.config({
   path: "../../.env",
})

export default {
   schema: "./src/schema/**/*.ts",
   dialect: "postgresql",
   dbCredentials: { url: process.env.DATABASE_URL! },
   tablesFilter: ["acme_*"],
} satisfies Config
