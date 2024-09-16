import {
    Action,
    AnyAction,
    combineReducers,
    configureStore,
    ThunkAction,
} from "@reduxjs/toolkit";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import royalfutReducer from "./redux/reducers/royalfutReducer";
import royalfutOrderReducer from "./redux/reducers/royalfutOrderReducer";
import royalfutLocaleReducer from "./redux/reducers/royalfutLocaleReducer";
import royalfutCurrencyReducer from "./redux/reducers/royalfutCurrencyReducer";
import royalfutPromocodeReducer from "./redux/reducers/royalfutPromocodeReducer";
import royalfutLoyaltyReducer from "./redux/reducers/royalfutLoyaltyReducer";
const combinedReducer = combineReducers({
    royalfutReducer: royalfutReducer,
    royalfutOrderReducer: royalfutOrderReducer,
    royalfutLocaleReducer: royalfutLocaleReducer,
    royalfutCurrencyReducer: royalfutCurrencyReducer,
    royalfutPromocodeReducer: royalfutPromocodeReducer,
    royalfutLoyaltyReducer: royalfutLoyaltyReducer,
});

const reducer = (state, action) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state, // use previous state
            ...action.payload, // apply delta from hydration
        };
        return nextState;
    } else {
        return combinedReducer(state, action);
    }
};

export const makeStore = () =>
    configureStore({
        reducer,
    });

export const wrapper = createWrapper(makeStore, { debug: true });
