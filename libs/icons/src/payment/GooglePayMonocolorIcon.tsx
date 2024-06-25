import type { FC, ComponentProps } from "react";

const GooglePayMonocolorIcon: FC<ComponentProps<"svg">> = props => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 25"
            fill="none"
            {...props}>
            <path
                d="M22.485 13.951v5.174h-1.612V6.35h4.271q1.625 0 2.761 1.103 1.158 1.104 1.157 2.693c0 1.086-.385 1.983-1.157 2.71-.747.728-1.67 1.087-2.76 1.087h-2.661zm0-6.028v4.455h2.692c.638 0 1.175-.222 1.595-.659.428-.435.645-.964.645-1.564 0-.59-.217-1.112-.644-1.548-.42-.452-.949-.675-1.596-.675h-2.692zm10.79 2.173q1.786 0 2.82.973 1.031.977 1.032 2.669v5.387H35.59V17.91h-.067c-.664 1-1.552 1.496-2.66 1.496-.948 0-1.737-.281-2.375-.856q-.956-.856-.957-2.136 0-1.36 1.007-2.156c.67-.538 1.57-.804 2.686-.804q1.436 0 2.357.539v-.375c0-.573-.218-1.053-.662-1.455a2.25 2.25 0 0 0-1.56-.598c-.899 0-1.613.385-2.132 1.163l-1.42-.907c.781-1.154 1.94-1.728 3.467-1.728zm-2.081 6.344c0 .427.176.786.536 1.069.354.281.773.427 1.252.427q1.02 0 1.811-.77c.529-.513.798-1.112.798-1.803-.503-.402-1.2-.608-2.098-.608-.654 0-1.2.163-1.636.48-.445.333-.663.735-.663 1.205m14.692-6.062-5.37 12.586h-1.66l1.996-4.403-3.541-8.184h1.753l2.55 6.276h.035l2.484-6.276h1.754zM12.363 9.225c-.785-.719-1.78-1.089-2.89-1.089v.003a4.49 4.49 0 0 0-4.228 2.992l-.039-.029a5.04 5.04 0 0 0 .002 2.943c.586 1.784 2.149 3.1 3.986 3.1.965 0 1.79-.273 2.43-.738l.02.016a3.4 3.4 0 0 0 1.369-2.211l-3.924-.002v-2.82h6.813q.133.739.135 1.54c0 2.223-.779 4.105-2.14 5.378l.028.024c-1.179 1.178-2.8 1.863-4.73 1.863a6.77 6.77 0 0 1-3.752-1.146 7.5 7.5 0 0 1-2.635-3.099v-.034a8.3 8.3 0 0 1-.695-3.345 8.3 8.3 0 0 1 .667-3.28l-.037-.028A7.36 7.36 0 0 1 5.52 6.348a7.75 7.75 0 0 1 3.954-1.08c2.031 0 3.734.72 5.038 1.889z"
                fill="currentColor"
            />
        </svg>
    );
};

export default GooglePayMonocolorIcon;