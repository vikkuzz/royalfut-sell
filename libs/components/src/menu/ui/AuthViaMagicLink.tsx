/* eslint-disable max-lines */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Root, Field, Control, Submit } from "@radix-ui/react-form";
import * as z from "zod";
import { useSpinDelay } from "spin-delay";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { ZEmailValidation } from "@royalfut/scheme";
import {
    useAuthStore,
    useMagicLinkStore,
    useUISheetStore,
    useUserStore,
} from "@royalfut/store";
import { GradientButton, Input } from "@royalfut/ui";
import { GoogleLogoIcon } from "@royalfut/icons";
import { useAuthListener, useGoogleLogin } from "@royalfut/hooks";
import { cn } from "@royalfut/utils";
import { DividerMenu } from "./Divider";

import styles from "./Divider.module.scss";
import { setToken } from "@royalfut/actions";
import { UserProfileAvatars } from "@royalfut/collections";
import { IAPI } from "@royalfut/interfaces";

const profileFormSchema = z.object({
    email: ZEmailValidation,
});

type ProfileSchema = z.infer<typeof profileFormSchema>;
const Form = () => {
    const t = useTranslations("phoenix_pages.auth");
    const {
        register,
        handleSubmit,
        formState: { errors, isValid, dirtyFields },
    } = useForm<ProfileSchema>({
        resolver: zodResolver(profileFormSchema),
        mode: "onChange",
        shouldFocusError: true,
    });
    const [loading, setLoading] = useState(false);
    const { setIsSendedLink, setEmail } = useMagicLinkStore();
    const showSpinner = useSpinDelay(loading, { delay: 500, minDuration: 200 });

    const requestMagicLink = async (data: ProfileSchema) => {
        try {
            await fetch("https://test-royalfut.com/api/users/fastlogin", {
                method: "POST",
                body: JSON.stringify({ user: { email: data.email } }),
                headers: {
                    Accept: "application/json, text/plain",
                    "Content-Type": "application/json;charset=UTF-8",
                },
            });
            setEmail(data.email);
            setIsSendedLink(true);
            return false;
        } catch (e) {
            console.error(e);
            return true;
        }
    };

    const onSubmit = handleSubmit(async (data: ProfileSchema) => {
        setLoading(true);
        const rejected = await requestMagicLink(data);
        if (!rejected) {
            setLoading(false);
            return;
        }
        setLoading(false);
    });

    const showEmailMsg = dirtyFields["email"];
    const emailIsRight = showEmailMsg && !errors?.email?.message && isValid;
    const inputType = showEmailMsg
        ? !!errors?.email?.message && !isValid
            ? "error"
            : emailIsRight
              ? "success"
              : "primary"
        : "primary";

    return (
        <Root className="flex flex-col mt-8 space-y-3" onSubmit={onSubmit}>
            <Field name="email">
                <Control asChild>
                    <Input
                        {...register("email")}
                        required
                        placeholder={t("email.placeholder")}
                        borderType="box"
                        vtype={inputType}
                        cnBox="h-16 w-full"
                        type="email"
                        className="text-base px-4 font-medium"
                    />
                </Control>
                {errors?.email?.message && (
                    <span
                        className={cn(
                            "block will-change-[height] text-system-error text-xs transition-all duration-300",
                            {
                                "opacity-100 h-3.5 pt-1.5":
                                    inputType === "error",
                                "opacity-0 h-0 pt-0": inputType !== "error",
                            }
                        )}>
                        {t(errors.email.message)}
                    </span>
                )}
            </Field>
            <Submit asChild>
                <GradientButton
                    type="submit"
                    disabled={inputType !== "success"}
                    loading={showSpinner}
                    className="h-16 font-bold text-basse">
                    {t("action.login")}
                </GradientButton>
            </Submit>
        </Root>
    );
};

const AuthViaMagicLink = () => {
    const t = useTranslations("phoenix_pages.auth");
    const setIsLogged = useAuthStore(state => state.setIsLogged);
    const setUser = useUserStore(store => store.setUser);
    const { loginListener } = useAuthListener();
    const [setOpen] = useUISheetStore(state => [state.setOpen]);
    const toastError = () => {
        console.log("Error");
    };

    const onComplete = async (code: string) => {
        try {
            const res = await fetch("https://test-royalfut.com/api/user", {
                method: "GET",
                headers: {
                    Accept: "application/json, text/plain",
                    "Content-Type": "application/json",
                    Authorization: `Token ${code}`,
                },
            });
            const body: IAPI.Seller.FastLogin.POST.Response.Body =
                await res.json();
            const encryptedSessionData = body.user.token;
            await setToken(encryptedSessionData);
            const profile = {
                avatar:
                    UserProfileAvatars[
                        body.user
                            .profilePicture as keyof typeof UserProfileAvatars
                    ] ?? UserProfileAvatars[1],
                email: body.user.email,
                username: body.user.username,
            };
            setIsLogged(true);
            setOpen(false);
            setUser(profile);
            loginListener(profile);
            return true;
        } catch (e) {
            console.log(e);
            return false;
        }
    };

    async function authToken(url: RequestInfo | URL) {
        try {
            const result = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    // referrerPolicy: "strict-origin-when-cross-origin",
                },
            });

            const res = await result.json();
            if (res?.errors) {
                if (res.errors.email) {
                    return;
                }
            } else {
                onComplete(res.user.token);
            }
        } catch (e) {
            console.log(e);
        }
    }

    function googleAuth(response: { access_token: string }) {
        const url =
            window.location.origin.indexOf("localhost") >= 0 ||
            window.location.origin.indexOf("192.168") >= 0 ||
            window.location.origin.indexOf("linestest.com") >= 0 ||
            window.location.origin.indexOf("ngrok.io") >= 0 ||
            window.location.origin.indexOf("bs-local.com") >= 0 ||
            window.location.origin.indexOf("next") >= 0 ||
            window.location.origin.indexOf("test") >= 0
                ? "https://test-royalfut.com"
                : window.location.origin;
        const urlForLoginCode = "".concat(url, "/api/user/login/code");

        authToken(
            `${urlForLoginCode}/GoogleOAuth?access_token=${response.access_token}`
        );
    }

    const clickLogin = useGoogleLogin({
        onSuccess: googleAuth,
        onError: toastError,
    });

    return (
        <>
            <Form />
            <DividerMenu
                label={t("divider.1")}
                className={cn("mt-8", styles.lineOr)}
            />
            <button
                onClick={() => {
                    clickLogin();
                }}
                className="flex h-16 bg-white mt-16 w-full rounded-xl space-x-2 justify-center items-center">
                <GoogleLogoIcon className="w-6 h-6" />
                <span className="text-black font-bold text-base">
                    {t("oauth.google")}
                </span>
            </button>
        </>
    );
};

export default AuthViaMagicLink;
