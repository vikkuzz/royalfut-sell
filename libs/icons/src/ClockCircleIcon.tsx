import type { FC, ComponentProps } from "react";

const ClockCircleIcon: FC<ComponentProps<"svg">> = props => {
    return (
        <svg
            viewBox="0 0 48 49"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}>
            <rect y=".321" width="48" height="48" rx="24" fill="currentColor" />
            <path
                d="M21.5 13.071q-.53 0-.89-.36-.36-.359-.36-.89t.36-.891.89-.359h5q.531 0 .891.359.36.36.359.891 0 .531-.359.89-.36.36-.891.36zm2.5 13.75q.531 0 .891-.36.36-.358.359-.89v-5q0-.531-.359-.891a1.2 1.2 0 0 0-.891-.359q-.53 0-.89.359-.36.36-.36.891v5q0 .531.36.89.36.36.89.36m0 10q-2.313 0-4.36-.89a11.5 11.5 0 0 1-3.578-2.422 11.5 11.5 0 0 1-2.422-3.578 10.8 10.8 0 0 1-.89-4.36q0-2.312.89-4.36a11.5 11.5 0 0 1 2.422-3.577 11.5 11.5 0 0 1 3.578-2.421A10.8 10.8 0 0 1 24 14.32q1.938 0 3.719.625a12.2 12.2 0 0 1 3.343 1.813l.907-.907q.343-.343.843-.343a1.2 1.2 0 0 1 .876.375q.343.343.343.875 0 .531-.343.875l-.876.875a12.2 12.2 0 0 1 1.813 3.343 11.2 11.2 0 0 1 .625 3.72q0 2.311-.89 4.36a11.5 11.5 0 0 1-2.422 3.577 11.5 11.5 0 0 1-3.578 2.422q-2.047.89-4.36.89"
                fill="#fff"
            />
        </svg>
    );
};

export default ClockCircleIcon;