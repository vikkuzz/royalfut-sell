import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "../../styles/Cookie.module.scss";
import { useTranslations } from "next-intl";

const Cookie = ({ locale }) => {
    const t = useTranslations("cookie");
    const pathname = usePathname();
    const cookie = useRef();
    const stateUser = useSelector(state => state.royalfutReducer.user);

    useEffect(() => {
        if (stateUser.token) {
            cookie.current.style.display = "none";
        }
    }, [stateUser]);

    useEffect(() => {
        const path = `/${locale}`;
        console.log(path);

        if (pathname != "/en" && pathname != path) {
            localStorage.setItem("cookieClose", true);
            cookie.current.style.display = "none";
        }
    }, [pathname]);

    useEffect(() => {
        if (localStorage.getItem("cookieClose")) {
            cookie.current.style.display = "none";
        }
    }, []);
    return (
        <div className={styles.cookie} ref={cookie}>
            <div className={`${styles.cookie_text_wrapper}`}>
                <span className={`${styles.cookie_text}`}>
                    {t("newcookies")}{" "}
                    <Link href="/cookie-policy" className={styles.cookie_link}>
                        {t("newcookieslink")}
                    </Link>
                </span>
            </div>
            <button
                className={`${styles.cookie_close}`}
                onClick={() => {
                    localStorage.setItem("cookieClose", true);
                    cookie.current.style.display = "none";
                }}
                type="button"
                name="close">
                {t("okay")}
            </button>
        </div>
    );
};

export default Cookie;
