"use server";

import {
    UserProfileAvatars,
    API_PROJECT_PUBLIC_ROUTES,
    API_PROJECT_PRIVATE_ROUTES,
} from "@royalfut/collections";
import { getToken } from "./auth.actions";

import type { IUserProfile, IAPI } from "@royalfut/interfaces";

export async function tokenLogin(token: string) {
    try {
        const reqBody: IAPI.Seller.TokenLogin.POST.Request.Body = {
            user: {
                loginToken: token,
            },
        };

        const res = await fetch(API_PROJECT_PUBLIC_ROUTES.USER_TOKEN_LOGIN, {
            method: "POST",
            body: JSON.stringify(reqBody),
            headers: {
                Accept: "application/json, text/plain",
                "Content-Type": "application/json",
            },
        });
        const body: IAPI.Seller.TokenLogin.POST.Response.Body =
            await res.json();
        if (res.status >= 400 || !body) {
            return null;
        }

        return true;
    } catch (e) {
        return null;
    }
}

export async function getUser(
    _token: string | null = null
): Promise<IUserProfile | null> {
    try {
        let token: string | null = _token;
        if (!token) {
            token = await getToken();
        }

        if (!token) return null;
        const res = await fetch(API_PROJECT_PRIVATE_ROUTES.GET_USER, {
            method: "GET",
            headers: {
                Accept: "application/json, text/plain",
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,
            },
        });

        const body = await res.json();
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
    } catch (e) {
        return null;
    }
}

export async function updateUser(
    reqBody: IAPI.Root.User.Update.PUT.Request.Body
): Promise<IUserProfile | IAPI.Root.User.Update.PUT.Response.FailureBody> {
    try {
        const token = await getToken();

        const res = await fetch(API_PROJECT_PRIVATE_ROUTES.UPDATE_USER, {
            method: "PUT",
            headers: {
                Accept: "application/json, text/plain",
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,
            },
            cache: "no-cache",
            body: JSON.stringify(reqBody),
        });

        if (res.status >= 400) {
            throw new Error();
        }

        const body: IAPI.Root.User.Update.PUT.Response.Body = await res.json();

        if (!body) {
            throw new Error();
        }

        return {
            avatar:
                UserProfileAvatars[
                    body.user.profilePicture as keyof typeof UserProfileAvatars
                ] ?? UserProfileAvatars[1],
            email: body.user.email,
            username: body.user.username,
        };
    } catch (e) {
        return {
            hasError: true,
        };
    }
}
