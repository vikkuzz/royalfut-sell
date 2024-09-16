import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/legacy/image";
import { Trans } from "@lingui/macro";
import { changePlatform, order } from "../../redux/actions/royalfutActions";
import { orderStep } from "../../redux/actions/royalfutOrderActions";
import Analitic from "../../Analitic/Analitic";

import styles from "../../styles/Footer.module.scss";

const analitic = new Analitic();

const Footer = () => {
    let stateBuyOff = useSelector(state => state.royalfutReducer.buy_of);
    const stateDir = useSelector(state => state.royalfutReducer.direction);
    const dispatch = useDispatch();

    return (
        <footer className={`${styles.footer}`}>
            <div className={`${styles.footer_bckgr}`} dir={stateDir}></div>
            <div className={`${styles.wrapper_paddings}`}>
                <div className={`${styles.columns_wrapper}`}>
                    <div className={`${styles.footer_firstcolumn}`}>
                        <div className={`${styles.footer_infowrapper}`}>
                            <Link
                                href={"/contact"}
                                className={`${styles.footer_header} ${styles.link_hover}`}>
                                <Trans>locales.footerLinkContact</Trans>
                            </Link>
                            <div className={`${styles.wrapper_contacts}`}>
                                <div className={`${styles.contact_icons}`}>
                                    <div className={`${styles.mess_wrapper}`}>
                                        <a
                                            href="https://api.whatsapp.com/send?phone=74952604325"
                                            target="_blank"
                                            className={`${styles.mess_btn} ${styles.mail_row_wrapper}`}
                                            rel="noreferrer">
                                            <Image
                                                priority={false}
                                                loading="lazy"
                                                alt="whatsapp"
                                                width={24}
                                                height={24}
                                                src={"/img/whiteWhatsapp.svg"}
                                                layout="fixed"
                                                className={`${styles.mess_icon}`}
                                            />
                                            <span
                                                className={`${styles.mail} from-1025-to-1900`}>
                                                WhatsApp
                                            </span>
                                        </a>
                                        <a
                                            target="_blank"
                                            href="https://t.me/royalfutcoins"
                                            className={`${styles.mess_btn} ${styles.mail_row_wrapper}`}
                                            rel="noreferrer">
                                            <Image
                                                priority={false}
                                                loading="lazy"
                                                alt="telegram"
                                                width={24}
                                                height={24}
                                                src={"/img/Telegram.svg"}
                                                layout="fixed"
                                                className={`${styles.mess_icon}`}
                                            />
                                            <span
                                                className={`${styles.mail} from-1025-to-1900`}>
                                                Telegram
                                            </span>
                                        </a>
                                        <a
                                            href="mailto:support@royalfut.com"
                                            className={`${styles.mail_row_wrapper} ${styles.mess_btn}`}>
                                            <Image
                                                priority={false}
                                                loading="lazy"
                                                alt="mail"
                                                width={24}
                                                height={24}
                                                src={"/img/wmail.svg"}
                                                layout="fixed"
                                                className={`${styles.mail_icon}`}
                                            />

                                            <span className={`${styles.mail}`}>
                                                support@royalfut.com
                                            </span>
                                        </a>
                                    </div>
                                    <div className="column">
                                        <div
                                            className={`${styles.footer_header}`}>
                                            <Trans>mainblocks12</Trans>
                                        </div>
                                        <div
                                            className={`${styles.social_wrapper}`}>
                                            <a
                                                href="https://www.instagram.com/royalfutcoins/"
                                                className={styles.mess_btn}>
                                                <Image
                                                    priority={false}
                                                    loading="lazy"
                                                    alt="instagram"
                                                    width={24}
                                                    height={24}
                                                    src={"/img/winstagram.svg"}
                                                    className={`${styles.mail_icon}`}
                                                />
                                            </a>
                                            {/* <a
                                    href="https://twitter.com/royalfutcoins"
                                    className={styles.mess_btn}
                                >
                                    <img
                                        src={'/img/wtwitter.svg'}
                                        className={`${styles.mess_icon}`}
                                    ></img>
                                </a> */}
                                            <a
                                                href="https://www.tiktok.com/@royalfutcoins"
                                                className={styles.mess_btn}>
                                                <Image
                                                    priority={false}
                                                    loading="lazy"
                                                    alt="tiktok"
                                                    width={24}
                                                    height={24}
                                                    src={"/img/wtiktok.svg"}
                                                    className={`${styles.mess_icon}`}
                                                />
                                            </a>
                                            {/* <a
                                    href="https://www.facebook.com/royalfutcom"
                                    className={styles.mess_btn}
                                >
                                    <img
                                        src={'/img/wfacebook.svg'}
                                        className={`${styles.mess_icon}`}
                                    ></img>
                                </a> */}
                                            <a
                                                href="https://www.youtube.com/c/ROYALFUT"
                                                className={styles.mess_btn}>
                                                <Image
                                                    priority={false}
                                                    loading="lazy"
                                                    alt="youtube"
                                                    width={24}
                                                    height={24}
                                                    src={"/img/wyoutube.svg"}
                                                    className={`${styles.mess_icon}`}
                                                />
                                            </a>
                                            <a
                                                href="https://www.twitch.tv/royalfutcom"
                                                className={styles.mess_btn}>
                                                <Image
                                                    priority={false}
                                                    loading="lazy"
                                                    alt="twitch"
                                                    width={24}
                                                    height={24}
                                                    src={"/img/wtwitch.svg"}
                                                    className={`${styles.mess_icon}`}
                                                />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={`${styles.width_42} row width_auto`}>
                        <div className={`${styles.footer_secondcolumn}`}>
                            <div className={`${styles.footer_center_wrapper}`}>
                                <div className={`${styles.footer_header}`}>
                                    <Trans>locales.footerPlatforms</Trans>
                                </div>
                                <div
                                    className={`${styles.footer_infowrapper} ${
                                        stateBuyOff && styles.disabled
                                    }`}>
                                    <div
                                        className={`${styles.footer_platform_item}`}>
                                        <Link
                                            href={`/order/ps4`}
                                            className={`${styles.footer_info_font} white-40 ${styles.footer_flexstart}`}
                                            onClick={() => {
                                                dispatch(order({}));
                                                dispatch(changePlatform("ps"));
                                                dispatch(orderStep(1));
                                                analitic.choosePlatform("ps4");
                                            }}>
                                            PS4
                                        </Link>
                                    </div>
                                    <div
                                        className={`${styles.footer_platform_item} `}>
                                        <Link
                                            href={`/order/ps5`}
                                            className={`${styles.footer_info_font} white-40 ${styles.footer_flexstart}`}
                                            onClick={() => {
                                                dispatch(order({}));
                                                dispatch(changePlatform("ps"));
                                                dispatch(orderStep(1));
                                                analitic.choosePlatform("ps5");
                                            }}>
                                            PS5
                                        </Link>
                                    </div>
                                    <div
                                        className={`${styles.footer_platform_item}`}>
                                        <Link
                                            href={`/order/xbox_one`}
                                            className={`${styles.footer_info_font} white-40 ${styles.footer_flexstart}`}
                                            onClick={() => {
                                                dispatch(order({}));
                                                dispatch(
                                                    changePlatform("xbox")
                                                );
                                                dispatch(orderStep(1));
                                                analitic.choosePlatform(
                                                    "xbox_one"
                                                );
                                            }}>
                                            Xbox One
                                        </Link>
                                    </div>
                                    <div
                                        className={`${styles.footer_platform_item}`}>
                                        <Link
                                            href={`/order/xbox_xs`}
                                            className={`${styles.footer_info_font} white-40 ${styles.footer_flexstart}`}
                                            onClick={() => {
                                                dispatch(order({}));
                                                dispatch(
                                                    changePlatform("xbox")
                                                );
                                                dispatch(orderStep(1));
                                                analitic.choosePlatform(
                                                    "xbox_xs"
                                                );
                                            }}>
                                            Xbox Series X|S
                                        </Link>
                                    </div>
                                    <div
                                        className={`${styles.footer_platform_item}`}>
                                        <Link
                                            href={`/order/pc`}
                                            className={`${styles.footer_info_font} white-40 ${styles.footer_flexstart}`}
                                            onClick={() => {
                                                dispatch(order({}));
                                                dispatch(changePlatform("pc"));
                                                dispatch(orderStep(1));
                                                analitic.choosePlatform("pc");
                                            }}>
                                            PC
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className={`${styles.footer_thirdcolumn}`}>
                                <div className={`${styles.footer_header}`}>
                                    <Trans>locales.footerInfo_2</Trans>
                                </div>
                                <div className={`${styles.footer_infowrapper}`}>
                                    <div
                                        className={`${styles.footer_platform_item} `}>
                                        <Link
                                            href={`/delivery`}
                                            className={`${styles.footer_info_font} white-40 ${styles.footer_flexstart}`}>
                                            <Trans>
                                                locales.footerLinkDelivery
                                            </Trans>
                                        </Link>
                                    </div>
                                    <div
                                        className={`${styles.footer_platform_item}`}>
                                        <Link
                                            href={`/payments`}
                                            className={`${styles.footer_info_font} white-40 ${styles.footer_flexstart}`}>
                                            <Trans>
                                                locales.footerLinkPayment
                                            </Trans>
                                        </Link>
                                    </div>
                                    <div
                                        className={`${styles.footer_platform_item}`}>
                                        <Link
                                            href={`/terms`}
                                            className={`${styles.footer_info_font} white-40 ${styles.footer_flexstart}`}>
                                            <Trans>
                                                locales.footerLinkTerms
                                            </Trans>
                                        </Link>
                                    </div>
                                    <div
                                        className={`${styles.footer_platform_item}`}>
                                        <Link
                                            href={`/privacy-policy`}
                                            className={`${styles.footer_info_font} white-40 ${styles.footer_flexstart}`}>
                                            <Trans>
                                                locales.footerLinkPrivacyPolicy
                                            </Trans>
                                        </Link>
                                    </div>
                                    <div
                                        className={`${styles.footer_platform_item}`}>
                                        <Link
                                            href={`/cookie-policy`}
                                            className={`${styles.footer_info_font} white-40 ${styles.footer_flexstart}`}>
                                            <Trans>cookiepage</Trans>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${styles.footer_icons_container}`}>
                    <div className={`${styles.footer__svg_wrapper}`}>
                        <div
                            className={`${styles.footer__mastercard} ${styles.footer_svg}`}></div>
                        <div
                            className={`${styles.footer__veryvisa} ${styles.footer_svg}`}></div>
                        <div
                            className={`${styles.footer__visa} ${styles.footer_svg}`}></div>
                        <div
                            className={`${styles.footer__master} ${styles.footer_svg}`}></div>
                        <div
                            className={`${styles.footer__apple} ${styles.footer_svg}`}></div>
                        <div
                            className={`${styles.footer__googlePay} ${styles.footer_svg}`}></div>
                    </div>
                    <Link
                        href={"/"}
                        className={`${styles.footer_info_font} white-40 ${styles.footer_flexstart} ${styles.royalfut}`}>
                        ROYALFUT 2024
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
