"use client";
import React, { useCallback, useEffect, useMemo } from "react";
import {
    showMessage,
    stock,
    user,
    userCreateOrder,
    userlogout,
} from "../../../redux/actions/royalfutActions";

import api from "../../../Api/Api";
import { useDispatch, useSelector } from "react-redux";
import {
    getSecondsBetweenDates,
    objectWithoutProperties,
} from "../../../utils/functions";
import {
    allOrderLoyalData,
    getLoyaltyAllLevels,
    getLoyaltyLevels,
    getLoyaltyUser,
} from "../../../redux/actions/royalfutLoyaltyActions";
import { currentCurrency } from "../../../redux/actions/royalfutCurrencyAction";
import {
    orderCoinsAmount,
    orderData,
    orderStep,
} from "../../../redux/actions/royalfutOrderActions";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getPromoOrder } from "../../../redux/actions/royalfutPromocodeAction";

const ComponentForDataRequest = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const orders = useSelector(state => ({
        coins: state.royalfutOrderReducer.order_coins_amount,
    }));
    const stateUser = useSelector(state => state.royalfutReducer.user);

    const state = useSelector(state => ({
        // user: state.royalfutReducer.user,
        createOrder: state.royalfutReducer.createOrder,
        platform: state.royalfutReducer.platform,
        method: state.royalfutReducer.method,
        stock: state.royalfutReducer.stock,
    }));
    const promo = useSelector(state => ({
        order: state.royalfutPromocodeReducer.promo_order,
    }));
    const ccy = useSelector(state => ({
        currency: state.royalfutCurrencyReducer.currency,
        locale: state.royalfutLocaleReducer.locale,
    }));

    function getUser(stateUser) {
        return stateUser;
    }

    const memoUser = useMemo(() => getUser(stateUser), [stateUser]);

    const getError = useCallback(err => {
        dispatch(showMessage({ status: "error", text: `${err}` }));
    }, []);

    const getNotifyMessage = useCallback(() => {
        localStorage.clear();
        localStorage.setItem("session", true);
        dispatch(userlogout());
        router.push("/");
    }, []);

    useEffect(() => {
        api.getStock().then(res => dispatch(stock(res)));
    }, []);

    useEffect(() => {
        let localUser = null;

        if (typeof window != "undefined") {
            localUser = JSON.parse(localStorage.getItem("localUser"));
        }

        if (!stateUser?.token && localUser) {
            dispatch(user(localUser));
        }
    }, [stateUser?.token]);

    useEffect(() => {
        if (typeof window != "undefined") {
            const search = searchParams.toString();
            // let userData = null;
            // let localUser = null;
            let localCurr = null;

            // localUser = JSON.parse(localStorage.getItem('localUser'));
            localCurr = JSON.parse(localStorage.getItem("currency"));

            // if (!stateUser.token && localUser) {
            //     userData = { ...localUser };
            //     dispatch(user(userData));
            // } else if (stateUser.token) {
            //     userData = { ...stateUser };
            // }

            let localCoins = +state.coins;
            if (pathname.includes("order") && orders.coins) {
                localCoins = +orders.coins;
            }

            // if (getSecondsBetweenDates(state.stock.lastRefreshedDate) > 60) {
            //     console.log('STATE_USER_CHANGED');
            //     api.getStock().then((res) => dispatch(stock(res)));
            // }
            if (localCurr) {
                dispatch(currentCurrency(localCurr.title));
            }

            if (stateUser?.token) {
                api.getLoyaltyUser(stateUser.token).then(res => {
                    dispatch(getLoyaltyUser(res));
                });
                api.getLoyaltyTable().then(result => {
                    const sorted = result.sort((a, b) => a.level - b.level);
                    dispatch(getLoyaltyAllLevels(sorted));
                });
                api.getLoyaltyTable(stateUser.token).then(result => {
                    dispatch(getLoyaltyLevels(result[0]));
                });

                let promocode = null;
                if (promo.order?.value) {
                    if (promo.order?.promoCode) {
                        promocode = promo.order?.promoCode;
                        if (search.includes("from-acquiring-successfully")) {
                            promocode = null;
                        }
                    }
                    if (promo.order?.value) {
                        promocode = promo.order?.value;
                        if (search.includes("from-acquiring-successfully")) {
                            promocode = null;
                        }
                    }
                }
                if (localStorage.getItem("promocode")) {
                    promocode = JSON.parse(
                        localStorage.getItem("promocode")
                    )?.promocode;
                    if (search.includes("from-acquiring-successfully")) {
                        promocode = null;
                    }
                }
                if (!state.createOrder.id) {
                    api.createOrder(
                        stateUser.token,
                        state.platform.ps ? "ps4" : "xbox",
                        state.method.easy ? "Easy" : "Manual",
                        ccy.currency.title,
                        localCoins || +state.stock.minLimitSumCoins,
                        null,
                        getError,
                        getNotifyMessage
                    ).then(async res => {
                        res.order.labels.length = 1;
                        if (promocode) {
                            const upOrder = await api.updateOrder(
                                res.order.id,
                                stateUser.token,
                                state.platform.ps ? "ps4" : "xbox",
                                state.method.easy ? "Easy" : "Manual",
                                localCoins || +state.stock.minLimitSumCoins,
                                ccy.currency.title,
                                promocode,
                                getError
                            );
                            upOrder.labels.length = 1;
                            if (upOrder.promoCode) {
                                dispatch(getPromoOrder(upOrder));
                            } else {
                                dispatch(getPromoOrder(null));
                            }
                            dispatch(userCreateOrder(upOrder));
                        } else {
                            dispatch(userCreateOrder(res.order));
                        }
                    });
                } else {
                    let order = { ...state.createOrder };
                    order.promoCode = null;
                    dispatch(userCreateOrder(order));
                }
            } else {
                dispatch(allOrderLoyalData(null));
                dispatch(getLoyaltyUser(null));
                const getLoyaltyTableFnc = async () => {
                    await api.getLoyaltyTable().then(result => {
                        const sorted = result.sort((a, b) => a.level - b.level);
                        dispatch(getLoyaltyLevels(sorted[0]));
                        dispatch(getLoyaltyAllLevels(sorted));
                    });
                };
                getLoyaltyTableFnc();
            }
        }
    }, [memoUser]);

    useEffect(() => {
        const search = searchParams.toString();
        console.log(pathname);

        if (localStorage.getItem("/order")) {
            let localData = JSON.parse(localStorage.getItem("/order"));
            dispatch(orderData(localData));
            localStorage.removeItem("/order");
            localStorage.removeItem("/coins");
        }
        if (!pathname.includes("/order")) {
            console.log("DELETE");
            localStorage.removeItem("/order");
            localStorage.removeItem("/coins");
            dispatch(orderCoinsAmount(100000));
        }
        if (!search.includes("failed")) {
            let order = {};
            if (state.createOrder) {
                order = objectWithoutProperties(state.createOrder, [
                    "promocode",
                    "promoDiscount",
                ]);
                dispatch(userCreateOrder(order));
            }
        }
    }, [pathname]);

    return <></>;
};

export default ComponentForDataRequest;
