import {
    EPlatforms,
    WalletWithdrawMethods,
    ECCYIDs,
    OrderStepIds,
    EPaymentMethodsIds,
    EPaymentCollectionGroups,
} from "@royalfut/enums";
import { PUBLIC_ROUTES } from "./routes";

import type {
    TPlatformSets,
    TPaymentMethodsGetCashSets,
} from "@royalfut/interfaces";

export const PlatformSets: TPlatformSets = {
    [EPlatforms.PlayStation]: {
        _id: EPlatforms.PlayStation,
        name: "PlayStation",
        short_name: "PS",
    },
    [EPlatforms.XBox]: {
        _id: EPlatforms.XBox,
        name: "Xbox",
        short_name: "Xbox",
    },
    [EPlatforms.PC]: {
        _id: EPlatforms.PC,
        name: "PC",
        short_name: "PC",
    },
};

interface IPaymetMethodEntity {
    _id: EPaymentMethodsIds;
    label: {
        default: string;
        short: string;
    };
    name: string;
    available: boolean;
}

export const PaymetMethodsSets: Record<
    EPaymentMethodsIds,
    IPaymetMethodEntity
> = {
    [EPaymentMethodsIds.VISA]: {
        _id: EPaymentMethodsIds.VISA,
        available: true,
        label: {
            default: "Visa",
            short: "Visa",
        },
        name: "visa",
    },
    [EPaymentMethodsIds.MASTER_CARD]: {
        _id: EPaymentMethodsIds.MASTER_CARD,
        available: true,
        label: {
            default: "Master Card",
            short: "MC",
        },
        name: "master_card",
    },
    // [EPaymentMethodsIds.UNION_PAY]: {
    //     _id: EPaymentMethodsIds.UNION_PAY,
    //     available: true,
    //     label: {
    //         default: "Union Pay",
    //         short: "Union",
    //     },
    //     name: "union_pay",
    // },
    // [EPaymentMethodsIds.TINK_VISA]: {
    //     _id: EPaymentMethodsIds.TINK_VISA,
    //     available: true,
    //     label: {
    //         default: "Tink, a Visa solution",
    //         short: "Tink",
    //     },
    //     name: "tink",
    // },
    // [EPaymentMethodsIds.APPLE_PAY]: {
    //     _id: EPaymentMethodsIds.APPLE_PAY,
    //     available: true,
    //     label: {
    //         default: "Apple Pay",
    //         short: "Apple Pay",
    //     },
    //     name: "apple_pay",
    // },
    // [EPaymentMethodsIds.GOOGLE_PAY]: {
    //     _id: EPaymentMethodsIds.GOOGLE_PAY,
    //     available: true,
    //     label: {
    //         default: "Google Pay",
    //         short: "Google Pay",
    //     },
    //     name: "google_pay",
    // },
    [EPaymentMethodsIds.TETHER_CRYPTO]: {
        _id: EPaymentMethodsIds.TETHER_CRYPTO,
        available: true,
        label: {
            default: "Tether",
            short: "USDT",
        },
        name: "tether",
    },
    [EPaymentMethodsIds.BITCOIN_CRYPTO]: {
        _id: EPaymentMethodsIds.BITCOIN_CRYPTO,
        available: true,
        label: {
            default: "Bitcoin",
            short: "BTC",
        },
        name: "bitcoin",
    },
    [EPaymentMethodsIds.ETHEREUM_CRYPTO]: {
        _id: EPaymentMethodsIds.ETHEREUM_CRYPTO,
        available: true,
        label: {
            default: "Ethereum",
            short: "ETH",
        },
        name: "ethereum",
    },
};

