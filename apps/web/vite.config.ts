import { TanStackRouterVite } from "@tanstack/router-vite-plugin"
import react from "@vitejs/plugin-react"
import { defineConfig, loadEnv } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
   process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

   return {
      optimizeDeps: {
         include: ["@acme/ui", "@acme/emails", "@acme/api"],
      },
      plugins: [react(), TanStackRouterVite(), tsconfigPaths()],
   }
})
