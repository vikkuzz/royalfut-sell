"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "antd";
// import { Trans } from '@lingui/macro';
import PointsFilter from "./PointsFilter";
import PointsOrders from "./PointsOrders";
import { showMessage } from "../../redux/actions/royalfutActions";
import { loyaltyOrders } from "../../redux/actions/royalfutLoyaltyActions";
import api from "../../Api/Api";
import { Loader } from "../TableOrders/TableOrders";

import styles from "./PointsHistory.module.scss";
import { useTranslations } from "next-intl";

const PointsHistory = () => {
    const dispatch = useDispatch();
    const stateLoyaltyOrders = useSelector(
        state => state.royalfutLoyaltyReducer.orders
    );
    const stateUser = useSelector(state => state.royalfutReducer.user);
    const [filter, setFilter] = useState(0);
    const [porders, setPorders] = useState(null);
    const [page, setPage] = useState(1);
    const [load, setLoad] = useState(false);

    const t = useTranslations("profile");

    const getError = err => {
        dispatch(showMessage({ status: "error", text: `${err}` }));
    };

    useEffect(() => {
        if (stateLoyaltyOrders?.orders) {
            updatedList(stateLoyaltyOrders?.orders, filter);
        }
    }, [stateLoyaltyOrders?.orders, filter]);

    useEffect(() => {
        if (stateUser?.token) {
            setLoad(true);
            window.scrollTo(0, 0);

            api.getOrders(
                stateUser.token,
                50,
                page === 0 ? 1 : page,
                getError
            ).then(res => {
                dispatch(loyaltyOrders(res));
                // setPage(Number(res.page + 1));
            });
        }
    }, [page, stateUser?.token]);

    const updatedList = (arr, filter) => {
        const updatedArr = arr.filter(el => {
            if (filter == 1 && el.cashback != 0) {
                return el;
            }
            if (filter == 2 && el.cashbackUsed != 0) {
                return el;
            }
            if (filter == 0) {
                return el;
            }
        });
        setPorders(updatedArr);
        setLoad(false);
    };

    return (
        <div className={`${styles.container}`}>
            <div className={`${styles.head_block}`}>
                <h3 className={`${styles.block_title}`}>
                    {/* <Trans>pl_upd66</Trans> */}
                    {t("pointshistory")}
                </h3>
                <PointsFilter filter={filter} setFilter={setFilter} />
            </div>

            <div className={styles.bckg_transparent}>
                {load ? <Loader /> : <PointsOrders orders={porders} />}
            </div>
            {page && (
                <Pagination
                    defaultCurrent={+page}
                    size="small"
                    showLessItems={true}
                    total={+(stateLoyaltyOrders?.total || 10)}
                    showSizeChanger={false}
                    showQuickJumper={false}
                    onChange={page => setPage(page)}
                />
            )}
        </div>
    );
};

export default PointsHistory;
