const initialState = {
    promo_order: null,
};

const royalfutPromocodeReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_PROMO_ORDER":
            return { ...state, promo_order: action.data };

        default:
            return { ...state };
    }
};
export default royalfutPromocodeReducer;
