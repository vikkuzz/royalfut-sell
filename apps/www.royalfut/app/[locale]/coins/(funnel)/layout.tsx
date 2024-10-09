import { LayoutViewportSectionFrame } from "@royalfut/ui";

import type { FC, PropsWithChildren } from "react";

const Layout: FC<PropsWithChildren> = ({ children }) => {
    return <LayoutViewportSectionFrame>{children}</LayoutViewportSectionFrame>;
};

export default Layout;
