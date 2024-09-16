import type { FC, ComponentProps } from "react";

const PausePlayerIcon: FC<ComponentProps<"svg">> = props => {
    return (
        <svg viewBox="-4 0 28 28" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                fill="currentColor"
                d="M18 0h-4a2 2 0 0 0-2 2v24a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M6 0H2a2 2 0 0 0-2 2v24a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2"
                fillRule="evenodd"
            />
        </svg>
    );
};

export default PausePlayerIcon;
