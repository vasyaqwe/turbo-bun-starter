import { createEnv } from "@t3-oss/env-core"
import { z } from "zod"

export const env = createEnv({
   shared: {
      NODE_ENV: z
         .enum(["development", "production", "test"])
         .default("development"),
   },
   clientPrefix: "VITE_",
   client: {
      VITE_BASE_URL: z.string().min(1),
   },
   server: {},
   runtimeEnvStrict: {
      NODE_ENV: process.env.NODE_ENV,

      VITE_BASE_URL: process.env.VITE_BASE_URL,
   },
   skipValidation:
      !!process.env.CI ||
      !!process.env.SKIP_ENV_VALIDATION ||
      process.env.npm_lifecycle_event === "lint",
})
