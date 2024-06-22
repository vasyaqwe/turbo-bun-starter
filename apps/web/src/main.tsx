import "./globals.css"
import { TRPCReactProvider } from "@/trpc/react"
import { getQueryClient } from "@/trpc/shared"
import { Button, buttonVariants } from "@acme/ui/button"
import { DottedBg } from "@acme/ui/dotted-bg"
import { XCircleIcon } from "@heroicons/react/24/outline"
import {
   Link,
   RouterProvider,
   createRouter,
   useRouter,
} from "@tanstack/react-router"
import React from "react"
import ReactDOM from "react-dom/client"
import { routeTree } from "./routeTree.gen"

const router = createRouter({
   routeTree,
   context: {
      queryClient: getQueryClient(),
   },
   defaultNotFoundComponent: NotFound,
   defaultErrorComponent: ({ error }) => {
      return (
         <div className="grid h-svh place-content-center">
            <DottedBg />
            <div className="container space-y-4 text-center">
               <XCircleIcon className="mx-auto size-16 stroke-red-500" />
               <h1 className="font-bold text-2xl">Something went wrong</h1>
               <p className="text-lg">{error.message}</p>
               <p className="text-lg">
                  Sorry, we're experiencing technical difficulties.
               </p>
               <Link
                  className={buttonVariants()}
                  to={"/"}
               >
                  Go to homepage
               </Link>
            </div>
         </div>
      )
   },
})

declare module "@tanstack/react-router" {
   interface Register {
      router: typeof router
   }
}

// biome-ignore lint/style/noNonNullAssertion: ...
ReactDOM.createRoot(document.getElementById("app")!).render(
   <React.StrictMode>
      <TRPCReactProvider>
         <RouterProvider router={router} />
      </TRPCReactProvider>
   </React.StrictMode>,
)

function NotFound() {
   const { history } = useRouter()
   return (
      <div className="grid h-svh w-full place-content-center gap-3 text-center">
         <DottedBg />
         <p className="text-center font-bold text-2xl">Acme</p>
         <h1 className="font-bold text-4xl">404</h1>
         <p>This page could not be found.</p>
         <div className="flex items-center justify-center gap-2">
            <Button
               variant={"outline"}
               onClick={() => history.go(-1)}
            >
               Go back
            </Button>
            <Link
               className={buttonVariants()}
               to={`/`}
            >
               Go to homepage
            </Link>
         </div>
      </div>
   )
}
