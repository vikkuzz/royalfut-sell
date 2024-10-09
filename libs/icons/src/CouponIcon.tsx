import type { FC, ComponentProps } from "react";

const CouponIcon: FC<ComponentProps<"svg">> = props => {
    return (
        <svg
            viewBox="0 0 14 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}>
            <path
                d="M1.333.167A1.333 1.333 0 0 0 0 1.5v2.667a1.333 1.333 0 0 1 0 2.666V9.5a1.333 1.333 0 0 0 1.333 1.333H12A1.333 1.333 0 0 0 13.333 9.5V6.833a1.333 1.333 0 0 1 0-2.666V1.5A1.333 1.333 0 0 0 12 .167zm7.667 2 1 1-5.667 5.666-1-1zm-4.46.026a1.178 1.178 0 0 1 .834 2.015 1.18 1.18 0 1 1-.834-2.015m4.253 4.254a1.178 1.178 0 0 1 .835 2.014 1.18 1.18 0 1 1-.835-2.014"
                fill="currentColor"
            />
        </svg>
    );
};

export default CouponIcon;
