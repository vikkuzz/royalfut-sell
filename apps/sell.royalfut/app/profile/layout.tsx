import { ContentWithAsideLayout } from "@royalfut/ui";
import { i18nRedirect } from "@royalfut/hooks";
import { getTranslations } from "next-intl/server";
import { getToken, getWallet, localizeGlobalState } from "@royalfut/actions";
import {
    PROJECT_PUBLIC_ROUTES,
    SellPrivateGlobalData,
} from "@royalfut/collections";
import { ProjectPrivateGlobalStoreProvider } from "@royalfut/store";
import { UserIdentityCard } from "@royalfut/components";
import BalanceCard from "./_components/BalanceCard";

import type { FC, PropsWithChildren } from "react";

const ProfileLayout: FC<PropsWithChildren> = async ({ children }) => {
    const isAuthenticated = await getToken();

    if (!isAuthenticated) {
        i18nRedirect(PROJECT_PUBLIC_ROUTES["UNAUTHORIZED_REDIRECT"]);
    }

    const [t, wallet, globalSettings] = await Promise.all([
        getTranslations("profile"),
        getWallet(),
        localizeGlobalState(SellPrivateGlobalData),
    ]);

    return (
        <ProjectPrivateGlobalStoreProvider initial={globalSettings}>
            <main className="pt-[var(--size-layout-header)]">
                <ContentWithAsideLayout.Root size="60-40">
                    <ContentWithAsideLayout.Header title={t("title.account")} />
                    <ContentWithAsideLayout.Body>
                        <ContentWithAsideLayout.Aside className="gap-4">
                            <BalanceCard wallet={wallet} />
                            <UserIdentityCard />
                        </ContentWithAsideLayout.Aside>
                        <ContentWithAsideLayout.Content>
                            {children}
                        </ContentWithAsideLayout.Content>
                    </ContentWithAsideLayout.Body>
                </ContentWithAsideLayout.Root>
            </main>
        </ProjectPrivateGlobalStoreProvider>
    );
};

export default ProfileLayout;
