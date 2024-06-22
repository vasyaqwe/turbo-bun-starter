import { UserAvatar } from "@/components/ui/user-avatar"
import { api } from "@/trpc/react"
import { cn } from "@acme/ui"
import { buttonVariants } from "@acme/ui/button"
import { InboxStackIcon, RectangleGroupIcon } from "@heroicons/react/24/outline"
import { Link } from "@tanstack/react-router"

export function Sidebar() {
   const [user] = api.user.me.useSuspenseQuery(undefined, {
      staleTime: Number.POSITIVE_INFINITY,
      retry: false,
   })

   return (
      <aside className="w-72 p-6 max-md:hidden">
         <header className="flex items-center justify-between">
            <Link
               to="/"
               className="font-bold text-2xl"
            >
               Acme
            </Link>
            <UserAvatar user={user} />
         </header>
         <nav className="mt-6">
            <ul className="flex flex-col gap-2">
               <li>
                  <Link
                     activeProps={{
                        className: cn(
                           buttonVariants({ variant: "outline" }),
                           "shadow-[0px_0px_0px_1px_rgba(9,_9,_11,_.06),0px_2px_2px_0px_rgba(9,_9,_11,_.08)]",
                        ),
                     }}
                     inactiveProps={{
                        className: cn(buttonVariants(), "bg-transparent"),
                     }}
                     className={
                        "!justify-start !transition-all w-full text-foreground backdrop-blur-md hover:bg-popover aria-[current=page]:hover:before:from-foreground/[0.015] hover:shadow-[0px_0px_0px_1px_rgba(9,_9,_11,_.06),0px_2px_2px_0px_rgba(9,_9,_11,_.08)]"
                     }
                     to={"/"}
                  >
                     <RectangleGroupIcon className="size-5" />
                     Dashboard
                  </Link>
               </li>
               <li>
                  <Link
                     activeProps={{
                        className: cn(
                           buttonVariants({ variant: "outline" }),
                           "shadow-[0px_0px_0px_1px_rgba(9,_9,_11,_.06),0px_2px_2px_0px_rgba(9,_9,_11,_.08)]",
                        ),
                     }}
                     inactiveProps={{
                        className: cn(buttonVariants(), "bg-transparent"),
                     }}
                     className={
                        "!justify-start !transition-all w-full text-foreground backdrop-blur-md hover:bg-popover aria-[current=page]:hover:before:from-foreground/[0.015] hover:shadow-[0px_0px_0px_1px_rgba(9,_9,_11,_.06),0px_2px_2px_0px_rgba(9,_9,_11,_.08)]"
                     }
                     to={"/whatever"}
                  >
                     <InboxStackIcon className="size-5" />
                     Whatevers
                  </Link>
               </li>
            </ul>
         </nav>
      </aside>
   )
}
