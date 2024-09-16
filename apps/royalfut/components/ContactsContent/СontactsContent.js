"use client";
import React from "react";

import styles from "../../styles/ContactsContent.module.scss";
import StickyBlock from "../StickyBlock/StickyBlock";
import { useWindowDimensions } from "../../utils/hooks";
import Link from "next/link";
import { useTranslations } from "next-intl";

const ContactsContent = () => {
    const t = useTranslations("contacts");
    let { width } = useWindowDimensions();
    return (
        <div
            className={`${styles.contact_container} ${width < 1024 ? "column" : "row"}`}>
            <div className={`${styles.content_wrapper} column`}>
                <noindex>
                    <span className={`${styles.text_contacts}`}>
                        NICOLAOU PENTADROMOS CENTRE,9th Floor, Flat / Office
                        908TH, 3025, Limassol, Cyprus
                    </span>
                </noindex>
                <div className={`${styles.contacts_wrapper}`}>
                    <div className={`${styles.block_wrapper}`}>
                        <div className={`${styles.block}`}>
                            <span className={`${styles.block_title}`}>
                                {t("via")}
                            </span>
                            <div className={`${styles.links_wrapper}`}>
                                <Link
                                    href="https://api.whatsapp.com/send?phone=74952604325"
                                    target="_blank"
                                    className={`${styles.block_link}`}>
                                    <img
                                        alt="what"
                                        className={`${styles.contact_pic}`}
                                        src="/img/whatsapp_svg.svg"></img>
                                </Link>
                                <Link
                                    href="https://t.me/royalfutcoins"
                                    target="_blank"
                                    className={`${styles.block_link}`}>
                                    <img
                                        alt="telegram"
                                        className={`${styles.contact_pic}`}
                                        src="/img/telegram_svg.svg"></img>
                                </Link>
                            </div>
                        </div>
                        <div className={`${styles.block}`}>
                            <span className={`${styles.block_title}`}>
                                {t("socials")}
                            </span>
                            <div className={`${styles.links_wrapper}`}>
                                <Link
                                    href="https://www.instagram.com/royalfutcoins/"
                                    target="_blank"
                                    className={`${styles.block_link}`}>
                                    <img
                                        alt="instagram"
                                        className={`${styles.contact_pic}`}
                                        src="/img/instagram_svg.svg"></img>
                                </Link>
                                <Link
                                    href="https://www.tiktok.com/@royalfutcoins"
                                    target="_blank"
                                    className={`${styles.block_link}`}>
                                    <img
                                        alt="tiktok"
                                        className={`${styles.contact_pic}`}
                                        src="/img/tiktok_svg.svg"></img>
                                </Link>
                                <Link
                                    href="https://www.youtube.com/c/ROYALFUT"
                                    target="_blank"
                                    className={`${styles.block_link}`}>
                                    <img
                                        alt="youtube"
                                        className={`${styles.contact_pic}`}
                                        src="/img/youtube_svg.svg"></img>
                                </Link>
                                <Link
                                    href="https://www.twitch.tv/royalfutcom"
                                    target="_blank"
                                    className={`${styles.block_link}`}>
                                    <img
                                        alt="twitch"
                                        className={`${styles.contact_pic}`}
                                        src="/img/twitch_svg.svg"></img>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.email_wrapper}`}>
                        <img alt="email" src="/img/email_svg.svg"></img>
                        <a
                            className={`${styles.email_link}`}
                            type="mail"
                            href="mailto:support@royalfut.com">
                            support@royalfut.com
                        </a>
                    </div>
                </div>
            </div>
            <StickyBlock />
        </div>
    );
};

export default ContactsContent;
