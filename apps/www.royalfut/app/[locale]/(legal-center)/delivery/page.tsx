import { ContentWithAsideLayout, Prose } from "@royalfut/ui";
import { CoinTransactionPromptCard } from "../../../../src";
import { SOCIAL_CREDENTIALS } from "@royalfut/collections";
import StatsCard from "./StatsCard";
import { ComponentPropsWithoutRef } from "react";
import { getTranslations } from "next-intl/server";

const statsData = [
    {
        parts: ["Our experience is", "years in this field"],
        primary: "7+",
    },
    {
        parts: ["We transferred to our customers", "FIFA & EA FC Coins"],
        primary: "100B+",
    },
    {
        parts: ["We delivered", "orders to our customers"],
        primary: "100K+",
    },
    {
        parts: ["Our service has been used by", "FIFA and EA FC players"],
        primary: "30k",
    },
    {
        parts: ["Less than", "80% of orders are delivered"],
        primary: "20 min",
    },
    {
        parts: ["According to polls we have", "satisfied costumers"],
        primary: "97%",
    },
];

const Page = async () => {
    const t = await getTranslations("jordan_pages.delivery");

    return (
        <ContentWithAsideLayout.Root>
            <ContentWithAsideLayout.Header title={t("h1")} />
            <ContentWithAsideLayout.Body>
                <ContentWithAsideLayout.Content className="prose">
                    <Prose.Paragraph>{t("p.1")}</Prose.Paragraph>
                    <Prose.Paragraph>
                        {t("p.p2_fragments.1")}{" "}
                        <Prose.Anchor
                            target="_blank"
                            href={SOCIAL_CREDENTIALS.skype.contact}>
                            Skype
                        </Prose.Anchor>{" "}
                        {t("p.p2_fragments.2")}{" "}
                        <Prose.Anchor
                            target="_blank"
                            href={SOCIAL_CREDENTIALS.telegram.contact}>
                            Telegram
                        </Prose.Anchor>{" "}
                        {t("p.p2_fragments.3")}
                    </Prose.Paragraph>
                    <Prose id="delivery-stats" className="text-4xl mb-6">
                        {t("h2.1")}
                    </Prose>
                    <div className="flex flex-wrap gap-4 w-full">
                        {statsData.map((stat, idx) => {
                            return (
                                <StatsCard
                                    className="basis-[calc(50%-1rem)] sm:basis-[calc(33.333%-1rem)]"
                                    theme={
                                        (idx + 1) as ComponentPropsWithoutRef<
                                            typeof StatsCard
                                        >["theme"]
                                    }
                                    key={idx}
                                    content={
                                        {
                                            sec: stat.parts,
                                            primary: stat.primary,
                                        } as ComponentPropsWithoutRef<
                                            typeof StatsCard
                                        >["content"]
                                    }
                                />
                            );
                        })}
                    </div>
                    <Prose.Paragraph>{t("notice")}</Prose.Paragraph>
                </ContentWithAsideLayout.Content>
                <ContentWithAsideLayout.Aside>
                    <CoinTransactionPromptCard />
                </ContentWithAsideLayout.Aside>
            </ContentWithAsideLayout.Body>
        </ContentWithAsideLayout.Root>
    );
};

export default Page;
