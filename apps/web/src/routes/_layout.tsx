import { ModalProvider } from "@/components/modals"
import { Sidebar } from "@/routes/-components/sidebar"
import { clientUtils } from "@/trpc/react"
import { Outlet, createFileRoute, redirect } from "@tanstack/react-router"

export const Route = createFileRoute("/_layout")({
   beforeLoad: async () => {
      await clientUtils.user.me
         .ensureData(undefined, {
            retry: false,
            staleTime: Number.POSITIVE_INFINITY,
         })
         .catch(() => {
            throw redirect({
               to: "/login",
               search: {
                  // Use the current location to power a redirect after login
                  // (Do not use `router.state.resolvedLocation` as it can
                  // potentially lag behind the actual current location)
                  redirect: location.href,
               },
            })
         })
   },
   component: () => (
      <>
         <ModalProvider />
         <main className="flex">
            <Sidebar />
            <div className="flex-1 px-5 md:px-11">
               <Outlet />{" "}
            </div>
         </main>
      </>
   ),
})
