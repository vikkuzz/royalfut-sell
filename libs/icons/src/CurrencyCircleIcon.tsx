import type { FC, ComponentProps } from "react";

const CurrencyCircleIcon: FC<ComponentProps<"svg">> = props => {
    return (
        <svg
            viewBox="0 0 48 49"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}>
            <rect y=".321" width="48" height="48" rx="24" fill="currentColor" />
            <path
                d="M24 39.321c-8.284 0-15-6.715-15-15s6.716-15 15-15c8.285 0 15 6.716 15 15 0 8.285-6.715 15-15 15m-5.25-12v3h3.75v3h3v-3H27a3.75 3.75 0 1 0 0-7.5h-6a.75.75 0 1 1 0-1.5h8.25v-3H25.5v-3h-3v3H21a3.75 3.75 0 0 0 0 7.5h6a.75.75 0 1 1 0 1.5z"
                fill="#fff"
            />
        </svg>
    );
};

export default CurrencyCircleIcon;
