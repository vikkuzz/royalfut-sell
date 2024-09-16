"use client";
import React, { useEffect, useRef } from "react";
import { Collapse } from "antd";
import styles from "../../styles/Accordion.module.scss";
// import { useRouter } from 'next/navigation';
import Link from "next/link";
import { getCoords } from "../../utils/functions";
const { Panel } = Collapse;

import StickyBlock from "../StickyBlock/StickyBlock";
import { useWindowDimensions } from "../../utils/hooks";
// import { Trans, t } from '@lingui/macro';
import TransparentBtn from "../TransparentBtn/TransparentBtn";
import { useDispatch } from "react-redux";
import { modalFunnelMethodVideo } from "../../redux/actions/royalfutActions";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

const NavFaq = ({ btns }) => {
    const scrollToBlock = blockID => {
        document.querySelector(blockID).scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };
    return (
        <div className={`${styles.nav_container}`}>
            {btns?.map(el => {
                return (
                    <a
                        key={el.id}
                        href={`#${el.href}`}
                        className={`${styles.btn_section}`}
                        onClick={() => {
                            scrollToBlock(`#${el.href}`);
                        }}>
                        {el.text}
                    </a>
                );
            })}
        </div>
    );
};

const CustomAccordion = () => {
    const t = useTranslations("faq");
    const dispatch = useDispatch();
    // const router = useRouter();
    const pathname = usePathname();

    const { width } = useWindowDimensions();

    const nav = [
        { id: 1, href: "first", text: t(`ab21`) },
        { id: 2, href: "second", text: t(`a57`) },
        // { id: 3, href: "third", text: t(`a101`) },
        { id: 4, href: "four", text: t(`a117`) },
    ];

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
                                {/* <Trans>a33</Trans>{' '} */}
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
                                {/* <Trans>ab36</Trans> */}
                                {t("ab36")}
                            </span>
                        </li>
                        <li className={`${styles.custom_li}`}>
                            <span>•</span>{" "}
                            <span>
                                {/* <Trans>ab37</Trans> */}
                                {t("ab37")}
                            </span>
                        </li>
                    </ul>
                </p>
            </div>
        );
    };
    const Section3 = () => {
        return (
            <div className={`${styles.faq_blocktext} ${styles.content_text}`}>
                <p>
                    <ul className={`${styles.custom_ul}`}>
                        <li className={`${styles.custom_li}`}>
                            <span>•</span>{" "}
                            <span>
                                {t(`a60`).replaceAll(
                                    "[WA]",
                                    "Ultimate Team Web App"
                                )}
                            </span>
                        </li>

                        <li className={`${styles.custom_li}`}>
                            <span>•</span>{" "}
                            <span>
                                {/* <Trans>a61</Trans> */}
                                {t("a61")}
                            </span>
                        </li>
                        <li className={`${styles.custom_li}`}>
                            <span>•</span>{" "}
                            <span>
                                {/* <Trans>a62</Trans> */}
                                {t("a62")}
                            </span>
                        </li>
                        <li className={`${styles.custom_li}`}>
                            <span>•</span>{" "}
                            <span>
                                {/* <Trans>a62</Trans> */}
                                {t("anew")}
                            </span>
                        </li>
                    </ul>
                </p>
            </div>
        );
    };
    const Section4 = () => {
        return (
            <div className={`${styles.faq_blocktext} ${styles.content_text}`}>
                <p>
                    {/* <Trans>a64</Trans> */}
                    {t("a64")}
                </p>
                <p>
                    {/* <Trans>a65</Trans> */}
                    {t("a65")}
                </p>
            </div>
        );
    };
    const Section5 = () => {
        const li_comfort = useRef(null);
        useEffect(() => {
            if (li_comfort?.current) {
                let sentence = li_comfort?.current;
                let word = t(`a67`);
                let boldWord = "<strong>" + word + "</strong>";
                let newSentence = sentence.innerHTML.replaceAll(word, boldWord);
                sentence.innerHTML = newSentence;
            }
        }, [li_comfort?.current, pathname]);

        const showModal = () => {
            dispatch(modalFunnelMethodVideo(true));
        };
        return (
            <div
                className={`${styles.faq_blocktext} ${styles.content_text} ${styles.center}`}>
                <ol className={`${styles.custom_ul}`}>
                    <li ref={li_comfort} className={`${styles.custom_li}`}>
                        {/* <Trans>a68</Trans> */}
                        {t("a68")}
                    </li>
                    <li className={`${styles.custom_li}`}>
                        {/* <Trans>a69</Trans> */}
                        {t("a69")}
                    </li>
                    <li className={`${styles.custom_li}`}>
                        {/* <Trans>a70</Trans> */}
                        {t("a70")}
                    </li>
                    <li className={`${styles.custom_li}`}>
                        {t(`a71`).replaceAll("[F]", "EA FC 25")}
                    </li>
                </ol>
                <p>
                    {/* <Trans>a72</Trans> */}
                    {t("a72")}
                </p>
                <TransparentBtn
                    callback={showModal}
                    size={{ height: 64, width: 264 }}>
                    <span className={`${styles.show_modal}`}>
                        {/* <Trans>a73</Trans> */}
                        {t("a73")}
                    </span>
                </TransparentBtn>
                <p>
                    {/* <Trans>a74</Trans> */}
                    {t("a74")}
                    <Link
                        href="https://trustpilot.com/evaluate/royalfut.com"
                        rel="nofollow"
                        className={`${styles.link_trust}`}
                        target="_blank">
                        {/* <Trans>a75</Trans>{' '} */}
                        {t("a75")}{" "}
                    </Link>
                </p>
                <p>
                    {/* <Trans>a76</Trans> */}
                    {t("a76")}
                </p>
            </div>
        );
    };
    const Section13 = () => {
        const li_manual = useRef(null);
        useEffect(() => {
            if (li_manual?.current) {
                let sentence = li_manual?.current;
                let word = t(`a108`);
                let boldWord = "<strong>" + word + "</strong>";
                let newSentence = sentence.innerHTML.replaceAll(word, boldWord);
                sentence.innerHTML = newSentence;
            }
        }, [li_manual?.current, pathname]);

        const showModal = () => {
            dispatch(modalFunnelMethodVideo(true));
        };
        return (
            <div
                className={`${styles.faq_blocktext} ${styles.content_text} ${styles.center}`}>
                <ol className={`${styles.custom_ul}`}>
                    <li ref={li_manual} className={`${styles.custom_li}`}>
                        {/* <Trans>a109</Trans> */}
                        {t("a109")}
                    </li>
                    <li className={`${styles.custom_li}`}>
                        {/* <Trans>a110</Trans> */}
                        {t("a110")}
                    </li>
                    <li className={`${styles.custom_li}`}>
                        {/* <Trans>a111</Trans> */}
                        {t("a111")}
                    </li>
                </ol>
                <p>
                    {/* <Trans>a112</Trans> */}
                    {t("a112")}
                </p>
                <TransparentBtn
                    callback={showModal}
                    size={{ height: 64, width: 264 }}>
                    <span className={`${styles.show_modal}`}>
                        {/* <Trans>a73</Trans> */}
                        {t("a73")}
                    </span>
                </TransparentBtn>
                <p>
                    {/* <Trans>a114</Trans>{' '} */}
                    {t("a114")}{" "}
                    <Link
                        href="https://trustpilot.com/evaluate/royalfut.com"
                        rel="nofollow"
                        className={`${styles.link_trust}`}
                        target="_blank">
                        {/* <Trans>a75</Trans>{' '} */}
                        {t("a75")}{" "}
                    </Link>
                </p>
                <p>
                    {/* <Trans>a76</Trans> */}
                    {t("a76")}
                </p>
            </div>
        );
    };
    const Section6 = () => {
        return (
            <div
                className={`${styles.faq_blocktext} ${styles.content_text} ${styles.center}`}>
                <p>
                    {/* <Trans>a79</Trans> */}
                    {t("a79")}
                </p>
            </div>
        );
    };
    const Section7 = () => {
        return (
            <div
                className={`${styles.faq_blocktext} ${styles.content_text} ${styles.center}`}>
                <p>
                    {/* <Trans>a81</Trans>{' '} */}
                    {t("a81")}{" "}
                    <Link
                        href={"/privacy-policy"}
                        className={`${styles.link_trust}`}>
                        {/* <Trans>a82</Trans> */}
                        {t("a82")}
                    </Link>
                </p>
            </div>
        );
    };
    const Section8 = () => {
        return (
            <div
                className={`${styles.faq_blocktext} ${styles.content_text} ${styles.center}`}>
                <p>
                    {/* <Trans>a85</Trans>{' '} */}
                    {t("a85")}{" "}
                    <Link
                        href={"https://myaccount.ea.com/cp-ui/security/index"}
                        rel="nofollow"
                        target="_blank"
                        className={`${styles.link_trust}`}>
                        {/* <Trans>a86</Trans> */}
                        {t("a86")}
                    </Link>
                </p>
                <p>
                    {/* <Trans>a87</Trans> */}
                    {t("a87")}
                </p>
            </div>
        );
    };
    const Section9 = () => {
        return (
            <div
                className={`${styles.faq_blocktext} ${styles.content_text} ${styles.center}`}>
                <ol className={`${styles.custom_ul}`}>
                    <li className={`${styles.custom_li}`}>
                        {/* <Trans>a94</Trans> */}
                        {t("a94")}
                    </li>
                    <li className={`${styles.custom_li}`}>
                        {/* <Trans>a95</Trans> */}
                        {t("a95")}
                    </li>
                </ol>
            </div>
        );
    };
    const Section10 = () => {
        return (
            <div
                className={`${styles.faq_blocktext} ${styles.content_text} ${styles.center}`}>
                <ol className={`${styles.custom_ul}`}>
                    <li className={`${styles.custom_li}`}>
                        {/* <Trans>a97</Trans>{' '} */}
                        {t("a97")}{" "}
                        <Link
                            href={
                                "https://myaccount.ea.com/cp-ui/security/index"
                            }
                            rel="nofollow"
                            target="_blank"
                            className={`${styles.link_trust}`}>
                            {/* <Trans>a98</Trans> */}
                            {t("a98")}
                        </Link>
                    </li>
                    <li className={`${styles.custom_li}`}>
                        {/* <Trans>a99</Trans> */}
                        {t("a99")}
                    </li>
                </ol>
            </div>
        );
    };
    const SectionNew = () => {
        return (
            <div
                className={`${styles.faq_blocktext} ${styles.content_text} ${styles.center}`}>
                {t("anewansw")}{" "}
                <Link
                    href={"https://myaccount.ea.com/cp-ui/security/index"}
                    rel="nofollow"
                    target="_blank"
                    className={`${styles.link_trust}`}>
                    https://myaccount.ea.com/cp-ui/security/index
                </Link>
            </div>
        );
    };
    const Section11 = () => {
        return (
            <div
                className={`${styles.faq_blocktext} ${styles.content_text} ${styles.center}`}>
                <p>
                    {/* <Trans>a103</Trans> */}
                    {t("a103")}
                </p>
                <p>
                    {/* <Trans>a103_2</Trans> */}
                    {t("a103_2")}
                </p>
            </div>
        );
    };
    const Section12 = () => {
        return (
            <div
                className={`${styles.faq_blocktext} ${styles.content_text} ${styles.center}`}>
                <p>
                    {/* <Trans>a105</Trans> */}
                    {t("a105")}
                </p>
                <p>
                    {/* <Trans>a106</Trans> */}
                    {t("a106")}
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
                            .replaceAll("[F]", "EA FC 25")
                            .replaceAll("[UT]", "FC 25 Ultimate Team")}
                    </span>
                </p>
                <p className={`${styles.custom_li}`}>
                    <span>
                        {t(`a40`)
                            .replaceAll("[UT]", "FC 25 Ultimate Team")
                            .replaceAll("[PT]", "FC Points")}
                    </span>
                </p>
                <p className={`${styles.custom_li}`}>
                    <span>
                        {t(`a41`)
                            .replaceAll("[UT]", "FC 25 Ultimate Team")
                            .replaceAll("[PT]", "FC Points")}
                    </span>
                </p>
            </div>
        );
    };
    const Section = () => {
        return (
            <div className={`${styles.faq_blocktext} ${styles.content_text}`}>
                <p className={`${styles.custom_li}`}>
                    <span>
                        {/* <Trans>a43</Trans> */}
                        {t("a43")}
                    </span>
                </p>
                <p className={`${styles.custom_li}`}>
                    <span>
                        {/* <Trans>a44</Trans> */}
                        {t("a44")}
                    </span>
                </p>
                <p className={`${styles.custom_li}`}>
                    <span>
                        {/* <Trans>a45</Trans> */}
                        {t("a45")}
                    </span>
                </p>
                <p className={`${styles.custom_li}`}>
                    <span>
                        {/* <Trans>a46</Trans>{' '} */}
                        {t("a46")}{" "}
                        <a href="#second">
                            {/* <Trans>a47</Trans> */}
                            {t("a47")}
                        </a>
                    </span>
                </p>
            </div>
        );
    };
    const Section2 = () => {
        return (
            <div className={`${styles.faq_blocktext} ${styles.content_text}`}>
                <p className={`${styles.custom_li}`}>
                    <span>
                        {/* <Trans>a49</Trans> */}
                        {t("a49")}
                    </span>
                </p>
                <p className={`${styles.custom_li}`}>
                    <span>
                        {/* <Trans>a50</Trans> */}
                        {t("a50")}
                    </span>
                </p>
                <p className={`${styles.custom_li}`}>
                    <span>
                        {/* <Trans>a51</Trans> */}
                        {t("a51")}
                    </span>
                </p>
            </div>
        );
    };
    const Section14 = () => {
        return (
            <div className={`${styles.faq_blocktext} ${styles.content_text}`}>
                <p className={`${styles.custom_li}`}>
                    <span>
                        {/* <Trans>a119</Trans> */}
                        {t("a119")}
                    </span>
                </p>
            </div>
        );
    };
    const Section15 = () => {
        return (
            <div className={`${styles.faq_blocktext} ${styles.content_text}`}>
                <p className={`${styles.custom_li}`}>
                    <span>
                        {/* <Trans>a121</Trans> */}
                        {t("a121")}
                    </span>
                </p>
                <p>
                    {/* <Trans>a121_2</Trans> */}
                    {t("a121_2")}
                </p>
                <p>
                    {/* <Trans>a121_3</Trans> */}
                    {t("a121_3")}
                </p>
                <p>
                    {/* <Trans>a121_4</Trans> */}
                    {t("a121_4")}
                </p>
                <p>
                    {/* <Trans>a121_5</Trans> */}
                    {t("a121_5")}
                </p>
            </div>
        );
    };

    const handleClickQuestion = e => {
        setTimeout(
            () => window.scrollTo(0, getCoords(e.target).top - 150),
            500
        );
    };
    return (
        <div className={`${styles.content}`}>
            {width > 1024 ? (
                <div className={`${styles.column_sticky}`}>
                    <div className={`column ${styles.stick_block}`}>
                        <NavFaq btns={nav} />
                        <StickyBlock />
                    </div>
                </div>
            ) : (
                <NavFaq btns={nav} />
            )}

            <div
                className={`${styles.faq_blocktext} ${styles.wrapper_sections}`}>
                <section className={`${styles.faq_section}`}>
                    <h2 id="first" className={`${styles.faq_h2}`}>
                        {/* <Trans>ab21</Trans> */}
                        {t("ab21")}
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
                                    .replaceAll("[UT]", "FC 25 Ultimate Team")
                                    .replaceAll("[PT]", "FC Points")}
                                key="2"
                                showArrow={false}>
                                <HowChange />
                            </Panel>
                            {/* <Panel
                                className="site-collapse-custom-panel"
                                header={t(`a42`)}
                                key="3"
                                showArrow={false}>
                                <Section />
                            </Panel> */}
                            <Panel
                                className="site-collapse-custom-panel"
                                header={t(`a48`)}
                                key="4"
                                showArrow={false}>
                                <Section2 />
                            </Panel>
                            <Panel
                                className="site-collapse-custom-panel"
                                header={t(`a52`)}
                                key="5"
                                showArrow={false}>
                                <div className={`${styles.faq_blocktext}`}>
                                    <p>
                                        {/* <Trans>a53</Trans> */}
                                        {t("a53")}
                                    </p>
                                </div>
                            </Panel>
                            <Panel
                                className="site-collapse-custom-panel"
                                header={t(`a54`)}
                                key="6"
                                showArrow={false}>
                                <div className={`${styles.faq_blocktext}`}>
                                    <p>
                                        {/* <Trans>a55</Trans> */}
                                        {t("a55")}
                                    </p>
                                </div>
                            </Panel>
                        </Collapse>
                    </div>
                </section>
                <section className={`${styles.faq_section}`}>
                    <h2 id="second" className={`${styles.faq_h2}`}>
                        {/* <Trans>a57</Trans> */}
                        {t("a57")}
                    </h2>
                    <div
                        id="comfort"
                        className={`${styles.section_text_wrapper}`}>
                        <Collapse
                            accordion
                            bordered={false}
                            className="site-collapse-custom-collapse">
                            <Panel
                                className="site-collapse-custom-panel"
                                header={t(`a58`).replaceAll(
                                    "[UT]",
                                    "FC 25 Ultimate Team"
                                )}
                                key="1"
                                showArrow={false}>
                                <Section3 />
                            </Panel>
                            <Panel
                                className="site-collapse-custom-panel"
                                header={t(`a63`).replaceAll(
                                    "[WA]",
                                    "Ultimate Team Web App"
                                )}
                                key="2"
                                showArrow={false}>
                                <Section4 />
                            </Panel>
                            <Panel
                                className="site-collapse-custom-panel"
                                header={t(`a66`)}
                                key="3"
                                showArrow={false}>
                                <Section5 />
                            </Panel>
                            <Panel
                                className="site-collapse-custom-panel"
                                header={t(`a77`)}
                                key="4"
                                showArrow={false}>
                                <Section6 />
                            </Panel>
                            <Panel
                                className="site-collapse-custom-panel"
                                header={t(`a80`)}
                                key="5"
                                showArrow={false}>
                                <Section7 />
                            </Panel>
                            <Panel
                                className="site-collapse-custom-panel"
                                header={t(`a84`)}
                                key="6"
                                showArrow={false}>
                                <Section8 />
                            </Panel>
                            <Panel
                                className="site-collapse-custom-panel"
                                header={t(`a93`)}
                                key="7"
                                showArrow={false}>
                                <Section9 />
                            </Panel>
                            <Panel
                                className="site-collapse-custom-panel"
                                header={t(`a96`)}
                                key="8"
                                showArrow={false}>
                                <Section10 />
                            </Panel>
                            <Panel
                                className="site-collapse-custom-panel"
                                header={t(`anewqt`)}
                                key="8"
                                showArrow={false}>
                                <SectionNew />
                            </Panel>
                        </Collapse>
                    </div>
                </section>
                {/* <section className={`${styles.faq_section}`}>
                    <h2 id="third" className={`${styles.faq_h2}`}>
                        {t("a101")}
                    </h2>
                    <div className={`${styles.section_text_wrapper}`}>
                        <Collapse
                            accordion
                            bordered={false}
                            className="site-collapse-custom-collapse">
                            <Panel
                                className="site-collapse-custom-panel"
                                header={t(`a102`).replaceAll(
                                    "[UT]",
                                    "FC 25 Ultimate Team"
                                )}
                                key="1"
                                showArrow={false}>
                                <Section11 />
                            </Panel>
                            <Panel
                                className="site-collapse-custom-panel"
                                header={t(`a104`).replaceAll(
                                    "[WA]",
                                    "Ultimate Team Web App"
                                )}
                                key="2"
                                showArrow={false}>
                                <Section12 />
                            </Panel>
                            <Panel
                                className="site-collapse-custom-panel"
                                header={t(`a107`)}
                                key="3"
                                showArrow={false}>
                                <Section13 />
                            </Panel>
                        </Collapse>
                    </div>
                </section> */}
                <section className={`${styles.faq_section}`}>
                    <h2 id="four" className={`${styles.faq_h2}`}>
                        {/* <Trans>a117</Trans> */}
                        {t("a117")}
                    </h2>
                    <div className={`${styles.section_text_wrapper}`}>
                        <Collapse
                            accordion
                            bordered={false}
                            className="site-collapse-custom-collapse">
                            <Panel
                                className="site-collapse-custom-panel"
                                header={t(`a118`)}
                                key="1"
                                showArrow={false}>
                                <Section14 />
                            </Panel>
                            <Panel
                                className="site-collapse-custom-panel"
                                header={t(`a120`)}
                                key="2"
                                showArrow={false}>
                                <Section15 />
                            </Panel>
                            <Panel
                                className="site-collapse-custom-panel"
                                header={t(`a122`)}
                                key="3"
                                showArrow={false}>
                                <p>
                                    {/* <Trans>a123</Trans> */}
                                    {t("a123")}
                                </p>
                            </Panel>
                            <Panel
                                className="site-collapse-custom-panel"
                                header={t(`a124`)}
                                key="4"
                                showArrow={false}>
                                <p>
                                    {/* <Trans>a125</Trans> */}
                                    {t("a125")}
                                </p>
                            </Panel>
                        </Collapse>
                    </div>
                </section>
            </div>
            {width < 1025 ? <StickyBlock /> : ""}
        </div>
    );
};

export default CustomAccordion;
