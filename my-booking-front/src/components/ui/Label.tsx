import { VariantProps, cva } from "class-variance-authority";
import { classNames } from "utils/classNames.ts";

import React from "react";

const labelVariants = cva("flex font-main", {
    variants: {
        variant: {
            default: "",
            small: "text-black text-xs",
            extra: "text-black font-bold text-3xl",
            title: "text-black font-bold text-2xl",
            subtitle: "text-lightgray text-md",
        },
    },
    defaultVariants: {
        variant: "default",
    },
});

export interface LabelProps
    extends React.LabelHTMLAttributes<HTMLLabelElement>,
        VariantProps<typeof labelVariants> {}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(({ className, variant, ...props }, ref) => (
    <label ref={ref} className={classNames(labelVariants({ variant }), className)} {...props} />
));
export default Label;
