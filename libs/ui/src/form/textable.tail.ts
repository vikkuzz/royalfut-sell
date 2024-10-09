import { cva, type VariantProps } from "class-variance-authority";

export const inputAbleVariants = cva(
    [
        "block w-full transition duration-300 relative",
        "rounded-md ring-inset focus:outline-inset",
    ],
    {
        variants: {
            vtype: {
                none: "",
                primary: `
                    inline-flex justify-start items-center border bg-transparent text-typography-text rounded-xl
                    focus:outline-none placeholder:text-white-60
                `,
                error: `
                    inline-flex justify-start items-center border bg-transparent text-typography-text rounded-xl
                    focus:outline-none placeholder:text-white-60
                `,
                success: `
                    inline-flex justify-start items-center border bg-transparent text-typography-text rounded-xl
                    focus:outline-none placeholder:text-white-60
                `,
            },
            vsize: {
                none: "",
                xs: "text-xs px-2 py-1",
                sm: "text-sm px-3 py-1",
                md: "text-sm px-3 py-1.5",
                lg: "text-base p-5 ",
                xl: "text-lg px-4 py-2",
                xxl: "text-xl px-5 py-4 font-semibold",
            },
            vborder: {
                default: "",
                box: "w-full h-full border border-transparent bg-transparent",
            },
            disabled: {
                true: "opacity-50 cursor-not-allowed pointer-events-none",
            },
        },
        compoundVariants: [
            {
                vborder: "box",
                vtype: "primary",
                className:
                    "hover:bordered-box-linear-accent-1 focus:bordered-box-linear-accent-1",
            },
            {
                vborder: "box",
                vtype: "error",
                className: "bordered-box-linear-error",
            },
            {
                vborder: "box",
                vtype: "success",
                className: "bordered-box-linear-success",
            },
        ],
    }
);

export type InputAbleVariantsProps = VariantProps<typeof inputAbleVariants>;
