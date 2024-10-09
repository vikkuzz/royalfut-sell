import { tokenLogin } from "@royalfut/actions";
import { i18nRedirect } from "@royalfut/hooks";
import { PROJECT_PUBLIC_SELLER_ROUTES } from "@royalfut/collections";
import { ECookiesKeys } from "@royalfut/enums";
import { cookies } from "next/headers";

import type { FC } from "react";

const LoginByToken: FC<{ params: { token: string } }> = async ({ params }) => {
    if (!params?.token) {
        i18nRedirect(PROJECT_PUBLIC_SELLER_ROUTES.UNAUTHORIZED_REDIRECT);
    }

    try {
        await tokenLogin(params.token);
        cookies().set(ECookiesKeys.AUTH_USER_TOKEN, params.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7,
            path: "/",
        });
        // redirect(PROJECT_PUBLIC_SELL_ROUTES.HOME);
    } catch (e) {
        // redirect(PROJECT_PUBLIC_SELL_ROUTES.UNAUTHORIZED_REDIRECT);
    }

    return null;
};

export default LoginByToken;
