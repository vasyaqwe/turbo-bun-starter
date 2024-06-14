import {
   Outlet,
   Link,
   createRootRouteWithContext,
} from "@tanstack/react-router"
import { buttonVariants } from "@acme/ui/button"
import { Toaster } from "@acme/ui/toast"
import { type QueryClient } from "@tanstack/react-query"

export const Route = createRootRouteWithContext<{
   queryClient: QueryClient
}>()({
   component: RootComponent,
   notFoundComponent: () => {
      return <NotFound />
   },
})

function NotFound() {
   return (
      <div className="not-found">
         <h1 className="font-bold">404</h1>
         <Link className={buttonVariants()}>Back to home</Link>
      </div>
   )
}

function RootComponent() {
   return (
      <>
         <Outlet />
         <Toaster />
      </>
   )
}
