import type { AppRouter } from "@acme/api"
import { QueryClientProvider } from "@tanstack/react-query"
import { httpBatchLink, loggerLink } from "@trpc/client"
import { createTRPCQueryUtils, createTRPCReact } from "@trpc/react-query"
import SuperJSON from "superjson"
import { getQueryClient, getUrl } from "@/trpc/shared"

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

const trpcClient = api.createClient({
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

export const clientUtils = createTRPCQueryUtils({
   queryClient: getQueryClient(),
   client: trpcClient,
})

export function TRPCReactProvider(props: { children: React.ReactNode }) {
   const queryClient = getQueryClient()

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