export const PaymentMethodsGetCashSets: TPaymentMethodsGetCashSets = {
    [EPaymentCollectionGroups.FIRST]: {
        _id: EPaymentCollectionGroups.FIRST,
        label: "Visa, MC, etc.",
        collection: [EPaymentMethodsIds.MASTER_CARD, EPaymentMethodsIds.VISA],
    },
    // [EPaymentCollectionGroups.SECOND]: {
    //     _id: EPaymentCollectionGroups.SECOND,
    //     label: "Union Pay",
    //     collection: [EPaymentMethodsIds.UNION_PAY],
    // },
    // [EPaymentCollectionGroups.THIRD]: {
    //     _id: EPaymentCollectionGroups.THIRD,
    //     label: "EU: Bank transfer",
    //     collection: [EPaymentMethodsIds.TINK_VISA],
    // },
    // [EPaymentCollectionGroups.FOURTH]: {
    //     _id: EPaymentCollectionGroups.FOURTH,
    //     label: "Apple Pay",
    //     collection: [EPaymentMethodsIds.APPLE_PAY],
    // },
    // [EPaymentCollectionGroups.FIFTH]: {
    //     _id: EPaymentCollectionGroups.FIFTH,
    //     label: "Google Pay",
    //     collection: [EPaymentMethodsIds.GOOGLE_PAY],
    // },
    [EPaymentCollectionGroups.SIXTH]: {
        _id: EPaymentCollectionGroups.SIXTH,
        label: "By Crypto",
        collection: [
            EPaymentMethodsIds.TETHER_CRYPTO,
            EPaymentMethodsIds.BITCOIN_CRYPTO,
            EPaymentMethodsIds.ETHEREUM_CRYPTO,
        ],
    },
};

type TPricePolicy = Record<
    WalletWithdrawMethods,
    Record<EPlatforms, Record<ECCYIDs, number>>
>;

