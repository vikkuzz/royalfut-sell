export default function onApplePayButtonClicked(
    orderId,
    currency,
    price,
    userToken
) {
    let urlForOrder = `https://royalfut.com/api/order`;
    if (!ApplePaySession) {
        return;
    }

    const request = {
        countryCode: "CY",
        currencyCode: currency,
        merchantCapabilities: ["supports3DS"],
        supportedNetworks: ["visa", "masterCard", "amex", "discover"],
        total: {
            label: "royalfut.com",
            type: "final",
            amount: price,
        },
    };

    const session = new ApplePaySession(1, request);

    session.onvalidatemerchant = event => {
        let url = `${urlForOrder}/prepay/appletoken`;
        let data = JSON.stringify({
            url: event.validationURL,
        });

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${userToken}`,
            },
            body: data,
        })
            .then(res => res.json())
            .then(merchantSession => {
                session.completeMerchantValidation(JSON.parse(merchantSession));
            })
            .catch(err => {
                console.error("Error fetching merchant session", err);
            });
    };

    session.onpaymentmethodselected = event => {
        const update = {
            newTotal: {
                label: "Paying for gaming service",
                amount: price,
            },
        };
        session.completePaymentMethodSelection(update);
    };

    session.onpaymentauthorized = event => {
        url = `${urlForOrder}/${orderId}/prepay/applepay`;
        let result = {};

        let data = JSON.stringify({
            data: event.payment,
        });

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${userToken}`,
            },
            body: data,
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                result = {
                    status: ApplePaySession.STATUS_SUCCESS,
                };
                session.completePayment(result);
            })
            .catch(err => {
                console.error("Error fetching merchant session", err);
            });
    };

    session.oncancel = event => {
        console.log("oncancel ", event);
    };
    session.begin();
}
