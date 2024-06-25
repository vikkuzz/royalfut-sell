import type { FC, ComponentProps } from "react";

const BTCIcon: FC<ComponentProps<"svg">> = props => {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}>
            <path
                d="M21.7007 14.4205C20.3649 19.7783 14.9384 23.039 9.58002 21.7029C4.22382 20.3672 0.96316 14.9404 2.29955 9.58288C3.63469 4.22449 9.06122 0.963511 14.418 2.29928C19.7761 3.63505 23.0365 9.06251 21.7007 14.4205Z"
                fill="#F7931A"
            />
            <path
                d="M16.4093 10.5764C16.6083 9.24557 15.5951 8.53019 14.2096 8.05295L14.6591 6.25025L13.5618 5.97679L13.1242 7.73198C12.8358 7.6601 12.5395 7.59227 12.245 7.52508L12.6857 5.75833L11.589 5.48486L11.1393 7.28693C10.9005 7.23254 10.6661 7.17879 10.4386 7.12222L10.4398 7.1166L8.92656 6.73874L8.63465 7.91075C8.63465 7.91075 9.4488 8.09733 9.43161 8.10889C9.87604 8.21985 9.95636 8.51394 9.94291 8.74708L9.43099 10.8007C9.46161 10.8086 9.5013 10.8198 9.54506 10.8373C9.5085 10.8282 9.46942 10.8182 9.42911 10.8086L8.71153 13.6854C8.65715 13.8204 8.51933 14.023 8.20867 13.9461C8.21961 13.962 7.41108 13.747 7.41108 13.747L6.86633 15.0031L8.2943 15.359C8.55996 15.4256 8.8203 15.4953 9.07658 15.561L8.62247 17.3843L9.71852 17.6577L10.1683 15.8538C10.4677 15.935 10.7584 16.01 11.0427 16.0807L10.5946 17.8762L11.6919 18.1497L12.1459 16.3298C14.0171 16.6839 15.4242 16.5411 16.0164 14.8487C16.4936 13.4861 15.9926 12.7 15.0082 12.1875C15.7251 12.0221 16.2652 11.5505 16.4093 10.5764ZM13.9021 14.092C13.563 15.4547 11.2687 14.718 10.5248 14.5333L11.1274 12.1177C11.8712 12.3034 14.2565 12.671 13.9021 14.092ZM14.2415 10.5566C13.9321 11.7962 12.0225 11.1664 11.4031 11.012L11.9494 8.82116C12.5688 8.97555 14.5637 9.2637 14.2415 10.5566Z"
                fill="white"
            />
        </svg>
    );
};

export default BTCIcon;