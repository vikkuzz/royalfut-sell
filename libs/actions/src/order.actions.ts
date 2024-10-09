/* eslint-disable max-lines */
"use server";

import { getToken } from "./auth.actions";
import {
    API_PROJECT_PRIVATE_SELLER_ROUTES,
    API_PROJECT_PRIVATE_WWW_ROUTES,
} from "@royalfut/collections";
import {
    EAppPlatforms,
    ECCYIDs,
    ESEOPlatforms,
    EWalletWithdrawMethods,
} from "@royalfut/enums";
import { capitalizeFirstLetter } from "@royalfut/utils";

import type { IAPI, IOrder } from "@royalfut/interfaces";

type TOrderDataArgs = Omit<
    IAPI.WWW.Order.Create.POST.Request.Body,
    "currency" | "deliveryMethod" | "platform"
> & {
    currency: ECCYIDs;
    deliveryMethod: EWalletWithdrawMethods;
    platform: EAppPlatforms;
};

export async function createOrder(
    data: TOrderDataArgs
): Promise<IAPI.WWW.Order.Create.POST.Response.Body["order"] | null> {
    try {
        const token = await getToken();
        if (!token) {
            throw new Error();
        }

        const reqBody: IAPI.WWW.Order.Create.POST.Request.Body = {
            coinCount: data.coinCount,
            promoCode: data.promoCode,
            currency: data.currency.toUpperCase(),
            platform:
                data.platform === EAppPlatforms.PlayStation
                    ? ESEOPlatforms.PlayStation4
                    : data.platform,
            deliveryMethod: capitalizeFirstLetter(data.deliveryMethod),
        };

        const res = await fetch(API_PROJECT_PRIVATE_WWW_ROUTES.CREATE_ORDER, {
            method: "POST",
            body: JSON.stringify(reqBody),
            headers: {
                Accept: "application/json, text/plain",
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,
            },
        });

        if (res.status >= 400) {
            throw new Error();
        }

        const body: IAPI.WWW.Order.Create.POST.Response.Body = await res.json();
        if (!body) {
            throw new Error();
        }

        return body.order;
    } catch (e) {
        return null;
    }
}

export async function updateOrder(
    data: TOrderDataArgs
): Promise<IAPI.WWW.Order.Update.PUT.Response.Body | null> {
    try {
        const token = await getToken();
        if (!token) {
            throw new Error();
        }

        const reqBody: IAPI.WWW.Order.Create.POST.Request.Body = {
            coinCount: data.coinCount,
            promoCode: data.promoCode,
            currency: data.currency.toUpperCase(),
            platform:
                data.platform === EAppPlatforms.PlayStation
                    ? ESEOPlatforms.PlayStation4
                    : data.platform,
            deliveryMethod: capitalizeFirstLetter(data.deliveryMethod),
        };

        const res = await fetch(API_PROJECT_PRIVATE_WWW_ROUTES.UPDATE_ORDER, {
            method: "PUT",
            body: JSON.stringify(reqBody),
            headers: {
                Accept: "application/json, text/plain",
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,
            },
        });

        if (res.status >= 400) {
            throw new Error();
        }

        const body: IAPI.WWW.Order.Update.PUT.Response.Body = await res.json();
        if (!body) {
            throw new Error();
        }

        return body;
    } catch (e) {
        return null;
    }
}

export async function createSellOrder(
    _token: string | null = null
): Promise<IOrder | null> {
    try {
        let token: string | null = _token;
        if (!token) {
            token = await getToken();
        }

        if (!token) return null;

        const reqBody: IAPI.Seller.CreateOrder.POST.Request.Body = {
            "platform": "ps4",
            "coinsAmount": 100000,
            "currency": "USD",
        };
        const res = await fetch(
            API_PROJECT_PRIVATE_SELLER_ROUTES.CREATE_ORDER,
            {
                method: "POST",
                body: JSON.stringify(reqBody),
                headers: {
                    Accept: "application/json, text/plain",
                    "Content-Type": "application/json",
                    Authorization: `Token ${token}`,
                },
            }
        );

        const body: IAPI.Seller.CreateOrder.POST.Response.Body =
            await res.json();
        if (res.status >= 400 || !body) {
            return null;
        }

        return {
            id: body.id,
            platform: body.platform,
            coinsAmount: body.coinsAmount,
            estimatedPrice: body.estimatedPrice,
            currency: body.currency,
            mail: body.mail,
            password: body.password,
            backupCode1: body.backupCode1,
            backupCode2: body.backupCode2,
            backupCode3: body.backupCode3,
            backupCode4: body.backupCode4,
            backupCode5: body.backupCode5,
            backupCode6: body.backupCode6,
            status: body.status,
            editable: body.editable,
            canPlace: body.canPlace,
            createdAt: body.createdAt,
        };
    } catch (e) {
        return null;
    }
}

