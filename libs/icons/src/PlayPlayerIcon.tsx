import type { FC, ComponentProps } from "react";

const PlayPlayerIcon: FC<ComponentProps<"svg">> = props => {
    return (
        <svg viewBox="-3 0 28 28" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M21.415 12.554 2.418.311C1.291-.296 0-.233 0 1.946v24.108c0 1.992 1.385 2.306 2.418 1.635l18.997-12.243a2.076 2.076 0 0 0 0-2.892"
                fillRule="evenodd"
                fill="currentColor"
            />
        </svg>
    );
};

export default PlayPlayerIcon;
