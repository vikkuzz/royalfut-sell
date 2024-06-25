"use server";

import { cookies } from "next/headers";
import { CookiesKeys } from "@royalfut/enums";
import { UserProfileAvatars } from "@royalfut/collections";

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
    credentials: IAPI.FastLogin.POST.Request.IBody["user"]
): Promise<IUserProfile> {
    const reqBody: IAPI.FastLogin.POST.Request.IBody = {
        user: credentials,
    };

    const res = await fetch(
        "https://test-royalfut.com/api/users/fastlogin",
        //  "https://25e655c4-31b2-4a79-89f9-e779121bfc4e.mock.pstmn.io/api/users/fastlogin",
        {
            method: "POST",
            body: JSON.stringify(reqBody),
            headers: {
                Accept: "application/json, text/plain",
                "Content-Type": "application/json",
            },
        }
    );
    const body: IAPI.FastLogin.POST.Response.IBody = await res.json();
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
