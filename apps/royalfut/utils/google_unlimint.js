/**
 * Define the version of the Google Pay API referenced when creating your
 * configuration
 *
 * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#PaymentDataRequest|apiVersion in PaymentDataRequest}
 */
const baseRequest = {
    apiVersion: 2,
    apiVersionMinor: 0,
};

/**
 * Card networks supported by your site and your gateway
 *
 * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#CardParameters|CardParameters}
 * @todo confirm card networks supported by your site and gateway
 */
// const allowedCardNetworks = [
//     'AMEX',
//     'DISCOVER',
//     'INTERAC',
//     'JCB',
//     'MASTERCARD',
//     'VISA',
// ];

/**
 * Card authentication methods supported by your site and your gateway
 *
 * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#CardParameters|CardParameters}
 * @todo confirm your processor supports Android device tokens for your
 * supported card networks
 */
// const allowedCardAuthMethods = ['PAN_ONLY', 'CRYPTOGRAM_3DS'];

/**
 * Identify your gateway and your site's gateway merchant identifier
 *
 * The Google Pay API response will return an encrypted payment method capable
 * of being charged by a supported gateway after payer authorization
 *
 * @todo check with your gateway on the parameters to pass
 * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#gateway|PaymentMethodTokenizationSpecification}
 */
const tokenizationSpecification = {
    type: "PAYMENT_GATEWAY",
    parameters: {
        gateway: "unlimint",
        gatewayMerchantId: "googletest",
    },
};

/**
 * Describe your site's support for the CARD payment method and its required
 * fields
 *
 * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#CardParameters|CardParameters}
 */
const baseCardPaymentMethod = {
    type: "CARD",
    parameters: {
        allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
        allowedCardNetworks: ["MASTERCARD", "VISA"],
    },
};

/**
 * Describe your site's support for the CARD payment method including optional
 * fields
 *
 * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#CardParameters|CardParameters}
 */
const cardPaymentMethod = Object.assign({}, baseCardPaymentMethod, {
    tokenizationSpecification: tokenizationSpecification,
});

/**
 * An initialized google.payments.api.PaymentsClient object or null if not yet set
 *
 * @see {@link getGooglePaymentsClient}
 */
let paymentsClient = null;

/**
 * Configure your site's support for payment methods supported by the Google Pay
 * API.
 *
 * Each member of allowedPaymentMethods should contain only the required fields,
 * allowing reuse of this base request when determining a viewer's ability
 * to pay and later requesting a supported payment method
 *
 * @returns {object} Google Pay API version, payment methods supported by the site
 */
function getGoogleIsReadyToPayRequest() {
    return Object.assign({}, baseRequest, {
        allowedPaymentMethods: [baseCardPaymentMethod],
    });
}

/**
 * Configure support for the Google Pay API
 *
 * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#PaymentDataRequest|PaymentDataRequest}
 * @returns {object} PaymentDataRequest fields
 */
function getGooglePaymentDataRequest() {
    const paymentDataRequest = Object.assign({}, baseRequest);
    paymentDataRequest.allowedPaymentMethods = [cardPaymentMethod];
    paymentDataRequest.transactionInfo = getGoogleTransactionInfo();
    paymentDataRequest.merchantInfo = {
        // @todo a merchant ID is available for a production environment after approval by Google
        // See {@link https://developers.google.com/pay/api/web/guides/test-and-deploy/integration-checklist|Integration checklist}
        merchantId: "googletest",
        merchantName: "TEST",
    };
    return paymentDataRequest;
}

/**
 * Return an active PaymentsClient or initialize
 *
 * @see {@link https://developers.google.com/pay/api/web/reference/client#PaymentsClient|PaymentsClient constructor}
 * @returns {google.payments.api.PaymentsClient} Google Pay API client
 */
function getGooglePaymentsClient() {
    if (paymentsClient === null) {
        paymentsClient = new google.payments.api.PaymentsClient({
            environment: "TEST",
        });
    }
    return paymentsClient;
}

/**
 * Initialize Google PaymentsClient after Google-hosted JavaScript has loaded
 *
 * Display a Google Pay payment button after confirmation of the viewer's
 * ability to pay.
 */
