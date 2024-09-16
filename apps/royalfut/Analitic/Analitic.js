export default class Analitic {
    signUp = email => {
        if (typeof window !== "undefined") {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                event: "sign_up",
                userId: email, // передавать email юзера в платформу
            });
        }
    };
    signIn = (email, method) => {
        if (typeof window !== "undefined") {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                event: "login",
                userId: email, // передавать email юзера в платформу
                method: method, // email, google
            });
        }
    };
    clickMainBuyCoins = () => {
        if (typeof window !== "undefined") {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
            window.dataLayer.push({
                event: "view_item",
                ecommerce: {
                    items: [
                        {
                            item_name: "Coins",
                        },
                    ],
                },
            });
        }
    };
    choosePlatform = brand => {
        if (typeof window !== "undefined" && brand) {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
            window.dataLayer.push({
                event: "select_item",
                ecommerce: {
                    items: [
                        {
                            item_name: "Coins",
                            item_brand: brand, // ps, xbox, ps4, ps5, xbox1, xboxsx, pc
                        },
                    ],
                },
            });
        }
    };
    clickCheckout = (price, brand) => {
        if (typeof window !== "undefined") {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
            window.dataLayer.push({
                event: "add_to_cart",
                ecommerce: {
                    items: [
                        {
                            item_name: "Coins",
                            price: price, // передаём цену за кт выбранного колва монет в евро
                            item_brand: brand, // ps, xbox, ps4, ps5, xbox1, xboxsx, pc
                        },
                    ],
                },
            });
        }
    };
    gotoAcquiring = (price, brand, method) => {
        if (typeof window !== "undefined") {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
            window.dataLayer.push({
                event: "begin_checkout",
                ecommerce: {
                    items: [
                        {
                            item_name: "Coins",
                            price: price, // передаём цену в EUR
                            item_brand: brand, // ps, xbox, ps4, ps5, xbox1, xboxsx, pc
                            item_category: method, // Comfort Trade или Player Auction
                        },
                    ],
                },
            });
        }
    };
    successPayment = (
        price,
        id,
        payMethod,
        coupon = "",
        brand,
        method,
        discValue = ""
    ) => {
        if (typeof window !== "undefined") {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                event: "purchase",
                ecommerce: {
                    currency: "EUR",
                    value: price, // передаём цену в евро
                    tax: 0.0,
                    shipping: 0.0,
                    affiliation: payMethod, // bycard, unionpay, modul, applepay, googlepay, crypto
                    coupon: coupon, // пишем если был
                    transaction_id: id, // передаём сюда order_id
                    items: [
                        {
                            item_name: "Coins",
                            price: price, // передаём цену в евро, должно совпадать с полем value выше
                            item_brand: brand, // ps, xbox, ps4, ps5, xbox1, xboxsx, pc
                            item_category: method, // Comfort Trade или Player Auction
                        },
                    ],
                },
            });
        }
    };
    goOnCoinsPackPage = price => {
        if (typeof window !== "undefined") {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
            window.dataLayer.push({
                event: "view_item",
                ecommerce: {
                    items: [
                        {
                            item_name: "Coin Bundle",
                            price: price, // цена в евро
                        },
                    ],
                },
            });
        }
    };
    choosePackCard = (price, brand = "ps4") => {
        if (typeof window !== "undefined") {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
            window.dataLayer.push({
                event: "select_item",
                ecommerce: {
                    items: [
                        {
                            item_name: "Coin Bundle",
                            price: price, // цена в евро
                            item_brand: brand, // ps, xbox, ps4, ps5, xbox1, xboxsx, pc
                        },
                    ],
                },
            });
        }
    };
    clickBuyCoinsPack = (price, brand = "ps4") => {
        if (typeof window !== "undefined") {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
            window.dataLayer.push({
                event: "add_to_cart",
                ecommerce: {
                    items: [
                        {
                            item_name: "Coin Bundle",
                            price: price, // цена в евро
                            item_brand: brand, // ps, xbox, ps4, ps5, xbox1, xboxsx, pc
                        },
                    ],
                },
            });
        }
    };
    gotoAcquiringFromCoinsPack = (price, brand = "ps4", method) => {
        if (typeof window !== "undefined") {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
            window.dataLayer.push({
                event: "begin_checkout",
                ecommerce: {
                    items: [
                        {
                            item_name: "Coin Bundle",
                            price: price, // цена в евро
                            item_brand: brand, // ps, xbox, ps4, ps5, xbox1, xboxsx, pc
                            item_category: method, // Comfort Trade или Player Auction
                        },
                    ],
                },
            });
        }
    };
    successPaymentCoinsPack = (price, payMethod, coupon, id, brand, method) => {
        if (typeof window !== "undefined") {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                event: "purchase",
                ecommerce: {
                    currency: "EUR",
                    value: price, // передаём цену в евро
                    tax: 0.0,
                    shipping: 0.0,
                    affiliation: payMethod, // bycard, unionpay, modul, applepay, googlepay, crypto
                    coupon: coupon, // пишем если был
                    transaction_id: id, // передаём сюда order_id
                    items: [
                        {
                            item_name: "Coin Bundle",
                            price: price, // цена в евро
                            item_brand: brand, // ps, xbox, ps4, ps5, xbox1, xboxsx, pc
                            item_category: method, // Comfort Trade или Player Auction
                        },
                    ],
                },
            });
        }
    };
}
