import { ContentWithAsideLayout } from "@royalfut/ui";
import { CoinTransactionPromptCard } from "../../../../src";
import { MediaBoxLinksBanner } from "@royalfut/components";
import { getTranslations } from "next-intl/server";

const Page = async () => {
    const t = await getTranslations("phoenix_pages.contacts");

    return (
        <ContentWithAsideLayout.Root>
            <ContentWithAsideLayout.Header title={t("h1")} />
            <ContentWithAsideLayout.Body>
                <ContentWithAsideLayout.Content className="flex flex-col gap-7">
                    <div>
                        <p className="text-white-65 text-base font-medium">
                            Yasha Limited, Office 1002 Nicolaou
                        </p>
                        <p className="text-white-65 text-base font-medium">
                            Pentadromos Center, Limassol, Cyprus, 3025
                        </p>
                    </div>
                    <MediaBoxLinksBanner />
                </ContentWithAsideLayout.Content>
                <ContentWithAsideLayout.Aside>
                    <CoinTransactionPromptCard />
                </ContentWithAsideLayout.Aside>
            </ContentWithAsideLayout.Body>
        </ContentWithAsideLayout.Root>
    );
};

export default Page;
