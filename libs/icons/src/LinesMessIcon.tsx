import type { FC, ComponentProps } from "react";

const LinesMessIcon: FC<ComponentProps<"svg">> = props => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 822 599"
            fill="none"
            {...props}>
            <path
                d="M19.677 256.055 450.924 37.673 178.706 447.712l634.681-291.139-213.224 405.653 363.712-217.66"
                stroke="url(#lines-mess-a12)"
                strokeWidth="84.398"
                strokeLinejoin="bevel"
                style={{ mixBlendMode: "color-dodge" }}
            />
            <defs>
                <linearGradient
                    id="lines-mess-a12"
                    x1="1005.1"
                    y1="164.701"
                    x2="8.719"
                    y2="85.233"
                    gradientUnits="userSpaceOnUse">
                    <stop stopColor="#A82DF9" />
                    <stop offset="1" stopColor="#6678E9" />
                </linearGradient>
            </defs>
        </svg>
    );
};

export default LinesMessIcon;
