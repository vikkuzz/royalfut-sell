import type { FC, ComponentProps } from "react";

const PencilMonocolorIcon: FC<ComponentProps<"svg">> = props => {
    return (
        <svg
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}>
            <path
                d="M2.525 9.575h-2.1v-2.1l5.45-5.45 2.1 2.1zm6.75-6.75-.7.7-2.1-2.1.7-.7q.3-.3.7-.3t.7.3l.7.7q.3.3.3.7t-.3.7"
                fill="currentColor"
            />
        </svg>
    );
};

export default PencilMonocolorIcon;
