import type { FC, ComponentProps } from "react";

const ArrowDownFilledIcon: FC<ComponentProps<"svg">> = props => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            {...props}>
            <path
                d="M12.375 15.375L6 9H18.75L12.375 15.375Z"
                fill="currentColor"
            />
        </svg>
    );
};

export default ArrowDownFilledIcon;
