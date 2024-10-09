import Head from "next/head";
import { useEffect, useMemo, useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { ErrorBoundary } from "react-error-boundary";
import { t } from "@lingui/macro";
import Message from "./Message/Message";
import Header from "./Header";
import Footer from "./Footer";
import LoyaltyData from "./LoyaltyProgram/LoyaltyData/LoyaltyData";
import Breadcrumbs from "./Breadcrumbs/Breadcrumbs";
import ScrollToTop from "./ScrollToTop/ScrollToTop";
import Cookie from "./Cookie/Cookie";
import api from "../Api/Api";
import { onGooglePayLoaded } from "../utils/google_unlimint";
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
import { currentLang } from "../redux/actions/royalfutLocaleAction";
import { getPromoOrder } from "../redux/actions/royalfutPromocodeAction";
import { orderPage } from "../redux/actions/royalfutOrderActions";

import styles from "../styles/App.module.scss";
import {
    allOrderLoyalData,
    getLoyaltyAllLevels,
    getLoyaltyLevels,
    getLoyaltyUser,
} from "../redux/actions/royalfutLoyaltyActions";

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
}) {
    return (
        <ErrorBoundary fallback={"Technical error. Please contact support"}>
            <HTMLHead
                noindex={noindex}
                keywords={keywords}
                description={description}
                title={title}
            />
            <ModalShadowOverlay />
            <ErrorMessage />
            {/* <Message /> */}
            <DynamicComponentModal2 />
            <Layout
                customStyle={customStyle}
                noBread={noBread}
                serverLocale={serverLocale}>
                {children}
            </Layout>
            <MountValidateData />
        </ErrorBoundary>
    );
}

