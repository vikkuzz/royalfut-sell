import type { FC, ComponentProps } from "react";

const MagicStarIcon: FC<ComponentProps<"svg">> = props => {
    return (
        <svg viewBox="0 0 512 512" fill="none" {...props}>
            <path
                d="M512 255.1c0 11.34-7.406 20.86-18.44 23.64l-171.3 42.78-42.78 171.1C276.7 504.6 267.2 512 255.9 512s-20.84-7.406-23.62-18.44l-42.66-171.2L18.47 279.6C7.406 276.8 0 267.3 0 255.1c0-11.34 7.406-20.83 18.44-23.61l171.2-42.78 42.78-171.1C235.2 7.406 244.7 0 256 0s20.84 7.406 23.62 18.44l42.78 171.2 171.2 42.78c11 2.78 18.4 12.18 18.4 22.68"
                fill="currentColor"
            />
        </svg>
    );
};

export default MagicStarIcon;
