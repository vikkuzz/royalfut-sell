const TRANSFER_PROTOCOL = "https";
const SECOND_LEVEL_DOMAIN = "royalfut.com";
const SELL_SUBDOMAIN = `sell.${SECOND_LEVEL_DOMAIN}`;
const ROOT_URL = `${TRANSFER_PROTOCOL}://${SECOND_LEVEL_DOMAIN}`;
// const SELL_URL = `${TRANSFER_PROTOCOL}://${SELL_SUBDOMAIN}`;
const BASE_EXTERNAL_API_URL = `https://b55e94a3-5b22-4435-9198-f23b65276f77.mock.pstmn.io`;

const PUBLIC_URL = "";
const ORDER = `${PUBLIC_URL}/order`;

export const PUBLIC_API_ROUTES = {
    FAST_LOGIN_EMAIL: `${"https://test-royalfut.com"}/users/fastlogin`,
    // FAST_LOGIN_EMAIL: `${BASE_EXTERNAL_API_URL}/users/fastlogin`,
};

export const AUTHORIZED_API_ROUTES = {
    ORDERS: `orders`,
    WITHDRAWALS: `withdrawals`,
    PROFILE_ORDERS: `${PUBLIC_URL}/profile/orders`,
};

export const PUBLIC_ROUTES = {
    HOME: `${PUBLIC_URL}/`,
    FAQ: `${PUBLIC_URL}/faq`,
    ORDER,
    ORDER_INFO: ORDER,
    ORDER_ACCOUNT_DETAILS: `${ORDER}/acc`,
    ORDER_SUMMARY_AND_SELL: `${ORDER}/summ`,
    ORDER_AWAITING_FOR_DELIVERY: `${ORDER}/delivery`,
    DELIVERY: `${ROOT_URL}/delivery`,
    PAYMENT: `${PUBLIC_URL}/payments`,
    TERMS_AND_CONDITIONS: `${PUBLIC_URL}/terms`,
    PRIVACY_POLICY: `${PUBLIC_URL}/privacy-policy`,
    COOKIE_POLICY: `${PUBLIC_URL}/cookie-policy`,
    UNAUTHORIZED_REDIRECT: `${PUBLIC_URL}/`,
};
