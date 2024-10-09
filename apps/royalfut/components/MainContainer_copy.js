import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Head from "next/head";
import { useRouter } from "next/router";

import {
    loginModal,
    catcherror,
    stock,
    user,
    getCriptoLimits,
    modalFunnelMethodVideo,
    modalCalc,
    modalFunnelCalc,
    modalFunnelMethod,
    showMessage,
    modalFunnelProcess,
    changeDir,
    userCreateOrder,
    userlogout,
} from "../redux/actions/royalfutActions";

import styles from "../styles/App.module.scss";

import Header from "./Header";
import api from "../Api/Api";
import Footer from "./Footer";
import Breadcrumbs from "./Breadcrumbs/Breadcrumbs";
import ScrollToTop from "./ScrollToTop/ScrollToTop";
import Cookie from "./Cookie/Cookie";
import Message from "./Message/Message";
import { newTranslates } from "../locales/newTranslates";
import { ErrorBoundary } from "react-error-boundary";
import { seoTags } from "../data-elements/seoTags";
import { onGooglePayLoaded } from "../utils/google_unlimint";
import { getPromoOrder } from "../redux/actions/royalfutPromocodeAction";

import dynamic from "next/dynamic";
import { currentLang } from "../redux/actions/royalfutLocaleAction";
import { orderPage } from "../redux/actions/royalfutOrderActions";
import { csvJSON } from "../utils/functions";
import LoyaltyData from "./LoyaltyProgram/LoyaltyData/LoyaltyData";

const DynamicComponentModal2 = dynamic(() => import("./Modal/Modal"));
const DynamicComponentBurgerMenu = dynamic(() => import("./BurgerMenu"));

