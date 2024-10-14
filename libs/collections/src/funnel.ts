import {
    EAppPlatforms,
    EWalletWithdrawMethods,
    ECCYIDs,
    EOrderProcessingStepIds,
    EPaymentMethodsIds,
    EPaymentCollectionGroups,
    ESEOPlatforms,
    EProjects,
} from "@royalfut/enums";
import {
    PROJECT_PUBLIC_WWW_ROUTES,
    PROJECT_PUBLIC_SELLER_ROUTES,
} from "./routes";

import type {
    TPlatformAppSets,
    TPaymentMethodsCashGroupSets,
    IOrderProcessingStepInfo,
    TPlatformSEOSets,
} from "@royalfut/interfaces";

export const SEOPlatformConversionMap: Record<
    ESEOPlatforms | EAppPlatforms,
    EAppPlatforms
> = {
    [ESEOPlatforms.PlayStation4]: EAppPlatforms.PlayStation,
    [ESEOPlatforms.PlayStation5]: EAppPlatforms.PlayStation,
    [ESEOPlatforms.XBoxOne]: EAppPlatforms.XBox,
    [ESEOPlatforms.XBoxXS]: EAppPlatforms.XBox,
    [ESEOPlatforms.PC]: EAppPlatforms.PC,
    [EAppPlatforms.PlayStation]: EAppPlatforms.PlayStation,
    [EAppPlatforms.XBox]: EAppPlatforms.XBox,
};

// NOTE: In order to prevent the same value for pc
export const AppPlatformConversionToSEOMap: Partial<
    Record<EAppPlatforms, ESEOPlatforms>
> = {
    [EAppPlatforms.PlayStation]: ESEOPlatforms.PlayStation4,
    [EAppPlatforms.XBox]: ESEOPlatforms.XBoxOne,
    // [EAppPlatforms.PC]: ESEOPlatforms.PC,
};

export const PlatformOrderLinks: Record<ESEOPlatforms | EAppPlatforms, string> =
    {
        [ESEOPlatforms.PlayStation4]: PROJECT_PUBLIC_WWW_ROUTES["ORDER_PS4"],
        [ESEOPlatforms.PlayStation5]: PROJECT_PUBLIC_WWW_ROUTES["ORDER_PS5"],
        [ESEOPlatforms.XBoxOne]: PROJECT_PUBLIC_WWW_ROUTES["ORDER_XBOX_ONE"],
        [ESEOPlatforms.XBoxXS]: PROJECT_PUBLIC_WWW_ROUTES["ORDER_XBOX_XS"],
        [ESEOPlatforms.PC]: PROJECT_PUBLIC_WWW_ROUTES["ORDER_PC"],
        [EAppPlatforms.PlayStation]: "",
        [EAppPlatforms.XBox]: "",
    };

export const PlatformAppSets: TPlatformAppSets = {
    [EAppPlatforms.PlayStation]: {
        _id: EAppPlatforms.PlayStation,
        name: {
            v1: "PlayStation",
            v2: "PS",
        },
    },
    [EAppPlatforms.XBox]: {
        _id: EAppPlatforms.XBox,
        name: {
            v1: "Xbox",
        },
    },
    [EAppPlatforms.PC]: {
        _id: EAppPlatforms.PC,
        name: {
            v1: "PC",
        },
    },
};

export const PlatformSEOSets: TPlatformSEOSets = {
    [ESEOPlatforms.PlayStation4]: {
        _id: ESEOPlatforms.PlayStation4,
        name: {
            v1: "PlayStation 4",
            v2: "PS4",
        },
    },
    [ESEOPlatforms.PlayStation5]: {
        _id: ESEOPlatforms.PlayStation5,
        name: {
            v1: "PlayStation 5",
            v2: "PS5",
        },
    },
    [ESEOPlatforms.XBoxOne]: {
        _id: ESEOPlatforms.XBoxOne,
        name: {
            v1: "Xbox One",
        },
    },
    [ESEOPlatforms.XBoxXS]: {
        _id: ESEOPlatforms.XBoxOne,
        name: {
            v1: "Xbox Series X|S",
            v2: "Xbox X|S",
        },
    },
    [ESEOPlatforms.PC]: {
        _id: ESEOPlatforms.XBoxOne,
        name: {
            v1: "PC",
        },
    },
};

