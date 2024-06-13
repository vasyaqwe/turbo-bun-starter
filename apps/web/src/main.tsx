import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider, createRouter } from "@tanstack/react-router"
import { routeTree } from "./routeTree.gen"
import "./globals.css"
import { TRPCReactProvider } from "@/trpc/react"

const router = createRouter({
   routeTree,
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
