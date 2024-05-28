import { IconExclamationCircle } from "@tabler/icons-react";
import { VariantProps, cva } from "class-variance-authority";
import React from "react";
import { classNames } from "utils/classNames.ts";

const formErrorVariants = cva(
    "flex items-center gap-2 text-sm text-red-600 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
);

export interface FormErrorProps
    extends React.LabelHTMLAttributes<HTMLParagraphElement>,
        VariantProps<typeof formErrorVariants> {
    errorMessage: string;
}

const FormError = React.forwardRef<HTMLParagraphElement, FormErrorProps>(
    ({ className, errorMessage, ...props }, ref) => (
        <p ref={ref} className={classNames(formErrorVariants(), className)} {...props}>
            <IconExclamationCircle />
            {errorMessage}
        </p>
    ),
);
export default FormError;
