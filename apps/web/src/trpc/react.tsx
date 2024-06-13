"use client"

import { useState } from "react"
import { type QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { loggerLink, httpBatchLink } from "@trpc/client"
import { createTRPCReact } from "@trpc/react-query"
import type { AppRouter } from "@acme/server/src/trpc/index"
import { createQueryClient, getUrl } from "@/trpc/shared"
import SuperJSON from "superjson"

let clientQueryClientSingleton: QueryClient | undefined = undefined
const getQueryClient = () => {
   if (typeof window === "undefined") {
      // Server: always make a new query client
      return createQueryClient()
   } else {
      // Browser: use singleton pattern to keep the same query client
      return (clientQueryClientSingleton ??= createQueryClient())
   }
}

export const api = createTRPCReact<AppRouter>({
   overrides: {
      useMutation: {
         async onSuccess(opts) {
            await opts.originalFn()
            // Invalidate all queries in the react-query cache:
            await opts.queryClient.invalidateQueries()
         },
      },
   },
})

export function TRPCReactProvider(props: { children: React.ReactNode }) {
   const queryClient = getQueryClient()

   const [trpcClient] = useState(() =>
      api.createClient({
         links: [
            loggerLink({
               enabled: (op) =>
                  // eslint-disable-next-line no-restricted-properties
                  process.env.NODE_ENV === "development" ||
                  (op.direction === "down" && op.result instanceof Error),
            }),
            httpBatchLink({
               transformer: SuperJSON,
               url: getUrl(),
               fetch(url, options) {
                  return fetch(url, {
                     ...options,
                     credentials: "include",
                  })
               },
               headers() {
                  const headers = new Headers()
                  headers.set("x-trpc-source", "vite-react")
                  return headers
               },
            }),
         ],
      })
   )

   return (
      <api.Provider
         client={trpcClient}
         queryClient={queryClient}
      >
         <QueryClientProvider client={queryClient}>
            {props.children}
         </QueryClientProvider>
      </api.Provider>
   )
}
