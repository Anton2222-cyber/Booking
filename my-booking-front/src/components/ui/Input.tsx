// const inputVariants = cva("flex text-md disabled:cursor-not-allowed disabled:opacity-50", {
//     variants: {
//         variant: {
//             default: "border px-3 py-1 rounded-sm",
//             search: "border rounded-md px-1.5 py-2 focus:outline-orange-500",
//             file: "sr-only",
//             auth: "w-full rounded-md border py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400  sm:text-sm sm:leading-6",
//         },
//     },
//     defaultVariants: {
//         variant: "default",
//     },
// });
//
// export interface InputProps
//     extends React.InputHTMLAttributes<HTMLInputElement>,
//         VariantProps<typeof inputVariants> {}
//
// export const Input = React.forwardRef<HTMLInputElement, InputProps>(
//     ({ className, variant, type, ...props }, ref) => {
//         return (
//             <input
//                 type={type}
//                 className={classNames(inputVariants({ variant, className }))}
//                 ref={ref}
//                 {...props}
//             />
//         );
//     },
// );
//
// export default Input;
