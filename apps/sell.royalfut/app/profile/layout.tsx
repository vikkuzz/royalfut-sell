import { LayoutViewportSectionFrame } from "@royalfut/ui";
import { redirect } from "next/navigation";
import { getToken } from "@royalfut/actions";
import { StickyCardsBox } from "./_components/UI";
import ProfileCard from "./_components/ProfileCard";
import BalanceCard from "./_components/BalanceCard";

import type { FC, PropsWithChildren } from "react";

const ProfileLayout: FC<PropsWithChildren> = async ({ children }) => {
    const isAuthenticated = await getToken();

    if (!isAuthenticated) {
        redirect("/");
    }

    return (
        <div className="pt-[var(--size-layout-header)]">
            <LayoutViewportSectionFrame className="mt-6 flex flex-col" asChild>
                <main>
                    <h1 className="font-bold text-[3.25rem]">Your Account</h1>
                    <div className="mt-24 flex flex-col sm:flex-row sm:space-x-4">
                        <div className="relative basis-2/5">
                            <StickyCardsBox>
                                <div className="flex flex-col space-y-4">
                                    <BalanceCard />
                                    <ProfileCard />
                                </div>
                            </StickyCardsBox>
                        </div>
                        <div className="basis-3/5">{children}</div>
                    </div>
                </main>
            </LayoutViewportSectionFrame>
        </div>
    );
};

export default ProfileLayout;
