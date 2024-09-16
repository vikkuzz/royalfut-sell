// prettier-ignore
import type { FC, ComponentProps } from "react";

const SearchIcon: FC<ComponentProps<"svg">> = props => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            {...props}>
            <path
                d="M19.768 22L14.2496 16.4853C12.6165 17.5627 10.6417 17.9957 8.7077 17.7005C6.77366 17.4053 5.01796 16.4029 3.7806 14.8875C2.54324 13.372 1.91226 11.4513 2.00984 9.4973C2.10742 7.54329 2.92663 5.69501 4.30882 4.31038C5.6932 2.92767 7.54147 2.10793 9.49564 2.00992C11.4498 1.91192 13.3708 2.54263 14.8866 3.7799C16.4024 5.01717 17.405 6.77294 17.7004 8.70715C17.9958 10.6414 17.5628 12.6164 16.4854 14.2496L22.0006 19.7674L19.768 22ZM9.89424 5.15761C8.6376 5.15678 7.43209 5.65518 6.54291 6.54318C5.65374 7.43117 5.15374 8.63602 5.15291 9.89267C5.15208 11.1493 5.65048 12.3548 6.53848 13.244C7.42647 14.1332 8.63132 14.6332 9.88797 14.634C10.5102 14.6344 11.1264 14.5123 11.7014 14.2745C12.2765 14.0368 12.799 13.6881 13.2393 13.2484C13.6796 12.8087 14.0289 12.2866 14.2674 11.7119C14.5059 11.1372 14.6289 10.5212 14.6293 9.89894C14.6297 9.27671 14.5076 8.6605 14.2698 8.08547C14.0321 7.51045 13.6834 6.98789 13.2437 6.54761C12.804 6.10734 12.2819 5.75798 11.7072 5.51948C11.1325 5.28099 10.5165 5.15802 9.89424 5.15761Z"
                fill="white"
            />
        </svg>
    );
};

export default SearchIcon;