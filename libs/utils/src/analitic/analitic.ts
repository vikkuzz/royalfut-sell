/* eslint-disable max-lines */
export const signUp = (email: string) => {
    if (typeof window !== "undefined") {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            event: "sign_up",
            userId: email, // передавать email юзера в платформу
        });
    }
    console.log(window.dataLayer);
};
export const signIn = (email: any, method: any) => {
    if (typeof window !== "undefined") {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            event: "login",
            userId: email, // передавать email юзера в платформу
            method: method, // email, google
        });
    }
    console.log(window.dataLayer);
};
export const clickMainBuyCoins = () => {
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
    console.log(window.dataLayer);
};
export const choosePlatform = (brand: any) => {
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
export const clickCheckout = (price: any, brand: any) => {
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
export const gotoAcquiring = (price: any, brand: any, method: any) => {
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
export const successPayment = (
    price: any,
    id: any,
    payMethod: any,
    coupon = "",
    brand: any,
    method: any
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
export const goOnCoinsPackPage = (price: any) => {
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
export const choosePackCard = (price: any, brand = "ps4") => {
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
export const clickBuyCoinsPack = (price: any, brand = "ps4") => {
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
export const gotoAcquiringFromCoinsPack = (
    price: any,
    brand = "ps4",
    method: any
) => {
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
export const successPaymentCoinsPack = (
    price: any,
    payMethod: any,
    coupon: any,
    id: any,
    brand: any,
    method: any
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
export const clickAuthInOrderPage = () => {
    if (typeof window !== "undefined") {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
        window.dataLayer.push({
            event: "select_item",
            ecommerce: {
                items: [
                    {
                        item_name: "Coins",
                    },
                ],
            },
        });
        console.log(window.dataLayer);
        setTimeout(() => {
            window.dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
            window.dataLayer.push({
                event: "add_to_cart",
                ecommerce: {
                    items: [
                        {
                            item_name: "Coins",
                        },
                    ],
                },
            });
            console.log(window.dataLayer);
        }, 10000);
    }
};
export const clickPayNow = (price: number) => {
    if (typeof window !== "undefined") {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
        window.dataLayer.push({
            event: "begin_checkout",
            ecommerce: {
                items: [
                    {
                        item_name: "Coins",
                        price: price, // цена в евро,
                    },
                ],
            },
        });
    }
    console.log(window.dataLayer);
};
export const orderPageSuccessPayment = (price: number, orderId: string) => {
    if (typeof window !== "undefined") {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
        window.dataLayer.push({
            event: "purchase",
            ecommerce: {
                currency: "EUR",
                value: price, // передаём цену в евро
                tax: 0.0,
                shipping: 0.0,
                transaction_id: orderId, // передаём сюда order_id
                items: [
                    {
                        item_name: "Coins",
                        price: price, // передаём цену в евро, должно совпадать с полем value выше
                    },
                ],
            },
        });
    }
    console.log(window.dataLayer);
};
