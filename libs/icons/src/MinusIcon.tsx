import type { FC, ComponentProps } from "react";

const MinusIcon: FC<ComponentProps<"svg">> = props => {
    return (
        <svg
            version="1.2"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 2"
            {...props}>
            <path
                d="M1.06 2h17.523c.572 0 1.06-.453 1.06-.994 0-.542-.488-.984-1.06-.984H1.06C.488.022 0 .464 0 1.006 0 1.547.488 2 1.06 2"
                fill="currentColor"
            />
        </svg>
    );
};

export default MinusIcon;
