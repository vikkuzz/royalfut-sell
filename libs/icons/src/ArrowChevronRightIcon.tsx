import type { FC, ComponentProps } from "react";

const ArrowChevronRightIcon: FC<ComponentProps<"svg">> = props => {
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

export default ArrowChevronRightIcon;
