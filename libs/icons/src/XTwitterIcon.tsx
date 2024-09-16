// prettier-ignore
import type { FC, ComponentProps } from "react";

const XTwitterIcon: FC<ComponentProps<"svg">> = props => {
    return (
        <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
            {...props}>
            <g id="prime:twitter" clipPath="url(#clip0_10269_25500)">
                <g id="Group">
                    <g id="Clip path group">
                        <mask
                            id="mask0_10269_25500"
                            style={{ maskType: "luminance" }}
                            maskUnits="userSpaceOnUse"
                            x="0"
                            y="0"
                            width="18"
                            height="18">
                            <g id="primeTwitter0">
                                <path
                                    id="Vector"
                                    d="M0 0H18V18H0V0Z"
                                    fill="white"
                                />
                            </g>
                        </mask>
                        <g mask="url(#mask0_10269_25500)">
                            <g id="Group_2">
                                <path
                                    id="Vector_2"
                                    d="M14.175 0.84375H16.9354L10.9054 7.75318L18 17.1569H12.4457L8.09229 11.4548L3.11657 17.1569H0.353571L6.80271 9.76404L0 0.845036H5.69571L9.62486 6.05604L14.175 0.84375ZM13.2043 15.5009H14.7343L4.86 2.41361H3.21943L13.2043 15.5009Z"
                                    fill="white"
                                />
                            </g>
                        </g>
                    </g>
                </g>
            </g>
            <defs>
                <clipPath id="clip0_10269_25500">
                    <rect width="18" height="18" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
};

export default XTwitterIcon;
