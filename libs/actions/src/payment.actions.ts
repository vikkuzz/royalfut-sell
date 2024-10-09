"use server";

import {
    EAppPlatforms,
    ECCYIDs,
    EI18nIds,
    EPaymentCollectionGroups,
    EPaymentFBPage,
    ESEOPlatforms,
    EWalletWithdrawMethods,
    EDynamicURLParams,
    EPaymentTransactionStatus,
    EPaymentSearchParamsKey,
} from "@royalfut/enums";
import { getToken } from "./auth.actions";
import {
    HOST_URL,
    API_PROJECT_PRIVATE_WWW_ROUTES,
    WWW_ORDER_PAYMENT_FEEDBACK_PATHNAMES,
} from "@royalfut/collections";
import {
    capitalizeFirstLetter,
    addSearchParams,
    formatNumberShortView,
} from "@royalfut/utils";

import type { IAPI } from "@royalfut/interfaces";

interface IPrePaymModuleData {
    orderId: number;
    price: {
        [ECCYIDs.EUR]: number;
    };
    paymentMethod: EPaymentCollectionGroups;
    coupon?: string | null;
    platform: ESEOPlatforms | EAppPlatforms;
    deliveryMethod: string /** @see EWalletWithdrawMethods First letter is Uppercase */;
    coinsUT: number;
    fbPage: EPaymentFBPage;
    lng: EI18nIds;
    currency: ECCYIDs;
}

const generateAcquiringUrls = (
    data: IPrePaymModuleData
): IAPI.WWW.Payment.PrepareModule.POST.Request.Body => {
    const {
        fbPage,
        coinsUT,
        deliveryMethod,
        lng,
        orderId,
        paymentMethod,
        platform,
        price,
        coupon,
    } = data;

    const fbPathnames = WWW_ORDER_PAYMENT_FEEDBACK_PATHNAMES[fbPage];
    const feedback: IAPI.WWW.Payment.PrepareModule.POST.Request.Body = {
        successUrl: addSearchParams(
            `${HOST_URL}/${lng}${fbPathnames.success}`,
            {
                [EPaymentSearchParamsKey.STATUS]:
                    EPaymentTransactionStatus.SUCCESS,
                [EPaymentSearchParamsKey.PRICE_EUR]: price[ECCYIDs.EUR],
                [EPaymentSearchParamsKey.PAYMENT_METHOD]: paymentMethod,
                [EPaymentSearchParamsKey.ORDER_ID]: orderId,
                [EPaymentSearchParamsKey.PLATFORM]: platform,
                [EPaymentSearchParamsKey.DELIVERY_METHOD]: deliveryMethod,
                [EPaymentSearchParamsKey.COUPON]: coupon,
            }
        ),
        failUrl: addSearchParams(`${HOST_URL}/${lng}${fbPathnames.failure}`, {
            [EPaymentSearchParamsKey.STATUS]: EPaymentTransactionStatus.FAILURE,
            [EPaymentSearchParamsKey.ORDER_ID]: orderId,
        }),
    };

    switch (fbPage) {
        case EPaymentFBPage.ORDER_PLATFORM: {
            feedback.successUrl = feedback.successUrl.replace(
                EDynamicURLParams.PLATFORM,
                platform
            );
            feedback.failUrl = feedback.failUrl.replace(
                EDynamicURLParams.PLATFORM,
                platform
            );
            break;
        }
        case EPaymentFBPage.COINS_WITH_AMOUNT: {
            const coinShortLabelView = formatNumberShortView(coinsUT).replace(
                ".",
                "_"
            );
            feedback.successUrl = feedback.successUrl.replace(
                EDynamicURLParams.COINS_AMOUNT,
                coinShortLabelView
            );
            feedback.failUrl = feedback.failUrl.replace(
                EDynamicURLParams.COINS_AMOUNT,
                coinShortLabelView
            );
            break;
        }
    }

    return feedback;
};

const configurePaymentSubUrl = (
    paymentMethod: EPaymentCollectionGroups
): string => {
    switch (paymentMethod) {
        case EPaymentCollectionGroups.UNION_PAY:
            return "/union";
        case EPaymentCollectionGroups.EU_BANK:
        case EPaymentCollectionGroups.CRYPTO:
            return `/${paymentMethod}`;
        default:
            return "";
    }
};

type TPreparePaymentRequest = Omit<IPrePaymModuleData, "deliveryMethod"> & {
    deliveryMethod: EWalletWithdrawMethods;
};

export async function preparePaymentRequest(
    data: TPreparePaymentRequest
): Promise<IAPI.WWW.Payment.PrepareModule.POST.Response.Body | null> {
    try {
        const token = await getToken();
        if (!token) {
            throw new Error();
        }

        const adaptedData: IPrePaymModuleData = {
            ...data,
            deliveryMethod: capitalizeFirstLetter(data.deliveryMethod),
        };
        const reqBody = generateAcquiringUrls(adaptedData);

        // NOTE: Modulebank
        /*
        if (adaptedData.paymentMethod === EPaymentCollectionGroups.ACQUIRING && adaptedData.currency === ECCYIDs.RUB) {
            res = await fetch(`${API_PROJECT_PRIVATE_WWW_ROUTES["PREPAY_ORDER"]}/modul`.replace(EDynamicURLParams.ORDER_ID, adaptedData.orderId + ""), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${token}`,
                },
                body: JSON.stringify(reqBody),
            });
        }
        */
        const paymentUrl = configurePaymentSubUrl(adaptedData.paymentMethod);

        const res = await fetch(
            `${API_PROJECT_PRIVATE_WWW_ROUTES["PREPAY_ORDER"]}${paymentUrl}`.replace(
                EDynamicURLParams.ORDER_ID,
                adaptedData.orderId + ""
            ),
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${token}`,
                },
                body: JSON.stringify(reqBody),
            }
        );

        if (!res || res.status >= 400) {
            throw new Error();
        }

        const body: IAPI.WWW.Payment.PrepareModule.POST.Response.Body =
            await res.json();
        if (!body) {
            throw new Error();
        }

        return body;
    } catch (e) {
        return null;
    }
}
