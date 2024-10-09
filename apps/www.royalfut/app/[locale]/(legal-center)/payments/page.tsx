import { ContentWithAsideLayout, Prose } from "@royalfut/ui";
import { CoinTransactionPromptCard } from "../../../../src";
import { getTranslations } from "next-intl/server";

const Page = async () => {
    const t = await getTranslations("jordan_pages.payments");

    return (
        <ContentWithAsideLayout.Root>
            <ContentWithAsideLayout.Header title={t("h1")} />
            <ContentWithAsideLayout.Body>
                <ContentWithAsideLayout.Content className="prose">
                    <Prose.Paragraph>{t("p.1")}</Prose.Paragraph>
                    <Prose.Paragraph>{t("p.2")}</Prose.Paragraph>
                    <Prose.Paragraph>{t("p.3")}</Prose.Paragraph>
                </ContentWithAsideLayout.Content>
                <ContentWithAsideLayout.Aside>
                    <CoinTransactionPromptCard />
                </ContentWithAsideLayout.Aside>
            </ContentWithAsideLayout.Body>
        </ContentWithAsideLayout.Root>
    );
};

export default Page;
