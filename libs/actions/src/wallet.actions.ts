/* eslint-disable max-lines */
"use server";

import { getToken } from "./auth.actions";


export async function getWallet(
    _token: string | null = null
) {
    let token: string | null = _token;
    if (!token) {
        token = await getToken();
    }

    if (!token) return null;

    const res = await fetch(
        'https://test-royalfut.com/newapi/seller/balance',
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
}