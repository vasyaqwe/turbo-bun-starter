import { Loading } from "@acme/ui/loading"
import { AnimatePresence, motion } from "framer-motion"
import useResizeObserver from "use-resize-observer"

export function AnimatedButtonContent({
   isPending,
   children,
}: {
   isPending: boolean
   children: React.ReactNode
}) {
   const { ref, width = 1 } = useResizeObserver<HTMLSpanElement>()

   return (
      <span
         ref={ref}
         style={{ minWidth: width }}
         className="flex"
      >
         <AnimatePresence
            initial={false}
            mode="popLayout"
         >
            {!isPending ? (
               <motion.span
                  key={"children"}
                  className="flex items-center justify-center gap-1.5"
                  initial={{ y: 30 }}
                  animate={{ y: 0 }}
                  exit={{ y: 30 }}
               >
                  {children}{" "}
               </motion.span>
            ) : (
               <motion.span
                  key={"loading"}
                  className="mx-auto"
                  initial={{ y: -30 }}
                  animate={{ y: 0 }}
                  exit={{ y: -30 }}
               >
                  <Loading />
               </motion.span>
            )}
         </AnimatePresence>
      </span>
   )
}
