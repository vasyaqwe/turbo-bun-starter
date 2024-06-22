import { AnimatedButtonContent } from "@/components/animated-button-content"
import { popModal } from "@/components/modals"
import { Content } from "@/components/modals/dynamic"
import { expenseNames } from "@/config"
import { api } from "@/trpc/react"
import { Button } from "@acme/ui/button"
import { DialogFooter, DialogHeader, DialogTitle } from "@acme/ui/dialog"
import { Input } from "@acme/ui/input"
import { Label } from "@acme/ui/label"
import {
   Select,
   SelectContent,
   SelectGroup,
   SelectItem,
   SelectTrigger,
} from "@acme/ui/select"
import { toast } from "@acme/ui/toast"
import { useState } from "react"

export function CreateExpense() {
   const { mutate, isPending, isSuccess } = api.expense.insert.useMutation({
      onSuccess: () => {
         toast.success("Expense created")
         popModal("create-expense")
      },
      onError: () => {
         toast.error("Error creating expense")
      },
   })

   const [expenseName, setExpenseName] = useState<
      (typeof expenseNames)[number]
   >(expenseNames[0])

   return (
      <Content className="max-w-md">
         <DialogHeader>
            <DialogTitle>Create Expense</DialogTitle>
         </DialogHeader>
         <form
            onSubmit={(e) => {
               e.preventDefault()
               const formData = new FormData(e.target as HTMLFormElement)

               mutate({
                  name: expenseName,
                  amount: +(formData.get("amount") ?? 0),
               })
            }}
            id="create-expense"
         >
            <Label htmlFor="name">Amount</Label>
            <Input
               required
               inputMode="numeric"
               type="number"
               name="amount"
               id="amount"
               placeholder="99"
            />
            <Select
               value={expenseName}
               onValueChange={(value) =>
                  setExpenseName(value as (typeof expenseNames)[number])
               }
            >
               <SelectTrigger className="mt-4 flex w-full capitalize">
                  {expenseName}
               </SelectTrigger>
               <SelectContent>
                  <SelectGroup>
                     {expenseNames.map((name) => (
                        <SelectItem
                           className="capitalize"
                           value={name}
                           key={name}
                        >
                           {name}
                        </SelectItem>
                     ))}
                  </SelectGroup>
               </SelectContent>
            </Select>
         </form>
         <DialogFooter>
            <Button disabled={isPending || isSuccess} form="create-expense">
               <AnimatedButtonContent isPending={isPending || isSuccess}>
                  Create
               </AnimatedButtonContent>
            </Button>
         </DialogFooter>
      </Content>
   )
}