interface IPaymetMethodEntity {
    _id: EPaymentMethodsIds;
    label: {
        default: string;
        short: string;
    };
    name: string;
}

interface IPaymentAvailableList {
    methods: Array<EPaymentMethodsIds>;
    groups: Array<EPaymentCollectionGroups>;
    discount: Partial<Record<EPaymentCollectionGroups, number>>;
}

export const PROJECT_SPECIFIC_PAYMENT_AVAILABLE_LIST: Record<
    EProjects,
    IPaymentAvailableList
> = {
    [EProjects.WWW]: {
        methods: [
            EPaymentMethodsIds.MASTER_CARD,
            EPaymentMethodsIds.VISA,
            EPaymentMethodsIds.UNION_PAY,
            EPaymentMethodsIds.TINK_VISA,
            EPaymentMethodsIds.BITCOIN_CRYPTO,
            EPaymentMethodsIds.TETHER_CRYPTO,
            EPaymentMethodsIds.ETHEREUM_CRYPTO,
        ],
        groups: [
            EPaymentCollectionGroups.ACQUIRING,
            EPaymentCollectionGroups.UNION_PAY,
            EPaymentCollectionGroups.EU_BANK,
            EPaymentCollectionGroups.CRYPTO,
        ],
        discount: {
            [EPaymentCollectionGroups.CRYPTO]: 3,
        },
    },
    [EProjects.SELLER]: {
        methods: [
            EPaymentMethodsIds.MASTER_CARD,
            EPaymentMethodsIds.VISA,
            EPaymentMethodsIds.BITCOIN_CRYPTO,
            EPaymentMethodsIds.TETHER_CRYPTO,
            EPaymentMethodsIds.ETHEREUM_CRYPTO,
        ],
        groups: [
            EPaymentCollectionGroups.ACQUIRING,
            EPaymentCollectionGroups.CRYPTO,
        ],
        discount: {},
    },
};

export const PaymentAvailableList =
    PROJECT_SPECIFIC_PAYMENT_AVAILABLE_LIST[
        process.env["NEXT_PUBLIC_PROJECT"] as EProjects
    ];

export const PaymetMethodsSets: Record<
    EPaymentMethodsIds,
    IPaymetMethodEntity
> = {
    [EPaymentMethodsIds.VISA]: {
        _id: EPaymentMethodsIds.VISA,
        label: {
            default: "Visa",
            short: "Visa",
        },
        name: "visa",
    },
    [EPaymentMethodsIds.MASTER_CARD]: {
        _id: EPaymentMethodsIds.MASTER_CARD,
        label: {
            default: "Master Card",
            short: "MC",
        },
        name: "master_card",
    },
    [EPaymentMethodsIds.UNION_PAY]: {
        _id: EPaymentMethodsIds.UNION_PAY,
        label: {
            default: "Union Pay",
            short: "Union",
        },
        name: "union_pay",
    },
    [EPaymentMethodsIds.TINK_VISA]: {
        _id: EPaymentMethodsIds.TINK_VISA,
        label: {
            default: "Tink, a Visa solution",
            short: "Tink",
        },
        name: "tink",
    },
    [EPaymentMethodsIds.APPLE_PAY]: {
        _id: EPaymentMethodsIds.APPLE_PAY,
        label: {
            default: "Apple Pay",
            short: "Apple Pay",
        },
        name: "apple_pay",
    },
    [EPaymentMethodsIds.GOOGLE_PAY]: {
        _id: EPaymentMethodsIds.GOOGLE_PAY,
        label: {
            default: "Google Pay",
            short: "Google Pay",
        },
        name: "google_pay",
    },
    [EPaymentMethodsIds.TETHER_CRYPTO]: {
        _id: EPaymentMethodsIds.TETHER_CRYPTO,
        label: {
            default: "Tether",
            short: "USDT",
        },
        name: "tether",
    },
    [EPaymentMethodsIds.BITCOIN_CRYPTO]: {
        _id: EPaymentMethodsIds.BITCOIN_CRYPTO,
        label: {
            default: "Bitcoin",
            short: "BTC",
        },
        name: "bitcoin",
    },
    [EPaymentMethodsIds.ETHEREUM_CRYPTO]: {
        _id: EPaymentMethodsIds.ETHEREUM_CRYPTO,
        label: {
            default: "Ethereum",
            short: "ETH",
        },
        name: "ethereum",
    },
};

