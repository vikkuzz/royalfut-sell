export const getLoyaltyLevels = data => ({
    type: "GET_LOYALTY_LEVELS",
    data,
});
export const getLoyaltyAllLevels = data => ({
    type: "GET_LOYALTY_ALL_LEVELS",
    data,
});
export const getLoyaltyUser = data => ({
    type: "GET_LOYALTY_USER",
    data,
});
export const loyaltyPrice = data => ({
    type: "LOYALTY_PRICE",
    data,
});
export const loyaltyOrders = data => ({
    type: "LOYALTY_ORDERS",
    data,
});
export const allOrderLoyalData = data => ({
    type: "ALL_ORDER_LOYAL_DATA",
    data,
});
export const usePoints = data => ({
    type: "USE_POINTS",
    data,
});