export const PricePolicy: TPricePolicy = {
    [WalletWithdrawMethods.EASY]: {
        [EPlatforms.PlayStation]: {
            [ECCYIDs.USD]: 0.000075,
            [ECCYIDs.EUR]: 0.000069,
            [ECCYIDs.GBP]: 0.000059,
            [ECCYIDs.AED]: 0.000276,
            [ECCYIDs.SAR]: 0.000282,
            [ECCYIDs.SEK]: 0.000787,
            [ECCYIDs.CAD]: 0.000101,
            [ECCYIDs.NOK]: 0.000789,
            [ECCYIDs.AUD]: 0.000114,
            [ECCYIDs.PLN]: 0.000301,
            [ECCYIDs.BRL]: 0.00037,
            [ECCYIDs.TRY]: 0.002269,
            // [ECCYIDs.RUB]: 0.006626,
        },
        [EPlatforms.PC]: {
            [ECCYIDs.USD]: 0.000075,
            [ECCYIDs.EUR]: 0.000069,
            [ECCYIDs.GBP]: 0.000059,
            [ECCYIDs.AED]: 0.000276,
            [ECCYIDs.SAR]: 0.000282,
            [ECCYIDs.SEK]: 0.000787,
            [ECCYIDs.CAD]: 0.000101,
            [ECCYIDs.NOK]: 0.000789,
            [ECCYIDs.AUD]: 0.000114,
            [ECCYIDs.PLN]: 0.000301,
            [ECCYIDs.BRL]: 0.00037,
            [ECCYIDs.TRY]: 0.002269,
            // [ECCYIDs.RUB]: 0.006626,
        },
        [EPlatforms.XBox]: {
            [ECCYIDs.USD]: 0.000075,
            [ECCYIDs.EUR]: 0.000069,
            [ECCYIDs.GBP]: 0.000059,
            [ECCYIDs.AED]: 0.000276,
            [ECCYIDs.SAR]: 0.000282,
            [ECCYIDs.SEK]: 0.000787,
            [ECCYIDs.CAD]: 0.000101,
            [ECCYIDs.NOK]: 0.000789,
            [ECCYIDs.AUD]: 0.000114,
            [ECCYIDs.PLN]: 0.000301,
            [ECCYIDs.BRL]: 0.00037,
            [ECCYIDs.TRY]: 0.002269,
            // [ECCYIDs.RUB]: 0.006626,
        },
    },
    [WalletWithdrawMethods.MANUAL]: {
        [EPlatforms.PlayStation]: {
            [ECCYIDs.USD]: 0.000097,
            [ECCYIDs.EUR]: 0.000089,
            [ECCYIDs.GBP]: 0.000076,
            [ECCYIDs.AED]: 0.000356,
            [ECCYIDs.SAR]: 0.000364,
            [ECCYIDs.SEK]: 0.001015,
            [ECCYIDs.CAD]: 0.00013,
            [ECCYIDs.NOK]: 0.001017,
            [ECCYIDs.AUD]: 0.000147,
            [ECCYIDs.PLN]: 0.000388,
            [ECCYIDs.BRL]: 0.000477,
            [ECCYIDs.TRY]: 0.002927,
            // [ECCYIDs.RUB]: 0.008547,
        },
        [EPlatforms.PC]: {
            [ECCYIDs.USD]: 0.000097,
            [ECCYIDs.EUR]: 0.000089,
            [ECCYIDs.GBP]: 0.000076,
            [ECCYIDs.AED]: 0.000356,
            [ECCYIDs.SAR]: 0.000364,
            [ECCYIDs.SEK]: 0.001015,
            [ECCYIDs.CAD]: 0.00013,
            [ECCYIDs.NOK]: 0.001017,
            [ECCYIDs.AUD]: 0.000147,
            [ECCYIDs.PLN]: 0.000388,
            [ECCYIDs.BRL]: 0.000477,
            [ECCYIDs.TRY]: 0.002927,
            // [ECCYIDs.RUB]: 0.008547,
        },
        [EPlatforms.XBox]: {
            [ECCYIDs.USD]: 0.000097,
            [ECCYIDs.EUR]: 0.000089,
            [ECCYIDs.GBP]: 0.000076,
            [ECCYIDs.AED]: 0.000356,
            [ECCYIDs.SAR]: 0.000364,
            [ECCYIDs.SEK]: 0.001015,
            [ECCYIDs.CAD]: 0.00013,
            [ECCYIDs.NOK]: 0.001017,
            [ECCYIDs.AUD]: 0.000147,
            [ECCYIDs.PLN]: 0.000388,
            [ECCYIDs.BRL]: 0.000477,
            [ECCYIDs.TRY]: 0.002927,
            // [ECCYIDs.RUB]: 0.008547,
        },
    },
};

export const OrderTradeInfo = {
    [OrderStepIds.ORDER_INFO]: {
        _id: OrderStepIds.ORDER_INFO,
        to: PUBLIC_ROUTES.ORDER_INFO,
        title: "Platform and amount",
        allowSteps: [OrderStepIds.ACCOUNT_DETAILS],
        step: 1,
    },
    // [OrderStepIds.SUMMARY_AND_SELL]: {
    //     _id: OrderStepIds.SUMMARY_AND_SELL,
    //     to: PUBLIC_ROUTES.ORDER_SUMMARY_AND_SELL,
    //     allowSteps: [OrderStepIds.ORDER_INFO],
    //     title: "Payout info",
    //     step: 2,
    // },
    [OrderStepIds.ACCOUNT_DETAILS]: {
        _id: OrderStepIds.ACCOUNT_DETAILS,
        to: PUBLIC_ROUTES.ORDER_ACCOUNT_DETAILS,
        allowSteps: [OrderStepIds.ORDER_INFO],
        title: "Account details",
        step: 2,
    },
    [OrderStepIds.AWAITING_FOR_DELIVERY]: {
        _id: OrderStepIds.AWAITING_FOR_DELIVERY,
        to: PUBLIC_ROUTES.ORDER_AWAITING_FOR_DELIVERY,
        allowSteps: [
            OrderStepIds.ORDER_INFO,
            OrderStepIds.ACCOUNT_DETAILS,
        ],
        title: "Coin transfer",
        step: 3,
    },
};
