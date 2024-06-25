import type { FC, ComponentProps } from "react";

const TiktokIcon: FC<ComponentProps<"svg">> = props => {
    return (
        <svg
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}>
            <path
                d="M17.466 5.497a4.5 4.5 0 0 1-1.116-2.968h-3.252v13.049a2.727 2.727 0 0 1-2.725 2.63 2.744 2.744 0 0 1-2.736-2.735c0-1.81 1.747-3.168 3.546-2.61V9.538c-3.63-.484-6.808 2.336-6.808 5.935 0 3.504 2.904 5.998 5.988 5.998a5.993 5.993 0 0 0 5.987-5.998v-6.62a7.74 7.74 0 0 0 4.525 1.453V7.054s-1.978.095-3.41-1.557"
                fill="currentColor"
            />
        </svg>
    );
};

export default TiktokIcon;
