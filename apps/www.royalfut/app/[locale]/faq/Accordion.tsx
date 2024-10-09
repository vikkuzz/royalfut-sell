/* eslint-disable max-lines */

import { getTranslations } from "next-intl/server";
import { FAQAccordion } from "@royalfut/components";
import {
    AppCredentials,
    PROJECT_PUBLIC_WWW_ROUTES,
} from "@royalfut/collections";
import { Link } from "@royalfut/ui";

const AccordionQuestions = async () => {
    const [t1, t2, t3] = await Promise.all([
        getTranslations("jamie_pages.faq"),
        getTranslations("alex_pages.faq"),
        getTranslations("drew_pages.faq"),
    ]);

    return (
        <FAQAccordion.Root type="multiple">
            <FAQAccordion.Title id="payment-methods">
                {t1("nav.1")}
            </FAQAccordion.Title>
            <FAQAccordion.Item value="item-1">
                <FAQAccordion.Trigger>
                    {t1("acc.q.1.title")}
                </FAQAccordion.Trigger>
                <FAQAccordion.Content>
                    <div>
                        {t2.rich("acc.q.1.content", {
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
                                    href={PROJECT_PUBLIC_WWW_ROUTES["REVIEWS"]}
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
                    {t1("acc.q.2.title")}
                </FAQAccordion.Trigger>
                <FAQAccordion.Content>
                    <div className="flex flex-col gap-3">
                        {t2.rich("acc.q.2.content", {
                            content: chunks => (
                                <p className="text-white-60 text-base font-medium leading-tight">
                                    {chunks}
                                </p>
                            ),
                            fc: `${AppCredentials.game.name.v1} ${AppCredentials.game.release}`,
                        })}
                    </div>
                </FAQAccordion.Content>
            </FAQAccordion.Item>
            <FAQAccordion.Item value="item-3">
                <FAQAccordion.Trigger>
                    {t1("acc.q.3.title")}
                </FAQAccordion.Trigger>
                <FAQAccordion.Content>
                    <div className="flex flex-col gap-3">
                        {t2.rich("acc.q.3.content", {
                            content: chunks => (
                                <p className="text-white-60 text-base font-medium leading-tight">
                                    {chunks}
                                </p>
                            ),
                        })}
                    </div>
                </FAQAccordion.Content>
            </FAQAccordion.Item>
            <FAQAccordion.Item value="item-4">
                <FAQAccordion.Trigger>
                    {t1("acc.q.4.title")}
                </FAQAccordion.Trigger>
                <FAQAccordion.Content>
                    <div>{t2("acc.q.4.content")}</div>
                </FAQAccordion.Content>
            </FAQAccordion.Item>
            <FAQAccordion.Item value="item-5">
                <FAQAccordion.Trigger>
                    {t1("acc.q.5.title")}
                </FAQAccordion.Trigger>
                <FAQAccordion.Content>
                    <div>{t2("acc.q.5.content")}</div>
                </FAQAccordion.Content>
            </FAQAccordion.Item>

            <FAQAccordion.Title id="general">{t1("nav.2")}</FAQAccordion.Title>

            <FAQAccordion.Item value="item-6">
                <FAQAccordion.Trigger>
                    {t1("acc.q.6.title")}
                </FAQAccordion.Trigger>
                <FAQAccordion.Content>
                    <div>
                        {t2.rich("acc.q.6.content", {
                            list: chunks => (
                                <ul className="leading-tight text-white-60 text-base font-medium list-inside list-disc flex flex-col gap-1.5 mt-2">
                                    {chunks}
                                </ul>
                            ),
                            listItem: chunks => <li>{chunks}</li>,
                        })}
                    </div>
                </FAQAccordion.Content>
            </FAQAccordion.Item>
            <FAQAccordion.Item value="item-7">
                <FAQAccordion.Trigger>
                    {t1("acc.q.7.title")}
                </FAQAccordion.Trigger>
                <FAQAccordion.Content>
                    <div className="flex flex-col gap-3">
                        {t3.rich("acc.q.7.content", {
                            content: chunks => (
                                <p className="text-white-60 text-base font-medium leading-tight">
                                    {chunks}
                                </p>
                            ),
                        })}
                    </div>
                </FAQAccordion.Content>
            </FAQAccordion.Item>
            <FAQAccordion.Item value="item-8">
                <FAQAccordion.Trigger>
                    {t2("acc.q.8.title")}
                </FAQAccordion.Trigger>
                <FAQAccordion.Content>
                    <div>
                        {t3.rich("acc.q.8.content", {
                            content: chunks => (
                                <p className="text-white-60 text-base font-medium leading-tight">
                                    {chunks}
                                </p>
                            ),
                            list: chunks => (
                                <ul className="leading-tight text-white-60 text-base font-medium list-inside list-decimal flex flex-col gap-1.5 mt-2">
                                    {chunks}
                                </ul>
                            ),
                            button: chunks => (
                                <button className="h-16 w-full rounded-xl font-semibold text-xl bg-transparent border border-extra-stereo overflow-hidden hover:bg-linear-primary-stereo hover:shadow-stereo duration-300 cursor-pointer pointer-events-auto">
                                    {chunks}
                                </button>
                            ),
                            listItem: chunks => <li>{chunks}</li>,
                            link: chunks => (
                                <Link
                                    href={PROJECT_PUBLIC_WWW_ROUTES["REVIEWS"]}
                                    className="text-typography-link1">
                                    {chunks}
                                </Link>
                            ),
                        })}
                    </div>
                </FAQAccordion.Content>
            </FAQAccordion.Item>
            <FAQAccordion.Item value="item-9">
                <FAQAccordion.Trigger>
                    {t2("acc.q.9.title")}
                </FAQAccordion.Trigger>
                <FAQAccordion.Content>
                    <div>{t3("acc.q.9.content")}</div>
                </FAQAccordion.Content>
            </FAQAccordion.Item>
            <FAQAccordion.Item value="item-10">
                <FAQAccordion.Trigger>
                    {t2("acc.q.10.title")}
                </FAQAccordion.Trigger>
                <FAQAccordion.Content>
                    <div>
                        {t3.rich("acc.q.10.content", {
                            content: chunks => (
                                <span className="text-white-60 text-base font-medium leading-tight">
                                    {chunks}
                                </span>
                            ),
                            link: chunks => (
                                <Link
                                    href={PROJECT_PUBLIC_WWW_ROUTES["PRIVACY"]}
                                    className="text-typography-link1">
                                    {chunks}
                                </Link>
                            ),
                        })}
                    </div>
                </FAQAccordion.Content>
            </FAQAccordion.Item>
            <FAQAccordion.Item value="item-11">
                <FAQAccordion.Trigger>
                    {t2("acc.q.11.title")}
                </FAQAccordion.Trigger>
                <FAQAccordion.Content>
                    <div>
                        {t3.rich("acc.q.11.content", {
                            list: chunks => (
                                <ul className="leading-tight text-white-60 text-base font-medium list-inside list-decimal flex flex-col gap-1.5 mt-2">
                                    {chunks}
                                </ul>
                            ),
                            listItem: chunks => <li>{chunks}</li>,
                        })}
                    </div>
                </FAQAccordion.Content>
            </FAQAccordion.Item>
            <FAQAccordion.Item value="item-12">
                <FAQAccordion.Trigger>
                    {t2("acc.q.12.title")}
                </FAQAccordion.Trigger>
                <FAQAccordion.Content>
                    <div>
                        {t3.rich("acc.q.12.content", {
                            list: chunks => (
                                <ul className="leading-tight text-white-60 text-base font-medium list-inside list-decimal flex flex-col gap-1.5 mt-2">
                                    {chunks}
                                </ul>
                            ),
                            listItem: chunks => <li>{chunks}</li>,
                        })}
                    </div>
                </FAQAccordion.Content>
            </FAQAccordion.Item>
            <FAQAccordion.Item value="item-13">
                <FAQAccordion.Trigger>
                    {t2("acc.q.13.title")}
                </FAQAccordion.Trigger>
                <FAQAccordion.Content>
                    <div>
                        {t3.rich("acc.q.13.content", {
                            list: chunks => (
                                <ul className="leading-tight text-white-60 text-base font-medium list-inside list-decimal flex flex-col gap-1.5 mt-2">
                                    {chunks}
                                </ul>
                            ),
                            listItem: chunks => <li>{chunks}</li>,
                        })}
                    </div>
                </FAQAccordion.Content>
            </FAQAccordion.Item>
            <FAQAccordion.Item value="item-14">
                <FAQAccordion.Trigger>
                    {t2("acc.q.14.title")}
                </FAQAccordion.Trigger>
                <FAQAccordion.Content>
                    <div>
                        {t3.rich("acc.q.14.content", {
                            content: chunks => (
                                <span className="text-white-60 text-base font-medium leading-tight">
                                    {chunks}
                                </span>
                            ),
                            link: chunks => (
                                <Link
                                    href={PROJECT_PUBLIC_WWW_ROUTES["PRIVACY"]}
                                    className="text-typography-link1">
                                    {chunks}
                                </Link>
                            ),
                        })}
                    </div>
                </FAQAccordion.Content>
            </FAQAccordion.Item>

            <FAQAccordion.Title id="document">{t1("nav.3")}</FAQAccordion.Title>
            <FAQAccordion.Item value="item-15">
                <FAQAccordion.Trigger>
                    {t2("acc.q.15.title")}
                </FAQAccordion.Trigger>
                <FAQAccordion.Content>
                    <div>
                        <span className="text-white-60 text-base font-medium leading-tight">
                            {t3("acc.q.15.content")}
                        </span>
                    </div>
                </FAQAccordion.Content>
            </FAQAccordion.Item>
            <FAQAccordion.Item value="item-16">
                <FAQAccordion.Trigger>
                    {t2("acc.q.16.title")}
                </FAQAccordion.Trigger>
                <FAQAccordion.Content>
                    <div>
                        {t3.rich("acc.q.16.content", {
                            content: chunks => (
                                <span className="text-white-60 text-base font-medium leading-tight">
                                    {chunks}
                                </span>
                            ),
                            list: chunks => (
                                <ul className="leading-tight text-white-60 text-base font-medium list-inside list-decimal flex flex-col gap-1.5 mt-2">
                                    {chunks}
                                </ul>
                            ),
                            listItem: chunks => <li>{chunks}</li>,
                        })}
                    </div>
                </FAQAccordion.Content>
            </FAQAccordion.Item>
            <FAQAccordion.Item value="item-17">
                <FAQAccordion.Trigger>
                    {t2("acc.q.17.title")}
                </FAQAccordion.Trigger>
                <FAQAccordion.Content>
                    <div>
                        <span className="text-white-60 text-base font-medium leading-tight">
                            {t3("acc.q.17.content")}
                        </span>
                    </div>
                </FAQAccordion.Content>
            </FAQAccordion.Item>
            <FAQAccordion.Item value="item-18">
                <FAQAccordion.Trigger>
                    {t2("acc.q.18.title")}
                </FAQAccordion.Trigger>
                <FAQAccordion.Content>
                    <div>
                        <span className="text-white-60 text-base font-medium leading-tight">
                            {t3("acc.q.18.content")}
                        </span>
                    </div>
                </FAQAccordion.Content>
            </FAQAccordion.Item>
        </FAQAccordion.Root>
    );
};

export default AccordionQuestions;
