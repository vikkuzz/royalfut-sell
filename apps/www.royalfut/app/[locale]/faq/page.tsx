import { getTranslations } from "next-intl/server";
import { ContentWithAsideLayout } from "@royalfut/ui";
import { FAQAccordion } from "@royalfut/components";
import { CoinTransactionPromptCard } from "../../../src";
import AccordionQuestions from "./Accordion";

import type { IBaseNavIdEntity } from "@royalfut/interfaces";

const navs: Array<IBaseNavIdEntity> = [
    {
        id: "payment-methods",
        label: "nav.1",
    },
    {
        id: "general",
        label: "nav.2",
    },
    {
        id: "document",
        label: "nav.3",
    },
];

const Page = async () => {
    const t = await getTranslations("skyler_pages.faq");

    return (
        <ContentWithAsideLayout.Root>
            <ContentWithAsideLayout.Header title={t("h1")} />
            <ContentWithAsideLayout.Body className="flex-col-reverse">
                <ContentWithAsideLayout.Aside>
                    <FAQAccordion.NavigationTabs
                        navs={navs}
                        className="hidden sm:flex"
                    />
                    <CoinTransactionPromptCard />
                </ContentWithAsideLayout.Aside>
                <ContentWithAsideLayout.Content>
                    <AccordionQuestions />
                </ContentWithAsideLayout.Content>
                <FAQAccordion.NavigationTabs
                    navs={navs}
                    className="flex sm:hidden"
                />
            </ContentWithAsideLayout.Body>
        </ContentWithAsideLayout.Root>
    );
};

export default Page;
