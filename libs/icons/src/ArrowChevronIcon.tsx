import type { FC, ComponentProps } from "react";

export const ArrowChevronRightIcon: FC<ComponentProps<"svg">> = props => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            {...props}>
            <path
                d="M10.555 18 9.5 16.935 14.39 12 9.5 7.065 10.555 6l5.945 6z"
                fill="currentColor"
            />
        </svg>
    );
};

export const ArrowChevronLeftIcon: FC<ComponentProps<"svg">> = props => {
    return (
        <svg
            version="1.2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            {...props}>
            <path
                fill="currentColor"
                d="m13.4 6 1.1 1.1L9.6 12l4.9 4.9-1.1 1.1-5.9-6z"
            />
        </svg>
    );
};

export const ArrowDoubleChevronRightIcon: FC<ComponentProps<"svg">> = props => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="64 64 896 896"
            fill="none"
            {...props}>
            <path
                fill="currentColor"
                d="M533.2 492.3 277.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H188c-6.7 0-10.4 7.7-6.3 12.9L447.1 512 181.7 851.1A7.98 7.98 0 0 0 188 864h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5m304 0L581.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H492c-6.7 0-10.4 7.7-6.3 12.9L751.1 512 485.7 851.1A7.98 7.98 0 0 0 492 864h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5"
            />
        </svg>
    );
};

export const ArrowDoubleChevronLeftIcon: FC<ComponentProps<"svg">> = props => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="64 64 896 896"
            fill="none"
            {...props}>
            <path
                fill="currentColor"
                d="m272.9 512 265.4-339.1c4.1-5.2.4-12.9-6.3-12.9h-77.3c-4.9 0-9.6 2.3-12.6 6.1L186.8 492.3a31.99 31.99 0 0 0 0 39.5l255.3 326.1c3 3.9 7.7 6.1 12.6 6.1H532c6.7 0 10.4-7.7 6.3-12.9zm304 0 265.4-339.1c4.1-5.2.4-12.9-6.3-12.9h-77.3c-4.9 0-9.6 2.3-12.6 6.1L490.8 492.3a31.99 31.99 0 0 0 0 39.5l255.3 326.1c3 3.9 7.7 6.1 12.6 6.1H836c6.7 0 10.4-7.7 6.3-12.9z"
            />
        </svg>
    );
};
