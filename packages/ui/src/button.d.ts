import { type VariantProps } from "class-variance-authority";
import { type ComponentProps } from "react";
declare const buttonVariants: (props?: ({
    variant?: "link" | "accent" | "default" | "outline" | null | undefined;
    size?: "lg" | "sm" | "default" | "icon" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
type ButtonProps = ComponentProps<"button"> & VariantProps<typeof buttonVariants>;
declare const Button: import("react").ForwardRefExoticComponent<Omit<ButtonProps, "ref"> & import("react").RefAttributes<HTMLButtonElement>>;
export { Button, buttonVariants, type ButtonProps };
//# sourceMappingURL=button.d.ts.map