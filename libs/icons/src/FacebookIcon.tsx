// prettier-ignore
import type { FC, ComponentProps } from "react";

const FacebookIcon: FC<ComponentProps<"svg">> = props => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            {...props}>
            <path
                d="M21 12.0226C21 7.04211 16.968 3 12 3C7.032 3 3 7.04211 3 12.0226C3 16.3895 6.096 20.0256 10.2 20.8647V14.7293H8.4V12.0226H10.2V9.76692C10.2 8.02556 11.613 6.60902 13.35 6.60902H15.6V9.31579H13.8C13.305 9.31579 12.9 9.7218 12.9 10.218V12.0226H15.6V14.7293H12.9V21C17.445 20.5489 21 16.7053 21 12.0226Z"
                fill="white"
            />
        </svg>
    );
};

export default FacebookIcon;
