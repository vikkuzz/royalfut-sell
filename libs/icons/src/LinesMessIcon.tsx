import type { FC, ComponentProps } from "react";

export const LinesMessIcon: FC<ComponentProps<"svg">> = props => {
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

export const LinesMessIcon2: FC<ComponentProps<"svg">> = props => {
    return (
        <svg
            viewBox="0 0 793 497"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M291.278 135.431 43.723 341.049.275 288.739 346.888.844l53.528 38.176-119.855 317.084L702.282 32.528l53.562 35.686-78.346 295.583 197.989-189.549 47.025 49.118-285.355 273.192-56.377-33.271 83.787-316.111-437.321 335.545-52.5-38.996z"
                fill="url(#lines-mess-a13)"
                style={{
                    mixBlendMode: "lighten",
                }}
            />
            <defs>
                <linearGradient
                    id="lines-mess-a13"
                    x1="922.512"
                    y1=".844"
                    x2="-49.804"
                    y2="135.829"
                    gradientUnits="userSpaceOnUse">
                    <stop stopColor="#A82DF9" />
                    <stop offset="1" stopColor="#6678E9" />
                </linearGradient>
            </defs>
        </svg>
    );
};
