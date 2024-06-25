import { tokenLogin } from "@royalfut/actions";
import { redirect } from "next/navigation";
import { PUBLIC_ROUTES } from "@royalfut/collections";
import { CookiesKeys } from "@royalfut/enums";
import { cookies } from "next/headers";

import type { FC } from "react";

const LoginByToken: FC<{ params: { token: string } }> = async ({ params }) => {
    if (!params?.token) {
        redirect(PUBLIC_ROUTES.UNAUTHORIZED_REDIRECT);
    }

    try {
        console.log(params, "params");
        await tokenLogin(params.token);
        cookies().set(CookiesKeys.AUTH_USER_TOKEN, params.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7,
            path: "/",
        });
        // redirect(PUBLIC_ROUTES.HOME);
    } catch (e) {
        // redirect(PUBLIC_ROUTES.UNAUTHORIZED_REDIRECT);
    }

    return null;
};

export default LoginByToken;