export async function startSell(
    id: number | undefined,
    _token: string | null = null,
    mail: string,
    password: string,
    backupCode1: string
): Promise<IOrder | null> {
    try {
        let token: string | null = _token;
        if (!token) {
            token = await getToken();
        }

        if (!token) return null;

        const reqBody: IAPI.Seller.CreateOrder.POST.Request.Body = {
            "mail": mail,
            "password": password,
            "backupCode1": backupCode1,
        };
        const res = await fetch(
            `${API_PROJECT_PRIVATE_SELLER_ROUTES.SELLER_PROCESS}/${id}`,
            {
                method: "POST",
                body: JSON.stringify(reqBody),
                headers: {
                    Accept: "application/json, text/plain",
                    "Content-Type": "application/json",
                    Authorization: `Token ${token}`,
                },
            }
        );

        const body: IAPI.Seller.CreateOrder.POST.Response.Body =
            await res.json();
        if (res.status >= 400 || !body) {
            return null;
        }

        return {
            id: body.id,
            platform: body.platform,
            coinsAmount: body.coinsAmount,
            estimatedPrice: body.estimatedPrice,
            currency: body.currency,
            mail: body.mail,
            password: body.password,
            backupCode1: body.backupCode1,
            backupCode2: body.backupCode2,
            backupCode3: body.backupCode3,
            backupCode4: body.backupCode4,
            backupCode5: body.backupCode5,
            backupCode6: body.backupCode6,
            status: body.status,
            editable: body.editable,
            canPlace: body.canPlace,
            createdAt: body.createdAt,
        };
    } catch (e) {
        return null;
    }
}

// eslint-disable-next-line max-params
export async function updateSellOrder(
    id: number | undefined,
    _token: string | null = null,
    platform: string,
    coinsAmount: number,
    currency: ECCYIDs,
    mail: string,
    password: string,
    backupCode1: string
): Promise<IOrder | null> {
    try {
        let token: string | null = _token;
        if (!token) {
            token = await getToken();
        }
        if (!id) {
            const newOrder = await createSellOrder(token);
            if (newOrder && newOrder.id) {
                id = newOrder.id;
            }
        }

        if (!token) return null;

        const reqBody: IAPI.Seller.UpdateOrder.PUT.Request.Body = {
            "id": id,
            "platform": platform,
            "coinsAmount": coinsAmount,
            "currency": currency,
            "mail": mail,
            "password": password,
            "backupCode1": backupCode1,
        };
        const res = await fetch(
            API_PROJECT_PRIVATE_SELLER_ROUTES.UPDATE_ORDER,
            {
                method: "PUT",
                body: JSON.stringify(reqBody),
                headers: {
                    Accept: "application/json, text/plain",
                    "Content-Type": "application/json",
                    Authorization: `Token ${token}`,
                },
            }
        );

        const body: IAPI.Seller.UpdateOrder.PUT.Response.Body =
            await res.json();
        if (res.status >= 400 || !body) {
            return null;
        }

        return {
            id: body.id,
            platform: body.platform,
            coinsAmount: body.coinsAmount,
            estimatedPrice: body.estimatedPrice,
            currency: body.currency,
            mail: body.mail,
            password: body.password,
            backupCode1: body.backupCode1,
            backupCode2: body.backupCode2,
            backupCode3: body.backupCode3,
            backupCode4: body.backupCode4,
            backupCode5: body.backupCode5,
            backupCode6: body.backupCode6,
            status: body.status,
            editable: body.editable,
            canPlace: body.canPlace,
            createdAt: body.createdAt,
        };
    } catch (e) {
        return null;
    }
}

export async function getOrders(_token: string | null = null, page: number) {
    try {
        let token: string | null = _token;
        if (!token) {
            token = await getToken();
        }
        if (!page) {
            page = 1;
        }

        if (!token) return null;

        const res = await fetch(
            `${API_PROJECT_PRIVATE_SELLER_ROUTES.SELLER_ORDERS}?page=${page}&pageSize=10`,
            {
                method: "GET",
                headers: {
                    Accept: "application/json, text/plain",
                    "Content-Type": "application/json",
                    Authorization: `Token ${token}`,
                },
            }
        );

        const orders = await res.json();
        if (res.status >= 400 || !orders) {
            return null;
        }

        return orders;
    } catch (e) {
        return null;
    }
}

export async function getPayouts(_token: string | null = null, page: number) {
    try {
        let token: string | null = _token;
        if (!token) {
            token = await getToken();
        }

        if (!token) return null;

        const res = await fetch(
            `${API_PROJECT_PRIVATE_SELLER_ROUTES.SELLER_PAYOUTS}?page=${page}`,
            {
                method: "GET",
                headers: {
                    Accept: "application/json, text/plain",
                    "Content-Type": "application/json",
                    Authorization: `Token ${token}`,
                },
            }
        );

        const payouts = await res.json();
        if (res.status >= 400 || !payouts) {
            return null;
        }

        return payouts;
    } catch (e) {
        return null;
    }
}

export async function placeOrder(
    id: number | string,
    body: any,
    _token: string | null,
    route: string
) {
    let token: string | null = _token;
    if (!token) {
        token = await getToken();
    }

    if (!token) return null;
    const urlForPlace = `${route}api/order/${id}/place`;

    const res = await fetch(`${urlForPlace}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
        },
        body: JSON.stringify(body),
    });
    const result = await res.json();
    return result;
}
