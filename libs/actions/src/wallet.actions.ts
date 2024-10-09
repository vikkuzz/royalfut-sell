"use server";

import { API_PROJECT_PRIVATE_SELLER_ROUTES } from "@royalfut/collections";
import { getToken } from "./auth.actions";

export async function getWallet(_token: string | null = null) {
    try {
        let token: string | null = _token;
        if (!token) {
            token = await getToken();
        }

        if (!token) return null;

        const res = await fetch(
            API_PROJECT_PRIVATE_SELLER_ROUTES.GET_SELLER_BALANCE,
            {
                method: "GET",
                headers: {
                    Accept: "application/json, text/plain",
                    "Content-Type": "application/json",
                    Authorization: `Token ${token}`,
                },
            }
        );

        const wallet = await res.json();
        if (res.status >= 400 || !wallet) {
            return null;
        }

        return wallet;
    } catch (e) {
        return null;
    }
}
