/// <reference types="react" />
import { toast, Toaster as Sonner } from "sonner";
type ToasterProps = React.ComponentProps<typeof Sonner>;
declare const Toaster: ({ ...props }: ToasterProps) => import("react").JSX.Element;
export { toast, Toaster };
//# sourceMappingURL=toast.d.ts.map