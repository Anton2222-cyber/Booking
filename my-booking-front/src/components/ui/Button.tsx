import { VariantProps, cva } from "class-variance-authority";
import { classNames } from "utils/classNames.ts";

import React from "react";

const buttonVariants = cva("flex items-center justify-center rounded-md gap-1", {
    variants: {
        variant: {
            primary: "bg-sky font-semibold font-semibold text-white hover:bg-blue",
            secondary: "bg-white font-semibold text-sky text-sm hover:opacity-90",
            rounded: "text-sm bg-transparent text-white hover:bg-lightblue rounded-full",
            underline: "text-xs text-white hover:bg-lightblue underline font-semibold rounded-none",
            transparent: "bg-transparent text-white hover:bg-lightblue font-bold",
        },
        size: {
            default: "h-12 px-3 py-2",
            sm: "h-9 px-3 py-1",
            md: "px-4 py-3",
            lg: "px-4 py-2",
            xl: "px-8 py-1.5 text-2xl",
        },
    },
    defaultVariants: {
        variant: "primary",
        size: "default",
    },
});

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={classNames(buttonVariants({ variant, size, className }))}
                {...props}
            />
        );
    },
);
