"use client";
import React, { useEffect } from "react";
import Link from "next/link";
// import { Trans } from '@lingui/macro';

import { loginModal } from "../../../redux/actions/royalfutActions";

import styles from "./Header.module.scss";
import Dropdown from "../../../components/Dropdown";
import BuyCoinsDropdown from "../../../components/BuyCoinsDropdown";
import GradientBtn from "../GradientBtn/GradientBtn";
import { avatars } from "../../../data-elements/avatars";
import Image from "next/legacy/image";
import { Logo } from "./Logo";
import { useDispatch, useSelector } from "react-redux";
import LanguageChanger from "../Language/LanguageChanger";
import CurrencyChanger from "../Currency/CurrencyChanger";
import { useTranslations } from "next-intl";
import UserPointsLoyalty from "../LoyaltyComponents/UserPointsLoyalty";
import { currentLang } from "../../../redux/actions/royalfutLocaleAction";

function Header({ locale }) {
    console.log("header render");
    const stateBuyOff = useSelector(state => state.royalfutReducer.buy_of);
    const stateDir = useSelector(state => state.royalfutReducer.direction);
    const modal = useSelector(state => state.royalfutReducer.loginModal);
    const isAuth = useSelector(state => state.royalfutReducer.isAuth);
    const t = useTranslations("home");

    const stateUser = useSelector(state => state.royalfutReducer.user);

    const dispatch = useDispatch();

    const loginModalState = useSelector(
        state => state.royalfutReducer.loginModal
    );

    useEffect(() => {
        dispatch(currentLang(locale));
    }, [locale]);

    const burgerToX = () => {
        dispatch(loginModal(!loginModalState));
    };

    return (
        <div dir={stateDir} className={styles.header}>
            <div className={`${styles.shadow}`} />
            <div dir={stateDir} className={styles.header__left}>
                <Link href="/" className={styles.header__logo}>
                    <Logo className={`${styles.logo_img}`} />
                </Link>
            </div>
            <div className={styles.header__center} dir={stateDir}>
                <div className={`${styles.dds_wrapper} from-1025-to-1900`}>
                    <LanguageChanger locale={locale} />
                    <CurrencyChanger />
                </div>

                <div
                    dir={stateDir}
                    className={`${styles.header_links_wrapper}`}
                >
                    <div
                        dir={stateDir}
                        className={`${styles.header__buy_coins} ${
                            stateBuyOff && "disabled"
                        } from-1025-to-1900`}
                    >
                        <BuyCoinsDropdown />
                    </div>
                    <div
                        className={`${styles.header__preset_orders} 
                        from-1025-to-1900`}
                    >
                        <Link
                            href={"/coins"}
                            className={`${styles.header_presetorders} ${styles.header__links}`}
                        >
                            {/* <Trans>pageCoinsBundles</Trans> */}
                            {t("headerlink.coin_bundles")}
                        </Link>
                    </div>
                    <div
                        className={`${styles.header__delivery_container} from-1025-to-1900`}
                    >
                        <Link
                            href={"/reviews"}
                            className={`${styles.header_delivery} ${styles.header__links}`}
                        >
                            {/* <Trans>header_reviews</Trans> */}
                            {t("headerlink.reviews")}
                        </Link>
                    </div>
                    <div
                        className={`${styles.header__faq_container} from-1025-to-1900`}
                    >
                        <Link
                            href={"/faq"}
                            className={`${styles.header_faq} ${styles.header__links}`}
                        >
                            {/* <Trans>seo4</Trans> */}
                            {t("headerlink.faq")}
                        </Link>
                    </div>
                    <div
                        className={`${styles.header__faq_container} from-1025-to-1900`}
                    >
                        <Link
                            href={"/blog"}
                            className={`${styles.header_faq} ${styles.header__links} items-center`}
                        >
                            Blog
                            <div className="flex py-1 px-2 rounded-xl bg-[#EAB11F] ml-1 h-6 text-xs">
                                NEW
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            <div className={styles.header__right}>
                <button
                    type="button"
                    name="burger"
                    aria-label="Burger"
                    onClick={burgerToX}
                    className={`${styles.header__burger} from-375-to-1024`}
                >
                    <div
                        className={`${styles.header__header_top} ${styles.header__divider} ${
                            modal && styles.header__top_divider_x
                        }
            `}
                    ></div>
                    <div
                        className={`${styles.header__header_center} ${styles.header__divider} ${
                            modal && styles.header__center_divider_x
                        }`}
                    ></div>
                    <div
                        className={`${styles.header__header_bottom} ${styles.header__divider} ${
                            modal && styles.header__bottom_divider_x
                        }`}
                    ></div>
                </button>

                <div className={`from-1025-to-1900`}>
                    {isAuth ? (
                        <div className={`${styles.profile_btns}`}>
                            <UserPointsLoyalty />
                            <button
                                type="button"
                                name="burger"
                                onClick={() => {
                                    burgerToX();
                                }}
                                className={`${styles.user_auth}`}
                            >
                                <Image
                                    alt="ava"
                                    className={`${styles.header_ava}`}
                                    priority
                                    layout="fill"
                                    objectFit="contain"
                                    src={`${
                                        avatars.filter(
                                            (el) =>
                                                el.id ==
                                                stateUser.profilePicture
                                        )[0]?.src || avatars[0].src
                                    }`}
                                ></Image>
                            </button>
                        </div>
                    ) : (
                        <div className={`${styles.login_btn_wrapper}`}>
                            <GradientBtn
                                callback={burgerToX}
                                size={{ width: 168, height: 48 }}
                            >
                                <span className={styles.text_login}>
                                    {/* <Trans>seo5</Trans> */}
                                    {t("login")}
                                </span>
                            </GradientBtn>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Header;