export const PaymentMethodsCashGroupSets: TPaymentMethodsCashGroupSets = {
    [EPaymentCollectionGroups.ACQUIRING]: {
        _id: EPaymentCollectionGroups.ACQUIRING,
        label: "Visa, MC, etc.",
        collection: [EPaymentMethodsIds.MASTER_CARD, EPaymentMethodsIds.VISA],
    },
    [EPaymentCollectionGroups.UNION_PAY]: {
        _id: EPaymentCollectionGroups.UNION_PAY,
        label: "Union Pay",
        collection: [EPaymentMethodsIds.UNION_PAY],
    },
    [EPaymentCollectionGroups.EU_BANK]: {
        _id: EPaymentCollectionGroups.EU_BANK,
        label: "EU: Bank transfer",
        collection: [EPaymentMethodsIds.TINK_VISA],
    },
    [EPaymentCollectionGroups.APPLE_PAY]: {
        _id: EPaymentCollectionGroups.APPLE_PAY,
        label: "Apple Pay",
        collection: [EPaymentMethodsIds.APPLE_PAY],
    },
    [EPaymentCollectionGroups.GOOGLE_PAY]: {
        _id: EPaymentCollectionGroups.GOOGLE_PAY,
        label: "Google Pay",
        collection: [EPaymentMethodsIds.GOOGLE_PAY],
    },
    [EPaymentCollectionGroups.CRYPTO]: {
        _id: EPaymentCollectionGroups.CRYPTO,
        label: "By Crypto",
        collection: [
            EPaymentMethodsIds.TETHER_CRYPTO,
            EPaymentMethodsIds.BITCOIN_CRYPTO,
            EPaymentMethodsIds.ETHEREUM_CRYPTO,
        ],
    },
};

export type TPricePolicy = Record<
    EWalletWithdrawMethods,
    Record<EAppPlatforms, Record<ECCYIDs, number>>
>;

