"use server";

import { cookies } from "next/headers";
import { DefaultAppSettings, ccyCollection } from "@royalfut/collections";
import { ECCYIDs, ECookiesKeys } from "@royalfut/enums";

export const getCurrency = async () => {
    const cookieStore = cookies();
    const hasCookie = cookieStore.has(ECookiesKeys.CCY);
    const value = hasCookie ? cookieStore.get(ECookiesKeys.CCY)?.value : null;

    if (hasCookie && value) {
        if (Object.keys(ccyCollection).includes(value)) {
            return value as ECCYIDs;
        }
    }

    return DefaultAppSettings.currency;
};

export const setCurrency = async (id: ECCYIDs) => {
    const cookieStore = cookies();

    cookieStore.set({
        name: ECookiesKeys.CCY,
        value: String(id),
    });
};

export const deleteCurrency = async () => {
    const oneDay = 24 * 60 * 60 * 1000;
    cookies().set(ECookiesKeys.CCY, "", { expires: Date.now() - oneDay });
};
