import { bodyFixPosition, bodyUnfixPosition } from "../../utils/functions";

const ISSERVER = typeof window === "undefined";

const initialState = {
    buy_off: false,
    undisabled: false,
    direction: "ltr",
    loginModal: false,
    modalPassword: false,
    modalIframe: false,
    modalIframePage: false,
    modalAva: false,
    modalRedirect: false,
    modalTimer: false,
    modalCalc: false,
    modalFunnelCalc: false,
    modalFunnelMethod: false,
    modalFunnelMethodVideo: false,
    modalFunnelProcess: false,
    modalComponent: false,
    modalLoyalty: false,
    isAuth: false,
    loginMenu: {
        registration: true,
        login: false,
    },
    calcFunnel: {},
    user: {},
    errorMessage: "",
    showMessage: false,

    stock: {
        deliveryMethods: [
            {
                "type": "Easy",
                "data": [
                    {
                        "platform": "xbox",
                        "pricePerCurrencyMap": {
                            "EUR": 0.000029,
                            "GBP": 0.000025,
                            "SEK": 0.00034,
                            "NOK": 0.000346,
                            "AUD": 0.000048,
                            "TRY": 0.001037,
                            "USD": 0.000031,
                            "RUB": 0.002727,
                            "SAR": 0.000118,
                            "AED": 0.000115,
                            "CAD": 0.000043,
                            "BRL": 0.000178,
                            "PLN": 0.000124,
                        },
                    },
                    {
                        "platform": "ps4",
                        "pricePerCurrencyMap": {
                            "EUR": 0.000029,
                            "GBP": 0.000025,
                            "SEK": 0.00034,
                            "NOK": 0.000346,
                            "AUD": 0.000048,
                            "TRY": 0.001037,
                            "USD": 0.000031,
                            "RUB": 0.002727,
                            "SAR": 0.000118,
                            "AED": 0.000115,
                            "CAD": 0.000043,
                            "BRL": 0.000178,
                            "PLN": 0.000124,
                        },
                    },
                    {
                        "platform": "pc",
                        "pricePerCurrencyMap": {
                            "SEK": 0.000458,
                            "AUD": 0.000065,
                            "PLN": 0.000167,
                            "TRY": 0.001395,
                            "EUR": 0.000039,
                            "GBP": 0.000033,
                            "NOK": 0.000465,
                            "RUB": 0.003667,
                            "USD": 0.000042,
                            "SAR": 0.000159,
                            "AED": 0.000155,
                            "CAD": 0.000058,
                            "BRL": 0.000239,
                        },
                    },
                ],
            },
            {
                "type": "Manual",
                "data": [
                    {
                        "platform": "xbox",
                        "pricePerCurrencyMap": {
                            "EUR": 0.000089,
                            "GBP": 0.000075,
                            "SEK": 0.001045,
                            "NOK": 0.001062,
                            "AUD": 0.000147,
                            "TRY": 0.003182,
                            "USD": 0.000096,
                            "RUB": 0.008369,
                            "SAR": 0.000362,
                            "AED": 0.000354,
                            "CAD": 0.000133,
                            "BRL": 0.000546,
                            "PLN": 0.000381,
                        },
                    },
                    {
                        "platform": "ps4",
                        "pricePerCurrencyMap": {
                            "EUR": 0.000089,
                            "GBP": 0.000075,
                            "SEK": 0.001045,
                            "NOK": 0.001062,
                            "AUD": 0.000147,
                            "TRY": 0.003182,
                            "USD": 0.000096,
                            "RUB": 0.008369,
                            "SAR": 0.000362,
                            "AED": 0.000354,
                            "CAD": 0.000133,
                            "BRL": 0.000546,
                            "PLN": 0.000381,
                        },
                    },
                    {
                        "platform": "pc",
                        "pricePerCurrencyMap": {
                            "SEK": 0.001045,
                            "AUD": 0.000147,
                            "PLN": 0.000381,
                            "TRY": 0.003182,
                            "EUR": 0.000089,
                            "GBP": 0.000075,
                            "NOK": 0.001062,
                            "RUB": 0.008369,
                            "USD": 0.000096,
                            "SAR": 0.000362,
                            "AED": 0.000354,
                            "CAD": 0.000133,
                            "BRL": 0.000546,
                        },
                    },
                ],
            },
        ],
        currency: "RUB",
        locale: "RU",
        region: "RU",
        minLimitSumCoins: 100000,
        maxLimitSumCoins: 200000000,
        discount: [
            {
                limitSumCoins: 20000000,
                limitSumView: "20m",
                discountPercent: 7,
                additionalCoins: 100000,
            },
            {
                limitSumCoins: 10000000,
                limitSumView: "10m",
                discountPercent: 7,
                additionalCoins: 100000,
            },
            {
                limitSumCoins: 5000000,
                limitSumView: "5m",
                discountPercent: 5,
                additionalCoins: 100000,
            },
            {
                limitSumCoins: 4000000,
                limitSumView: "4m",
                discountPercent: 4,
                additionalCoins: 100000,
            },
            {
                limitSumCoins: 2000000,
                limitSumView: "2m",
                discountPercent: 3,
                additionalCoins: 100000,
            },
            {
                limitSumCoins: 1000000,
                limitSumView: "1m",
                discountPercent: 3,
                additionalCoins: 100000,
            },
            {
                limitSumCoins: 800000,
                limitSumView: "800k",
                discountPercent: 3,
                additionalCoins: 100000,
            },
        ],
        lastRefreshedDate: "2024-01-22T16:43:25.241906496",
        paypalEnabled: false,
        rate: "4.6",
        reviews: "534",
        provider: "Futtransfertop",
    },
    platform: !ISSERVER
        ? JSON.parse(
              localStorage.getItem("statePlatform") ??
                  '{"ps":true,"xbox":false,"pc":false}'
          )
        : {
              xbox: false,
              ps: true,
              pc: false,
          },
    method: {
        easy: true,
        manual: false,
    },
    calcCoins: 100000,
    coins: {
        coef: "",
        amount: 100000,
        price: "",
        fullprice: "",
    },
    order: {},
    cryptoLimits: {},
    createOrder: {},
    allOrders: {},
    offerCards: [],
    price: 0,
};

const royalfutReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_PRICE":
            return { ...state, price: action.data };

        case "GET_DATA_COINS_PAGE":
            return { ...state, data_coins_page: action.data };

        case "GET_CALC_FUNNEL":
            return { ...state, calcFunnel: action.data };

        case "ORDER":
            return { ...state, order: action.data };

        case "GET_ALL_ORDERS":
            return { ...state, allOrders: action.data };

        case "GET_OFFERS":
            return { ...state, offerCards: action.data };

        case "NAME_PAYMENT_METHOD":
            return { ...state, paymentMethod: action.data };

        case "USER_CREATE_ORDER":
            return { ...state, createOrder: action.data };

        case "GET_CRYPTO_LIMITS":
            return { ...state, cryptoLimits: action.data };

        case "CHANGE_PLATFORM":
            let platform = state.platform;
            if (action.data.includes("ps")) {
                platform = {
                    ps: true,
                    xbox: false,
                    pc: false,
                };
            } else if (action.data.includes("xbox")) {
                platform = {
                    ps: false,
                    xbox: true,
                    pc: false,
                };
            } else {
                platform = {
                    ps: false,
                    xbox: false,
                    pc: true,
                };
            }
            return { ...state, platform: platform };

        case "CHANGE_METHOD":
            let method = state.method;
            if (action.data == "easy") {
                method = {
                    easy: true,
                    manual: false,
                };
            } else {
                method = {
                    easy: false,
                    manual: true,
                };
            }
            return { ...state, method: method };

        case "CHANGE_DIR":
            return { ...state, direction: action.data };

        case "LOGIN_MODAL":
            if (action.data) {
                document.querySelector("body").style.overflowY = "hidden";
                bodyFixPosition();
            } else {
                document.querySelector("body").style.overflowY = "auto";
                bodyUnfixPosition();
            }
            return { ...state, loginModal: action.data };

        case "MODAL_CALC":
            if (action.data) {
                document.querySelector("body").style.overflowY = "hidden";
                bodyFixPosition();
            } else {
                document.querySelector("body").style.overflowY = "auto";
                bodyUnfixPosition();
            }
            return { ...state, modalCalc: action.data };

        case "MODAL_PASSWORD":
            if (action.data) {
                document.querySelector("body").style.overflowY = "hidden";
                bodyFixPosition();
            } else {
                document.querySelector("body").style.overflowY = "auto";
                bodyUnfixPosition();
            }
            return { ...state, modalPassword: action.data };

        case "MODAL_IFRAME":
            if (action.data) {
                document.querySelector("body").style.overflowY = "hidden";
                bodyFixPosition();
            } else {
                document.querySelector("body").style.overflowY = "auto";
                bodyUnfixPosition();
            }
            return { ...state, modalIframe: action.data };

        case "MODAL_IFRAME_PAGE":
            if (action.data) {
                document.querySelector("body").style.overflowY = "hidden";
                bodyFixPosition();
            } else {
                document.querySelector("body").style.overflowY = "auto";
                bodyUnfixPosition();
            }
            return { ...state, modalIframePage: action.data };

        case "MODAL_AVA":
            if (action.data) {
                document.querySelector("body").style.overflowY = "hidden";
                bodyFixPosition();
            } else {
                document.querySelector("body").style.overflowY = "auto";
                bodyUnfixPosition();
            }
            return { ...state, modalAva: action.data };
        case "MODAL_REDIRECT":
            if (action.data) {
                document.querySelector("body").style.overflowY = "hidden";
                bodyFixPosition();
            } else {
                document.querySelector("body").style.overflowY = "auto";
                bodyUnfixPosition();
            }
            return { ...state, modalRedirect: action.data };
        case "MODAL_LOYALTY":
            if (action.data) {
                document.querySelector("body").style.overflowY = "hidden";
                bodyFixPosition();
            } else {
                document.querySelector("body").style.overflowY = "auto";
                bodyUnfixPosition();
            }
            return { ...state, modalLoyalty: action.data };

        case "MODAL_TIMER":
            if (action.data) {
                document.querySelector("body").style.overflowY = "hidden";
                bodyFixPosition();
            } else {
                document.querySelector("body").style.overflowY = "auto";
                bodyUnfixPosition();
            }
            return { ...state, modalTimer: action.data };

        case "UNDISABLED":
            return { ...state, undisabled: action.data };

        case "MODAL_FUNNEL_CALC":
            if (action.data) {
                document.querySelector("body").style.overflowY = "hidden";
                bodyFixPosition();
            } else {
                document.querySelector("body").style.overflowY = "auto";
                bodyUnfixPosition();
            }
            return { ...state, modalFunnelCalc: action.data };

        case "MODAL_COMPONENT":
            if (action.data) {
                document.querySelector("body").style.overflowY = "hidden";
                bodyFixPosition();
            } else {
                document.querySelector("body").style.overflowY = "auto";
                bodyUnfixPosition();
            }
            return { ...state, modalComponent: action.data };

        case "MODAL_FUNNEL_METHOD":
            if (action.data) {
                document.querySelector("body").style.overflowY = "hidden";
                bodyFixPosition();
            } else {
                document.querySelector("body").style.overflowY = "auto";
                bodyUnfixPosition();
            }
            return { ...state, modalFunnelMethod: action.data };

        case "MODAL_FUNNEL_PROCESS":
            if (action.data) {
                document.querySelector("body").style.overflowY = "hidden";
                bodyFixPosition();
            } else {
                document.querySelector("body").style.overflowY = "auto";
                bodyUnfixPosition();
            }
            return { ...state, modalFunnelProcess: action.data };

        case "MODAL_FUNNEL_METHOD_VIDEO":
            if (action.data) {
                document.querySelector("body").style.overflowY = "hidden";
                bodyFixPosition();
            } else {
                document.querySelector("body").style.overflowY = "auto";
                bodyUnfixPosition();
            }
            return {
                ...state,
                modalFunnelMethodVideo: action.data,
            };

        case "COINS":
            return {
                ...state,
                coins: action.data,
                order: { ...state.order, coins: action.data },
            };

        case "COINS_FROM_CALCULATOR":
            return {
                ...state,
                calcCoins: action.data,
            };

        case "GET_STOCK":
            return { ...state, stock: action.data };

        case "LOGIN":
            return {
                ...state,
                loginMenu: { registration: false, login: true },
            };

        case "REGISTRATION":
            return {
                ...state,
                loginMenu: { registration: true, login: false },
            };

        case "USER":
            document.querySelector("body").style.overflowY = "auto";
            bodyUnfixPosition();
            return {
                ...state,
                isAuth: true,
                user: { ...action.data },
                loginModal: false,
                loginMenu: {
                    registration: false,
                    login: false,
                },
            };

        case "USER_LOGOUT":
            document.querySelector("body").style.overflowY = "auto";
            bodyUnfixPosition();

            return {
                ...state,
                isAuth: false,
                user: {},
                loginModal: false,
                loginMenu: {
                    registration: false,
                    login: true,
                },
            };

        case "CATCH_ERROR":
            return { ...state, errorMessage: action.data };

        case "SHOW_MESSAGE":
            return { ...state, showMessage: action.data };

        default:
            return { ...state };
    }
};

export default royalfutReducer;
