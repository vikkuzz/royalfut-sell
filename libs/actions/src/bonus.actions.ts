"use server";

import { API_PROJECT_PUBLIC_ROUTES } from "@royalfut/collections";
import { getToken } from "./auth.actions";

import type { IAPI } from "@royalfut/interfaces";

export async function getBonusInfo(): Promise<IAPI.Root.Bonus.Info.GET.Response.Body | null> {
    const token = await getToken();

    try {
        const res = await fetch(API_PROJECT_PUBLIC_ROUTES.BONUS_INFO, {
            method: "GET",
            headers: {
                Accept: "application/json, text/plain",
                "Content-Type": "application/json",
                ...(token
                    ? {
                          Authorization: `Token ${token}`,
                      }
                    : {}),
            },
        });

        if (res.status >= 400) {
            throw new Error();
        }

        const body: IAPI.Root.Bonus.Info.GET.Response.Body = await res.json();
        if (!body) {
            throw new Error();
        }

        return body;
    } catch (e) {
        return null;
    }
}

export async function getBonusLevels(): Promise<IAPI.Root.Bonus.Levels.GET.Response.Body | null> {
    const token = await getToken();

    try {
        const res = await fetch(API_PROJECT_PUBLIC_ROUTES.BONUS_LEVELS, {
            method: "GET",
            headers: {
                Accept: "application/json, text/plain",
                "Content-Type": "application/json",
                ...(token
                    ? {
                          Authorization: `Token ${token}`,
                      }
                    : {}),
            },
        });
        if (res.status >= 400) {
            throw new Error();
        }

        const body: IAPI.Root.Bonus.Levels.GET.Response.Body = await res.json();
        if (!body) {
            throw new Error();
        }

        return body;
    } catch (e) {
        return null;
    }
}
