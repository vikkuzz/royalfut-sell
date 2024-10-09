import type { FC, ComponentProps } from "react";

const InfoRoundedFillIcon: FC<ComponentProps<"svg">> = props => {
    return (
        <svg
            viewBox="0 0 12 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}>
            <InfoSymbolIconPath fill="#fff" />
            <path
                d="M6 3.5q.255 0 .428.173A.58.58 0 0 1 6.6 4.1q0 .255-.172.428A.58.58 0 0 1 6 4.7a.58.58 0 0 1-.427-.172A.58.58 0 0 1 5.4 4.1q0-.255.173-.427A.58.58 0 0 1 6 3.5m-.6 2.4h1.2v3.6H5.4zM6 .5Q4.755.5 3.66.973a6.1 6.1 0 0 0-1.905 1.282A6.1 6.1 0 0 0 .473 4.16 5.8 5.8 0 0 0 0 6.5q0 1.245.473 2.34.472 1.095 1.282 1.905t1.905 1.283T6 12.5t2.34-.472a6.1 6.1 0 0 0 1.905-1.283q.81-.81 1.282-1.905A5.8 5.8 0 0 0 12 6.5q0-1.245-.473-2.34a6.1 6.1 0 0 0-1.282-1.905A6.1 6.1 0 0 0 8.34.973 5.8 5.8 0 0 0 6 .5"
                fill="currentColor"
            />
        </svg>
    );
};

const InfoSymbolIconPath: FC<ComponentProps<"path">> = ({
    fill = "currentColor",
    ...props
}) => {
    return (
        <path
            fill={fill}
            d="M6 3.5q.255 0 .428.173A.58.58 0 0 1 6.6 4.1q0 .255-.172.428A.58.58 0 0 1 6 4.7a.58.58 0 0 1-.427-.172A.58.58 0 0 1 5.4 4.1q0-.255.173-.427A.58.58  0 0 1 6 3.5m-.6 2.4h1.2v3.6H5.4zM6 0"
            {...props}
        />
    );
};

export default InfoRoundedFillIcon;
