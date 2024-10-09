import { ProfileNavigationTabs } from "@royalfut/components";

import type { FC, PropsWithChildren } from "react";

const PointsLayout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <>
            <ProfileNavigationTabs page="points" />
            {children}
        </>
    );
};

export default PointsLayout;
