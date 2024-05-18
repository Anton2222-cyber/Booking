import { VariantProps, cva } from "class-variance-authority";
import { classNames } from "utils/classNames.ts";

import * as React from "react";

const inputVariants = cva(
    "text-sm w-full placeholder:text-lightgray font-bold h-full rounded-md ps-10 outline-none border border-white hover:border-yellow",
    {
        variants: {
            variant: {
                default: "",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    },
);

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement>,
        VariantProps<typeof inputVariants> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, variant, type, ...props }, ref) => {
        return (
            <input
                type={type}
                className={classNames(inputVariants({ variant, className }))}
                ref={ref}
                {...props}
            />
        );
    },
);
