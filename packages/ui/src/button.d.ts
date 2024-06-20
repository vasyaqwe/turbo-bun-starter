import { type ComponentProps } from "react";
import { type VariantProps } from "class-variance-authority";
declare const buttonVariants: (props?: ({
    variant?: "link" | "default" | "accent" | "outline" | null | undefined;
    size?: "default" | "sm" | "lg" | "icon" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
type ButtonProps = ComponentProps<"button"> & VariantProps<typeof buttonVariants>;
declare const Button: import("react").ForwardRefExoticComponent<Omit<ButtonProps, "ref"> & import("react").RefAttributes<HTMLButtonElement>>;
export { Button, type ButtonProps, buttonVariants };
//# sourceMappingURL=button.d.ts.map