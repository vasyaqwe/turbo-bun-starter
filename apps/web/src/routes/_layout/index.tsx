import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_layout/")({
   component: Page,
})

function Page() {
   return <>home</>
}
