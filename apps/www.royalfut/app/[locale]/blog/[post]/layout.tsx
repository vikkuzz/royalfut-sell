import { Metadata } from "next";
import type { FC, PropsWithChildren } from "react";

export const metadata: Metadata = {
    title: "FC 25 Guides, Ultimate Team Solutions and Expert Tips | ROYALFUT Blog",
    description:
        "Read news and tutorials about EA FC 25 on ROYALFUT. All of them are written by FC 25 pro players. Learn how to raise your skill in UT. Full, thorough and up-to-date FIFA 25 guides.",
};

const LandingLayout: FC<PropsWithChildren> = ({ children }) => {
    return <>{children}</>;
};

export default LandingLayout;
