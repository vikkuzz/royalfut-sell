import type { FC, ComponentProps } from "react";

const HeartIcon: FC<ComponentProps<"svg">> = props => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 42 43"
            fill="none"
            {...props}>
            <g clipPath="url(#clip0_7793_82633)">
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M21.072 3.905c11.533-11.856 40.37 8.89 0 35.567-40.37-26.674-11.534-47.423 0-35.567"
                    fill="currentColor"
                />
            </g>
            <defs>
                <clipPath id="clip0_7793_82633">
                    <path fill="#fff" d="M.282.49h41.581v41.581H.282z" />
                </clipPath>
            </defs>
        </svg>
    );
};

export default HeartIcon;