export const MountValidateData = () => {
    const [esc, setEsc] = useState(0);
    const [userAuth, setUserAuth] = useState(null);
    const router = useRouter();
    const { pathname, query, asPath } = router;
    const dispatch = useDispatch();
    const ccy = useSelector(state => ({
        currency: state.royalfutCurrencyReducer.currency,
        locale: state.royalfutLocaleReducer.locale,
    }));
    const orders = useSelector(state => ({
        coins: state.royalfutOrderReducer.order_coins_amount,
    }));
    const stateAllLevels = useSelector(
        state => state.royalfutLoyaltyReducer.loyalty_all_levels
    );
    const state = useSelector(state => ({
        user: state.royalfutReducer.user,
        calc: state.royalfutReducer.modalCalc,
        funnel: state.royalfutReducer.calcFunnel,
        coins: state.royalfutReducer.calcCoins,
        funnelCalc: state.royalfutReducer.modalFunnelCalc,
        funnelMethod: state.royalfutReducer.modalFunnelMethod,
        funnelMethodVideo: state.royalfutReducer.modalFunnelMethodVideo,
        funnelProcess: state.royalfutReducer.modalFunnelProcess,
        password: state.royalfutReducer.modalPassword,
        iframe: state.royalfutReducer.modalIframe,
        ava: state.royalfutReducer.modalAva,
        dir: state.royalfutReducer.direction,
        createOrder: state.royalfutReducer.createOrder,
        platform: state.royalfutReducer.platform,
        method: state.royalfutReducer.method,
        stock: state.royalfutReducer.stock,
    }));
    const promo = useSelector(state => ({
        order: state.royalfutPromocodeReducer.promo_order,
    }));

    useEffect(() => {
        if (state.funnelMethodVideo) {
            dispatch(modalFunnelMethodVideo(false));
        }
        if (state.funnelMethod) {
            dispatch(modalFunnelMethod(false));
        }
        if (state.funnelCalc) {
            dispatch(modalFunnelCalc(false));
        }
        if (state.calc) {
            dispatch(modalCalc(false));
        }
    }, [esc]);

    useEffect(() => {
        if (state.user.token) {
            setUserAuth({ wasLogged: true, wasUnlogged: false });
        }
        if (!state.user.token && userAuth?.wasLogged) {
            setUserAuth({ wasLogged: true, wasUnlogged: true });
        }
    }, [state.user?.token]);

    useEffect(() => {
        if (userAuth?.wasUnlogged === true) {
            dispatch(showMessage({ status: "info", text: t`seo91` }));
            setTimeout(() => {
                setUserAuth({ wasLogged: false, wasUnlogged: false });
            }, 3000);
        }
    }, [userAuth]);

    const getError = useCallback(err => {
        dispatch(showMessage({ status: "error", text: `${err}` }));
    }, []);

    const getNotifyMessage = useCallback(() => {
        localStorage.clear();
        localStorage.setItem("session", true);
        dispatch(userlogout());
        router.push("/");
    }, []);

    useEffect(() => {
        const fetchStock = async () => {
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

            if (localStorage.getItem("session")) {
                dispatch(
                    showMessage({
                        status: "info",
                        text: t`seo92`,
                    })
                );
                setTimeout(() => localStorage.removeItem("session"), 300);
            }

            if (!localStorage.clearField) {
                localStorage.setItem("clearField", new Date());
            } else {
                if (
                    (new Date() -
                        new Date(localStorage.getItem("clearField"))) /
                        (1000 * 60 * 60 * 24) >
                    1
                ) {
                    localStorage.setItem("clearField", new Date());
                }
            }

            if (localStorage.getItem("localUser")) {
                let localUser = JSON.parse(localStorage.getItem("localUser"));
                if (!state.user?.token) {
                    dispatch(user(localUser));
                }
            }
        };

        fetchStock();
    }, []);

    useEffect(() => {
        api.getCriptorates(ccy.currency.title, getError).then(res =>
            dispatch(getCriptoLimits(res))
        );
    }, [ccy.currency.title]);

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
            if (state.dir === "rtl") {
                dispatch(changeDir("ltr"));
            }
        } else {
            if (state.dir === "ltr") {
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
            if (ccy.locale?.title != currentLangLocale.title) {
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
                JSON.stringify(state.platform)
            );
        }
    }, [state.platform]);

    useEffect(() => {
        if (promo.order) {
            dispatch(getPromoOrder(null));
            if (state.createOrder?.promoCode) {
                api.updateOrder(
                    state.createOrder.id,
                    state.user.token,
                    state.createOrder.platform,
                    state.createOrder.deliveryMethod,
                    state.createOrder.coinCount,
                    ccy.currency.title,
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
        if (state.user?.token) {
            let localCoins = +state.coins;
            if (router.asPath.includes("purchase") && state.funnel?.coins) {
                localCoins = +state.funnel.coins;
            }
            if (router.asPath.includes("order") && orders.coins) {
                localCoins = +orders.coins;
            }
            let promocode = null;
            if (promo.order?.value) {
                if (promo.order?.promoCode) {
                    promocode = promo.order?.promoCode;
                }
                if (promo.order?.value) {
                    promocode = promo.order?.value;
                }
            }
            if (localStorage.getItem("promocode")) {
                promocode = JSON.parse(
                    localStorage.getItem("promocode")
                )?.promocode;
            }
            api.createOrder(
                state.user.token,
                state.platform.ps ? "ps4" : "xbox",
                state.method.easy ? "Easy" : "Manual",
                ccy.currency.title,
                localCoins || +state.stock.minLimitSumCoins,
                null,
                getError,
                getNotifyMessage
            ).then(async res => {
                if (res.order) {
                    res.order.labels.length = 1;
                }

                if (promocode) {
                    const upOrder = await api.updateOrder(
                        res.order.id,
                        state.user?.token,
                        state.platform.ps ? "ps4" : "xbox",
                        state.method.easy ? "Easy" : "Manual",
                        localCoins || +state.stock.minLimitSumCoins,
                        ccy.currency.title,
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
        } else {
            dispatch(allOrderLoyalData(null));
            dispatch(getLoyaltyUser(null));
            const getLoyaltyTableFnc = async () => {
                await api.getLoyaltyTable().then(result => {
                    let zeroLevel = result.filter(el => el.level == 0)[0];
                    dispatch(getLoyaltyLevels(zeroLevel));
                    dispatch(getLoyaltyAllLevels(result));
                });
            };
            getLoyaltyTableFnc();
        }
    }, [state.user?.token]);

    return <></>;
};

const Layout = ({ children, customStyle, serverLocale, noBread }) => {
    const wrapperModalRef = useRef(null);
    const shadowModalRef = useRef(null);
    const stateDir = useSelector(state => state.royalfutReducer.direction);
    const modal = useSelector(state => state.royalfutReducer.loginModal);
    const dispatch = useDispatch();
    const stateModalFunnelMethod = useSelector(
        state => state.royalfutReducer.modalFunnelMethod
    );
    const stateModalFunnelMethodVideo = useSelector(
        state => state.royalfutReducer.modalFunnelMethodVideo
    );
    const stateModalFunnelProcess = useSelector(
        state => state.royalfutReducer.modalFunnelProcess
    );
    const stateModalFunnelCalc = useSelector(
        state => state.royalfutReducer.modalFunnelCalc
    );
    const stateModalCalc = useSelector(
        state => state.royalfutReducer.modalCalc
    );

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

    return (
        <div
            id="content_container"
            className={`${styles.App} ${!customStyle ? styles.custom_style : customStyle}`}
            onClick={e => {
                isOutsideClick(e, wrapperModalRef);
                isOutsideClickContains(e, shadowModalRef);
            }}
            dir={stateDir}>
            <Header serverLocale={serverLocale} />
            <LoyaltyData />
            {noBread == true ? "" : <Breadcrumbs />}
            <div
                className={`${styles.app__burgerwrapper} ${modal && styles.show_container}`}
                ref={wrapperModalRef}>
                <DynamicComponentBurgerMenu />
            </div>
            <div
                className={`${styles.app__burgerwrapper} ${modal && styles.show_container}`}
                ref={wrapperModalRef}>
                <DynamicComponentBurgerMenu />
            </div>
            <div className={styles.app_container_content}>
                <ErrorBoundary
                    fallback={"Technical error. Please contact support"}>
                    {children}
                </ErrorBoundary>
            </div>
            <ResetScroll />
            <CookieBanner />
            <Footer />
        </div>
    );
};

const CookieBanner = () => {
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
            <Cookie />
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

const ErrorMessage = () => {
    const error = useSelector(state => state.royalfutReducer.errorMessage);

    useEffect(() => {
        if (error != "") {
            setTimeout(() => dispatch(catcherror("")), 3000);
        }
    }, [error]);

    return (
        <div className={`error ${error == "" ? "" : styles.showError}`}>
            {error}
        </div>
    );
};

export const ModalShadowOverlay = () => {
    const modal = useSelector(state => ({
        funnelCalc: state.royalfutReducer.modalFunnelCalc,
        funnelMethod: state.royalfutReducer.modalFunnelMethod,
        funnelMethodVideo: state.royalfutReducer.modalFunnelMethodVideo,
        funnelProcess: state.royalfutReducer.modalFunnelProcess,
        password: state.royalfutReducer.modalPassword,
        iframe: state.royalfutReducer.modalIframe,
        ava: state.royalfutReducer.modalAva,
    }));

    return (
        <div
            className={`${
                modal.funnelCalc ||
                modal.funnelMethod ||
                modal.funnelMethodVideo ||
                modal.funnelProcess ||
                modal.password ||
                modal.iframe ||
                modal.ava
                    ? styles.shadow
                    : "hide"
            }`}></div>
    );
};

const HTMLHead = ({ noindex, keywords, description, title }) => {
    const router = useRouter();

    const origin =
        typeof window !== "undefined" && window.location.origin
            ? window.location.origin
            : "";

    return (
        <Head>
            {/*
            <script
                src="//code.tidio.co/osqijol0sinxwewnvn10sew8faxn8sty.js"
                async
            ></script>
        */}
            <link rel="manifest" href="/site.webmanifest" />
            {noindex && <meta name="robots" content="noindex" />}
            <meta
                keywords={
                    "royalfut, EA FC 24, EA FC 24 coins, EA FC 24 players" +
                    (keywords || "")
                }></meta>
            <meta
                name="description"
                content={description || t`seo:root:description`}></meta>
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
                content={description || t`seo:root:description`}
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
                (!origin.indexOf("local") || !origin.indexOf("test")) && (
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
    );
};

export default MainContainer;
