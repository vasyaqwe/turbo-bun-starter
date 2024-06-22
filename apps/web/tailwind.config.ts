import baseConfig from "@acme/tailwind-config/web"
import type { Config } from "tailwindcss"
import { fontFamily } from "tailwindcss/defaultTheme"

export default {
   // We need to append the path to the UI package to the content array so that
   // those classes are included correctly.
   content: [
      "./index.html",
      ...baseConfig.content,
      "../../packages/ui/**/*.{ts,tsx}",
   ],
   presets: [baseConfig],
   theme: {
      extend: {
         fontFamily: {
            primary: ["Inter", ...fontFamily.sans],
         },
      },
   },
} satisfies Config
