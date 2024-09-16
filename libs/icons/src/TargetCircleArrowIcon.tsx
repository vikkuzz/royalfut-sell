import type { FC, ComponentProps } from "react";

const TargetCircleArrowIcon: FC<ComponentProps<"svg">> = props => {
    return (
        <svg
            viewBox="0 0 48 49"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}>
            <rect
                y="0.321289"
                width="48"
                height="48"
                rx="24"
                fill="currentColor"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="m34.569 13.751-.628-3.142a.468.468 0 0 0-.791-.24l-2.577 2.576a1.64 1.64 0 0 0-.48 1.16v2.133l-5.364 5.366a2.815 2.815 0 0 0-3.542 2.717 2.813 2.813 0 1 0 5.531-.73l5.363-5.364h2.133a1.64 1.64 0 0 0 1.161-.48l2.575-2.576a.47.47 0 0 0-.24-.792l-3.143-.628z"
                fill="white"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.75 24.32a11.25 11.25 0 0 1 14.355-10.816 1.406 1.406 0 0 0 .774-2.704 14.063 14.063 0 1 0 9.641 9.641 1.406 1.406 0 1 0-2.704.774 11.252 11.252 0 0 1-9.249 14.232A11.248 11.248 0 0 1 12.75 24.32"
                fill="white"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M18.375 24.32a5.625 5.625 0 0 1 6.273-5.587 1.405 1.405 0 1 0 .319-2.794 8.437 8.437 0 1 0 7.412 7.4 1.405 1.405 0 1 0-2.794.323 5.626 5.626 0 1 1-11.21.658"
                fill="white"
            />
        </svg>
    );
};

export default TargetCircleArrowIcon;
