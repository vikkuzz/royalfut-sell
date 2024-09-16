"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import styles from "./PageChanger.module.scss";
import { useTranslations } from "next-intl";

const PageChanger = () => {
    const pathname = usePathname();
    const t = useTranslations("boost");

    let defaultState = {
        coins: {
            active: false,
            soon: false,
        },
        players: {
            active: false,
            soon: true,
        },
        sbc: {
            active: false,
            soon: false,
        },
    };

    const [page, setPage] = useState(defaultState);

    useEffect(() => {
        if (pathname === "/coins") {
            setPage({ ...defaultState, coins: { active: true } });
        }
        if (pathname === "/wl-boost") {
            setPage({ ...defaultState, sbc: { active: true } });
        }
        if (pathname === "/players") {
            setPage({ ...defaultState, players: { active: true } });
        }
    }, [pathname]);

    return (
        <div className={`${styles.container}`}>
            <div className={`${styles.radio_page_label}`}>
                <Link
                    href="/coins"
                    className={`${styles.page_btn} ${page.coins.active && styles.btn_active}`}>
                    <img
                        alt="coins"
                        className={`${styles.coins_tab_img}`}
                        src="/img/Coin__tab.svg"></img>
                    {/* <Trans>locales.pageAmountCoinsLabel</Trans> */}
                    {t("pageAmountCoinsLabel")}
                </Link>
            </div>
            <div className={`${styles.radio_page_label}`}>
                <Link
                    href="/wl-boost"
                    className={`${styles.page_btn} ${page.sbc.active && styles.btn_active}`}>
                    <img
                        alt="sbc"
                        className={`${styles.coins_tab_img}`}
                        src="/img/WL_Boost_gray.svg"></img>
                    WL Boost
                </Link>
                <div className={`${styles.soon}`}>
                    {/* <Trans>aa4</Trans> */}
                    {t("aa4")}
                </div>
            </div>
            <div
                className={`${styles.radio_page_label} ${page.players.soon && "disabled"}`}>
                <Link
                    href=""
                    className={`${styles.page_btn} ${page.players.active && styles.btn_active}`}>
                    <img
                        alt="player"
                        className={`${styles.coins_tab_img}`}
                        src="/img/Player tab.svg"></img>
                    Players
                </Link>
                <div className={`${styles.soon} from-375-to-1024`}>
                    {/* <Trans>locales.pageMethodCardSoon</Trans> */}
                    {t("pageMethodCardSoon")}
                </div>
                <div className={`${styles.soon} from-1025-to-1900`}>
                    {/* <Trans>seo211</Trans> */}
                    {t("seo211")}
                </div>
            </div>
        </div>
    );
};

export default PageChanger;
