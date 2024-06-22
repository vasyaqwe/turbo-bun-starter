import { CreateExpense } from "@/routes/-components/create-expense"
import { createPushModal } from "pushmodal"
import { Wrapper } from "./dynamic"

export const {
   pushModal,
   popModal,
   popAllModals,
   replaceWithModal,
   useOnPushModal,
   onPushModal,
   ModalProvider,
} = createPushModal({
   modals: {
      "create-expense": {
         Wrapper,
         Component: CreateExpense,
      },
   },
})
