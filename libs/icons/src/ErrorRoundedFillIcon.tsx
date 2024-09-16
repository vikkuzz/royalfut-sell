import type { FC, ComponentProps } from "react";

const ErrorRoundedFillIcon: FC<ComponentProps<"svg">> = props => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="none"
            {...props}>
            <path fill="#fff" d="M6.667 4H10v8.667H6.667z" />
            <path
                d="M8 12a.78.78 0 0 0 .57-.23.77.77 0 0 0 .23-.57.78.78 0 0 0-.23-.57.78.78 0 0 0-.57-.23.77.77 0 0 0-.57.23.78.78 0 0 0-.23.57q0 .34.23.57T8 12m-.8-3.2h1.6V4H7.2zM8 16a7.8 7.8 0 0 1-3.12-.63 8.1 8.1 0 0 1-2.54-1.71 8.1 8.1 0 0 1-1.71-2.54A7.8 7.8 0 0 1 0 8q0-1.66.63-3.12t1.71-2.54A8.1 8.1 0 0 1 4.88.63 7.8 7.8 0 0 1 8 0q1.66 0 3.12.63t2.54 1.71 1.71 2.54T16 8t-.63 3.12-1.71 2.54a8.1 8.1 0 0 1-2.54 1.71Q9.66 16 8 16"
                fill="currentColor"
            />
        </svg>
    );
};

export default ErrorRoundedFillIcon;
