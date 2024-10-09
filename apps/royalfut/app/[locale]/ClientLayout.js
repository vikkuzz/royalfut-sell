"use client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import React, { useEffect, useRef, useState } from "react";
import StoreProvider from "../StoreProvider";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import LoginModal from "../components/LoginModal/LoginModal";
import LoyaltyData from "../../components/LoyaltyProgram/LoyaltyData/LoyaltyData";
import Message from "../../components/Message/Message";
import Cookie from "../../components/Cookie/Cookie";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import dynamic from "next/dynamic";
import styles from "./ClientLayout.module.scss";

// import { newTranslates } from '../../locales/newTranslates';

const DynamicComponentModal2 = dynamic(
    () => import("../components/Modal/Modal")
);

import ComponentForDataRequest from "../components/ComponentForDataRequest/ComponentForDataRequest";
import { useSelector } from "react-redux";
import { getTranslatesFromCsv } from "../../utils/functions";

const CookieBanner = ({ locale }) => {
    const [viewCookie, setViewCookie] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const token = useSelector(state => state.royalfutReducer.user.token);
    const stateDir = useSelector(state => state.royalfutReducer.direction);

    useEffect(() => {
        if (localStorage.getItem("cookieClose")) {
            setViewCookie(false);
        } else {
            setViewCookie(true);
        }
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (token) {
            setViewCookie(false);
        }
    }, [token]);

    return (
        <div
            dir={stateDir}
            style={{
                visibility: isMounted ? "visible" : "hidden",
                display: viewCookie ? "flex" : "hidden",
            }}
            className={`${styles.cookie_wrapper}`}>
            <Cookie locale={locale} />
        </div>
    );
};

const ResetScroll = () => {
    const scrolltop = useRef(null);
    useEffect(() => {
        setTimeout(() => {
            window.addEventListener("scroll", function () {
                if (window.scrollY < 800 && scrolltop.current) {
                    scrolltop.current.style.opacity = "0";
                    scrolltop.current.style.width = "0";
                } else if (window.scrollY > 800 && scrolltop.current) {
                    scrolltop.current.style.opacity = "1";
                    scrolltop.current.style.width = "48px";
                }
            });
        }, 1000);
    }, []);

    return (
        <div ref={scrolltop} className={`${styles.scroll_wrapper}`}>
            <ScrollToTop />
        </div>
    );
};

const ClientLayout = ({ children, locale }) => {
    console.log("client layout");

    /** *  не удалять   ***/

    // useEffect(() => {
    //     const getTranslates = async () => {
    //         await getTranslatesFromCsv(newTranslates);
    //     };
    //     getTranslates();
    // });

    /** *  не удалять   ***/

    return (
        <GoogleOAuthProvider clientId="362649615628-1jnb9dkcp6pd3fh0a81qpfqird23bi08.apps.googleusercontent.com">
            <StoreProvider>
                <div className={`${styles.app} ${styles.grid}`}>
                    <ComponentForDataRequest />
                    <DynamicComponentModal2 locale={locale} />
                    <LoyaltyData />

                    <header className={styles.header}>
                        <Header locale={locale} />
                    </header>
                    <LoginModal />
                    <div className={styles.body} id={"content_container"}>
                        <Message />
                        {children}
                    </div>
                    <ResetScroll />
                    <CookieBanner locale={locale} />
                    <div className={styles.footer}>
                        <Footer />
                    </div>
                </div>
            </StoreProvider>
        </GoogleOAuthProvider>
    );
};

export default ClientLayout;
