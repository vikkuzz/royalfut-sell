import flagLangs from "../data-elements/countries";

class Api {
    // baseAddress = 'https://test-royalfut.com/';
    baseAddress = "https://royalfut.com/";

    constructor() {
        if (Api.instance) {
            return Api.instance;
        }

        Api.instance = this;
        return this;
    }

    getLoyaltyUser = async token => {
        let options = {};
        if (token) {
            options = {
                Authorization: `Token ${token}`,
            };
        }
        const res = await fetch(`${this.baseAddress}newapi/bonus/info`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                mode: "no-cors",
                ...options,
            },
        });
        const result = await res.json();
        return result;
    };
    getLoyaltyTable = async token => {
        let options = {};
        if (token) {
            options = {
                Authorization: `Token ${token}`,
            };
        }
        const res = await fetch(`${this.baseAddress}newapi/bonus/levels`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                mode: "no-cors",
                ...options,
            },
        });
        const result = await res.json();
        return result;
    };

    getIframe = async (id, token, callback) => {
        const res = await fetch(`${this.baseAddress}api/order/${id}/place/pa`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // mode: 'no-cors', // same-origin, cors
                Authorization: `Token ${token}`,
            },
        }).catch(err => {
            callback(err);
            throw console.error(err.message);
        });
        if (res.ok == false) {
            callback(`${res.status}: ${res.statusText}`);
            throw console.error(res);
        }
        const result = await res.json();
        return result;
    };

    getStock = async () => {
        const res = await fetch(`${this.baseAddress}api/stock`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                mode: "no-cors",
            },
            body: '{"ip": ""}',
        });
        const result = await res.json();
        return result;
    };

    place = async (id, body, token, callback) => {
        let urlForPlace = `${this.baseAddress}api/order/${id}/place`;

        const res = await fetch(`${urlForPlace}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,
            },
            body: JSON.stringify(body),
        }).catch(err => {
            callback(err);
            throw console.log(err.message);
        });
        if (res.ok == false) {
            callback(`${res.status}: ${res.statusText}`);
            throw console.log(res);
        }
        const result = await res.json();
        return result;
    };

    updateOrder = async (
        orderId,
        token,
        platform,
        method,
        amount,
        currency,
        promoCode = null,
        callback,
        bonus,
        cashback
    ) => {
        if (platform == "ps") {
            platform = "ps4";
        }
        let body = {
            platform: platform,
            deliveryMethod: method,
            coinCount: amount,
            currency: currency,
            promoCode: promoCode,
            cashback: cashback,
        };
        if (bonus > 0) {
            body.bonusType = "COINS";
        }
        const res = await fetch(`${this.baseAddress}api/order/${orderId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,
            },
            body: JSON.stringify(body),
        });
        if (res.ok == false) {
            callback(`${res.status}: ${res.statusText}`);
            throw console.log(res);
        }
        const result = await res.json();
        return result;
    };

    updateProfile = async (token, data, callback) => {
        const res = await fetch(`${this.baseAddress}api/user`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,
            },
            body: JSON.stringify(data),
        }).catch(err => {
            callback(err);
            throw console.log(err.message);
        });
        if (res.ok == false) {
            callback(`${res.status}: ${res.statusText}`);
            throw console.log(res);
        }
        const result = await res.json();
        return result;
    };

    changePassword = async (
        token,
        image = "",
        locale,
        region,
        email,
        password,
        callback
    ) => {
        const res = await fetch(`${this.baseAddress}api/user`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,
            },
            body: JSON.stringify({
                image: image,
                userLocale: locale,
                region: region,
                email: email,
                password: password,
            }),
        }).catch(err => {
            callback(err);
            throw console.log(err.message);
        });
        if (res.ok == false) {
            callback(`${res.status}: ${res.statusText}`);
            throw console.log(res);
        }

        const result = await res.json();
        return result;
    };

    prePay = async (
        paymentMethod = "",
        token,
        orderId,
        locale,
        platform,
        deliveryMethod,
        price,
        amount,
        coupon = null,
        email,
        page = "funnel",
        callback,
        coinsData,
        platformName,
        discValue = null
    ) => {
        let urlForOrder = `${this.baseAddress}api/order`;
        let currentUrl = window.location.href;
        let baseAddress = window.location.origin;
        let localeLang =
            flagLangs.filter(el => el.title === locale.toLowerCase())[0]
                ?.title || "en";
        // const analytic = {
        //     id: orderId,
        //     platform: platform, // ps or xbox
        //     method: deliveryMethod, // комфортный или па
        //     price: price, // цена за 1 монету в евро//deliveryMethods[platform==='Easy'?0:1].data[1].pricePerCurrencyMap.EUR
        //     amount: amount, // количество монет
        //     coupon: coupon, // купон
        //     email: email,
        // };

        // analytics.sendPayment(analytic);

        let settings = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,
            },
            data: JSON.stringify({
                paymentMethod: paymentMethod,
            }),
        };

        // https:royalfut.com/api/order/${orderId}/prepay

        let url = `${urlForOrder}/${orderId}/prepay`;

        let suburl = `/${paymentMethod}`;

        let acquiringUrls = {
            successUrl:
                baseAddress +
                `/profile?tab=orders&id=${orderId}&status=from-acquiring-successfully`,
            failUrl: currentUrl + "?status=from-acquiring-failed",
        };

        if (page == "funnel") {
            if (localeLang === "en") {
                acquiringUrls.successUrl = `${baseAddress}/order/${platformName}?order-id=${orderId}&status=from-acquiring-successfully&page=funnel`;
                acquiringUrls.failUrl = `${baseAddress}/order/${platformName}?order-id=${orderId}&status=from-acquiring-failed&page=funnel`;
            } else {
                acquiringUrls.successUrl = `${baseAddress}/${localeLang}/order/${platformName}?order-id=${orderId}&status=from-acquiring-successfully&page=funnel`;
                acquiringUrls.failUrl = `${baseAddress}/${localeLang}/order/${platformName}?order-id=${orderId}&status=from-acquiring-failed&page=funnel`;
            }
        } else if (page == "coins") {
            if (localeLang === "en") {
                acquiringUrls.successUrl = `${baseAddress}/coins/payment?id=${orderId}&priceEur=${price}&payMethod=${paymentMethod}&coupon=${
                    coupon ? coupon : ""
                }&platform=${platform}&method=${deliveryMethod}&discValue=${discValue}&status=from-acquiring-successfully&page=coins-page`;
                acquiringUrls.failUrl = `${baseAddress}/coins/payment?id=${orderId}&status=from-acquiring-failed&page=coins-page`;
            } else {
                acquiringUrls.successUrl = `${baseAddress}/${localeLang}/coins/payment?id=${orderId}&priceEur=${price}&payMethod=${paymentMethod}&coupon=${
                    coupon ? coupon : ""
                }&platform=${platform}&method=${deliveryMethod}&discValue=${discValue}&status=from-acquiring-successfully&page=coins-page`;
                acquiringUrls.failUrl = `${baseAddress}/${localeLang}/coins/payment?id=${orderId}&status=from-acquiring-failed&page=coins-page`;
            }
        } else if (page == "purchase") {
            if (localeLang === "en") {
                acquiringUrls.successUrl = `${baseAddress}/profile?tab=orders&id=${orderId}&status=from-acquiring-successfully&page=purchase`;
                acquiringUrls.failUrl = `${baseAddress}/purchase/payment?status=from-acquiring-failed&page=purchase`;
            } else {
                acquiringUrls.successUrl = `${baseAddress}/${localeLang}/profile?tab=orders&id=${orderId}&status=from-acquiring-successfully&page=purchase`;
                acquiringUrls.failUrl = `${baseAddress}/${localeLang}/purchase/payment?status=from-acquiring-failed&page=purchase`;
            }
        } else if (page == "order") {
            if (localeLang === "en") {
                acquiringUrls.successUrl = `${baseAddress}/order?id=${orderId}&priceEur=${price}&payMethod=${paymentMethod}&coupon=${
                    coupon ? coupon : ""
                }&platform=${platform}&method=${deliveryMethod}&discValue=${discValue}&status=from-acquiring-successfully&page=neworder`;
                acquiringUrls.failUrl = `${baseAddress}/order${
                    platform ? `/${platform}` : ""
                }?id=${orderId}&status=from-acquiring-failed&page=neworder`;
            } else {
                acquiringUrls.successUrl = `${baseAddress}/${localeLang}/order?id=${orderId}&priceEur=${price}&payMethod=${paymentMethod}&coupon=${
                    coupon ? coupon : ""
                }&platform=${platform}&method=${deliveryMethod}&discValue=${discValue}&status=from-acquiring-successfully&page=neworder`;
                acquiringUrls.failUrl = `${baseAddress}/${localeLang}/order${
                    platform ? `/${platform}` : ""
                }?id=${orderId}&status=from-acquiring-failed&page=neworder`;
            }
        }

        switch (paymentMethod) {
            case "acquiring":
                suburl = "";
                settings.data = JSON.stringify({
                    successUrl: acquiringUrls.successUrl,

                    // successUrl: `https://royalfut.com/${localeLang}/profile/?id=${orderId}#orders`,
                    failUrl: acquiringUrls.failUrl,
                });
                break;
            case "eubanktransfer":
                suburl = "/eubanktransfer";
                settings.data = JSON.stringify({
                    successUrl: acquiringUrls.successUrl,

                    // successUrl: `https://royalfut.com/${localeLang}/profile/?id=${orderId}#orders`,
                    failUrl: acquiringUrls.failUrl,
                });
                break;
            case "payop":
                settings.data = JSON.stringify({
                    paymentMethod: null,
                });
                break;
            case "apple":
                break;
            case "bitcoin":
                suburl = "/bitcoin";
                settings.data = JSON.stringify({
                    successUrl: `${window.location.origin}${localeLang}/profile?tab=orders&id=${orderId}`,
                    failUrl: currentUrl + "#from-acquiring",
                });
                break;
            case "usdt":
                suburl = "/usdtether";
                settings.data = JSON.stringify({
                    successUrl: `${window.location.origin}${localeLang}/profile?tab=orders&id=${orderId}`,
                    failUrl: currentUrl + "#from-acquiring",
                });
                break;
            case "etherium":
                suburl = "/etherium";
                settings.data = JSON.stringify({
                    successUrl: `${window.location.origin}${localeLang}/profile?tab=orders&id=${orderId}`,
                    failUrl: currentUrl + "#from-acquiring",
                });
                break;
            case "unionPay":
                suburl = "/union";
                settings.data = JSON.stringify({
                    successUrl: acquiringUrls.successUrl,
                    failUrl: acquiringUrls.failUrl,
                });
                break;
            case "crypto":
                suburl = "/crypto";
                settings.data = JSON.stringify({
                    successUrl: acquiringUrls.successUrl,
                    failUrl: acquiringUrls.failUrl,
                });
                break;

            default:
                break;
        }

        settings.url = `${url}${suburl}`;

        const res = await fetch(`${settings.url}`, {
            method: "POST",
            headers: settings.headers,
            body: settings.data,
        }).catch(err => {
            callback(err);
            throw console.log(err.message);
        });
        if (res.ok == false) {
            callback(`${res.status}: ${res.statusText}`);
            throw console.log(res);
        }
        const result = await res.json();
        return result;
    };

    prePayModul = async (
        paymentMethod = "",
        token,
        orderId,
        locale,
        platform,
        deliveryMethod,
        price,
        amount,
        coupon = null,
        email,
        page = "funnel",
        callback,
        coinsData,
        platformName,
        discValue = null
    ) => {
        let urlForOrder = `${this.baseAddress}api/order/${orderId}/prepay/modul`;
        let baseAddress = window.location.origin;
        let currentUrl = window.location.href;
        let localeLang =
            flagLangs.filter(el => el.title === locale.toLowerCase())[0]
                ?.title || "en";

        let acquiringUrls = {
            successUrl:
                this.baseAddress +
                `/profile?tab=orders&status=from-acquiring-successfully&id=${orderId}`,
            failUrl: currentUrl + "?status=from-acquiring-failed",
        };

        if (page == "funnel") {
            acquiringUrls.successUrl =
                currentUrl + "?status=from-acquiring-successfully";
        } else if (page == "coins") {
            if (localeLang === "en") {
                acquiringUrls.successUrl = `${baseAddress}/coins/payment?id=${orderId}&priceEur=${price}&payMethod=${paymentMethod}&coupon=${
                    coupon ? coupon : ""
                }&platform=${platform}&method=${deliveryMethod}&discValue=${discValue}&order=${coinsData}&status=from-acquiring-successfully&page=coins-page`;
                acquiringUrls.failUrl = `${baseAddress}/coins/payment?id=${orderId}&order=${coinsData}&status=from-acquiring-failed&page=coins-page`;
            } else {
                acquiringUrls.successUrl = `${baseAddress}/${localeLang}/coins/payment?id=${orderId}&priceEur=${price}&payMethod=${paymentMethod}&coupon=${
                    coupon ? coupon : ""
                }&platform=${platform}&method=${deliveryMethod}&discValue=${discValue}&order=${coinsData}&status=from-acquiring-successfully&page=coins-page`;
                acquiringUrls.failUrl = `${baseAddress}/${localeLang}/coins/payment?id=${orderId}&order=${coinsData}&status=from-acquiring-failed&page=coins-page`;
            }
        } else if (page == "purchase") {
            acquiringUrls.failUrl =
                this.baseAddress +
                "/purchase/payment&status=from-acquiring-failed";
        } else if (page == "order") {
            if (localeLang === "en") {
                acquiringUrls.successUrl = `${baseAddress}/order?id=${orderId}&priceEur=${price}&payMethod=${paymentMethod}&coupon=${
                    coupon ? coupon : ""
                }&platform=${platform}&method=${deliveryMethod}&discValue=${discValue}&status=from-acquiring-successfully&page=neworder`;
                acquiringUrls.failUrl = `${baseAddress}/order?id=${orderId}&status=from-acquiring-failed&page=neworder`;
            } else {
                acquiringUrls.successUrl = `${baseAddress}/${localeLang}/order?id=${orderId}&priceEur=${price}&payMethod=${paymentMethod}&coupon=${
                    coupon ? coupon : ""
                }&platform=${platform}&method=${deliveryMethod}&discValue=${discValue}&status=from-acquiring-successfully&page=neworder`;
                acquiringUrls.failUrl = `${baseAddress}/${localeLang}/order?id=${orderId}&status=from-acquiring-failed&page=neworder`;
            }
        }

        let settings = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,
            },
            data: JSON.stringify({
                successUrl: acquiringUrls.successUrl,
                failUrl: acquiringUrls.failUrl,
            }),
        };

        const res = await fetch(`${urlForOrder}`, {
            method: "POST",
            headers: settings.headers,
            body: settings.data,
        });

        const result = await res.json();
        return result;
    };

    // modulPay = async (data) => {
    //     let formData = new FormData();
    //     for (let key in res) {
    //         formData.append(key, res[key]);
    //     }

    //     const res = await fetch(`${data.acquiringLink}`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'multipart/form-data',
    //         },
    //         body: formData,
    //         mode: 'no-cors',
    //     });

    //     const result = await res.json();
    //     console.log(result);
    //     return result;
    // };

    createOrder = async (
        token,
        platform,
        method,
        currency,
        coinCount,
        clientId,
        callback,
        message
    ) => {
        const getCookie = name => {
            let nameEQ = `${name}=`;
            let ca = document.cookie.split(";");
            // console.log(ca);

            for (let i = 0; i < ca.length; i++) {
                let c = ca[i];

                while (c.charAt(0) === " ") {
                    c = c.substring(1, c.length);
                }

                if (c.indexOf(nameEQ) === 0) {
                    return c.substring(nameEQ.length, c.length);
                }
            }

            return null;
        };

        const res = await fetch(`${this.baseAddress}api/order`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,
            },
            body: JSON.stringify({
                platform: platform,
                deliveryMethod: method,
                currency: currency,
                coinCount: coinCount,
                client_id: getCookie("_ga"),
            }),
        }).catch(err => {
            callback(err);
            throw console.log(err.message);
        });
        if (res.status == 401 || res.status == 304) {
            message();
            throw console.log(res);
        }
        const result = await res.json();
        return result;
    };

    getCriptorates = async (currency, callback) => {
        let urlForStock = `${this.baseAddress}api/cryptorates/`;

        const res = await fetch(`${urlForStock}${currency}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).catch(err => {
            callback(err);
            throw console.log(err.message);
        });

        if (res.ok == false) {
            callback(`${res.status}: ${res.statusText}`);
            throw console.log(res);
        }
        const result = await res.json();
        return result;
    };

    getOrders = async (token, limit = 10, page = 1, callback) => {
        let urlForStock = `${this.baseAddress}api/order?limit=${limit}&page=${page}`;

        const res = await fetch(`${urlForStock}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,
            },
        }).catch(err => {
            callback && callback(err);
            throw console.log(err.message);
        });

        if (res.ok == false) {
            callback && callback(`${res.status}: ${res.statusText}`);
            throw console.log(res);
        }
        const result = await res.json();
        return result;
    };

    getOneOrder = async (token, callback, orderId) => {
        let urlForStock = `${this.baseAddress}api/orders/${orderId}`;

        const res = await fetch(`${urlForStock}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,
            },
        });

        if (res.ok == false) {
            callback(`${res.status}: ${res.statusText}`);
            throw console.log(res);
        }
        const result = await res.json();
        return result;
    };

    getReviews = async callback => {
        let urlForStock = `${this.baseAddress}futapi/reviews`;

        const res = await fetch(`${urlForStock}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).catch(err => {
            callback(err);
            throw console.log(err.message);
        });

        if (res.ok == false) {
            callback(`${res.status}: ${res.statusText}`);
            throw console.log(res);
        }
        const result = await res.json();
        return result;
    };

    checkPromo = async (promoCode, coinsCount) => {
        let headers = {
            "Content-Type": "application/json",
            mode: "no-cors",
        };
        const res = await fetch(`${this.baseAddress}api/checkpromo`, {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
                promoCode: promoCode || "",
                coinsCount: Number(coinsCount),
            }),
        });
        const result = await res.json();

        return result;
    };

    registration = async (
        userEmail,
        userPass,
        profilePicture = 1,
        userLang
    ) => {
        let headers = {
            "Content-Type": "application/json",
            mode: "no-cors",
        };
        const localeRegion =
            userLang && userLang?.length > 0
                ? userLang.split("-")
                : ["en", "EN"];
        const res = await fetch(`${this.baseAddress}api/users`, {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
                user: {
                    userLocale: localeRegion[0],
                    region: localeRegion[1],
                    email: userEmail,
                    password: userPass,
                    profilePicture: profilePicture,
                    signUpCheck: "on",
                },
            }),
        });
        const result = await res.json();

        return result;
    };

    login = async (userEmail, userPass, callback, userLang) => {
        let headers = {
            "Content-Type": "application/json",
            mode: "no-cors",
        };
        const res = await fetch(`${this.baseAddress}api/users/login`, {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
                user: {
                    userLocale: userLang ?? "en",
                    region: userLang?.toUpperCase() || "EN",
                    email: userEmail,
                    password: userPass,
                },
            }),
        }).catch(err => {
            callback(err);
            throw console.log(err.message);
        });

        if (res.ok == false) {
            if (res.status == 422) {
                const result = await res.json();
                callback(`${JSON.stringify(result.errors)}`);
                throw console.log(res);
            } else {
                callback(`${res.status}: ${res.statusText}`);
                throw console.log(res);
            }
        }
        const result = await res.json();
        return result;
    };

    sendPromo = async callback => {
        let headers = {
            "Content-Type": "application/json",
        };
        const res = await fetch(`${this.baseAddress}api/promocards`, {
            method: "GET",
            headers: headers,
        }).catch(err => {
            callback(err);
            throw console.log(err.message);
        });

        if (res.ok == false) {
            callback(`${res.status}: ${res.statusText}`);
            throw console.log(res);
        }

        const result = await res.json();

        return result;
    };

    getPromo = async () => {
        let urlForStock = `${this.baseAddress}api/promocards`;

        const res = await fetch(`${urlForStock}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (res.ok == false) {
            callback(`${res.status}: ${res.statusText}`);
            throw console.log(res);
        }
        const result = await res.json();
        return result;
    };
}

export default new Api();
