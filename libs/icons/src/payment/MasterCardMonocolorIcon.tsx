import type { FC, ComponentProps } from "react";

const MasterCardMonocolorIcon: FC<ComponentProps<"svg">> = props => {
    return (
        <svg
            viewBox="0 0 26 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}>
            <g clipPath="url(#m1)" fill="currentColor">
                <path d="M17.97 4.154a7.7 7.7 0 0 0-4.413 1.391 8.9 8.9 0 0 1 2.321 3.104 9.3 9.3 0 0 1 .827 3.844 9.3 9.3 0 0 1-.827 3.843 8.9 8.9 0 0 1-2.32 3.104 7.74 7.74 0 0 0 3.436 1.278 7.64 7.64 0 0 0 3.62-.46 7.94 7.94 0 0 0 3.045-2.1 8.4 8.4 0 0 0 1.826-3.298 8.7 8.7 0 0 0 .224-3.804 8.5 8.5 0 0 0-1.424-3.507 8.06 8.06 0 0 0-2.774-2.475 7.7 7.7 0 0 0-3.54-.92m-5.487 1.36A7.7 7.7 0 0 0 8.46 4.161a7.7 7.7 0 0 0-4.117.99 8.1 8.1 0 0 0-3.051 3.055A8.6 8.6 0 0 0 .17 12.46a8.6 8.6 0 0 0 1.123 4.256 8.1 8.1 0 0 0 3.05 3.054 7.7 7.7 0 0 0 4.118.99 7.7 7.7 0 0 0 4.023-1.352 8.95 8.95 0 0 1-2.318-3.106 9.3 9.3 0 0 1-.825-3.842c0-1.328.282-2.64.825-3.841a8.95 8.95 0 0 1 2.318-3.106" />
                <path d="M13.001 19.014a8.25 8.25 0 0 0 2.257-2.906 8.6 8.6 0 0 0 .807-3.647c0-1.263-.276-2.51-.807-3.646a8.25 8.25 0 0 0-2.257-2.906 8.25 8.25 0 0 0-2.257 2.906 8.6 8.6 0 0 0-.807 3.646c0 1.264.276 2.511.807 3.647a8.25 8.25 0 0 0 2.257 2.906" />
            </g>
            <defs>
                <clipPath id="m1">
                    <path fill="currentColor" d="M.077 0h25.846v24.923H.077z" />
                </clipPath>
            </defs>
        </svg>
    );
};

export default MasterCardMonocolorIcon;