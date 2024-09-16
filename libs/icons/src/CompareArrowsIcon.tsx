import type { FC, ComponentProps } from "react";

const CompareArrowsIcon: FC<ComponentProps<"svg">> = props => {
    return (
        <svg
            viewBox="0 0 28 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}>
            <path
                d="m8.667 21.666-1.867-1.9 3.434-3.433H.667v-2.667h9.567L6.8 10.233l1.867-1.9L15.334 15zm10.667-8L12.667 7 19.334.333l1.866 1.9-3.433 3.433h9.567v2.667h-9.567l3.433 3.433z"
                fill="currentColor"
            />
        </svg>
    );
};

export default CompareArrowsIcon;
