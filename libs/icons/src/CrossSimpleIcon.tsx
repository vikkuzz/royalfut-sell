import type { FC, ComponentProps } from "react";

const CrossSimpleIcon: FC<ComponentProps<"svg">> = props => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 28 28"
            fill="none"
            {...props}>
            <rect
                width="27"
                height="3"
                rx="1.5"
                transform="matrix(-1 0 0 1 27.5 12.5)"
                fill="currentColor"
            />
            <rect
                width="27"
                height="3"
                rx="1.5"
                transform="matrix(0 -1 -1 0 15.5 27.5)"
                fill="currentColor"
            />
        </svg>
    );
};

export default CrossSimpleIcon;
