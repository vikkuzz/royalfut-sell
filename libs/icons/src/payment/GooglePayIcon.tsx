import type { FC, ComponentProps } from "react";

const GooglePayIcon: FC<ComponentProps<"svg">> = props => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 29 12"
            fill="none"
            {...props}>
            <path
                d="M13.543 5.72v3.263h-1.035V.926h2.745q1.045 0 1.774.695.744.696.744 1.7c0 .684-.248 1.25-.744 1.709q-.721.686-1.774.685h-1.71zm0-3.802v2.81h1.731c.41 0 .755-.14 1.025-.415.275-.275.415-.61.415-.987 0-.372-.14-.701-.415-.976q-.404-.428-1.025-.427h-1.73zm6.937 1.369q1.148 0 1.812.615.663.614.663 1.683v3.397h-.987v-.766h-.043q-.64.945-1.71.944-.913.002-1.526-.54a1.72 1.72 0 0 1-.615-1.347q0-.858.647-1.36.65-.508 1.726-.506.924 0 1.516.34v-.238c0-.361-.14-.663-.426-.917a1.46 1.46 0 0 0-1.003-.377q-.868-.002-1.37.733l-.912-.571q.754-1.092 2.228-1.09M19.142 7.29q-.001.406.345.674.341.269.804.27.655 0 1.165-.486.511-.483.512-1.138-.484-.381-1.348-.383-.63.002-1.052.302-.427.316-.426.76m9.442-3.822-3.452 7.938h-1.067l1.283-2.777-2.276-5.161H24.2l1.64 3.958h.021l1.597-3.958z"
                fill="#3C4043"
            />
            <path
                d="M9.425 5.063q0-.506-.087-.971h-4.34v1.78h2.5a2.14 2.14 0 0 1-.928 1.434V8.46h1.488c.869-.804 1.367-1.993 1.367-3.397"
                fill="#4285F4"
            />
            <path
                d="M6.57 7.304c-.415.28-.948.443-1.572.443-1.205 0-2.228-.812-2.594-1.907H.869v1.19A4.62 4.62 0 0 0 5 9.576c1.247 0 2.295-.41 3.059-1.117z"
                fill="#34A853"
            />
            <path
                d="M2.26 4.958c0-.308.052-.605.145-.884V2.883H.87a4.6 4.6 0 0 0-.49 2.075 4.6 4.6 0 0 0 .491 2.074l1.535-1.19a2.8 2.8 0 0 1-.144-.884"
                fill="#FABB05"
            />
            <path
                d="M4.998 2.166a2.5 2.5 0 0 1 1.773.693l1.318-1.317A4.44 4.44 0 0 0 5 .338 4.62 4.62 0 0 0 .87 2.882l1.535 1.191c.366-1.095 1.389-1.907 2.594-1.907"
                fill="#E94235"
            />
        </svg>
    );
};

export default GooglePayIcon;
