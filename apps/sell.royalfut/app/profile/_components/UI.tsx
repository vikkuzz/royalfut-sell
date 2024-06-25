import { FNCNChildren } from "@royalfut/interfaces";

export const StickyCardsBox: FNCNChildren = ({ children }) => {
    return (
        <div className="sticky -mt-[var(--size-layout-header)] top-0 h-max w-full pointer-events-none">
            <div className="pt-[var(--size-layout-header)] pointer-events-none">
                <div className="pointer-events-auto">{children}</div>
            </div>
        </div>
    );
};
