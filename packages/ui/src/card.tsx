import { cn } from "."
import { forwardRef, type ComponentProps } from "react"

const Card = forwardRef<HTMLDivElement, ComponentProps<"div">>(
   ({ className, ...props }, ref) => (
      <div
         ref={ref}
         className={cn(`rounded-lg bg-popover p-8 shadow-shadow`, className)}
         {...props}
      />
   )
)

export { Card }
