import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider, createRouter } from "@tanstack/react-router"
import { routeTree } from "./routeTree.gen"
import "./globals.css"
import { TRPCReactProvider } from "@/trpc/react"
import { getQueryClient } from "@/trpc/shared"

const router = createRouter({
   routeTree,
   context: {
      queryClient: getQueryClient(),
   },
   defaultPreload: "intent",
   // Since we're using React Query, we don't want loader calls to ever be stale
   // This will ensure that the loader is always called when the route is preloaded or visited
   defaultPreloadStaleTime: 0,
})

declare module "@tanstack/react-router" {
   interface Register {
      router: typeof router
   }
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById("root")!).render(
   <React.StrictMode>
      <TRPCReactProvider>
         <RouterProvider router={router} />
      </TRPCReactProvider>
   </React.StrictMode>
)
