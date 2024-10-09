import {
    EDynamicURLParams,
    EOrderProcessingStepIds,
    EPaymentFBPage,
    EProjects,
    ESEOPlatforms,
} from "@royalfut/enums";

export const HOST_URL = process.env["NEXT_PUBLIC_ORIGIN"]!;

const PUBLIC_URL = "/";
const ORDER_PATHNAME = `${PUBLIC_URL}order`;
const COINS_PATHNAME = `${PUBLIC_URL}coins`;
const API_ORIGIN = process.env["NEXT_PUBLIC_API_ORIGIN"];

export const API_PROJECT_PRIVATE_WWW_ROUTES: Record<string, string> = {
    GET_USER: `${API_ORIGIN}/api/user`,
    BONUS_INFO: `${API_ORIGIN}/newapi/bonus/info`,
    UPDATE_USER: `${API_ORIGIN}/api/user`,
    GET_ORDER: `${API_ORIGIN}/api/order`,
    CREATE_ORDER: `${API_ORIGIN}/api/order`,
    UPDATE_ORDER: `${API_ORIGIN}/api/order`,
    PREPAY_ORDER: `${API_ORIGIN}/api/order/${EDynamicURLParams.ORDER_ID}/prepay`,
};

export const API_PROJECT_PRIVATE_SELLER_ROUTES: Record<string, string> = {
    GET_USER: `${API_ORIGIN}/api/user`,
    UPDATE_USER: `${API_ORIGIN}/api/user`,
    SELLER_WITHDRAW: `${API_ORIGIN}/newapi/seller/withdraw`,
    SELLER_PAYOUTS: `${API_ORIGIN}/newapi/seller/payouts`,
    SELLER_ORDERS: `${API_ORIGIN}/newapi/seller/orders`,
    UPDATE_ORDER: `${API_ORIGIN}/newapi/seller/order`,
    CREATE_ORDER: `${API_ORIGIN}/newapi/seller/order`,
    SELLER_PROCESS: `${API_ORIGIN}/newapi/seller/process`,
    SEND_WALLET_ADDRESS: `${API_ORIGIN}/newapi/seller/wallet`,
    GET_SELLER_BALANCE: `${API_ORIGIN}/newapi/seller/balance`,
};

const API_PROJECT_SPECIFIC_PRIVATE_ROUTES: Record<
    EProjects,
    Record<string, string>
> = {
    [EProjects.WWW]: API_PROJECT_PRIVATE_WWW_ROUTES,
    [EProjects.SELLER]: API_PROJECT_PRIVATE_SELLER_ROUTES,
};

export const API_PROJECT_PUBLIC_WWW_ROUTES: Record<string, string> = {
    FAST_LOGIN_BY_EMAIL: `${API_ORIGIN}/api/users/fastlogin`,
    CHECK_PROMO: `${API_ORIGIN}/api/checkpromo`,
    BONUS_LEVELS: `${API_ORIGIN}/newapi/bonus/levels`,
    GET_REVIEWS: `${API_ORIGIN}/futapi/reviews`,
    USER_TOKEN_LOGIN: `${API_ORIGIN}/api/users/tokenlogin`,
    GET_STOCKS: `${API_ORIGIN}/api/stock`,
};

export const API_PROJECT_PUBLIC_SELLER_ROUTES: Record<string, string> = {
    FAST_LOGIN_BY_EMAIL: `${API_ORIGIN}/api/users/fastlogin`,
    BONUS_INFO: `${API_ORIGIN}/newapi/bonus/info`,
    BONUS_LEVELS: `${API_ORIGIN}/newapi/bonus/levels`,
    GET_REVIEWS: `${API_ORIGIN}/futapi/reviews`,
    USER_TOKEN_LOGIN: `${API_ORIGIN}/api/users/tokenlogin`,
    GET_STOCKS: `${API_ORIGIN}/newapi/seller/stocks`,
};

const API_PROJECT_SPECIFIC_PUBLIC_ROUTES: Record<
    EProjects,
    Record<string, string>
> = {
    [EProjects.WWW]: API_PROJECT_PUBLIC_WWW_ROUTES,
    [EProjects.SELLER]: API_PROJECT_PUBLIC_SELLER_ROUTES,
};

