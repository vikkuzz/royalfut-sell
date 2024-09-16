import type { FC, ComponentProps } from "react";

const EllipseLinearGradientIcon: FC<ComponentProps<"svg">> = props => {
    return (
        <svg
            viewBox="0 0 95 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}>
            <path
                d="M93.742 11.475c.506 2.153-.112 4.576-1.893 7.182-1.782 2.606-4.67 5.302-8.495 7.916-7.643 5.224-18.845 9.998-31.794 13.04-12.949 3.043-25.105 3.757-34.275 2.484-4.588-.638-8.375-1.765-11.13-3.305s-4.388-3.434-4.894-5.587.112-4.575 1.893-7.18c1.782-2.607 4.67-5.303 8.495-7.917 7.643-5.224 18.845-9.998 31.794-13.04 12.95-3.043 25.105-3.757 34.275-2.484 4.588.637 8.375 1.765 11.13 3.305s4.389 3.434 4.894 5.586Z"
                stroke="url(#ac-22)"
                strokeWidth="2"
            />
            <defs>
                <linearGradient
                    id="ac-22"
                    x1="90.428"
                    y1="-7"
                    x2="-2.961"
                    y2="34.876"
                    gradientUnits="userSpaceOnUse">
                    <stop stopColor="#A82DF9" />
                    <stop offset="1" stopColor="#6678E9" />
                </linearGradient>
            </defs>
        </svg>
    );
};

export default EllipseLinearGradientIcon;
