import Link from "next/link";
import { useTranslations } from "next-intl";
import { FAQAccordion } from "@royalfut/components";

import type { FC } from "react";

interface IFAQProps {}

const FAQ: FC<IFAQProps> = () => {
    const t = useTranslations("home");

    return (
        <FAQAccordion.Root type="multiple">
            <FAQAccordion.Item value="item-1">
                <FAQAccordion.Trigger>
                    {t("faq.q.1.title")}
                </FAQAccordion.Trigger>
                <FAQAccordion.Content>
                    <div>
                        {t.rich("faq.q.1.content", {
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
                                    href={"/reviews"}
                                    className="text-[#1677ff]">
                                    {chunks}
                                </Link>
                            ),
                        })}
                    </div>
                </FAQAccordion.Content>
            </FAQAccordion.Item>
            <FAQAccordion.Item value="item-2">
                <FAQAccordion.Trigger>
                    {t("faq.q.2.title")}
                </FAQAccordion.Trigger>
                <FAQAccordion.Content>
                    <div className="flex flex-col gap-2">
                        {t.rich("faq.q.2.content", {
                            content: chunks => (
                                <span className="text-white-60 text-base font-medium leading-tight">
                                    {chunks}
                                </span>
                            ),
                        })}
                    </div>
                </FAQAccordion.Content>
            </FAQAccordion.Item>
            <FAQAccordion.Item value="item-3">
                <FAQAccordion.Trigger>
                    {t("faq.q.3.title")}
                </FAQAccordion.Trigger>
                <FAQAccordion.Content>
                    <div>
                        <span className="text-white-60 text-base font-medium leading-tight">
                            {t("faq.q.3.content")}
                        </span>
                    </div>
                </FAQAccordion.Content>
            </FAQAccordion.Item>
        </FAQAccordion.Root>
    );
};

export default FAQ;
