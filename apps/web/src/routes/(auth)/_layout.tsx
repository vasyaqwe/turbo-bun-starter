import { DottedBg } from "@acme/ui/dotted-bg"
import { Link, Outlet, createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/(auth)/_layout")({
   component: () => (
      <>
         <header className="flex justify-between p-5">
            <Link
               to={"/"}
               className="text-2xl font-semibold leading-none"
            >
               acme
            </Link>
         </header>
         <main>
            <DottedBg />
            <Outlet />
         </main>
      </>
   ),
})
