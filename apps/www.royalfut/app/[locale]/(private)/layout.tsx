import { i18nRedirect } from "@royalfut/hooks";
import { getToken, localizeGlobalState } from "@royalfut/actions";
import { UserIdentityCard } from "@royalfut/components";
import { ContentWithAsideLayout } from "@royalfut/ui";
import {
    PROJECT_PUBLIC_ROUTES,
    WWWPrivateGlobalData,
} from "@royalfut/collections";
import { ProjectPrivateGlobalStoreProvider } from "@royalfut/store";

import type { FC, PropsWithChildren } from "react";

const PrivateLayout: FC<PropsWithChildren> = async ({ children }) => {
    const isAuthenticated = await getToken();

    if (!isAuthenticated) {
        i18nRedirect(PROJECT_PUBLIC_ROUTES["UNAUTHORIZED_REDIRECT"]);
    }

    const globalSettings = await localizeGlobalState(WWWPrivateGlobalData);

    return (
        <ProjectPrivateGlobalStoreProvider initial={globalSettings}>
            <ContentWithAsideLayout.Root size="60-40">
                <ContentWithAsideLayout.Header title="Your profile" />
                <ContentWithAsideLayout.Body className="sm:flex-col md:flex-row">
                    <ContentWithAsideLayout.Aside>
                        <UserIdentityCard />
                    </ContentWithAsideLayout.Aside>
                    <ContentWithAsideLayout.Content>
                        <div className="flex flex-col gap-8">{children}</div>
                    </ContentWithAsideLayout.Content>
                </ContentWithAsideLayout.Body>
            </ContentWithAsideLayout.Root>
        </ProjectPrivateGlobalStoreProvider>
    );
};

export default PrivateLayout;
