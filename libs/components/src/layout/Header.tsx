import Link from "next/link";
import { RoyalfutLogoTextIcon } from "@royalfut/icons";
import { CurrencyPickerHover } from "../ccy";
import { LayoutViewportSectionFrame } from "@royalfut/ui";
import NavigationLinks from "./Nav";
import { cn } from "@royalfut/utils";
import { PUBLIC_ROUTES } from "@royalfut/collections";

import type { FNCNChildren } from "@royalfut/interfaces";

const Header: FNCNChildren = async ({ className, children }) => {
    return (
        <>
            <div className="w-full h-layoutHeader fixed top-0 bg-header-linear z-header pointer-events-none">
                {/* To prevent pointer events in top of header */}
                <div className="w-full h-1/2 pointer-events-auto" />
            </div>
            <LayoutViewportSectionFrame asChild>
                <header
                    className={cn(
                        "fixed top-0 h-layoutHeader bg-transparent z-header items-center flex justify-between x-pos-center pointer-events-none",
                        className
                    )}>
                    <div className="flex items-center space-x-10 pointer-events-auto">
                        <Link href={PUBLIC_ROUTES.HOME} className="text-white">
                            <RoyalfutLogoTextIcon className="w-[8.875rem]" />
                        </Link>
                        <div className="space-x-16 items-center h-6 hidden sm:flex">
                            <CurrencyPickerHover className="space-x-3" />
                            <NavigationLinks />
                        </div>
                    </div>
                    <div className="w-max flex items-center space-x-11 pointer-events-auto">
                        {children}
                    </div>
                </header>
            </LayoutViewportSectionFrame>
        </>
    );
};

export default Header;
