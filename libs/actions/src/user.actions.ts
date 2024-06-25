"use server";

import { UserProfileAvatars } from "@royalfut/collections";
import { getToken } from "./auth.actions";

import type { IUserProfile, IAPI } from "@royalfut/interfaces";

export async function tokenLogin(token: string) {
    const reqBody: IAPI.TokenLogin.POST.Request.IBody = {
        user: {
            loginToken: token,
        },
    };

    const res = await fetch(
        'https://test-royalfut.com/api/users/tokenlogin',
        // "https://a16df9c8-93a4-4149-a1e8-a7b7290f204c.mock.pstmn.io/api/users/tokenlogin",
        {
            method: "POST",
            body: JSON.stringify(reqBody),
            headers: {
                Accept: "application/json, text/plain",
                "Content-Type": "application/json",
            },
        }
    );
    const body: IAPI.TokenLogin.POST.Response.IBody = await res.json();
    if (res.status >= 400 || !body) {
        return null;
    }

    return true;
}

export async function getUser(
    _token: string | null = null
): Promise<IUserProfile | null> {
    let token: string | null = _token;
    if (!token) {
        token = await getToken();
    }

    if (!token) return null;

    const reqBody: IAPI.TokenLogin.POST.Request.IBody = {
        user: {
            loginToken: token,
        },
    };
    const res = await fetch(
        // 'https://test-royalfut.com/api/users/tokenlogin',
        "https://a16df9c8-93a4-4149-a1e8-a7b7290f204c.mock.pstmn.io/api/users/tokenlogin",
        {
            method: "POST",
            body: JSON.stringify(reqBody),
            headers: {
                Accept: "application/json, text/plain",
                "Content-Type": "application/json",
            },
        }
    );

    const body: IAPI.TokenLogin.POST.Response.IBody = await res.json();
    if (res.status >= 400 || !body) {
        return null;
    }

    return {
        avatar:
            UserProfileAvatars[
                body.user.profilePicture as keyof typeof UserProfileAvatars
            ] ?? UserProfileAvatars[1],
        email: body.user.email,
        username: body.user.username,
    };
}