export const PROJECT_PRIVATE_WWW_ROUTES: Record<string, string> = {
    PROFILE: `${PUBLIC_URL}profile`,
    PROFILE_ORDERS: `${PUBLIC_URL}profile/orders`,
    PROFILE_SETTINGS: `${PUBLIC_URL}profile/settings`,
    PROFILE_POINTS: `${PUBLIC_URL}profile/points`,
};

export const PROJECT_PRIVATE_SELLER_ROUTES: Record<string, string> = {
    PROFILE: `${PUBLIC_URL}profile`,
    PROFILE_ORDERS: `${PUBLIC_URL}profile/orders`,
    PROFILE_WITHDRAWALS: `${PUBLIC_URL}profile/withdrawals`,
    PROFILE_WITHDRAWALS_CONFIRMED: `${PUBLIC_URL}profile/withdrawals/payment-confirmed`,
};

const PROJECT_SPECIFIC_PRIVATE_ROUTES: Record<
    EProjects,
    Record<string, string>
> = {
    [EProjects.WWW]: PROJECT_PRIVATE_WWW_ROUTES,
    [EProjects.SELLER]: PROJECT_PRIVATE_SELLER_ROUTES,
};

export const ORDER_STEPS_PATHNAMES: Record<EOrderProcessingStepIds, string> = {
    [EOrderProcessingStepIds.WWW_ORDER_INFO]: "",
    [EOrderProcessingStepIds.WWW_CHECKOUT]: "/checkout",
    [EOrderProcessingStepIds.WWW_AWAITING_FOR_DELIVERY]: "/delivery",
    [EOrderProcessingStepIds.SELLER_ORDER_INFO]: "",
    [EOrderProcessingStepIds.SELLER_ACCOUNT_DETAILS]: "/acc",
    [EOrderProcessingStepIds.SELLER_AWAITING_FOR_DELIVERY]: "/delivery",
};

export const PROJECT_PUBLIC_WWW_ROUTES: Record<string, string> = {
    HOME: PUBLIC_URL,
    UNAUTHORIZED_REDIRECT: PUBLIC_URL,
    ORDER: ORDER_PATHNAME,
    ORDER_INFO: `${ORDER_PATHNAME}${ORDER_STEPS_PATHNAMES[EOrderProcessingStepIds.WWW_ORDER_INFO]}`,
    ORDER_CHECKOUT: `${ORDER_PATHNAME}${ORDER_STEPS_PATHNAMES[EOrderProcessingStepIds.WWW_CHECKOUT]}`,
    ORDER_AWAITING_FOR_DELIVERY: `${ORDER_PATHNAME}${ORDER_STEPS_PATHNAMES[EOrderProcessingStepIds.WWW_AWAITING_FOR_DELIVERY]}`,
    ORDER_PS4: `${ORDER_PATHNAME}/${ESEOPlatforms.PlayStation4}`,
    ORDER_PS5: `${ORDER_PATHNAME}/${ESEOPlatforms.PlayStation5}`,
    ORDER_XBOX_ONE: `${ORDER_PATHNAME}/${ESEOPlatforms.XBoxOne}`,
    ORDER_XBOX_XS: `${ORDER_PATHNAME}/${ESEOPlatforms.XBoxXS}`,
    ORDER_PC: `${ORDER_PATHNAME}/${ESEOPlatforms.PC}`,
    COINS: COINS_PATHNAME,
    COINS_PURCHASE: `${COINS_PATHNAME}/purchase`,
    COINS_PAYMENT: `${COINS_PATHNAME}/payment`,
    REVIEWS: `${PUBLIC_URL}reviews`,
    FAQ: `${PUBLIC_URL}faq`,
    DELIVERY: `${PUBLIC_URL}delivery`,
    PAYMENTS: `${PUBLIC_URL}payments`,
    TERMS: `${PUBLIC_URL}terms`,
    PRIVACY: `${PUBLIC_URL}privacy-policy`,
    COOKIE_POLICY: `${PUBLIC_URL}cookie-policy`,
    CONTACT: `${PUBLIC_URL}contact`,
};

