import type { FC, ComponentProps } from "react";

const LockSecuredIcon: FC<ComponentProps<"svg">> = props => {
    return (
        <svg
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}>
            <path
                d="M14 30q-.825 0-1.412-.587A1.93 1.93 0 0 1 12 28V18q0-.825.588-1.412A1.93 1.93 0 0 1 14 16h1v-2q0-2.075 1.463-3.537Q17.925 9 20 9t3.538 1.463T25 14v2h1q.824 0 1.413.588Q28 17.175 28 18v10q0 .824-.587 1.413A1.93 1.93 0 0 1 26 30zm6-5q.824 0 1.413-.587Q22 23.825 22 23c0-.825-.196-1.02-.587-1.412Q20.825 21 20 21c-.825 0-1.02.196-1.412.588Q18 22.175 18 23c0 .825.196 1.02.588 1.413Q19.175 25 20 25m-3-9h6v-2q0-1.25-.875-2.125A2.9 2.9 0 0 0 20 11q-1.25 0-2.125.875A2.9 2.9 0 0 0 17 14z"
                fill="currentColor"
            />
        </svg>
    );
};

export default LockSecuredIcon;
