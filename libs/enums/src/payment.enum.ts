export const enum EPaymentMethodsIds {
    VISA = "visa",
    MASTER_CARD = "mc",
    UNION_PAY = "union",
    TINK_VISA = "tink_visa",
    APPLE_PAY = "apple_pay",
    GOOGLE_PAY = "google_pay",
    TETHER_CRYPTO = "usdt",
    BITCOIN_CRYPTO = "btc",
    ETHEREUM_CRYPTO = "etc",
}

export const enum EPaymentCollectionGroups {
    ACQUIRING = "acquiring",
    UNION_PAY = "unionPay",
    EU_BANK = "eubanktransfer",
    APPLE_PAY = "apple",
    GOOGLE_PAY = "gPay",
    CRYPTO = "crypto",
}

export const enum EPaymentFBPage {
    ORDER = "order",
    ORDER_PLATFORM = "order_platform",
    COINS = "coins",
    COINS_WITH_AMOUNT = "coins_with_amount",
}

export const enum EPaymentTransactionStatus {
    SUCCESS = "success",
    FAILURE = "failure",
}

export const enum EPaymentSearchParamsKey {
    STATUS = "status",
    PRICE_EUR = "price_eur",
    PAYMENT_METHOD = "payment_method",
    ORDER_ID = "order_id",
    PLATFORM = "platform",
    DELIVERY_METHOD = "delivery_method",
    COUPON = "coupon",
}
