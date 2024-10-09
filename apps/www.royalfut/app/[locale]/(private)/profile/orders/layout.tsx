import { ProfileNavigationTabs } from "@royalfut/components";

import type { FC, PropsWithChildren } from "react";

const OrdersLayout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <>
            <ProfileNavigationTabs page="orders" />
            {children}
        </>
    );
};

export default OrdersLayout;