export const PricePolicy: TPricePolicy = {
    [EWalletWithdrawMethods.EASY]: {
        [EAppPlatforms.PlayStation]: {
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
            [ECCYIDs.RUB]: 0.006626,
        },
        [EAppPlatforms.PC]: {
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
            [ECCYIDs.RUB]: 0.006626,
        },
        [EAppPlatforms.XBox]: {
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
            [ECCYIDs.RUB]: 0.006626,
        },
    },
    [EWalletWithdrawMethods.MANUAL]: {
        [EAppPlatforms.PlayStation]: {
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
            [ECCYIDs.RUB]: 0.008547,
        },
        [EAppPlatforms.PC]: {
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
            [ECCYIDs.RUB]: 0.008547,
        },
        [EAppPlatforms.XBox]: {
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
            [ECCYIDs.RUB]: 0.008547,
        },
    },
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
/** @ts-expect-error */
export const OrderProcessingStepsInfo: Record<
    EOrderProcessingStepIds,
    IOrderProcessingStepInfo
> = {
    [EOrderProcessingStepIds.SELLER_ORDER_INFO]: {
        _id: EOrderProcessingStepIds.SELLER_ORDER_INFO,
        to: PROJECT_PUBLIC_SELLER_ROUTES["ORDER_INFO"],
        title: "Platform and amount",
        allowSteps: [EOrderProcessingStepIds.SELLER_ACCOUNT_DETAILS],
        step: 1,
    },
    // [EOrderProcessingStepIds.SUMMARY_AND_SELL]: {
    //     _id: EOrderProcessingStepIds.SUMMARY_AND_SELL,
    //     to: PROJECT_PUBLIC_ROUTES["ORDER_SUMMARY_AND_SELL"],
    //     allowSteps: [EOrderProcessingStepIds.ORDER_INFO],
    //     title: "Payout info",
    //     step: 2,
    // },
    [EOrderProcessingStepIds.SELLER_ACCOUNT_DETAILS]: {
        _id: EOrderProcessingStepIds.SELLER_ACCOUNT_DETAILS,
        to: PROJECT_PUBLIC_SELLER_ROUTES["ORDER_ACCOUNT_DETAILS"],
        allowSteps: [EOrderProcessingStepIds.SELLER_ORDER_INFO],
        title: "Account details",
        step: 2,
    },
    [EOrderProcessingStepIds.SELLER_AWAITING_FOR_DELIVERY]: {
        _id: EOrderProcessingStepIds.SELLER_AWAITING_FOR_DELIVERY,
        to: PROJECT_PUBLIC_SELLER_ROUTES["ORDER_AWAITING_FOR_DELIVERY"],
        allowSteps: [
            EOrderProcessingStepIds.SELLER_ORDER_INFO,
            EOrderProcessingStepIds.SELLER_ACCOUNT_DETAILS,
        ],
        title: "Coin transfer",
        step: 3,
    },
};

export const WWW_OrderProcessingStepsInfo: Partial<
    Record<EOrderProcessingStepIds, IOrderProcessingStepInfo>
> = {
    [EOrderProcessingStepIds.WWW_ORDER_INFO]: {
        _id: EOrderProcessingStepIds.WWW_ORDER_INFO,
        to: PROJECT_PUBLIC_WWW_ROUTES["ORDER_INFO"],
        title: "h2.1",
        allowSteps: [EOrderProcessingStepIds.WWW_CHECKOUT],
        step: 1,
    },
    [EOrderProcessingStepIds.WWW_CHECKOUT]: {
        _id: EOrderProcessingStepIds.WWW_CHECKOUT,
        to: PROJECT_PUBLIC_WWW_ROUTES["ORDER_CHECKOUT"],
        allowSteps: [EOrderProcessingStepIds.WWW_ORDER_INFO],
        title: "h2.2",
        step: 2,
    },
    [EOrderProcessingStepIds.WWW_AWAITING_FOR_DELIVERY]: {
        _id: EOrderProcessingStepIds.WWW_AWAITING_FOR_DELIVERY,
        to: PROJECT_PUBLIC_WWW_ROUTES["ORDER_AWAITING_FOR_DELIVERY"],
        allowSteps: [],
        title: "h2.3",
        step: 3,
    },
};

export const SELLER_OrderProcessingStepsInfo: Partial<
    Record<EOrderProcessingStepIds, IOrderProcessingStepInfo>
> = {
    [EOrderProcessingStepIds.SELLER_ORDER_INFO]: {
        _id: EOrderProcessingStepIds.SELLER_ORDER_INFO,
        to: PROJECT_PUBLIC_SELLER_ROUTES["ORDER_INFO"],
        title: "Platform and amount",
        allowSteps: [EOrderProcessingStepIds.SELLER_ACCOUNT_DETAILS],
        step: 1,
    },
    // [EOrderProcessingStepIds.SUMMARY_AND_SELL]: {
    //     _id: EOrderProcessingStepIds.SUMMARY_AND_SELL,
    //     to: PROJECT_PUBLIC_ROUTES["ORDER_SUMMARY_AND_SELL"],
    //     allowSteps: [EOrderProcessingStepIds.ORDER_INFO],
    //     title: "Payout info",
    //     step: 2,
    // },
    [EOrderProcessingStepIds.SELLER_ACCOUNT_DETAILS]: {
        _id: EOrderProcessingStepIds.SELLER_ACCOUNT_DETAILS,
        to: PROJECT_PUBLIC_SELLER_ROUTES["ORDER_ACCOUNT_DETAILS"],
        allowSteps: [EOrderProcessingStepIds.SELLER_ORDER_INFO],
        title: "Account details",
        step: 2,
    },
    [EOrderProcessingStepIds.SELLER_AWAITING_FOR_DELIVERY]: {
        _id: EOrderProcessingStepIds.SELLER_AWAITING_FOR_DELIVERY,
        to: PROJECT_PUBLIC_SELLER_ROUTES["ORDER_AWAITING_FOR_DELIVERY"],
        allowSteps: [
            EOrderProcessingStepIds.SELLER_ORDER_INFO,
            EOrderProcessingStepIds.SELLER_ACCOUNT_DETAILS,
        ],
        title: "Coin transfer",
        step: 3,
    },
};

const PROJECT_ORDER_PROCESSING_STEPS_INFO = {
    [EProjects.WWW]: WWW_OrderProcessingStepsInfo,
    [EProjects.SELLER]: SELLER_OrderProcessingStepsInfo,
};

export const ORDER_PROCESSING_STEPS_INFO =
    PROJECT_ORDER_PROCESSING_STEPS_INFO[
        process.env["NEXT_PUBLIC_PROJECT"] as EProjects
    ];
