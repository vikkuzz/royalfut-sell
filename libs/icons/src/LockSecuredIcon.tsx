import type { FC, ComponentProps } from "react";

const LockSecuredIcon: FC<ComponentProps<"svg">> = props => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 21" {...props}>
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M2 21q-.8 0-1.4-.6-.2-.1-.3-.3t-.2-.3q0-.2-.1-.4V9q0-.8.6-1.4.1-.2.3-.3t.3-.2q.2 0 .4-.1H3V5q0-2.1 1.5-3.5Q5.9 0 8 0t3.5 1.5Q13 2.9 13 5v2h1q.8 0 1.4.6T16 9v10q0 .8-.6 1.4-.1.2-.3.3t-.3.2q-.2 0-.4.1H14zm6-5q.8 0 1.4-.6T10 14c0-.8-.2-1-.6-1.4Q8.8 12 8 12c-.8 0-1 .2-1.4.6Q6 13.2 6 14c0 .8.2 1 .6 1.4q.6.6 1.4.6M5 7h6V5q0-1.3-.9-2.1l-.4-.4q-.3-.2-.5-.3-.3-.1-.6-.1Q8.3 2 8 2q-1.3 0-2.1.9l-.4.4q-.2.3-.3.5-.1.3-.1.6-.1.3-.1.6z"
            />
        </svg>
    );
};

export default LockSecuredIcon;
