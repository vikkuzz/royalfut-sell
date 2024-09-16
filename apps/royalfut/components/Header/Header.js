import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { Trans } from "@lingui/macro";

import { loginModal } from "../../redux/actions/royalfutActions";

import styles from "../../styles/Header.module.scss";
import Dropdown from "../Dropdown";
import BuyCoinsDropdown from "../BuyCoinsDropdown";
import GradientBtn from "../GradientBtn/GradientBtn";
import { avatars } from "../../data-elements/avatars";
import Image from "next/legacy/image";
import UserPointsLoyalty from "../LoyaltyProgram/UserPointsLoyalty";
import { Logo } from "./Logo";

function Header({ serverLocale }) {
    const stateBuyOff = useSelector(state => state.royalfutReducer.buy_of);
    const stateDir = useSelector(state => state.royalfutReducer.direction);
    const modal = useSelector(state => state.royalfutReducer.loginModal);
    const isAuth = useSelector(state => state.royalfutReducer.isAuth);

    const stateUser = useSelector(state => state.royalfutReducer.user);

    const dispatch = useDispatch();

    const loginModalState = useSelector(
        state => state.royalfutReducer.loginModal
    );

    const burgerToX = () => {
        dispatch(loginModal(!loginModalState));
    };

    const onLinkClick = () => {};

    return (
        <div dir={stateDir} className={styles.header}>
            <div className={`${styles.shadow}`} />
            <div dir={stateDir} className={styles.header__left}>
                <Link href="/" className={styles.header__logo}>
                    <Logo className={`${styles.logo_img}`} />
                </Link>
            </div>
            <div className={styles.header__center} dir={stateDir}>
                <div className="from-1025-to-1900">
                    <Dropdown serverLocale={serverLocale} />
                </div>

                <div
                    dir={stateDir}
                    className={`${styles.header_links_wrapper}`}>
                    <div
                        dir={stateDir}
                        className={`${styles.header__buy_coins} ${
                            stateBuyOff && "disabled"
                        } from-1025-to-1900`}>
                        <BuyCoinsDropdown />
                    </div>
                    <div
                        className={`${styles.header__preset_orders} ${
                            stateBuyOff && "disabled"
                        } from-1025-to-1900`}>
                        <Link
                            href={"/coins"}
                            onClick={onLinkClick}
                            className={`${styles.header_presetorders} ${styles.header__links}`}>
                            <Trans>pageCoinsBundles</Trans>
                        </Link>
                    </div>
                    <div
                        className={`${styles.header__delivery_container} from-1025-to-1900`}>
                        <Link
                            href={"/reviews"}
                            className={`${styles.header_delivery} ${styles.header__links}`}>
                            <Trans>header_reviews</Trans>
                        </Link>
                    </div>
                    <div
                        className={`${styles.header__faq_container} from-1025-to-1900`}>
                        <Link
                            href={"/faq"}
                            className={`${styles.header_faq} ${styles.header__links}`}>
                            <Trans>seo4</Trans>
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
                    className={`${styles.header__burger} from-375-to-1024`}>
                    <div
                        className={`${styles.header__header_top} ${styles.header__divider} ${
                            modal && styles.header__top_divider_x
                        }
            `}></div>
                    <div
                        className={`${styles.header__header_center} ${styles.header__divider} ${
                            modal && styles.header__center_divider_x
                        }`}></div>
                    <div
                        className={`${styles.header__header_bottom} ${styles.header__divider} ${
                            modal && styles.header__bottom_divider_x
                        }`}></div>
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
                                className={`${styles.user_auth}`}>
                                <Image
                                    alt="ava"
                                    className={`${styles.header_ava}`}
                                    priority
                                    layout="fill"
                                    objectFit="contain"
                                    src={`${
                                        avatars.filter(
                                            el =>
                                                el.id ==
                                                stateUser.profilePicture
                                        )[0]?.src || avatars[0].src
                                    }`}></Image>
                            </button>
                        </div>
                    ) : (
                        <div className={`${styles.login_btn_wrapper}`}>
                            <GradientBtn
                                callback={burgerToX}
                                size={{ width: 168, height: 48 }}>
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
