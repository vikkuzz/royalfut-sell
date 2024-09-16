export const loginModal = data => ({ type: "LOGIN_MODAL", data });
export const modalCalc = data => ({ type: "MODAL_CALC", data });
export const modalLoyalty = data => ({ type: "MODAL_LOYALTY", data });
export const modalPassword = data => ({ type: "MODAL_PASSWORD", data });
export const modalIframe = data => ({ type: "MODAL_IFRAME", data });
export const modalIframePage = data => ({ type: "MODAL_IFRAME_PAGE", data });
export const modalAva = data => ({ type: "MODAL_AVA", data });
export const modalRedirect = data => ({ type: "MODAL_REDIRECT", data });
export const modalTimer = data => ({ type: "MODAL_TIMER", data });
export const modalFunnelCalc = data => ({ type: "MODAL_FUNNEL_CALC", data });
export const modalFunnelMethod = data => ({
    type: "MODAL_FUNNEL_METHOD",
    data,
});
export const modalFunnelProcess = data => ({
    type: "MODAL_FUNNEL_PROCESS",
    data,
});
export const modalFunnelMethodVideo = data => ({
    type: "MODAL_FUNNEL_METHOD_VIDEO",
    data,
});
export const undisabled = data => ({
    type: "UNDISABLED",
    data,
});
export const loginClick = () => ({ type: "LOGIN" });
export const registrationClick = () => ({ type: "REGISTRATION" });
export const user = data => ({ type: "USER", data });
export const userlogout = () => ({ type: "USER_LOGOUT" });
export const catcherror = data => ({ type: "CATCH_ERROR", data });
export const showMessage = data => ({ type: "SHOW_MESSAGE", data });
export const stock = data => ({ type: "GET_STOCK", data });
export const changePlatform = data => ({ type: "CHANGE_PLATFORM", data });
export const changeMethod = data => ({ type: "CHANGE_METHOD", data });
export const coins = data => ({ type: "COINS", data });
export const calcCoins = data => ({ type: "COINS_FROM_CALCULATOR", data });
export const order = data => ({ type: "ORDER", data });
export const getCriptoLimits = data => ({ type: "GET_CRYPTO_LIMITS", data });
export const userCreateOrder = data => ({ type: "USER_CREATE_ORDER", data });
export const changeDir = data => ({ type: "CHANGE_DIR", data });
export const getAllOrders = data => ({ type: "GET_ALL_ORDERS", data });
export const getOffers = data => ({ type: "GET_OFFERS", data });
export const getPriceAction = data => ({ type: "GET_PRICE", data });
export const getCalcFunnel = data => ({ type: "GET_CALC_FUNNEL", data });
export const namePaymentMethod = data => ({
    type: "NAME_PAYMENT_METHOD",
    data,
});
export const getDataCoinsPage = data => ({
    type: "GET_DATA_COINS_PAGE",
    data,
});
export const modalComponent = data => ({ type: "MODAL_COMPONENT", data });
