import { api } from "@/trpc/react"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
   component: Home,
})

function Home() {
   const res = api.user.me.useQuery()
   console.log(res)
   return <div>Hello /!</div>
}
