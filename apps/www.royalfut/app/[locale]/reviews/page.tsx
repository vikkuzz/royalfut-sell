import { getTranslations } from "next-intl/server";
import { ContentWithAsideLayout, Pagination } from "@royalfut/ui";
import { getTrustpilotReviews } from "@royalfut/actions";
import { TrustpilotRateCard } from "@royalfut/components";
import { CoinTransactionPromptCard } from "../../../src";
import {
    PROJECT_PUBLIC_WWW_ROUTES,
    AppCredentials,
} from "@royalfut/collections";
import { ReviewCard } from "@royalfut/ui";

import type { FC } from "react";

const Page: FC<{
    searchParams?: { [key: string]: string | Array<string> | undefined };
}> = async ({ searchParams }) => {
    const currentPage = +(searchParams?.p || 1) || 1;
    const [t, reviews] = await Promise.all([
        getTranslations("skyler_pages.reviews"),
        getTrustpilotReviews(),
    ]);

    return (
        <ContentWithAsideLayout.Root>
            <ContentWithAsideLayout.Header title={t("h1")} />
            <ContentWithAsideLayout.Body>
                <ContentWithAsideLayout.Content className="flex flex-col gap-9">
                    <div>
                        <p className="text-white-65 text-base font-medium">
                            {t("p1", {
                                fifa: `${AppCredentials.game.name.v2} ${AppCredentials.game.release}`,
                            })}
                        </p>
                    </div>
                    <TrustpilotRateCard className="flex sm:hidden" />
                    <div className="flex flex-wrap w-full gap-4 sm:justify-between">
                        {reviews.map(review => (
                            <ReviewCard
                                key={review.id}
                                review={review}
                                className="w-full basis-full border-none sm:basis-[calc(50%-theme(spacing.2))] max-w-none"
                            />
                        ))}
                    </div>
                    <Pagination
                        currentPage={currentPage}
                        visiblePagesLimit={3}
                        records={{
                            strategy: "jump",
                            totalItems: 400,
                            itemsPerPage: 10,
                        }}
                        navigation={{
                            baseUrl: PROJECT_PUBLIC_WWW_ROUTES["REVIEWS"],
                            navigationMethod: "link",
                            linkType: "params",
                            searchParamKey: "p",
                        }}
                    />
                </ContentWithAsideLayout.Content>
                <ContentWithAsideLayout.Aside>
                    <TrustpilotRateCard className="hidden sm:flex" />
                    <CoinTransactionPromptCard />
                </ContentWithAsideLayout.Aside>
            </ContentWithAsideLayout.Body>
        </ContentWithAsideLayout.Root>
    );
};

export default Page;
