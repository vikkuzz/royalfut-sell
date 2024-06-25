import type { FC, PropsWithChildren } from "react";

const LandingLayout: FC<PropsWithChildren> = ({ children }) => {
    return <div className="pt-[var(--size-layout-header)]">{children}</div>;
};

export default LandingLayout;
