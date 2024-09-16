import { LayoutViewportSectionFrame } from "@royalfut/ui";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getToken, getWallet } from "@royalfut/actions";
import { StickyCardsBox } from "./_components/UI";
import ProfileCard from "./_components/ProfileCard";
import BalanceCard from "./_components/BalanceCard";

import type { FC, PropsWithChildren } from "react";

const ProfileLayout: FC<PropsWithChildren> = async ({ children }) => {
    const isAuthenticated = await getToken();
    const t = await getTranslations("profile");
    const wallet = await getWallet();

    if (!isAuthenticated) {
        redirect("/");
    }

    return (
        <div className="pt-[var(--size-layout-header)]">
            <LayoutViewportSectionFrame className="mt-6 flex flex-col" asChild>
                <main>
                    <h1 className="font-bold text-[3.25rem]">
                        {t("title.account")}
                    </h1>
                    <div className="mt-24 flex flex-col sm:flex-row sm:space-x-4">
                        <div className="relative basis-2/5">
                            <StickyCardsBox>
                                <div className="flex flex-col space-y-4">
                                    <BalanceCard wallet={wallet} />
                                    <ProfileCard />
                                </div>
                            </StickyCardsBox>
                        </div>
                        <div className="basis-3/5 sm: mt-6">{children}</div>
                    </div>
                </main>
            </LayoutViewportSectionFrame>
        </div>
    );
};

export default ProfileLayout;