export function onGooglePayLoaded() {
    const paymentsClient = getGooglePaymentsClient();
    paymentsClient
        .isReadyToPay(getGoogleIsReadyToPayRequest())
        .then(function (response) {
            if (response.result) {
                // addGooglePayButton(); // @todo prefetch payment data to improve performance after confirming site functionality // prefetchGooglePaymentData();
            }
        })
        .catch(function (err) {
            // show error in developer console for debugging
            console.error(err);
        });
}

/**
 * Add a Google Pay purchase button alongside an existing checkout button
 *
 * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#ButtonOptions|Button options}
 * @see {@link https://developers.google.com/pay/api/web/guides/brand-guidelines|Google Pay brand guidelines}
 */
function addGooglePayButton() {
    const paymentsClient = getGooglePaymentsClient();
    const button = paymentsClient.createButton({
        onClick: onGooglePaymentButtonClicked,
    });
    document.getElementById("container").appendChild(button);
}

/**
 * Provide Google Pay API with a payment amount, currency, and amount status
 *
 * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#TransactionInfo|TransactionInfo}
 * @returns {object} transaction info, suitable for use as transactionInfo property of PaymentDataRequest
 */
function getGoogleTransactionInfo(userCurrency, userPrice) {
    return {
        countryCode: "US",
        currencyCode: userCurrency,
        totalPriceStatus: "FINAL", // set to cart total
        totalPrice: String(userPrice),
    };
}

/**
 * Prefetch payment data to improve performance
 *
 * @see {@link https://developers.google.com/pay/api/web/reference/client#prefetchPaymentData|prefetchPaymentData()}
 */
function prefetchGooglePaymentData() {
    const paymentDataRequest = getGooglePaymentDataRequest(); // transactionInfo must be set but does not affect cache
    paymentDataRequest.transactionInfo = {
        totalPriceStatus: "NOT_CURRENTLY_KNOWN",
        currencyCode: "USD",
    };
    const paymentsClient = getGooglePaymentsClient();
    paymentsClient.prefetchPaymentData(paymentDataRequest);
}

/**
 * Show Google Pay payment sheet when Google Pay payment button is clicked
 */
export function onGooglePaymentButtonClicked(
    orderId,
    userToken,
    userCurrency,
    userPrice
) {
    const paymentDataRequest = getGooglePaymentDataRequest();
    paymentDataRequest.transactionInfo = getGoogleTransactionInfo(
        userCurrency,
        userPrice
    );

    const paymentsClient = getGooglePaymentsClient();
    paymentsClient
        .loadPaymentData(paymentDataRequest)
        .then(function (paymentData) {
            // handle the response
            processPayment(paymentData, orderId, userToken);
        })
        .catch(function (err) {
            // show error in developer console for debugging
            console.error(err);
        });
}

/**
 * Process payment data returned by the Google Pay API
 *
 * @param {object} paymentData response from Google Pay API after user approves payment
 * @see {@link https://developers.google.com/pay/api/web/reference/response-objects#PaymentData|PaymentData object reference}
 */
async function processPayment(paymentData, orderId, userToken) {
    // show returned data in developer console for debugging
    // @todo pass payment token to your gateway to process payment
    let paymentToken = paymentData.paymentMethodData.tokenizationData.token;

    let url = `https://test-royalfut.com/api/order/${orderId}/prepay/googlepay`;
    // console.log(paymentToken);
    // let res = JSON.parse(paymentToken);
    // //let data = res;
    // // JSON.stringify({
    // // url: paymentToken,
    // // });
    // function isJsonString(str) {
    //     try {
    //         JSON.parse(str);
    //     } catch (e) {
    //         return false;
    //     }
    //     return true;
    // }
    // async function traverse(o) {
    //     for (let k in o) {
    //         if (isJsonString(o[k])) {
    //             o[k] = JSON.parse(o[k]);
    //         } else if (typeof o[k] === 'object') {
    //             traverse(o[k]);
    //         }
    //     }
    //     return o;
    // }

    // let parsedData = await traverse(paymentToken);
    // let data = JSON.stringify(parsedData);
    // console.log(data);

    // paymentToken.intermediateSigningKey.signedKey = JSON.stringify(
    //     JSON.parse(paymentToken.intermediateSigningKey.signedKey)
    // );
    // paymentToken.signedMessage = JSON.stringify(
    //     JSON.parse(paymentToken.signedMessage)
    // );

    await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${userToken}`,
        },
        body: paymentToken,
    });
}
