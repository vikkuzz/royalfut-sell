import { ContentWithAsideLayout, Prose } from "@royalfut/ui";
import { CoinTransactionPromptCard } from "../../../../src";
import { SOCIAL_CREDENTIALS } from "@royalfut/collections";
import { getTranslations } from "next-intl/server";

const Page = async () => {
    const [t1, t2, t3] = await Promise.all([
        getTranslations("jordan_pages.cookie"),
        getTranslations("kendall_pages.cookie"),
        getTranslations("jules_pages.cookie"),
    ]);

    return (
        <ContentWithAsideLayout.Root>
            <ContentWithAsideLayout.Header title={t1("h1")} />
            <ContentWithAsideLayout.Body>
                <ContentWithAsideLayout.Content className="prose">
                    <Prose.Paragraph>{t1("p.1")}</Prose.Paragraph>
                    <Prose id="about-cookies">{t1("h2.1")}</Prose>
                    <Prose.Paragraph>{t1("p.2")}</Prose.Paragraph>
                    <Prose id="type-of-cookies">{t1("h2.2")}</Prose>
                    <Prose.SubProse id="necessary-cookies">
                        {t1("h3.1")}
                    </Prose.SubProse>
                    <Prose.Paragraph>{t2("p.3")}</Prose.Paragraph>
                    <Prose.SubProse id="functionality-cookies">
                        {t2("h3.2")}
                    </Prose.SubProse>
                    <Prose.Paragraph>{t2("p.4")}</Prose.Paragraph>
                    <Prose.SubProse id="analytical-cookies">
                        {t2("h3.3")}
                    </Prose.SubProse>
                    <Prose.Paragraph>{t2("p.5")}</Prose.Paragraph>
                    <Prose.SubProse id="third-party-cookies">
                        {t2("h3.4")}
                    </Prose.SubProse>
                    <Prose.Paragraph>{t2("p.6")}</Prose.Paragraph>
                    <Prose.Paragraph>{t2("p.7")}</Prose.Paragraph>
                    <Prose.List numerical>
                        <Prose.ListItem>{t2("list.1.item.1")}</Prose.ListItem>
                        <Prose.ListItem>{t2("list.1.item.2")}</Prose.ListItem>
                        <Prose.ListItem>{t2("list.1.item.3")}</Prose.ListItem>
                    </Prose.List>
                    <Prose.Paragraph>{t2("p.8")}</Prose.Paragraph>
                    <Prose.Anchor
                        href="https://tools.google.com/dlpage/gaoptout?hl=en"
                        target="_blank">
                        https://tools.google.com/dlpage/gaoptout?hl=en
                    </Prose.Anchor>
                    <Prose id="blocking-cookies">{t2("h2.3")}</Prose>
                    <Prose.Paragraph>{t2("p.9")}</Prose.Paragraph>
                    <Prose.Paragraph>{t2("p.10")}</Prose.Paragraph>
                    <Prose id="how-to-delete-cookies">{t2("h2.4")}</Prose>
                    <Prose.Paragraph>
                        {t2("p.11.1")}{" "}
                        <Prose.Anchor
                            href="https://www.internetcookies.com/"
                            target="_blank">
                            www.internetcookies.com
                        </Prose.Anchor>
                        {t3("p.11.2")}
                    </Prose.Paragraph>
                    <Prose id="contacting-us">{t3("h3.5")}</Prose>
                    <Prose.Paragraph>
                        {t3("p.12")}{" "}
                        <Prose.MailTo to={SOCIAL_CREDENTIALS.mail.support} />.
                    </Prose.Paragraph>
                </ContentWithAsideLayout.Content>
                <ContentWithAsideLayout.Aside>
                    <CoinTransactionPromptCard />
                </ContentWithAsideLayout.Aside>
            </ContentWithAsideLayout.Body>
        </ContentWithAsideLayout.Root>
    );
};

export default Page;
