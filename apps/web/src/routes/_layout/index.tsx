import { expenseNamesColors } from "@/config"
import { formatCurrency } from "@/lib/utils"
import { Intro } from "@/routes/-components/intro"
import { api, clientUtils } from "@/trpc/react"
import { Badge } from "@acme/ui/badge"
import { Card } from "@acme/ui/card"
import { Skeleton } from "@acme/ui/skeleton"
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@acme/ui/table"
import { ExclamationCircleIcon } from "@heroicons/react/24/outline"
import { createFileRoute } from "@tanstack/react-router"
import type { ComponentProps } from "react"

export const Route = createFileRoute("/_layout/")({
   component: Page,
   errorComponent: () => {
      return (
         <Shell>
            <div className="py-4 text-red-500">
               <ExclamationCircleIcon className="mx-auto size-10" />
               <p className="mt-3 text-center font-medium">
                  There was an error loading expenses.
               </p>
            </div>
         </Shell>
      )
   },
   loader: () => clientUtils.expense.list.ensureData(),
   pendingComponent: () => (
      <Shell>
         <TableShell>
            {Array(10)
               .fill(0)
               .map((_, i) => (
                  <TableRow key={i}>
                     <TableCell className="w-[100px] text-center">
                        <Skeleton className="h-[26px] w-full rounded-full" />
                     </TableCell>
                     <TableCell className="text-center">
                        <Skeleton className="h-[26px] w-full" />
                     </TableCell>
                  </TableRow>
               ))}
         </TableShell>
      </Shell>
   ),
})

function Page() {
   const [expenses] = api.expense.list.useSuspenseQuery()

   return (
      <Shell>
         <TableShell>
            {expenses.map((expense) => (
               <TableRow className="w-[100px]" key={expense.id}>
                  <TableCell className="capitalize">
                     <Badge
                        style={
                           {
                              "--primary": expenseNamesColors[expense.name],
                           } as never
                        }
                     >
                        {expense.name}
                     </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                     {formatCurrency(expense.amount)}
                  </TableCell>
               </TableRow>
            ))}
         </TableShell>
      </Shell>
   )
}

function Shell({ children }: ComponentProps<"div">) {
   return (
      <div className="w-full py-6">
         <Intro />
         <Card className="mt-5 p-5 pt-4">
            <h2 className="mb-4 font-bold text-xl">Expenses</h2>
            {children}
         </Card>
      </div>
   )
}

function TableShell({ children, ...props }: ComponentProps<"table">) {
   return (
      <Table {...props}>
         <TableHeader>
            <TableRow>
               <TableHead className="w-[100px] text-left">Name</TableHead>
               <TableHead className="text-right">Amount</TableHead>
            </TableRow>
         </TableHeader>
         <TableBody>{children}</TableBody>
      </Table>
   )
}
