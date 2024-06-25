import type { FC, ComponentProps } from "react";

const XboxMonocolorIcon: FC<ComponentProps<"svg">> = props => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            {...props}>
            <path
                d="M6.516 18.271A8.3 8.3 0 0 0 12 20.333c2.102 0 4.02-.775 5.487-2.062 1.302-1.326-2.997-6.046-5.487-7.926-2.488 1.88-6.79 6.6-5.485 7.926m7.75-10c1.736 2.056 5.197 7.16 4.22 8.964a8.3 8.3 0 0 0 1.848-5.232c0-2.32-.947-4.42-2.48-5.927 0 0-.019-.017-.056-.03a.6.6 0 0 0-.196-.03c-.409 0-1.378.3-3.336 2.254M6.203 6.045c-.037.013-.057.03-.06.03a8.3 8.3 0 0 0-2.476 5.927c0 1.982.691 3.8 1.847 5.23-.97-1.807 2.485-6.91 4.224-8.963-1.959-1.956-2.93-2.254-3.34-2.254a.5.5 0 0 0-.195.032zm5.798.087S9.955 4.937 8.357 4.879c-.626-.021-1.008.204-1.055.236 1.49-1 3.073-1.448 4.687-1.448H12c1.622 0 3.198.448 4.698 1.448-.046-.033-.426-.258-1.055-.236-1.598.057-3.644 1.25-3.644 1.25z"
                fill="currentColor"
            />
        </svg>
    );
};

export default XboxMonocolorIcon;
