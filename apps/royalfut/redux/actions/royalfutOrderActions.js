export const orderStep = data => ({ type: "ORDER_STEP", data });
export const orderPlatform = data => ({ type: "ORDER_PLATFORM", data });
export const orderCoinsAmount = data => ({
    type: "ORDER_COINS_AMOUNT",
    data,
});
export const orderPrice = data => ({
    type: "ORDER_PRICE",
    data,
});
export const orderPriceAfterDiscount = data => ({
    type: "ORDER_PRICE_AFTER_DISCOUNT",
    data,
});
export const orderData = data => ({
    type: "ORDER_DATA",
    data,
});
export const orderDiscount = data => ({
    type: "ORDER_DISCOUNT",
    data,
});
export const orderPage = data => ({
    type: "ORDER_PAGE",
    data,
});
