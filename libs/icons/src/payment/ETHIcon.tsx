import type { FC, ComponentProps } from "react";

const ETHIcon: FC<ComponentProps<"svg">> = props => {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.2063 2.00022L18.4128 12.1855L12.2065 15.814L6.00006 12.1856L12.2063 2.00022ZM12.2063 21.9996L6 13.3495L12.2065 16.9762L18.4165 13.3496L12.2063 21.9996Z"
                fill="#00B3FF"
            />
        </svg>
    );
};

export default ETHIcon;