function MainContainer({
    children,
    keywords,
    description,
    title,
    customStyle,
    noindex = false,
    noBread,
    serverLocale,
    loyalty,
}) {
    const wrapperModalRef = useRef(null);
    const shadowModalRef = useRef(null);
    const scrolltop = useRef(null);
    const modal = useSelector(state => state.royalfutReducer.loginModal);
    const error = useSelector(state => state.royalfutReducer.errorMessage);
    const modal_component = useSelector(
        state => state.royalfutReducer.modalComponent
    );
    const currentCurrencyState = useSelector(
        state => state.royalfutCurrencyReducer.currency
    );
    const stateOrderCoins = useSelector(
        state => state.royalfutOrderReducer.order_coins_amount
    );
    const stateCoins = useSelector(state => state.royalfutReducer.calcCoins);
    const stateDir = useSelector(state => state.royalfutReducer.direction);
    const stateCurrency = useSelector(
        state => state.royalfutCurrencyReducer.currency
    );
    const stateModalCalc = useSelector(
        state => state.royalfutReducer.modalCalc
    );
    const stateModalFunnelCalc = useSelector(
        state => state.royalfutReducer.modalFunnelCalc
    );
    const stateModalFunnelMethod = useSelector(
        state => state.royalfutReducer.modalFunnelMethod
    );
    const stateModalFunnelMethodVideo = useSelector(
        state => state.royalfutReducer.modalFunnelMethodVideo
    );
    const stateModalFunnelProcess = useSelector(
        state => state.royalfutReducer.modalFunnelProcess
    );
    const stateModalPassword = useSelector(
        state => state.royalfutReducer.modalPassword
    );
    const stateModalIframe = useSelector(
        state => state.royalfutReducer.modalIframe
    );
    const stateModalAva = useSelector(state => state.royalfutReducer.modalAva);
    const stateUser = useSelector(state => state.royalfutReducer.user);
    const stateLocale = useSelector(
        state => state.royalfutLocaleReducer.locale
    );
    const stateCreateOrder = useSelector(
        state => state.royalfutReducer.createOrder
    );
    const statePromoData = useSelector(
        state => state.royalfutPromocodeReducer.promo_order
    );
    const stateCalcFunnel = useSelector(
        state => state.royalfutReducer.calcFunnel
    );
    const statePlatform = useSelector(state => state.royalfutReducer.platform);
    const stateMethod = useSelector(state => state.royalfutReducer.method);
    const stateStock = useSelector(state => state.royalfutReducer.stock);
    const dispatch = useDispatch();

    const router = useRouter();
    const { pathname, query, asPath } = router;
    const tr = newTranslates[router.locale];

    const origin =
        typeof window !== "undefined" && window.location.origin
            ? window.location.origin
            : "";

    const isOutsideClick = (event, ref) => {
        if (!ref.current.contains(event.target) && modal) {
            dispatch(loginModal(false));
        }
        if (
            !ref.current.contains(event.target) &&
            stateModalFunnelMethodVideo
        ) {
            dispatch(modalFunnelMethodVideo(false));
        }
        if (!ref.current.contains(event.target) && stateModalFunnelProcess) {
            dispatch(modalFunnelProcess(false));
        }
        if (!ref.current.contains(event.target) && stateModalFunnelMethod) {
            dispatch(modalFunnelMethod(false));
        }
        if (!ref.current.contains(event.target) && stateModalFunnelCalc) {
            dispatch(modalFunnelCalc(false));
        }
        if (!ref.current.contains(event.target) && stateModalCalc) {
            dispatch(modalCalc(false));
        }
    };
    const isOutsideClickContains = (event, ref) => {
        if (ref?.current) {
            if (ref.current.contains(event.target) && modal) {
                dispatch(loginModal(false));
            }
        }
    };

    const [esc, setEsc] = useState(0);
    const [userAuth, setUserAuth] = useState(null);
    const [viewCookie, setViewCookie] = useState(true);

    useEffect(() => {
        if (stateModalFunnelMethodVideo) {
            dispatch(modalFunnelMethodVideo(false));
        }
        if (stateModalFunnelMethod) {
            dispatch(modalFunnelMethod(false));
        }
        if (stateModalFunnelCalc) {
            dispatch(modalFunnelCalc(false));
        }
        if (stateModalCalc) {
            dispatch(modalCalc(false));
        }
    }, [esc]);

    useEffect(() => {
        if (stateUser.token) {
            setUserAuth({ wasLogged: true, wasUnlogged: false });
        }
        if (!stateUser.token && userAuth?.wasLogged) {
            setUserAuth({ wasLogged: true, wasUnlogged: true });
        }
    }, [stateUser?.token]);

    useEffect(() => {
        if (userAuth?.wasUnlogged === true) {
            dispatch(showMessage({ status: "info", text: tr.seo91 }));
            setTimeout(() => {
                setUserAuth({ wasLogged: false, wasUnlogged: false });
            }, 3000);
        }
    }, [userAuth]);

    useEffect(() => {
        if (error != "") {
            setTimeout(() => dispatch(catcherror("")), 3000);
        }
    }, [error]);

    const getError = err => {
        dispatch(showMessage({ status: "error", text: `${err}` }));
    };
    const getNotifyMessage = () => {
        localStorage.clear();
        localStorage.setItem("session", true);
        dispatch(userlogout());
        router.push("/");
    };

    useEffect(async () => {
        await api.getStock(getError).then(result => {
            if (result?.errors) {
                if (result.errors) {
                    dispatch(catcherror(res.errors));
                    return;
                }
            }

            dispatch(stock(result));
        });

        function isMyScriptLoaded(url) {
            if (!url) url = "https://xxx.co.uk/xxx/script.js";
            let scripts = document.getElementsByTagName("script");
            for (let i = scripts.length; i--; ) {
                if (scripts[i].src == url) return true;
            }
            return false;
        }

        // setTimeout(() => {
        //     let localSt = JSON.parse(localStorage.getItem('modalTimer'));
        //     if (!localSt && localSt != false) {
        //         console.log(localSt);
        //         // dispatch(modalTimer(true));
        //         // localStorage.setItem('modalTimer', true);
        //     }
        // }, 4000);

        const body = document.querySelector("body");
        if (body) {
            if (
                window.location.href.includes("test") ||
                window.location.href.includes("localhost") ||
                window.location.href.includes("vercel")
            ) {
                // console.log(window.location.href);
            } else {
                const noscript = document.createElement("noscript");
                const iframe = document.createElement("iframe");
                iframe.src =
                    "https://www.googletagmanager.com/ns.html?id=GTM-54RZGM9Z";
                iframe.height = "0";
                iframe.width = "0";
                iframe.style = "display:none;visibility:hidden";
                noscript.append(iframe);
                body.prepend(noscript);
            }
        }

        if (
            isMyScriptLoaded(
                "https://applepay.cdn-apple.com/jsapi/v1/apple-pay-sdk.js"
            ) == false
        ) {
            const url =
                "https://applepay.cdn-apple.com/jsapi/v1/apple-pay-sdk.js";
            const script = document.createElement("script");
            script.src = url;
            document.body.appendChild(script);
        }

        let googleScript = document.createElement("script");
        googleScript.onload = () => {
            onGooglePayLoaded();
        };
        googleScript.src = "https://pay.google.com/gp/p/js/pay.js";
        googleScript.defer = true;
        document.head.appendChild(googleScript);

        setTimeout(() => {
            window.addEventListener("scroll", function () {
                if (scrollY < 800 && scrolltop.current) {
                    scrolltop.current.style.opacity = "0";
                    scrolltop.current.style.width = "0";
                } else if (scrollY > 800 && scrolltop.current) {
                    scrolltop.current.style.opacity = "1";
                    scrolltop.current.style.width = "48px";
                }
            });
        }, 1000);

        setTimeout(() => {
            document.onkeydown = function (evt) {
                evt = evt || window.event;
                let isEscape = false;
                if ("key" in evt) {
                    isEscape = evt.key === "Escape" || evt.key === "Esc";
                } else {
                    isEscape = evt.keyCode === 27;
                }
                if (isEscape) {
                    setEsc(prev => prev + 1);
                }
            };
        }, 1000);

        if (localStorage.getItem("cookieClose")) {
            setViewCookie(false);
        }
        if (localStorage.getItem("session")) {
            dispatch(
                showMessage({
                    status: "info",
                    text: newTranslates[router.locale].seo92,
                })
            );
            setTimeout(() => localStorage.removeItem("session"), 300);
        }
        if (!localStorage.clearField) {
            // localStorage.clear();
            localStorage.setItem("clearField", new Date());
            // location.reload();
        }
        if (localStorage.clearField) {
            if (
                (new Date() - new Date(localStorage.getItem("clearField"))) /
                    (1000 * 60 * 60 * 24) >
                1
            ) {
                // localStorage.clear();
                localStorage.setItem("clearField", new Date());
                // location.reload();
            }
        }
        if (localStorage.getItem("localUser")) {
            let localUser = JSON.parse(localStorage.getItem("localUser"));
            if (!stateUser?.token) {
                dispatch(user(localUser));
            }
        }
        // async function getTranslatesFromCsv() {
        //     const response = await fetch('data/31_01_24.csv');
        //     const reader = response.body.getReader();
        //     const result = await reader.read(); // raw array
        //     const decoder = new TextDecoder('utf-8');
        //     const csv = decoder.decode(result.value);
        //     let table = csvJSON(csv);
        //     for (let key in table) {
        //         console.log(table[key]);
        //         table[key] = { ...table[key], ...newTranslates[key] };
        //     }
        //     console.log(table);
        // }

        // getTranslatesFromCsv();
    }, []);

    useEffect(() => {
        if (stateUser.token) {
            setViewCookie(false);
        }
    }, [stateUser]);

    useEffect(() => {
        api.getCriptorates(currentCurrencyState.title, getError).then(res =>
            dispatch(getCriptoLimits(res))
        );
    }, [currentCurrencyState.title]);

    useEffect(() => {
        if (
            window.location.origin.indexOf("localhost") >= 0 ||
            window.location.origin.indexOf("test") >= 0 ||
            window.location.origin.indexOf("royalfut") >= 0
        ) {
            if (router.route.indexOf("order") < 0) {
                localStorage.removeItem("/order");
                dispatch(orderPage(null));
            }
            if (router.route.indexOf("coins") < 0) {
                localStorage.removeItem("/coins");
                dispatch(orderPage(null));
            }
        }

        if (router.locale != "ar") {
            if (stateDir === "rtl") {
                dispatch(changeDir("ltr"));
            }
        } else {
            if (stateDir === "ltr") {
                dispatch(changeDir("rtl"));
            }
        }
    }, [router]);
    useEffect(() => {
        let currentLangLocale = localStorage.getItem("locale");

        if (
            router.locale == "en" &&
            !window.location.href.includes("/en") &&
            currentLangLocale
        ) {
            currentLangLocale = JSON.parse(localStorage.getItem("locale"));
            dispatch(currentLang(currentLangLocale.title.toLowerCase()));
        } else if (
            !window.location.href.includes("/en") &&
            router.locale != "en" &&
            !currentLangLocale
        ) {
            dispatch(currentLang(router.locale));
        } else if (currentLangLocale) {
            currentLangLocale = JSON.parse(localStorage.getItem("locale"));
            if (stateLocale?.title != currentLangLocale.title) {
                dispatch(currentLang(currentLangLocale.title.toLowerCase()));
                setTimeout(() => {
                    router.push({ pathname, query }, asPath, {
                        locale: currentLangLocale.title.toLowerCase(),
                    });
                }, 500);
            }
        }
    }, []);

    useMemo(() => {
        if (typeof localStorage != "undefined") {
            localStorage.setItem(
                "statePlatform",
                JSON.stringify(statePlatform)
            );
        }
    }, [statePlatform]);

    useEffect(() => {
        if (statePromoData) {
            dispatch(getPromoOrder(null));
            if (stateCreateOrder?.promoCode) {
                api.updateOrder(
                    stateCreateOrder.id,
                    stateUser.token,
                    stateCreateOrder.platform,
                    stateCreateOrder.deliveryMethod,
                    stateCreateOrder.coinCount,
                    stateCurrency.title,
                    null,
                    getError
                ).then(res => {
                    res.labels.length = 1;
                    dispatch(userCreateOrder(res));
                });
            }
        }
        if (localStorage.getItem("promocode")) {
            const url = JSON.parse(localStorage.getItem("promocode"))?.url;
            if (url != router.asPath) {
                localStorage.removeItem("promocode");
                dispatch(getPromoOrder(null));
            }
        }
    }, [router?.asPath]);

    useMemo(() => {
        if (stateUser?.token) {
            let localCoins = +stateCoins;
            if (router.asPath.includes("purchase") && stateCalcFunnel?.coins) {
                localCoins = +stateCalcFunnel.coins;
            }
            if (router.asPath.includes("order") && stateOrderCoins) {
                localCoins = +stateOrderCoins;
            }
            let promocode = null;
            if (statePromoData?.value) {
                if (statePromoData?.promoCode) {
                    promocode = statePromoData?.promoCode;
                }
                if (statePromoData?.value) {
                    promocode = statePromoData?.value;
                }
            }
            if (localStorage.getItem("promocode")) {
                promocode = JSON.parse(
                    localStorage.getItem("promocode")
                )?.promocode;
            }
            api.createOrder(
                stateUser.token,
                statePlatform.ps ? "ps4" : "xbox",
                stateMethod.easy ? "Easy" : "Manual",
                currentCurrencyState.title,
                localCoins || +stateStock.minLimitSumCoins,
                null,
                getError,
                getNotifyMessage
            ).then(async res => {
                res.order.labels.length = 1;
                if (promocode) {
                    const upOrder = await api.updateOrder(
                        res.order.id,
                        stateUser?.token,
                        statePlatform.ps ? "ps4" : "xbox",
                        stateMethod.easy ? "Easy" : "Manual",
                        localCoins || +stateStock.minLimitSumCoins,
                        currentCurrencyState.title,
                        promocode,
                        getError
                    );
                    upOrder.labels.length = 1;
                    if (upOrder.promoCode) {
                        dispatch(getPromoOrder(upOrder));
                    } else {
                        dispatch(getPromoOrder(null));
                    }
                    dispatch(userCreateOrder(upOrder));
                } else {
                    dispatch(userCreateOrder(res.order));
                }
            });
        }
    }, [stateUser?.token]);

    return (
        <ErrorBoundary fallback={"Technical error. Please contact support"}>
            <>
                <Head>
                    {/* <script
                        src="//code.tidio.co/osqijol0sinxwewnvn10sew8faxn8sty.js"
                        async
                    ></script> */}

                    <link rel="manifest" href="/site.webmanifest" />

                    {noindex && <meta name="robots" content="noindex" />}

                    <meta
                        keywords={
                            "royalfut, EA FC 24, EA FC 24 coins, EA FC 24 players" +
                            (keywords || "")
                        }></meta>
                    <meta
                        name="description"
                        content={
                            description || seoTags[router.locale].description
                        }></meta>
                    <meta
                        name="google-site-verification"
                        content="5E2v-HBKpEQQ-7RVK_addvB2xZb5kG3CqKM7KKu-5jE"
                    />
                    <meta property="og:type" content="website" />
                    <meta property="og:url" content="https://royalfut.com" />
                    <meta property="og:title" content="ROYALFUT" />
                    <meta property="og:site_name" content="ROYALFUT" />
                    <meta
                        property="og:description"
                        content={
                            description || seoTags[router.locale].description
                        }
                    />
                    <meta
                        property="og:image"
                        content="https://royalfut.com/OpenGraph.jpg"></meta>
                    <meta property="og:image:width" content="500" />
                    <meta property="og:image:height" content="400" />
                    <meta
                        property="og:locale"
                        content={`${router.locale}_${router.locale.toUpperCase()}`}
                    />
                    <link rel="favicon" href="/favicon2.ico" />
                    <title>{title || "Royalfut.com"}</title>

                    {origin &&
                        (!origin.indexOf("local") ||
                            !origin.indexOf("test")) && (
                            <script
                                src="https://accounts.google.com/gsi/client"
                                async
                                defer></script>
                        )}
                    {origin && !origin.indexOf("local") && (
                        <script
                            src="https://www.youtube.com/iframe_api"
                            async
                            defer></script>
                    )}
                </Head>
                <div
                    className={`${
                        stateModalFunnelCalc ||
                        stateModalFunnelMethod ||
                        stateModalFunnelMethodVideo ||
                        stateModalFunnelProcess ||
                        stateModalPassword ||
                        stateModalIframe ||
                        stateModalAva
                            ? styles.shadow
                            : "hide"
                    }`}></div>

                <div className={`error ${error == "" ? "" : styles.showError}`}>
                    {error}
                </div>
                <Message />
                <DynamicComponentModal2 />

                <div
                    id={"content_container"}
                    className={`${styles.App} ${!customStyle ? styles.custom_style : customStyle}`}
                    onClick={e => {
                        isOutsideClick(e, wrapperModalRef);
                        isOutsideClickContains(e, shadowModalRef);
                    }}
                    dir={stateDir}>
                    <Header serverLocale={serverLocale} loyalty={loyalty} />
                    <LoyaltyData />
                    {noBread == true ? "" : <Breadcrumbs />}

                    <div
                        className={`${styles.app__burgerwrapper} ${modal && styles.show_container}`}
                        ref={wrapperModalRef}>
                        <DynamicComponentBurgerMenu />
                    </div>
                    <div className={styles.app_container_content}>
                        <ErrorBoundary
                            fallback={
                                "Technical error. Please contact support"
                            }>
                            {children}
                        </ErrorBoundary>
                    </div>
                    <div ref={scrolltop} className={`${styles.scroll_wrapper}`}>
                        <ScrollToTop />
                    </div>
                    {viewCookie && (
                        <div
                            dir={stateDir}
                            className={`${styles.cookie_wrapper}`}>
                            <Cookie />
                        </div>
                    )}

                    <Footer />
                </div>
            </>
        </ErrorBoundary>
    );
}

export default MainContainer;
