// prettier-ignore
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Root, Field, Control, Submit } from "@radix-ui/react-form";
import * as z from "zod";
import { useSpinDelay } from "spin-delay";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZEmailValidation } from "@royalfut/scheme";
import { useMagicLinkStore } from "@royalfut/store";
import { GradientButton, Input } from "@royalfut/ui";
import { GoogleLogoIcon } from "@royalfut/icons";
import { useGoogleLogin } from "@react-oauth/google";
import { cn } from "@royalfut/utils";
import { DividerMenu } from "./Divider";

import styles from "./Divider.module.scss";

const profileFormSchema = z.object({
    email: ZEmailValidation,
});

type ProfileSchema = z.infer<typeof profileFormSchema>;
const Form = () => {
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
            await fetch(
                "https://test-royalfut.com/api/users/fastlogin",
                // await fetch(
                //     "https://b55e94a3-5b22-4435-9198-f23b65276f77.mock.pstmn.io/api/users/fastlogin-email",
                {
                    method: "POST",
                    body: JSON.stringify({ user: { email: data.email } }),
                    headers: {
                        Accept: "application/json, text/plain",
                        "Content-Type": "application/json;charset=UTF-8",
                    },
                }
            );
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
                        placeholder="Email"
                        borderType="box"
                        vtype={inputType}
                        cnBox="h-16 w-full"
                        type="email"
                        className="text-base px-4 font-medium"
                    />
                </Control>
                <span
                    className={cn(
                        "block will-change-[height] text-system-error text-xs transition-all duration-300",
                        {
                            "opacity-100 h-3.5 pt-1.5": inputType === "error",
                            "opacity-0 h-0 pt-0": inputType !== "error",
                        }
                    )}>
                    {errors?.email?.message}
                </span>
            </Field>
            <Submit asChild>
                <GradientButton
                    type="submit"
                    disabled={inputType !== "success"}
                    loading={showSpinner}
                    className="h-16 font-bold text-basse">
                    Get The Link
                </GradientButton>
            </Submit>
        </Root>
    );
};
const AuthViaMagicLink = () => {
    const toastError = () => {
        console.log("Error");
    };
    async function authToken(url: RequestInfo | URL) {
        try {
            const result = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    referrerPolicy: "strict-origin-when-cross-origin",
                },
            });

            const res = await result.json();
            if (res?.errors) {
                if (res.errors.email) {
                    console.log(res);
                    return;
                }
            } else {
                console.log(res);
            }
        } catch (e) {
            console.log(e);
        }
    }
    function googleAuth(response: { access_token: String }) {
        const url =
            window.location.origin.indexOf("localhost") >= 0 ||
            window.location.origin.indexOf("192.168") >= 0 ||
            window.location.origin.indexOf("linestest.com") >= 0 ||
            window.location.origin.indexOf("ngrok.io") >= 0 ||
            window.location.origin.indexOf("bs-local.com") >= 0 ||
            window.location.origin.indexOf("next") >= 0
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
            <DividerMenu label="or" className={cn("mt-8", styles.lineOr)} />
            <button
                onClick={() => clickLogin()}
                className="flex h-16 bg-white mt-16 w-full rounded-xl space-x-2 justify-center items-center">
                <GoogleLogoIcon className="w-6 h-6" />
                <span className="text-black font-bold text-base">
                    Continue With Google
                </span>
            </button>
        </>
    );
};
export default AuthViaMagicLink;
