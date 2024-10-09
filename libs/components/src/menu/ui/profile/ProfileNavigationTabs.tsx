"use client";

import { Link } from "@royalfut/ui";
import { useProjectPrivateGlobalStore } from "@royalfut/store";
import { cn } from "@royalfut/utils";

import type { FC } from "react";

interface IPageNavigationTabsProps {
    page: string;
}

const ProfileNavigationTabs: FC<IPageNavigationTabsProps> = ({ page }) => {
    const links = useProjectPrivateGlobalStore(state => state.profile.nav);

    return (
        <div className="w-full flex">
            {links.map(link => (
                <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                        `w-full flex justify-center opacity-40 text-xl font-semibold pb-3 border-b`,
                        {
                            "opacity-100 border-b-2":
                                page === link.href.split("/").pop(),
                        }
                    )}>
                    {link.label}
                </Link>
            ))}
        </div>
    );
};

export default ProfileNavigationTabs;
