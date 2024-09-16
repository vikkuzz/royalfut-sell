import type { FC, ComponentProps } from "react";

const PaymentMastercardRotatedIcon: FC<ComponentProps<"svg">> = props => {
    return (
        <svg
            fill="none"
            viewBox="0 0 35 26"
            xmlns="http://www.w3.org/2000/svg"
            {...props}>
            <path
                d="m15.031 4.576 7.895 1.866-3.353 14.185-7.894-1.866z"
                fill="#FF5F00"
            />
            <path
                d="M13.856 11.787a9.3 9.3 0 0 1 5.11-6.28 9.2 9.2 0 0 0-5.108-3.246 9.265 9.265 0 0 0-11.155 6.89 9.265 9.265 0 0 0 6.89 11.155 9.2 9.2 0 0 0 6.02-.615 9.26 9.26 0 0 1-1.757-7.904"
                fill="#EB001B"
            />
            <path
                d="M31.9 16.052a9.265 9.265 0 0 1-11.155 6.89 9.2 9.2 0 0 1-5.108-3.245 9.22 9.22 0 0 0 5.11-6.281 9.3 9.3 0 0 0-1.757-7.904 9.2 9.2 0 0 1 6.02-.615c4.987 1.179 8.062 6.192 6.89 11.155"
                fill="#F79E1B"
            />
        </svg>
    );
};

export default PaymentMastercardRotatedIcon;
