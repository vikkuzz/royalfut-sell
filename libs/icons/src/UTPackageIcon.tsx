import type { FC, ComponentProps } from "react";

const UTPackageIcon: FC<ComponentProps<"svg">> = props => {
    return (
        <svg
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}>
            <path
                d="M.576 9.388 4.067 2.4A3.32 3.32 0 0 1 7.028.574H14.9v8.814zm30.85 0H17.19V.574h7.782c1.254 0 2.397.71 2.961 1.825z"
                fill="currentColor"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M.576 11.592h30.85v15.425a4.41 4.41 0 0 1-4.407 4.407H4.982a4.41 4.41 0 0 1-4.407-4.407zm9.65 3.974a3.424 3.424 0 0 0-3.424 3.425v5.134a3.424 3.424 0 0 0 3.424 3.424h11.55a3.424 3.424 0 0 0 3.424-3.424V18.99a3.424 3.424 0 0 0-3.424-3.425z"
                fill="currentColor"
            />
            <path
                d="m8.391 23.719 3.22-5.559h1.63l-3.217 5.559h2.338l3.225-5.56.793 1.307-3.18 5.488H9.14zm9.306 1.238h-1.61l2.365-4.09h1.615l-.82-1.373h-2.428l.792-1.33h6l-.804 1.318H20.87l-.803 1.386z"
                fill="currentColor"
            />
        </svg>
    );
};

export default UTPackageIcon;
