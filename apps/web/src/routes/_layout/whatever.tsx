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
import { expenseNamesColors } from "@/config"
import { formatCurrency } from "@/lib/utils"
import { Intro } from "@/routes/-components/intro"
import { api } from "@/trpc/react"

export const Route = createFileRoute("/_layout/whatever")({
   component: Page,
})

function Page() {
   const { data: expenses, isPending, isError } = api.expense.list2.useQuery()

   return (
      <div className="w-full py-6">
         <Intro />
         <Card className="mt-5 p-5 pt-4">
            <h2 className="mb-4 text-xl font-bold">Expenses</h2>
            {isError ? (
               <div className="py-4 text-red-500">
                  <ExclamationCircleIcon className="mx-auto size-10" />
                  <p className="mt-3 text-center font-medium">
                     There was an error loading expenses.
                  </p>
               </div>
            ) : (
               <Table>
                  <TableHeader>
                     <TableRow>
                        <TableHead className="w-[100px] text-left">
                           Name
                        </TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                     </TableRow>
                  </TableHeader>
                  <TableBody>
                     {isPending
                        ? Array(10)
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
                             ))
                        : expenses.map((expense) => (
                             <TableRow
                                className="w-[100px]"
                                key={expense.id}
                             >
                                <TableCell className="capitalize">
                                   <Badge
                                      style={
                                         {
                                            "--primary":
                                               expenseNamesColors[expense.name],
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
                  </TableBody>
               </Table>
            )}
         </Card>
      </div>
   )
}
