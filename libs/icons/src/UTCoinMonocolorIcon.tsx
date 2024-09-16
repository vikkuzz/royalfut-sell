import type { FC, ComponentProps } from "react";

const UTCoinMonocolorIcon: FC<ComponentProps<"svg">> = props => {
    return (
        <svg
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}>
            <path
                d="m7.934 20.575 4.17-7.198h2.11l-4.166 7.198h3.028l4.176-7.201 1.028 1.694-4.119 7.107H8.905zm12.051 1.603H17.9l3.062-5.296h2.091l-1.062-1.778h-3.144l1.025-1.724h7.77l-1.04 1.709h-2.51l-1.039 1.793z"
                fill="currentColor"
            />
            <path
                d="M17.789 32.559c-8.152 0-14.783-6.632-14.783-14.784 0-8.15 6.631-14.781 14.783-14.781S32.57 9.626 32.57 17.775 25.941 32.56 17.79 32.56m0-26.721c-6.583 0-11.939 5.356-11.939 11.937 0 6.582 5.356 11.94 11.939 11.94s11.938-5.357 11.938-11.94S24.372 5.838 17.79 5.838"
                fill="currentColor"
            />
        </svg>
    );
};

export default UTCoinMonocolorIcon;
