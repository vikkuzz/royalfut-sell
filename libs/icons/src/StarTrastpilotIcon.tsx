import type { FC, ComponentProps } from "react";

const StarTrastpilotIcon: FC<ComponentProps<"svg">> = props => {
    return (
        <svg
            viewBox="3 4 18 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}>
            <path d="M20 .5H4a4 4 0 0 0-4 4v16a4 4 0 0 0 4 4h16a4 4 0 0 0 4-4v-16a4 4 0 0 0-4-4" />
            <path
                d="m12 16.675 3.65-.925 1.526 4.7zm8.4-6.075h-6.424L12 4.55l-1.975 6.05H3.6l5.2 3.75-1.975 6.05 5.2-3.75 3.2-2.3z"
                fill="currentColor"
            />
        </svg>
    );
};

export default StarTrastpilotIcon;
