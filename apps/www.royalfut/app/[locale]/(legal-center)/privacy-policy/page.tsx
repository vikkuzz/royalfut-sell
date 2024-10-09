import { getTranslations } from "next-intl/server";
import { ContentWithAsideLayout, Prose } from "@royalfut/ui";
import { CoinTransactionPromptCard } from "../../../../src";
import { HOST_URL, SOCIAL_CREDENTIALS } from "@royalfut/collections";

const Page = async () => {
    const [t1, t2, t3] = await Promise.all([
        getTranslations("jules_pages.privacy"),
        getTranslations("dakota_pages.privacy"),
        getTranslations("quinn_pages.privacy"),
    ]);

    return (
        <ContentWithAsideLayout.Root>
            <ContentWithAsideLayout.Header title={t1("h1")} />
            <ContentWithAsideLayout.Body>
                <ContentWithAsideLayout.Content className="prose">
                    <Prose.Paragraph>{t1("p.1")}</Prose.Paragraph>
                    <Prose.List numerical>
                        <Prose.ListItem>
                            {t1("list.1.p")}
                            <Prose.List>
                                <Prose.ListItem>
                                    {t1("list.1.item.1")}
                                </Prose.ListItem>
                                <Prose.ListItem>
                                    {t1("list.1.item.2")}
                                </Prose.ListItem>
                                <Prose.ListItem>
                                    {t1("list.1.item.3")}
                                </Prose.ListItem>
                                <Prose.ListItem>
                                    {t1("list.1.item.4")}
                                </Prose.ListItem>
                                <Prose.ListItem>
                                    {t1("list.1.item.5")}
                                </Prose.ListItem>
                                <Prose.ListItem>
                                    {t1("list.1.item.6")}
                                </Prose.ListItem>
                                <Prose.ListItem>
                                    {t1("list.1.item.7")}
                                    <Prose.Paragraph>
                                        {t1("list.1.item.7_0")}
                                    </Prose.Paragraph>
                                    <Prose.Paragraph>
                                        {t1("list.1.item.7_1")}
                                    </Prose.Paragraph>
                                    <Prose.Paragraph>
                                        {t1("list.1.item.7_2")}
                                    </Prose.Paragraph>
                                </Prose.ListItem>
                                <Prose.ListItem>
                                    {t1("list.1.item.8")}
                                </Prose.ListItem>
                            </Prose.List>
                        </Prose.ListItem>
                        <Prose.ListItem>
                            {t2("list.2.p.1")}
                            <Prose.Paragraph>
                                {t2("list.2.p.2")}
                            </Prose.Paragraph>
                            <Prose.List>
                                <Prose.ListItem>
                                    {t2("list.2.item.1")}
                                </Prose.ListItem>
                                <Prose.ListItem>
                                    {t2("list.2.item.2")}
                                </Prose.ListItem>
                                <Prose.ListItem>
                                    {t2("list.2.item.3")}
                                </Prose.ListItem>
                                <Prose.ListItem>
                                    {t2("list.2.item.4")}
                                </Prose.ListItem>
                                <Prose.ListItem>
                                    {t2("list.2.item.5")}
                                </Prose.ListItem>
                                <Prose.ListItem>
                                    {t2("list.2.item.6")}
                                </Prose.ListItem>
                                <Prose.ListItem>
                                    {t2("list.2.item.7")}
                                </Prose.ListItem>
                                <Prose.ListItem>
                                    {t2("list.2.item.8")}
                                </Prose.ListItem>
                                <Prose.ListItem>
                                    {t2("list.2.item.9")}
                                </Prose.ListItem>
                                <Prose.ListItem>
                                    {t2("list.2.item.10")}
                                </Prose.ListItem>
                                <Prose.ListItem>
                                    {t2("list.2.item.11")}
                                </Prose.ListItem>
                                <Prose.ListItem>
                                    {t2("list.2.item.12")}
                                </Prose.ListItem>
                                <Prose.ListItem>
                                    {t2("list.2.item.13")}
                                </Prose.ListItem>
                                <Prose.ListItem>
                                    {t2("list.2.item.14")}
                                </Prose.ListItem>
                                <Prose.ListItem>
                                    {t2("list.2.item.15")}
                                </Prose.ListItem>
                                <Prose.ListItem>
                                    {t3("list.2.item.16")}
                                </Prose.ListItem>
                            </Prose.List>
                        </Prose.ListItem>
                    </Prose.List>
                    <Prose.Paragraph>{t3("p.2")}</Prose.Paragraph>
                    <Prose.Paragraph className="mb-0">
                        {t3("p.3")}{" "}
                        <Prose.Anchor href={HOST_URL} target="_blank">
                            https://royalfut.com
                        </Prose.Anchor>
                    </Prose.Paragraph>
                    <Prose.Paragraph className="mt-0">
                        {t3("p.4")}{" "}
                        <Prose.MailTo to={SOCIAL_CREDENTIALS.mail.support} />
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
