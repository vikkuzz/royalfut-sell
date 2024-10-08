import type { FC, ComponentProps } from "react";

const ExitIcon: FC<ComponentProps<"svg">> = props => {
    return (
        <svg
            viewBox="0 0 19 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}>
            <path
                d="M9.5 19.75V17.5833H16.5V2.41667H9.5V0.25H16.5C17.05 0.25 17.521 0.461972 17.913 0.885917C18.3043 1.31058 18.5 1.82083 18.5 2.41667V17.5833C18.5 18.1792 18.3043 18.6894 17.913 19.1141C17.521 19.538 17.05 19.75 16.5 19.75H9.5ZM7.5 15.4167L6.125 13.8458L8.675 11.0833H0.5V8.91667H8.675L6.125 6.15417L7.5 4.58333L12.5 10L7.5 15.4167Z"
                fill="currentColor"
            />
        </svg>
    );
};

export default ExitIcon;
