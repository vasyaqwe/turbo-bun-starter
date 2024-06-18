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
      VITE_SERVER_URL: z.string().min(1),
   },
   runtimeEnv: import.meta.env,
})