export const PROJECT_PUBLIC_SELLER_ROUTES: Record<string, string> = {
    HOME: PUBLIC_URL,
    UNAUTHORIZED_REDIRECT: PUBLIC_URL,
    FAQ: `${PUBLIC_URL}faq`,
    ORDER: ORDER_PATHNAME,
    ORDER_INFO: `${ORDER_PATHNAME}${ORDER_STEPS_PATHNAMES[EOrderProcessingStepIds.SELLER_ORDER_INFO]}`,
    ORDER_ACCOUNT_DETAILS: `${ORDER_PATHNAME}${ORDER_STEPS_PATHNAMES[EOrderProcessingStepIds.SELLER_ACCOUNT_DETAILS]}`,
    // ORDER_SUMMARY_AND_SELL: `${ORDER}/summ`,
    ORDER_AWAITING_FOR_DELIVERY: `${ORDER_PATHNAME}${ORDER_STEPS_PATHNAMES[EOrderProcessingStepIds.SELLER_AWAITING_FOR_DELIVERY]}`,
    PAYMENT: `${PUBLIC_URL}payments`,
    TERMS_AND_CONDITIONS: `${PUBLIC_URL}terms`,
    PRIVACY_POLICY: `${PUBLIC_URL}privacy-policy`,
    COOKIE_POLICY: `${PUBLIC_URL}cookie-policy`,
    CONTACT: `${PUBLIC_URL}contact`,
};

const PROJECT_SPECIFIC_PUBLIC_ROUTES: Record<
    EProjects,
    Record<string, string>
> = {
    [EProjects.WWW]: PROJECT_PUBLIC_WWW_ROUTES,
    [EProjects.SELLER]: PROJECT_PUBLIC_SELLER_ROUTES,
};

export const WWW_ORDER_PAYMENT_FEEDBACK_PATHNAMES: Record<
    EPaymentFBPage,
    { success: string; failure: string }
> = {
    [EPaymentFBPage.ORDER]: {
        success: PROJECT_PUBLIC_WWW_ROUTES["ORDER_AWAITING_FOR_DELIVERY"],
        failure: PROJECT_PUBLIC_WWW_ROUTES["ORDER_AWAITING_FOR_DELIVERY"],
    },
    [EPaymentFBPage.ORDER_PLATFORM]: {
        success: `${ORDER_PATHNAME}/${EDynamicURLParams.PLATFORM}${ORDER_STEPS_PATHNAMES[EOrderProcessingStepIds.WWW_AWAITING_FOR_DELIVERY]}`,
        failure: `${ORDER_PATHNAME}/${EDynamicURLParams.PLATFORM}${ORDER_STEPS_PATHNAMES[EOrderProcessingStepIds.WWW_AWAITING_FOR_DELIVERY]}`,
    },
    [EPaymentFBPage.COINS]: {
        success: PROJECT_PUBLIC_WWW_ROUTES["COINS_PAYMENT"],
        failure: PROJECT_PUBLIC_WWW_ROUTES["COINS_PAYMENT"],
    },
    [EPaymentFBPage.COINS_WITH_AMOUNT]: {
        success: `${COINS_PATHNAME}/${EDynamicURLParams.COINS_AMOUNT}/delivery`,
        failure: `${COINS_PATHNAME}/${EDynamicURLParams.COINS_AMOUNT}/delivery`,
    },
};

export const PROJECT_PUBLIC_ROUTES =
    PROJECT_SPECIFIC_PUBLIC_ROUTES[
        process.env["NEXT_PUBLIC_PROJECT"] as EProjects
    ];

export const PROJECT_PRIVATE_ROUTES =
    PROJECT_SPECIFIC_PRIVATE_ROUTES[
        process.env["NEXT_PUBLIC_PROJECT"] as EProjects
    ];

export const API_PROJECT_PUBLIC_ROUTES =
    API_PROJECT_SPECIFIC_PUBLIC_ROUTES[
        process.env["NEXT_PUBLIC_PROJECT"] as EProjects
    ];

export const API_PROJECT_PRIVATE_ROUTES =
    API_PROJECT_SPECIFIC_PRIVATE_ROUTES[
        process.env["NEXT_PUBLIC_PROJECT"] as EProjects
    ];

export const EXTERNAL_LINKS = {
    SBC_SOLVER: "https://sbcsolver.com/",
    TRUSTPILOT: "https://uk.trustpilot.com/review/royalfut.com",
};
