const initialState = {
    loyalty_levels: null,
    loyalty_all_levels: null,
    user_loyalty: null,
    loyalty_price: null,
    orders: null,
    all_order_loyal_data: null,
    use_points: "false",
};

const royalfutLoyaltyReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_LOYALTY_LEVELS":
            return { ...state, loyalty_levels: action.data };
        case "GET_LOYALTY_ALL_LEVELS":
            return { ...state, loyalty_all_levels: action.data };
        case "GET_LOYALTY_USER":
            return { ...state, user_loyalty: action.data };
        case "LOYALTY_PRICE":
            return { ...state, loyalty_price: action.data };
        case "LOYALTY_ORDERS":
            return { ...state, orders: action.data };
        case "ALL_ORDER_LOYAL_DATA":
            return { ...state, all_order_loyal_data: action.data };
        case "USE_POINTS":
            return { ...state, use_points: action.data };

        default:
            return { ...state };
    }
};
export default royalfutLoyaltyReducer;
