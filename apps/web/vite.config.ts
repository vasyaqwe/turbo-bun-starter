import { defineConfig } from "vite"
import { TanStackRouterVite } from "@tanstack/router-vite-plugin"
import tsconfigPaths from "vite-tsconfig-paths"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig(() => {
   return {
      optimizeDeps: {
         include: ["@acme/ui", "@acme/emails", "@acme/api"],
      },
      plugins: [react(), TanStackRouterVite(), tsconfigPaths()],
   }
})
