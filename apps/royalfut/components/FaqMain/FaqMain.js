import React from "react";
import { Collapse } from "antd";
import styles from "./FaqMain.module.scss";
import Link from "next/link";
const { Panel } = Collapse;

import TransparentBtn from "../TransparentBtn/TransparentBtn";
import { useTranslations } from "next-intl";

const FaqMain = () => {
    const t = useTranslations("faq");

    const WhyRoyalfut = () => {
        return (
            <div className={`${styles.faq_blocktext} ${styles.content_text}`}>
                <p>
                    <ul className={`${styles.custom_ul}`}>
                        {/* <Trans>a31</Trans> */}
                        {t("a31")}
                        <li className={`${styles.custom_li}`}>
                            <span>•</span>{" "}
                            <span>
                                {/* <Trans>a32</Trans> */}
                                {t("a32")}
                            </span>
                        </li>
                        <li className={`${styles.custom_li}`}>
                            <span>•</span>{" "}
                            <span>
                                {/* <Trans>a33</Trans> */}
                                {t("a33")}{" "}
                                <Link href="/reviews">
                                    {/* <Trans>a34</Trans> */}
                                    {t("a34")}
                                </Link>
                            </span>
                        </li>
                        <li className={`${styles.custom_li}`}>
                            <span>•</span>{" "}
                            <span>
                                {/* <Trans>a35</Trans> */}
                                {t("a35")}
                            </span>
                        </li>
                        <li className={`${styles.custom_li}`}>
                            <span>•</span>{" "}
                            <span>
                                {/* <Trans>a36</Trans> */}
                                {t("a36")}
                            </span>
                        </li>
                        <li className={`${styles.custom_li}`}>
                            <span>•</span>{" "}
                            <span>
                                {/* <Trans>a37</Trans> */}
                                {t("a37")}
                            </span>
                        </li>
                    </ul>
                </p>
            </div>
        );
    };
    const HowChange = () => {
        return (
            <div className={`${styles.faq_blocktext} ${styles.content_text}`}>
                <p className={`${styles.custom_li}`}>
                    <span>
                        {t(`a39`)
                            .replaceAll("[F]", "EA FC 24")
                            .replaceAll("[UT]", "FC 24 Ultimate Team")}
                    </span>
                </p>
                <p className={`${styles.custom_li}`}>
                    <span>
                        {t(`a40`)
                            .replaceAll("[UT]", "FC 24 Ultimate Team")
                            .replaceAll("[PT]", "FC Points")}
                    </span>
                </p>
                <p className={`${styles.custom_li}`}>
                    <span>
                        {t(`a41`)
                            .replaceAll("[UT]", "FC 24 Ultimate Team")
                            .replaceAll("[PT]", "FC Points")}
                    </span>
                </p>
            </div>
        );
    };
    const Section = () => {
        return (
            <div className={`${styles.faq_blocktext}`}>
                <p>
                    {/* <Trans>a55</Trans> */}
                    {t("a55")}
                </p>
            </div>
        );
    };

    // const msg = t`What are the advantages of buying {'FC 24 Ultimate Team'} coins instead of {'FC Points'}?`;
    // const msg = t({
    //     id: "__a38",
    //     message: 'What are the advantages of buying {0} coins instead of {1}?',
    //     values: {
    //         0: 'FC 24 Ultimate Team',
    //         1: 'FC Points',
    //     }
    // });

    return (
        <div className={`${styles.content}`}>
            <div
                className={`${styles.faq_blocktext} ${styles.wrapper_sections}`}>
                <section className={`${styles.faq_section}`}>
                    <h2 id="first" className={`${styles.faq_h2}`}>
                        {/* <Trans>ab20</Trans> */}
                        {t("ab20")}
                    </h2>
                    <div className={`${styles.section_text_wrapper}`}>
                        <Collapse
                            accordion
                            bordered={false}
                            className="site-collapse-custom-collapse">
                            <Panel
                                className="site-collapse-custom-panel"
                                header={t(`a30`)}
                                key="1"
                                showArrow={false}>
                                <WhyRoyalfut />
                            </Panel>
                            <Panel
                                className="site-collapse-custom-panel"
                                header={t(`a38`)
                                    .replaceAll("[UT]", "FC 24 Ultimate Team")
                                    .replaceAll("[PT]", "FC Points")}
                                // header={msg}
                                key="2"
                                showArrow={false}>
                                <HowChange />
                            </Panel>
                            <Panel
                                className="site-collapse-custom-panel"
                                header={t(`a54`)}
                                key="3"
                                showArrow={false}>
                                <Section />
                            </Panel>
                        </Collapse>
                    </div>
                </section>
            </div>
            <div className={`${styles.tr_btn_wrapper}`}>
                <Link href={"/faq"} className="width_auto">
                    {" "}
                    <TransparentBtn size={{ height: 64 }} width="auto">
                        <span className={`${styles.moreqw}`}>
                            {t(`mainblocks11`)}
                        </span>
                    </TransparentBtn>
                </Link>
            </div>
        </div>
    );
};

export default FaqMain;
