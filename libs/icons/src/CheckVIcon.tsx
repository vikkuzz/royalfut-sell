import type { FC, ComponentProps } from "react";

const CheckVIcon: FC<ComponentProps<"svg">> = props => {
    return (
        <svg
            version="1.2"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 6 6"
            {...props}>
            <path
                d="m.5 3 1.7 1.5 3.3-3"
                strokeLinecap="round"
                stroke="currentColor"
            />
        </svg>
    );
};

export default CheckVIcon;
