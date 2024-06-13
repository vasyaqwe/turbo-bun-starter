import { QueryClient } from "@tanstack/react-query"
import { toast } from "@acme/ui/toast"
import { env } from "@/env"

export function getUrl() {
   return env.VITE_SERVER_URL + "/trpc"
}

export const createQueryClient = () =>
   new QueryClient({
      defaultOptions: {
         mutations: {
            onError: (e) => {
               toast.error(e.message)
            },
         },
      },
   })
