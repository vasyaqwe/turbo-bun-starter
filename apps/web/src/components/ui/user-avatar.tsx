import { Avatar, AvatarFallback } from "@acme/ui/avatar"
import { type User } from "@acme/db/schema/users"
import { cn } from "@acme/ui"
import { type ComponentProps } from "react"

type UserAvatarProps = ComponentProps<typeof Avatar> & {
   user: Partial<User>
   showActiveIndicator?: boolean
   size?: number
}

export function UserAvatar({ user, className, ...props }: UserAvatarProps) {
   return (
      <Avatar
         {...props}
         className={cn(
            "block size-9 overflow-visible text-lg",
            !user.avatarUrl ? "" : "",
            className,
         )}
      >
         {user.avatarUrl ? (
            <img
               src={user.avatarUrl}
               alt={`${user.firstName}'s avatar`}
               referrerPolicy="no-referrer"
               className={cn(
                  "h-[inherit] w-full rounded-full object-cover object-top",
               )}
            />
         ) : (
            <AvatarFallback
               className={cn(
                  "bg-background text-foreground/75 shadow-[inset_-1px_1px_2px_1px_hsl(210_12%_75%)] dark:shadow-[inset_-1px_1px_1px_0px_hsl(0_0%_70%)]",
                  className,
               )}
            >
               {user.firstName && user.firstName !== ""
                  ? user.firstName[0]?.toUpperCase()
                  : user.email?.[0]?.toUpperCase() ?? "U"}
            </AvatarFallback>
         )}
      </Avatar>
   )
}
