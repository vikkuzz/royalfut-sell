import type { FC, ComponentProps } from "react";

const VerifiedMarkerIcon: FC<ComponentProps<"svg">> = props => {
    return (
        <svg
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}>
            <mask
                id="beenhere"
                style={{
                    maskType: "alpha",
                }}
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="16"
                height="16">
                <path fill="currentColor" d="M0 0h16v16H0z" />
            </mask>
            <g mask="url(#beenhere)">
                <path
                    d="m8 15.333-4.8-3.6a1.32 1.32 0 0 1-.533-1.067v-8q0-.55.391-.941.392-.392.942-.392h8q.55 0 .942.392.39.392.391.942v8a1.32 1.32 0 0 1-.533 1.066zM7.3 10l3.767-3.767-.934-.966L7.3 8.1 5.9 6.7l-.967.933z"
                    fill="currentColor"
                />
            </g>
        </svg>
    );
};

export default VerifiedMarkerIcon;
