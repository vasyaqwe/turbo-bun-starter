"use client"

import { buttonVariants } from "@acme/ui/button"
import { UserAvatar } from "@acme/ui/user-avatar"
import { api } from "@/trpc/react"
import { InboxStackIcon, RectangleGroupIcon } from "@heroicons/react/24/outline"
import { cn } from "@acme/ui"
import { Link } from "@tanstack/react-router"

export function Sidebar() {
   const [user] = api.user.me.useSuspenseQuery()

   return (
      <aside className="w-72 p-6 max-md:hidden">
         <header className="flex items-center justify-between">
            <Link
               to="/"
               className="text-2xl font-bold"
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
                        className: buttonVariants({ variant: "outline" }),
                     }}
                     inactiveProps={{
                        className: cn(buttonVariants(), "bg-transparent"),
                     }}
                     className={
                        "w-full justify-start text-foreground backdrop-blur-md transition-all hover:bg-popover hover:shadow-shadow aria-[current=page]:hover:before:from-foreground/[0.015]"
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
                        className: buttonVariants({ variant: "outline" }),
                     }}
                     inactiveProps={{
                        className: cn(buttonVariants(), "bg-transparent"),
                     }}
                     className={
                        "w-full justify-start text-foreground backdrop-blur-md transition-all hover:bg-popover hover:shadow-shadow aria-[current=page]:hover:before:from-foreground/[0.015]"
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
