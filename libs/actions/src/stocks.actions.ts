"use server";

import {
    API_PROJECT_PUBLIC_ROUTES,
    getAppSettings,
} from "@royalfut/collections";
import {
    WalletWithdrawMethods,
    EPlatforms,
    ECCYIDs,
    EProjects,
} from "@royalfut/enums";

import type { IAPI } from "@royalfut/interfaces";
import type { TPricePolicy } from "@royalfut/collections";

export async function getStocks(): Promise<TPricePolicy | null> {
    try {
        const settings = await getAppSettings();

        if (settings.project === EProjects.SELLER) {
            const res = await fetch(API_PROJECT_PUBLIC_ROUTES["GET_STOCKS"], {
                method: "GET",
                headers: {
                    Accept: "application/json, text/plain",
                    "Content-Type": "application/json",
                },
            });

            const data: IAPI.Seller.Stocks.GET.Response.Body = await res.json();
            if (res.status >= 400 || !data) {
                return null;
            }

            const result: TPricePolicy = data.reduce<TPricePolicy>(
                (acc, item) => {
                    const platform: EPlatforms =
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-expect-error
                        item.platform === "ps4"
                            ? EPlatforms.PlayStation
                            : item.platform;
                    const method =
                        item.deliveryMethod.toLowerCase() as WalletWithdrawMethods;
                    const currency = item.currency.toLowerCase() as ECCYIDs;

                    acc[method] = acc[method] || {};
                    acc[method][platform] = acc[method][platform] || {};
                    acc[method][platform][currency] =
                        item.coinPrice / item.perN;

                    return acc;
                },
                {} as TPricePolicy
            );

            return result;
        }

        if (settings.project === EProjects.WWW) {
            const body: IAPI.WWW.Stocks.POST.Request.Body = {
                ip: "",
            };

            const res = await fetch(API_PROJECT_PUBLIC_ROUTES["GET_STOCKS"], {
                method: "POST",
                headers: {
                    Accept: "application/json, text/plain",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });

            const data: IAPI.WWW.Stocks.POST.Response.Body = await res.json();
            if (res.status >= 400 || !data) {
                return null;
            }

            const result: TPricePolicy =
                data.deliveryMethods.reduce<TPricePolicy>((acc, method) => {
                    const deliveryType =
                        method.type.toLowerCase() as WalletWithdrawMethods;
                    acc[deliveryType] = acc[deliveryType] || {};

                    method.data.forEach(platformData => {
                        const platform: EPlatforms =
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-expect-error
                            platformData.platform === "ps4"
                                ? EPlatforms.PlayStation
                                : platformData.platform;
                        acc[deliveryType][platform] =
                            acc[deliveryType][platform] || {};

                        Object.entries(
                            platformData.pricePerCurrencyMap
                        ).forEach(([currency, price]) => {
                            const currencyId =
                                currency.toLowerCase() as ECCYIDs;
                            acc[deliveryType][platform]![currencyId] = price;
                        });
                    });

                    return acc;
                }, {} as TPricePolicy);    

            return result;
        }

        return null;
    } catch (e) {
        return null;
    }
}
