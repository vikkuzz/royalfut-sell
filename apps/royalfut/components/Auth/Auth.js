import { useDispatch } from "react-redux";
// import { t, Trans } from '@lingui/macro';
import Image from "next/legacy/image";
import { setCookie } from "../../utils/functions";
import { useGoogleLogin } from "@react-oauth/google";
import styles from "../../styles/BurgerMenu.module.scss";
import { showMessage, user } from "../../redux/actions/royalfutActions";
import Analitic from "../../Analitic/Analitic";
import { useTranslations } from "next-intl";

const analitic = new Analitic();

const Auth = ({ login }) => {
    const t = useTranslations("loginModal");
    const dispatch = useDispatch();
    const toastError = () => {
        dispatch(
            showMessage({
                status: "error",
                text: `twntwrng`,
            })
        );
    };
    const clickLogin = useGoogleLogin({
        onSuccess: googleAuth,
        onError: toastError,
    });

    async function authToken(url) {
        try {
            const result = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    referrerPolicy: "strict-origin-when-cross-origin",
                },
            });

            // setUserData(response.user, true);
            // if (response.user.email) {
            //     analytics.logIn(response.user.email);
            // }

            const res = await result.json();
            if (res?.errors) {
                if (res.errors.email) {
                    dispatch(
                        showMessage({
                            status: "error",
                            text: `${res.errors.email[0]}`,
                        })
                    );
                    return;
                }
            } else {
                dispatch(user(res.user));
                analitic.signIn(res.user.email, "google");
                localStorage.setItem("localUser", JSON.stringify(res.user));
                setCookie("auth-token", res.user.token);

                setTimeout(
                    () =>
                        dispatch(
                            showMessage({
                                status: "info",
                                // text: `You are logged as ${res.user.email}`,
                                text: t("logged").replace(
                                    "[[X]]",
                                    res.user.email
                                ),
                            })
                        ),
                    500
                );
            }
        } catch (e) {
            toastError();
        }
    }

    function googleAuth(response) {
        let url =
            window.location.origin.indexOf("localhost") >= 0 ||
            window.location.origin.indexOf("192.168") >= 0 ||
            window.location.origin.indexOf("linestest.com") >= 0 ||
            window.location.origin.indexOf("ngrok.io") >= 0 ||
            window.location.origin.indexOf("bs-local.com") >= 0 ||
            window.location.origin.indexOf("next") >= 0
                ? "https://test-royalfut.com"
                : window.location.origin;
        let urlForLoginCode = "".concat(url, "/api/user/login/code");

        authToken(
            `${urlForLoginCode}/GoogleOAuth?access_token=${response.access_token}`
        );
    }

    return (
        <div className={styles.auth}>
            <div className={`${styles.auth_text} ${styles.reg_text}`}>
                {!login
                    ? t("menu.or") + " " + t("menu.signupvia")
                    : t("menu.loginvia")}
            </div>
            <button className={styles.google_btn_mask} onClick={clickLogin}>
                <div className={`${styles.icon_wrapper}`}>
                    <Image
                        width={24}
                        height={24}
                        src={"/img/google-logo.png"}></Image>
                </div>
                <span className={styles.google_btn_text}>
                    {login
                        ? // <Trans>locales.modalSocialLoginGoogle</Trans>
                          t("menu.logingoogle")
                        : // <Trans>locales.modalSocialSiginGoogle</Trans>
                          t("menu.signupgoogle")}
                </span>
            </button>
        </div>
    );
};

export default Auth;
