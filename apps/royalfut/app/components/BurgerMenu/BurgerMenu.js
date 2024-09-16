import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
// import { Trans, t } from '@lingui/macro';
import {
    loginClick,
    registrationClick,
    user,
    userlogout,
    loginModal,
    catcherror,
    getAllOrders,
    showMessage,
    userCreateOrder,
} from "../../../redux/actions/royalfutActions";
import MenuItem from "../../../components/MenuItem";
import Auth from "../../../components/Auth";
import api from "../../../Api/Api";
import Dropdown from "../../../components/Dropdown";
import Menu from "../../../components/Menu/Menu";
import { menuItems, profileItems } from "../../../data-elements/menuItems";
import OptionWithItems from "../../../components/OptionWithItems/OptionWithItems";
import { avatars } from "../../../data-elements/avatars";
import { getPromoOrder } from "../../../redux/actions/royalfutPromocodeAction";
import Analitic from "../../../Analitic/Analitic";
import { deleteCookie, setCookie } from "../../../utils/functions";
import UserPointsLoyalty from "../LoyaltyComponents/UserPointsLoyalty";

import styles from "./BurgerMenu.module.scss";
import { useTranslations } from "next-intl";

const analytic = new Analitic();

const BurgerMenu = () => {
    let stateBuyOff = useSelector(state => state.royalfutReducer.buy_of);
    const modal = useSelector(state => state.royalfutReducer.loginModal);
    const auth = useSelector(state => state.royalfutReducer.isAuth);
    const loginMenu = useSelector(state => state.royalfutReducer.loginMenu);
    const userData = useSelector(state => state.royalfutReducer.user);
    const locale = useSelector(state => state.royalfutLocaleReducer.locale);
    const stateDir = useSelector(state => state.royalfutReducer.direction);
    const viewPassBtn = React.createRef();
    const password = React.createRef();
    const email = React.createRef();
    const submit = React.createRef();
    const authpass = useRef(null);
    const message = useRef(null);
    const authEmail = useRef(null);
    const componentMenu = useRef(null);
    let eyeRd = "/img/eyeRd.svg";
    let eyeClosedRd = "/img/eye-closedRd.svg";

    const t = useTranslations("loginModal");

    const dispatch = useDispatch();
    const router = useRouter();

    const [svgEye, setSvgEye] = useState(eyeRd);
    const [passLength, setPassLength] = useState("");
    const [emailLength, setEmailLength] = useState("");
    const [isChecked, setIsChecked] = useState(false);
    const [validate, setValidate] = useState(false);
    const [emailPassErr, setEmailPassErr] = useState(false);
    const [correctEmail, setCorrectEmail] = useState(true);

    const EMAIL_REGEXP =
        /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

    function isEmailValid(value) {
        setEmailLength(value.length);
        return EMAIL_REGEXP.test(value);
    }

    const correctEmailOnBlur = e => {
        if (isEmailValid(e.target.value)) {
            setCorrectEmail(true);
        } else {
            setCorrectEmail(false);
        }
    };
    const getError = err => {
        dispatch(showMessage({ status: "error", text: `${err}` }));
    };

    useEffect(() => {
        if (!correctEmail && emailLength > 0) {
            authEmail.current.style.border = "1px solid #E84545 !important";
        }
    }, [correctEmail]);

    useEffect(() => {
        if ((modal && loginMenu.login) || (modal && loginMenu.registration)) {
            if (typeof password.current != "object") {
                setPassLength(password.current.value.length);
            }
        }
    }, [modal]);

    useEffect(() => {
        if (submit?.current != null) {
            if (
                (modal && loginMenu.login) ||
                (modal && loginMenu.registration)
            ) {
                passLength <= 7
                    ? (submit.current.disabled = true)
                    : (submit.current.disabled = false);

                if (passLength <= 7 && passLength > 0) {
                    authpass.current.style.border = "1px solid #E84545";
                    message.current.style.color = "#E84545";

                    setSvgEye("/img/warning-circle.svg");
                } else {
                    authpass.current.style.border =
                        "1px solid rgba(255,255,255,0.4)";
                    setSvgEye(eyeRd);
                    message.current.style.color = "rgba(255, 255, 255, 0.4)";
                }
            }
        }
    }, [passLength]);

    useEffect(() => {
        if (emailPassErr) {
            setTimeout(() => {
                authpass.current.style.border = "1px solid #FFFFFF";
                authEmail.current.style.border = "1px solid #FFFFFF";
                setEmailPassErr(false);
            }, 3000);
        }
    }, [emailPassErr]);

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    function handleClickOutside(event) {
        if (
            componentMenu.current &&
            !componentMenu.current.contains(event.target)
        ) {
            dispatch(loginModal(false));
        }
    }
    const onHandleClickLogin = () => {
        dispatch(loginClick());
    };
    const onHandleClickRegistration = () => {
        dispatch(registrationClick());
    };
    const onHandleClickViewPass = e => {
        e.stopPropagation();
        e.preventDefault();
        if (password.current.type == "text") {
            password.current.type = "password";
            setSvgEye(eyeRd);
        } else {
            password.current.type = "text";
            setSvgEye(eyeClosedRd);
        }
    };
    const onHandleChangePass = () => {
        setPassLength(password.current.value.length);
    };

    async function registration(e) {
        let lang_reg = `${window.navigator.language}-${window.navigator.language.toUpperCase()}`;

        await api
            .registration(
                email.current.value,
                password.current.value,
                null,
                lang_reg
            )
            .then(res => {
                if (res?.errors) {
                    if (res.errors.email) {
                        dispatch(
                            showMessage({
                                status: "error",
                                text: `${t("emailUse").replace("[[X]]", email.current.value)}`,
                            })
                        );
                        return;
                    }
                } else {
                    res.user.password = password.current.value;
                    localStorage.setItem("localUser", JSON.stringify(res.user));
                    analytic.signUp(res.user.email);
                    dispatch(user(res.user));
                    setCookie("auth-token", res.user.token);

                    setTimeout(
                        () =>
                            dispatch(
                                showMessage({
                                    status: "info",
                                    text: t("logged").replace(
                                        "[[X]]",
                                        res.user.email
                                    ),
                                })
                            ),
                        500
                    );
                }
            });
    }
    async function login(e) {
        e.stopPropagation();
        e.preventDefault();

        await api
            .login(
                email.current.value,
                password.current.value,
                getError,
                null,
                locale
            )
            .then(res => {
                if (res?.errors) {
                    if (res.errors.email) {
                        dispatch(catcherror(res.errors.email[0]));
                        return;
                    }
                } else {
                    res.user.password = password.current.value;
                    setCookie("auth-token", res.user.token);
                    localStorage.setItem("localUser", JSON.stringify(res.user));

                    dispatch(user(res.user));
                    analytic.signIn(res.user.email, "email");
                    setTimeout(
                        () =>
                            dispatch(
                                showMessage({
                                    status: "info",
                                    text: t("logged").replace(
                                        "[[X]]",
                                        res.user.email
                                    ),
                                })
                            ),
                        500
                    );
                }
                if (res.errors?.["email or password"]) {
                    authpass.current.style.border =
                        "1px solid #E84545 !important";
                    authEmail.current.style.border =
                        "1px solid #E84545 !important";
                    setEmailPassErr(true);
                }
            });
    }
    const logout = () => {
        localStorage.clear();
        deleteCookie("auth-token");
        dispatch(userlogout());
        dispatch(userCreateOrder({}));
        dispatch(getPromoOrder(null));
        router.push("/");
    };

    let menu = null;
    if (modal === true && auth === true) {
        menu = (
            <div className={`${styles.burger_menu}`} ref={componentMenu}>
                <div
                    dir={stateDir}
                    className={`${styles.burger_drop_container} ${window.innerWidth > 1024 && "hide"}`}>
                    <Dropdown burger={true} />
                </div>

                <button
                    type="button"
                    name="menu"
                    dir={stateDir}
                    onClick={() => dispatch(loginModal(false))}
                    className={`${styles.close_menu}`}></button>
                <div
                    className={`${styles.burger_menu__wrapper} ${styles.burger_menu_mobile}`}>
                    {auth ? (
                        <div className={styles.login_mobile}>
                            <div className={`${styles.user_ava_wrapper}`}>
                                <img
                                    className={`${styles.user_ava}`}
                                    src={`${
                                        avatars.filter(
                                            el =>
                                                el.id == userData.profilePicture
                                        )[0]?.src || avatars[0].src
                                    }`}
                                    alt="ava"
                                />
                            </div>
                            <div className={`${styles.wrapper_points}`}>
                                <UserPointsLoyalty />
                            </div>
                            <Link
                                href="/profile"
                                rel="nofollow"
                                onClick={() => {
                                    dispatch(getAllOrders({}));
                                    dispatch(loginModal(false));
                                }}
                                className={`${styles.header_mail} ${styles.burger_mail} ${
                                    stateBuyOff && "disabled"
                                }`}>
                                {userData.email}
                            </Link>
                            <button
                                type="button"
                                name="logout"
                                onClick={logout}
                                className={`${styles.logout_btn} calc_btn buy_btn`}>
                                {/* <Trans>seo40</Trans> */}
                                {t("menu.logout")}
                                <img
                                    className={`${styles.logout_icon} calc_icon`}
                                    src="/img/logout.svg"
                                    alt="logout"
                                />
                            </button>
                        </div>
                    ) : (
                        <Link href={"/login"}>
                            <MenuItem text={t("menu.login")} />
                        </Link>
                    )}
                    <Menu
                        title={t("menu.profile")}
                        menuItems={profileItems}></Menu>
                    <div className={`${window.innerWidth > 1024 && "hide"}`}>
                        <Menu title={t("menu.menu")} menuItems={menuItems}>
                            <OptionWithItems />
                        </Menu>
                    </div>
                </div>
            </div>
        );
    } else if (modal === true && auth !== true) {
        menu = (
            <div className={`${styles.burger_menu_desk}`}>
                <div
                    dir={stateDir}
                    className={`${styles.burger_drop_container} ${window.innerWidth > 1024 && "hide"}`}>
                    <Dropdown burger={true} />
                </div>
                <button
                    type="button"
                    name="close"
                    dir={stateDir}
                    onClick={() => dispatch(loginModal(false))}
                    className={`${styles.close_menu}`}></button>
                <div className={styles.burger_menu__wrapper}>
                    <div className={styles.auth_container}>
                        <div className={styles.burger_auth_wrapper}>
                            <div
                                className={`${styles.burger_auth_btns_wrapper}`}>
                                <div className={styles.burger_btn_wrapper}>
                                    <button
                                        onClick={onHandleClickLogin}
                                        className={`${styles.auth_tab} ${
                                            loginMenu.registration &&
                                            "color_gray"
                                        } ${!loginMenu.registration && styles.psevdo}`}
                                        type="button"
                                        name="login">
                                        {/* <Trans>seo35</Trans> */}
                                        {t("menu.login")}
                                    </button>
                                </div>
                                <div className={styles.burger_btn_wrapper}>
                                    <button
                                        onClick={onHandleClickRegistration}
                                        className={`${styles.auth_tab} ${
                                            !loginMenu.registration &&
                                            "color_gray"
                                        } ${loginMenu.registration && styles.psevdo}`}
                                        type="button"
                                        name="sign up">
                                        {/* <Trans>seo34</Trans> */}
                                        {t("menu.signup")}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className={styles.fieldset_wrapper}>
                            <form className={styles.auth_form}>
                                <div className={`${styles.email_container}`}>
                                    <fieldset
                                        ref={authEmail}
                                        className={`${styles.auth_fieldset} ${styles.email_fieldset} ${
                                            !correctEmail &&
                                            emailLength > 0 &&
                                            styles.red_border
                                        }`}>
                                        <input
                                            ref={email}
                                            className={styles.auth_userdata}
                                            type="email"
                                            placeholder={"example@site.com"}
                                            onChange={() => {
                                                setCorrectEmail(true);
                                                setValidate(
                                                    isEmailValid(
                                                        email.current.value
                                                    )
                                                );
                                            }}
                                            onBlur={correctEmailOnBlur}></input>
                                    </fieldset>

                                    {!correctEmail && emailLength > 0 && (
                                        <span
                                            className={`${styles.err_message}`}>
                                            {/* <Trans>seo99</Trans> */}
                                            {t("menu.entervalidemail")}
                                        </span>
                                    )}
                                </div>

                                <fieldset
                                    className={`${styles.auth_fieldset} ${styles.fieldset_pass}`}
                                    ref={authpass}>
                                    <input
                                        onChange={onHandleChangePass}
                                        ref={password}
                                        className={styles.auth_userdata}
                                        type="password"
                                        placeholder={t(
                                            "menu.password"
                                        )}></input>
                                    <button
                                        ref={viewPassBtn}
                                        onClick={onHandleClickViewPass}
                                        className={styles.auth_view_pass}
                                        type="button"
                                        name="show pass"
                                        title={t("menu.seepass")}>
                                        <img src={svgEye} alt="eye" />
                                    </button>
                                </fieldset>
                                <div className={styles.num_simbols_wrapper}>
                                    {emailPassErr && (
                                        <span
                                            className={`${styles.err_message}`}>
                                            {/* <Trans>seo98</Trans> */}
                                            {t("menu.invalidemail")}
                                        </span>
                                    )}
                                    <span
                                        className={styles.simbols_text}
                                        ref={message}>
                                        {/* <Trans>locales.modalSignSymbols8</Trans> */}
                                        {t("menu.minlength")}
                                    </span>
                                </div>
                                {loginMenu.registration && (
                                    <fieldset className="social-login__forgot">
                                        <div
                                            id="signUpCheck"
                                            onClick={() =>
                                                setIsChecked(!isChecked)
                                            }
                                            className={`checkbox_area ${isChecked ? "approove" : ""}`}></div>
                                        <label
                                            onClick={() =>
                                                setIsChecked(!isChecked)
                                            }
                                            className={`social-login__label 
                                            
                                            `}
                                            htmlFor="signUpCheck">
                                            {/* <Trans>locales.modalSocialForgot</Trans> */}
                                            {t("menu.accept")}
                                        </label>
                                        <Link
                                            className={`social-login__link-check `}
                                            href="/terms/"
                                            locale={locale.title}
                                            onClick={() =>
                                                dispatch(loginModal(false))
                                            }>
                                            {/* <Trans>locales.modalSocialLoginCheck</Trans> */}
                                            {t("menu.terms")}
                                        </Link>
                                    </fieldset>
                                )}
                                <div className={styles.submit_wrapper}>
                                    {loginMenu.login ? (
                                        <button
                                            ref={submit}
                                            onClick={e => {
                                                login(e);
                                            }}
                                            className={`${styles.submit_btn}`}
                                            type="button"
                                            name="login">
                                            {/* <Trans>seo5</Trans> */}
                                            {t("menu.login")}
                                        </button>
                                    ) : (
                                        <button
                                            ref={submit}
                                            onClick={e => {
                                                registration(e);
                                            }}
                                            className={`${styles.submit_btn} ${
                                                passLength <= 7 ||
                                                !isChecked ||
                                                !validate
                                                    ? styles.disabled
                                                    : ""
                                            }`}
                                            type="button"
                                            name="sign up">
                                            {/* <Trans>locales.modalSignBtnUp</Trans> */}
                                            {t("menu.signup")}
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>
                        {loginMenu.login && (
                            <div>
                                <div>
                                    <Auth login={true} />
                                </div>
                            </div>
                        )}
                        {loginMenu.registration && (
                            <div className={styles.auth_content_wrapper}>
                                <Auth />
                            </div>
                        )}
                        <div
                            className={`${styles.menu_wrapper} ${window.innerWidth > 1024 && "hide"}`}>
                            <Menu title={t("menu.menu")} menuItems={menuItems}>
                                <OptionWithItems />
                            </Menu>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return menu;
};

export default BurgerMenu;
