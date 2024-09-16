"use server";

import { cookies } from "next/headers";
import { CookiesKeys } from "@royalfut/enums";
import {
    API_PROJECT_PUBLIC_ROUTES,
    UserProfileAvatars,
} from "@royalfut/collections";

import type { IAPI, IUserProfile } from "@royalfut/interfaces";

export async function getToken(): Promise<string | null> {
    const sessionData = cookies().get(CookiesKeys.AUTH_USER_TOKEN)?.value;

    return sessionData ? sessionData : null;
}

export async function setToken(token: string): Promise<boolean> {
    cookies().set(CookiesKeys.AUTH_USER_TOKEN, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
    });

    return true;
}

export async function handleFastLogin(
    credentials: IAPI.Seller.FastLogin.POST.Request.Body["user"]
): Promise<IUserProfile> {
    const reqBody: IAPI.Seller.FastLogin.POST.Request.Body = {
        user: credentials,
    };

    const res = await fetch(API_PROJECT_PUBLIC_ROUTES.FAST_LOGIN_BY_EMAIL, {
        method: "POST",
        body: JSON.stringify(reqBody),
        headers: {
            Accept: "application/json, text/plain",
            "Content-Type": "application/json",
        },
    });
    const body: IAPI.Seller.FastLogin.POST.Response.Body = await res.json();
    const encryptedSessionData = body.user.token;

    await setToken(encryptedSessionData);

    return {
        avatar:
            UserProfileAvatars[
                body.user.profilePicture as keyof typeof UserProfileAvatars
            ] ?? UserProfileAvatars[1],
        email: body.user.email,
        username: body.user.username,
    };
}

export const deleteLogin = async () => {
    const oneDay = 24 * 60 * 60 * 1000;
    cookies().set(CookiesKeys.AUTH_USER_TOKEN, "", {
        expires: Date.now() - oneDay,
    });
};
