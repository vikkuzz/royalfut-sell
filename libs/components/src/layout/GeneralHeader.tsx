import { LayoutViewportSectionFrame, Link } from "@royalfut/ui";
import { LocalePicker } from "./ui.client";
import { HeaderNavigationLinks } from "./Nav";
import { MenuDrawerRoot } from "../menu";
import { RoyalfutLogoTextIcon } from "@royalfut/icons";
import { PROJECT_PUBLIC_ROUTES } from "@royalfut/collections";
import { cn } from "@royalfut/utils";

import type { FNCNChildren } from "@royalfut/interfaces";
import { getLocale } from "next-intl/server";

interface IGeneralHeaderProps {}

const GeneralHeader: FNCNChildren<IGeneralHeaderProps> = async ({
    className,
    children,
}) => {
    const locale = await getLocale();
    const dir = locale !== "ar" ? "ltr" : "rtl";
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
                    )}
                    dir={dir}>
                    <div
                        className={cn(
                            "flex no-print items-center space-x-10 pointer-events-auto",
                            {
                                "space-x-reverse": dir === "rtl",
                            }
                        )}
                        dir={dir}>
                        <Link
                            aria-label="Go To Home"
                            href={PROJECT_PUBLIC_ROUTES.HOME}
                            className="text-white">
                            <RoyalfutLogoTextIcon className="w-[8.875rem]" />
                        </Link>
                        <div
                            className={cn(
                                "space-x-16 items-center h-6 hidden sm:flex",
                                {
                                    "space-x-reverse": dir === "rtl",
                                }
                            )}
                            dir={dir}>
                            <LocalePicker />
                            <HeaderNavigationLinks />
                        </div>
                    </div>
                    <div className="w-max flex items-center space-x-11 pointer-events-auto">
                        {children}
                        <MenuDrawerRoot />
                    </div>
                </header>
            </LayoutViewportSectionFrame>
        </>
    );
};

export default GeneralHeader;
