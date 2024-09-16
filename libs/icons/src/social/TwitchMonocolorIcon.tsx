import type { FC, ComponentProps } from "react";

const TwitchIcon: FC<ComponentProps<"svg">> = props => {
    return (
        <svg
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}>
            <path
                d="M11.442 5.928h1.43v4.282h-1.43m3.932-4.282h1.43v4.282h-1.43M6.8 1.997 3.23 5.568v12.864h4.281v3.57l3.581-3.57h2.851L20.375 12V1.997m-1.43 9.293-2.851 2.85h-2.861l-2.5 2.501v-2.5H7.51V3.427h11.434z"
                fill="currentColor"
            />
        </svg>
    );
};

export default TwitchIcon;
