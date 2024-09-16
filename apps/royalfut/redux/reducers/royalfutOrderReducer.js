const initialState = {
    order_step: 1,
    order_platform: null,
    order_coins_amount: null,
    order_price: null,
    order_price_after_discount: null,
    order_discount: null,
    order_page: null,
};

const royalfutOrderReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ORDER_STEP":
            return { ...state, order_step: action.data };
        case "ORDER_PLATFORM":
            return { ...state, order_platform: action.data };
        case "ORDER_COINS_AMOUNT":
            return { ...state, order_coins_amount: action.data };
        case "ORDER_PRICE":
            return { ...state, order_price: action.data };
        case "ORDER_PRICE_AFTER_DISCOUNT":
            return { ...state, order_price_after_discount: action.data };
        case "ORDER_DATA":
            return { ...state, ...action.data };
        case "ORDER_DISCOUNT":
            return { ...state, order_discount: action.data };
        case "ORDER_PAGE":
            return { ...state, order_page: action.data };
        default:
            return { ...state };
    }
};
export default royalfutOrderReducer;
