"use client";

import { API_PROJECT_PRIVATE_SELLER_ROUTES } from "@royalfut/collections";
import { getToken } from "./auth.actions";

export async function sendWalletAddress(
    _token: string | null = null,
    walletAddress: string
) {
    let token: string | null = _token;
    if (!token) {
        token = await getToken();
    }

    if (!token) return null;

    const res = await fetch(
        `${API_PROJECT_PRIVATE_SELLER_ROUTES.SEND_WALLET_ADDRESS}?wallet=${walletAddress}`,
        {
            method: "POST",
            headers: {
                Accept: "application/json, text/plain",
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,
            },
        }
    );

    const result = await res.json();
    if (res.status >= 400 || !result) {
        return null;
    }
    return result;
}
interface IMethods {
    [key: string]: string;
}

export async function withdrawRequest(
    _token: string | null = null,
    value: number,
    method: string
) {
    const methods: IMethods = {
        first: "CARD",
        sixth: "CRYPTO",
    };
    let token: string | null = _token;
    if (!token) {
        token = await getToken();
    }

    if (!token) return null;

    const res = await fetch(
        `${API_PROJECT_PRIVATE_SELLER_ROUTES.SELLER_WITHDRAW}?val=${value}&by=${methods[method]}`,
        {
            method: "POST",
            headers: {
                Accept: "application/json, text/plain",
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,
            },
        }
    );

    if (res.status >= 400 || !res) {
        return null;
    }

    const result = await res.text();

    return result;
}
