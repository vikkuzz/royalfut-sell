import type { FC, ComponentProps } from "react";

const MenuBurgerIcon: FC<ComponentProps<"svg">> = props => {
    return (
        <svg
            viewBox="0 0 27 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}>
            <g fill="currentColor">
                <rect
                    width="27"
                    height="3"
                    rx="1.5"
                    transform="matrix(-1 0 0 1 27 8)"
                />
                <rect
                    width="27"
                    height="3"
                    rx="1.5"
                    transform="matrix(-1 0 0 1 27 0)"
                />
                <rect
                    width="18"
                    height="3"
                    rx="1.5"
                    transform="matrix(-1 0 0 1 18 16)"
                />
            </g>
        </svg>
    );
};

export default MenuBurgerIcon;
