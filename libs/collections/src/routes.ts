import { EProjects } from "@royalfut/enums";

const TRANSFER_PROTOCOL = process.env["NEXT_PUBLIC_PROTOCOL"]
    ? process.env["NEXT_PUBLIC_PROTOCOL"]
    : process.env["NODE_ENV"] === "development"
      ? "http"
      : "https";

const SECOND_LEVEL_DOMAIN = process.env["NEXT_PUBLIC_SECOND_LEVEL_DOMAIN"]
    ? process.env["NEXT_PUBLIC_SECOND_LEVEL_DOMAIN"]
    : process.env["NODE_ENV"] === "development"
      ? "localhost"
      : "royalfut";

const SUB_DOMAIN = process.env["NEXT_PUBLIC_SUB_DOMAIN"]
    ? process.env["NEXT_PUBLIC_SUB_DOMAIN"]
    : null;

const TOP_LEVEL_DOMAIN = process.env["NEXT_PUBLIC_TOP_LEVEL_DOMAIN"]
    ? process.env["NEXT_PUBLIC_TOP_LEVEL_DOMAIN"]
    : process.env["NODE_ENV"] === "development"
      ? null
      : "com";

export const HOST_URL = `${TRANSFER_PROTOCOL}://${SUB_DOMAIN ? SUB_DOMAIN + "." : ""}${SECOND_LEVEL_DOMAIN}${TOP_LEVEL_DOMAIN ? "." + TOP_LEVEL_DOMAIN : ""}`;

const PUBLIC_URL = "";
const ORDER = `${PUBLIC_URL}/order`;
const API_ORIGIN = process.env["NEXT_PUBLIC_API_ORIGIN"];

export const API_PROJECT_PRIVATE_WWW_ROUTES: Record<string, string> = {
    GET_USER: `${API_ORIGIN}/api/user`,
};

export const API_PROJECT_PRIVATE_SELLER_ROUTES: Record<string, string> = {
    GET_USER: `${API_ORIGIN}/api/user`,
    SELLER_WITHDRAW: `${API_ORIGIN}/newapi/seller/withdraw`,
    SELLER_PAYOUTS: `${API_ORIGIN}/newapi/seller/payouts`,
    SELLER_ORDERS: `${API_ORIGIN}/newapi/seller/orders`,
    SELLER_ORDER: `${API_ORIGIN}/newapi/seller/order`,
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
    BONUS_INFO: `${API_ORIGIN}/newapi/bonus/info`,
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
    PROFILE: `${PUBLIC_URL}/profile`,
    PROFILE_ORDERS: `${PUBLIC_URL}/profile/orders`,
    PROFILE_SETTINGS: `${PUBLIC_URL}/profile/settings`,
    PROFILE_POINTS: `${PUBLIC_URL}/profile/points`,
};

export const PROJECT_PRIVATE_SELLER_ROUTES: Record<string, string> = {
    PROFILE_ORDERS: `${PUBLIC_URL}/profile/orders`,
};

const PROJECT_SPECIFIC_PRIVATE_ROUTES: Record<
    EProjects,
    Record<string, string>
> = {
    [EProjects.WWW]: PROJECT_PRIVATE_WWW_ROUTES,
    [EProjects.SELLER]: PROJECT_PRIVATE_SELLER_ROUTES,
};

export const PROJECT_PUBLIC_WWW_ROUTES: Record<string, string> = {
    HOME: `${PUBLIC_URL}/`,
    UNAUTHORIZED_REDIRECT: `${PUBLIC_URL}/`,
    ORDER,
    ORDER_INFO: ORDER,
    COINS: `${PUBLIC_URL}/coins`,
    REVIEWS: `${PUBLIC_URL}/reviews`,
    FAQ: `${PUBLIC_URL}/faq`,
    DELIVERY: `${PUBLIC_URL}/delivery`,
    PAYMENTS: `${PUBLIC_URL}/payments`,
    TERMS: `${PUBLIC_URL}/terms`,
    PRIVACY: `${PUBLIC_URL}/privacy-policy`,
    COOKIE: `${PUBLIC_URL}/cookie-policy`,
};

export const PROJECT_PUBLIC_SELLER_ROUTES: Record<string, string> = {
    HOME: `${PUBLIC_URL}/`,
    UNAUTHORIZED_REDIRECT: `${PUBLIC_URL}/`,
    FAQ: `${PUBLIC_URL}/faq`,
    ORDER,
    ORDER_INFO: ORDER,
    ORDER_ACCOUNT_DETAILS: `${ORDER}/acc`,
    ORDER_SUMMARY_AND_SELL: `${ORDER}/summ`,
    ORDER_AWAITING_FOR_DELIVERY: `${ORDER}/delivery`,
    PAYMENT: `${PUBLIC_URL}/payments`,
    TERMS_AND_CONDITIONS: `${PUBLIC_URL}/terms`,
    PRIVACY_POLICY: `${PUBLIC_URL}/privacy-policy`,
    COOKIE_POLICY: `${PUBLIC_URL}/cookie-policy`,
};

const PROJECT_SPECIFIC_PUBLIC_ROUTES: Record<
    EProjects,
    Record<string, string>
> = {
    [EProjects.WWW]: PROJECT_PUBLIC_WWW_ROUTES,
    [EProjects.SELLER]: PROJECT_PUBLIC_SELLER_ROUTES,
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
