import { QueryClient } from "@tanstack/react-query"
import { toast } from "@acme/ui/toast"
import { env } from "@/env"

export const getUrl = () => env.VITE_SERVER_URL + "/trpc"

const createQueryClient = () =>
   new QueryClient({
      defaultOptions: {
         mutations: {
            onError: (e) => {
               toast.error(e.message)
            },
         },
      },
   })

let clientQueryClientSingleton: QueryClient | undefined = undefined
export const getQueryClient = () =>
   (clientQueryClientSingleton ??= createQueryClient())
