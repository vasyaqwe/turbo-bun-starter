import {
   Outlet,
   Link,
   createRootRouteWithContext,
   useRouter,
} from "@tanstack/react-router"
import { Button, buttonVariants } from "@acme/ui/button"
import { Toaster } from "@acme/ui/toast"
import { type QueryClient } from "@tanstack/react-query"
import { DottedBg } from "@acme/ui/dotted-bg"
import { XCircleIcon } from "@heroicons/react/24/outline"

export const Route = createRootRouteWithContext<{
   queryClient: QueryClient
}>()({
   component: RootComponent,
   notFoundComponent: NotFound,
   errorComponent: ({ error }) => {
      return (
         <div className="grid h-svh place-content-center">
            <DottedBg />
            <div className="container space-y-4 text-center">
               <XCircleIcon className="mx-auto size-16 stroke-red-500" />
               <h1 className="text-2xl font-bold">Something went wrong</h1>
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

function RootComponent() {
   return (
      <>
         <Outlet />
         <Toaster />
      </>
   )
}

function NotFound() {
   const { history } = useRouter()
   return (
      <div className="grid h-svh w-full place-content-center gap-3 text-center">
         <DottedBg />
         <p className="text-center text-2xl font-bold">Acme</p>
         <h1 className="text-4xl font-bold">404</h1>
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
