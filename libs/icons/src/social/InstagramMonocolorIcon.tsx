import type { FC, ComponentProps } from "react";

const InstagramIcon: FC<ComponentProps<"svg">> = props => {
    return (
        <svg
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}>
            <path
                d="M15.5 12.375a3 3 0 1 1-3-3 3.01 3.01 0 0 1 3 3m6.375-4.125v8.25a5.25 5.25 0 0 1-5.25 5.25h-8.25a5.25 5.25 0 0 1-5.25-5.25V8.25A5.25 5.25 0 0 1 8.375 3h8.25a5.25 5.25 0 0 1 5.25 5.25M17 12.375a4.5 4.5 0 1 0-9 0 4.5 4.5 0 0 0 9 0M18.5 7.5a1.125 1.125 0 1 0-2.25 0 1.125 1.125 0 0 0 2.25 0"
                fill="currentColor"
            />
        </svg>
    );
};

export default InstagramIcon;
