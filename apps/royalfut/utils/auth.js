import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { t } from "@lingui/macro";
import { showMessage, user } from "../redux/actions/royalfutActions";

export async function fbAuth() {
    // eslint-disable-next-line no-unused-vars
    function testAPI() {
        // Testing Graph API after login.  See statusChangeCallback() for when this call is made.
        FB.api("/me", () => {});
    }

    async function authToken(token, url) {
        const dispatch = useDispatch();
        const router = useRouter();
        let result = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,
            },
        });

        // setUserData(response.user, true);
        // if (response.user.email) {
        //     analytics.logIn(response.user.email);
        // }
        const res = await result.json();

        if (res?.errors) {
            if (res.errors.email) {
                // dispatch(catcherror(res.errors.email[0]));
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
            setTimeout(
                () =>
                    dispatch(
                        showMessage({
                            status: "info",
                            // text: `You are logged as ${res.user.email}`,
                            text: t`seo89`.replace("[[X]]", res.user.email),
                        })
                    ),
                500
            );
        }

        // dispatch(user(res.user));
    }

    function statusChangeCallback(response) {
        // Called with the results from FB.getLoginStatus().
        if (response.status === "connected") {
            // Logged into your webpage and Facebook.
            // gtm dataLayer
            // testAPI();
        } else {
            // Not logged into your webpage or we are unable to tell.
            // console.debug(response);
        }
    }

    let fbScript = document.createElement("script");
    fbScript.onload = async () => {
        await FB.init({
            appId: "498453708184424",
            status: true,
            cookie: true, // Enable cookies to allow the server to access the session.
            xfbml: true, // Parse social plugins on this webpage.
            version: "v12.0", // Use this Graph API version for this call.
        });

        await FB.getLoginStatus(response => {
            // Called after the JS SDK has been initialized.
            statusChangeCallback(response); // Returns the login status.
        });

        await FB.login(
            response => {
                if (response.status === "connected") {
                    let t_url =
                        window.location.origin.indexOf("localhost") >= 0 ||
                        window.location.origin.indexOf("192.168") >= 0 ||
                        window.location.origin.indexOf("linestest.com") >= 0 ||
                        window.location.origin.indexOf("ngrok.io") >= 0 ||
                        window.location.origin.indexOf("bs-local.com") >= 0 ||
                        window.location.origin.indexOf("next") >= 0
                            ? "https://test-royalfut.com"
                            : window.location.origin;
                    let urlForLoginCode = "".concat(
                        t_url,
                        "/api/user/login/code"
                    );
                    const url = `${urlForLoginCode}/facebook?code=${response.authResponse.accessToken}`;
                    authToken(response.authResponse.accessToken, url);
                } else {
                    // The person is not logged into your webpage or we are unable to tell.
                }
            },
            { scope: "public_profile,email" }
        );
    };

    fbScript.src = `https://connect.facebook.net/en-EN/sdk.js`;
    fbScript.defer = true;
    fbScript.crossOrigin = "anonymous";
    document.head.appendChild(fbScript);
}
