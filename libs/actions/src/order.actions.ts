/* eslint-disable max-lines */
// "use server";


import { ECCYIDs } from "@royalfut/enums";
import { getToken } from "./auth.actions";
import type { IAPIORDER, IOrder } from "@royalfut/interfaces";

export async function createOrder(
    _token: string | null = null
): Promise<IOrder | null> {
    let token: string | null = _token;
    if (!token) {
        token = await getToken();
    }

    if (!token) return null;

    const reqBody: IAPIORDER.CreateOrder.POST.Request.IBody = {
        "platform": "ps4",
        "coinsAmount": 100000,
        "currency": "USD",
    };
    const res = await fetch(
        "https://test-royalfut.com/newapi/seller/order",
        // "https://a16df9c8-93a4-4149-a1e8-a7b7290f204c.mock.pstmn.io/api/users/tokenlogin",
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

    const body: IAPIORDER.CreateOrder.POST.Response.IBody = await res.json();
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
        createdAt: body.createdAt
    };
}
export async function startSell(
    id: number | undefined,
    _token: string | null = null,
    mail: string,
    password: string,
    backupCode1: string
): Promise<IOrder | null> {
    let token: string | null = _token;
    if (!token) {
        token = await getToken();
    }

    if (!token) return null;

    const reqBody: IAPIORDER.CreateOrder.POST.Request.IBody = {
        "mail": mail,
        "password": password,
        "backupCode1": backupCode1,
    };
    const res = await fetch(
        `https://test-royalfut.com/newapi/seller/process/${id}`,
        // "https://a16df9c8-93a4-4149-a1e8-a7b7290f204c.mock.pstmn.io/api/users/tokenlogin",
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

    const body: IAPIORDER.CreateOrder.POST.Response.IBody = await res.json();
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
        createdAt: body.createdAt
    };
}

export async function updateOrder(
    id: number | undefined,
    _token: string | null = null,
    platform: string,
    coinsAmount: number,
    currency: ECCYIDs,
    mail: string,
    password: string,
    backupCode1: string
): Promise<IOrder | null> {
    let token: string | null = _token;
    if (!token) {
        token = await getToken();
    }
    if (!id) {
        const newOrder = await createOrder(token);
        if (newOrder && newOrder.id) {
            id = newOrder.id
        }        
    }

    if (!token) return null;

    const reqBody: IAPIORDER.UpdateOrder.PUT.Request.IBody = {    
        "id": id,
        "platform": platform,
        "coinsAmount": coinsAmount,
        "currency": currency,
        "mail": mail,
        "password": password,
        "backupCode1": backupCode1
    };
    const res = await fetch(
        'https://test-royalfut.com/newapi/seller/order',
        {
            method: "PUT",
            body: JSON.stringify(reqBody),
            headers: {
                Accept: "application/json, text/plain",
                "Content-Type": "application/json",
                Authorization: `Token ${token}`
            },
        }
    );

    const body: IAPIORDER.UpdateOrder.PUT.Response.IBody = await res.json();
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
        createdAt: body.createdAt
    };
}

export async function getOrders(
    _token: string | null = null
) {
    let token: string | null = _token;
    if (!token) {
        token = await getToken();
    }

    if (!token) return null;

    const res = await fetch(
        'https://test-royalfut.com/newapi/seller/orders',
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
}

export async function getPayouts(
    _token: string | null = null
) {
    let token: string | null = _token;
    if (!token) {
        token = await getToken();
    }

    if (!token) return null;

    const res = await fetch(
        'https://test-royalfut.com/newapi/seller/payouts',
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
}