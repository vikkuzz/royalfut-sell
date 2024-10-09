import { useTranslations } from "next-intl";
import { Link, Button, SectionTitle } from "@royalfut/ui";
import { FAQAccordion } from "@royalfut/components";
import {
    PROJECT_PUBLIC_WWW_ROUTES,
    AppCredentials,
} from "@royalfut/collections";

export const CTA = () => {
    const t = useTranslations("phoenix_pages");

    return (
        <div className="pt-8 flex w-full justify-center">
            <Button
                asChild
                vtype="bordered-shadow"
                vsize="3xl"
                className="rounded-xl text-xl font-semibold">
                <Link href={PROJECT_PUBLIC_WWW_ROUTES["FAQ"]}>
                    {t("faq.action")}
                </Link>
            </Button>
        </div>
    );
};

export const Title = SectionTitle;

export const QA = () => {
    const t1 = useTranslations("li_home");
    const t2 = useTranslations("jamie_pages");

    return (
        <div className="flex gap-4 flex-col sm:flex-row">
            <FAQAccordion.Root type="multiple">
                <FAQAccordion.Item value="item-1">
                    <FAQAccordion.Trigger>
                        {t2("faq.q.1.title")}
                    </FAQAccordion.Trigger>
                    <FAQAccordion.Content>
                        <div>
                            {t1.rich("faq.q.1.content", {
                                content: chunks => (
                                    <span className="text-white-60 text-base font-medium leading-tight">
                                        {chunks}
                                    </span>
                                ),
                                list: chunks => (
                                    <ul className="leading-tight text-white-60 text-base font-medium list-inside list-disc flex flex-col gap-1.5 mt-2">
                                        {chunks}
                                    </ul>
                                ),
                                listItem: chunks => <li>{chunks}</li>,
                                link: chunks => (
                                    <Link
                                        href={
                                            PROJECT_PUBLIC_WWW_ROUTES["REVIEWS"]
                                        }
                                        className="text-typography-link1">
                                        {chunks}
                                    </Link>
                                ),
                            })}
                        </div>
                    </FAQAccordion.Content>
                </FAQAccordion.Item>
                <FAQAccordion.Item value="item-2">
                    <FAQAccordion.Trigger>
                        {t2("faq.q.2.title")}
                    </FAQAccordion.Trigger>
                    <FAQAccordion.Content>
                        <div className="flex flex-col gap-2">
                            <span className="text-white-60 text-base font-medium leading-tight">
                                {t2("faq.q.2.content.1")}
                            </span>{" "}
                            <span className="text-white-60 text-base font-medium leading-tight">
                                {t2("faq.q.2.content.2", {
                                    fc: `${AppCredentials.game.name.v1} ${AppCredentials.game.release}`,
                                })}
                            </span>{" "}
                            <span className="text-white-60 text-base font-medium leading-tight">
                                {t2("faq.q.2.content.3", {
                                    fc: `${AppCredentials.game.name.v1} ${AppCredentials.game.release}`,
                                })}
                            </span>
                        </div>
                    </FAQAccordion.Content>
                </FAQAccordion.Item>
                <FAQAccordion.Item value="item-3">
                    <FAQAccordion.Trigger>
                        {t2("faq.q.3.title")}
                    </FAQAccordion.Trigger>
                    <FAQAccordion.Content>
                        <div>
                            <span className="text-white-60 text-base font-medium leading-tight">
                                {t2("faq.q.3.content")}
                            </span>
                        </div>
                    </FAQAccordion.Content>
                </FAQAccordion.Item>
            </FAQAccordion.Root>
        </div>
    );
};
