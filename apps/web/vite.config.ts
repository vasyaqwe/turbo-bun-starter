import { defineConfig } from "vite"
import { TanStackRouterVite } from "@tanstack/router-vite-plugin"
import tsconfigPaths from "vite-tsconfig-paths"
import react from "@vitejs/plugin-react"
import eslint from "vite-plugin-eslint"

// https://vitejs.dev/config/
export default defineConfig(() => {
   return {
      optimizeDeps: {
         include: ["@acme/ui", "@acme/db", "@acme/emails", "@acme/api"],
      },
      plugins: [eslint(), react(), TanStackRouterVite(), tsconfigPaths()],
   }
})
