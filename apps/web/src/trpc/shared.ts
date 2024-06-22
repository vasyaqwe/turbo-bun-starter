import { env } from "@/env"
import { toast } from "@acme/ui/toast"
import { QueryClient } from "@tanstack/react-query"

export const getUrl = () => `${env.VITE_SERVER_URL}/trpc`

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
   // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
   (clientQueryClientSingleton ??= createQueryClient())
