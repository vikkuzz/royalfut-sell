import type { FC, ComponentProps } from "react";

const MoreHorizontalIcon: FC<ComponentProps<"svg">> = props => {
    return (
        <svg
            version="1.2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 18 4"
            {...props}>
            <path
                fill="none"
                stroke="currentColor"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 3c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1m7 0c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1M2 3c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1"
            />
        </svg>
    );
};

export default MoreHorizontalIcon;
