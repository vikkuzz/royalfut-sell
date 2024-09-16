import currency from "../../data-elements/currency";

const ISSERVER = typeof window === "undefined";

const initialState = {
    currency: {
        currency: "$",
        title: "USD",
        id: "0",
        country: "",
    },
};

const royalfutCurrencyReducer = (state = initialState, action) => {
    // let localState = null;

    switch (action.type) {
        case "CURRENT_CURRENCY":
            let currentCurr = currency.filter(
                el => el.title.toLowerCase() == action.data.toLowerCase()
            )[0];
            if (!currentCurr) {
                currentCurr = currency[0];
            }
            if (!ISSERVER) {
                localStorage.setItem("currency", JSON.stringify(currentCurr));
            }
            return { ...state, currency: currentCurr };

        default:
            return { ...state };
    }
};
export default royalfutCurrencyReducer;
