"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Pagination } from "antd";
// import { Trans } from '@lingui/macro';
import api from "../../../Api/Api";
import TableOrders from "../../../components/TableOrders";
import InformationStub from "../../../components/InformationStub";
import Loader from "../../../components/Loader/Loader";
import RoyalPoints from "../../../components/Profile/RoyalPoints";

import {
    getAllOrders,
    modalFunnelProcess,
    modalPassword,
    showMessage,
} from "../../../redux/actions/royalfutActions";

import styles from "./ProfileComponent.module.scss";
import { useTranslations } from "next-intl";

const ProfileComponent = () => {
    const stateUser = useSelector(state => state.royalfutReducer.user);
    const stateAllOrders = useSelector(
        state => state.royalfutReducer.allOrders.orders
    );
    const stateOrders = useSelector(state => state.royalfutReducer.allOrders);

    const [tab, setTab] = useState({ acc: true, orders: false, points: false });
    const [changed, setChanged] = useState(false);
    const [page, setPage] = useState(1);
    const [showModal, setShowModal] = useState({
        link: false,
        orderMethod: false,
    });
    const [load, setLoad] = useState(false);

    const dispatch = useDispatch();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const t = useTranslations("profile");

    const getError = err => {
        dispatch(showMessage({ status: "error", text: `${err}` }));
    };

    useEffect(() => {
        if (
            localStorage.getItem("showModal") == "true" ||
            (!localStorage.getItem("showModal") &&
                pathname.indexOf("from-acquiring-successfully") >= 0)
        ) {
            dispatch(modalFunnelProcess(true));
        }
    }, []);

    useEffect(() => {
        const search = searchParams.toString();
        if (search.includes("orders")) {
            setTab({ acc: false, orders: true, points: false });
        }
        if (search.includes("settings")) {
            setTab({ acc: true, orders: false, points: false });
        }
        if (search.includes("points")) {
            setTab({ acc: false, orders: false, points: true });
        }
    }, [pathname]);

    useEffect(() => {
        if (stateUser?.token) {
            setLoad(true);
            window.scrollTo(0, 0);
            api.getOrders(
                stateUser.token,
                10,
                page === 0 ? 1 : page,
                getError
            ).then(res => {
                setLoad(false);
                dispatch(getAllOrders(res));
                setPage(Number(res.page + 1));
            });
        }
    }, [page, stateUser?.token]);

    useEffect(() => {
        if (stateOrders.orders && stateOrders.orders.length > 0) {
            let lastOrder = stateAllOrders[0];
            let targetPage = "";
            if (pathname.includes("coins")) {
                targetPage = "coins";
            } else if (pathname.includes("funnel")) {
                targetPage = "funnel";
            } else {
                targetPage = "purchase";
            }
            if (lastOrder.status == "PAYED") {
                if (targetPage == "coins") {
                }
                if (targetPage == "funnel") {
                }
                if (targetPage == "purchase") {
                }
            }
        }
    }, [stateOrders]);

    useEffect(() => {
        if (showModal.link === true && showModal.orderMethod === true) {
            dispatch(modalFunnelProcess(true));
        }
    }, [showModal]);
    return (
        <div
            className={`${styles.prof_comp_container} ${tab.acc && styles.prof_comp_max_width}`}>
            <div
                className={`${styles.prof_comp_wrapper_tabs} ${styles.prof_comp_max_width}`}>
                <button
                    onClick={() => {
                        setTab({ acc: false, orders: true, points: false });
                        router.push("?tab=orders");
                    }}
                    className={`${styles.prof_comp_tab} ${tab.orders && styles.prof_comp_tab_active}`}>
                    {/* <Trans>seo38</Trans> */}
                    {t("orders")}
                </button>
                <button
                    onClick={() => {
                        setTab({ acc: true, orders: false, points: false });
                        router.push("?tab=settings");
                    }}
                    className={`${styles.prof_comp_tab} ${tab.acc && styles.prof_comp_tab_active}`}>
                    {/* <Trans>locales.settings</Trans> */}
                    {t("settings")}
                </button>
                <button
                    onClick={() => {
                        setTab({ acc: false, orders: false, points: true });
                        router.push("?tab=points");
                    }}
                    className={`${styles.prof_comp_tab} ${tab.points && styles.prof_comp_tab_active}`}>
                    {/* <Trans>loyalty program</Trans> */}
                    {t("loyalty")}
                </button>
            </div>
            {!tab.points && (
                <div className={`${styles.prof_comp_container_content}`}>
                    <div
                        className={`${styles.prof_acc_container} ${!tab.acc && "hide"}`}>
                        <button
                            onClick={() => dispatch(modalPassword(true))}
                            className={`${styles.button_password}`}>
                            <div className={`${styles.wrapper_btn_content}`}>
                                <img
                                    alt="key"
                                    className={`${styles.button_icon}`}
                                    src="/img/key.svg"></img>
                                <span className={`${styles.button_text}`}>
                                    {/* <Trans>locales.password</Trans> */}
                                    {t("password")}
                                </span>
                            </div>
                            <img
                                alt="arrow"
                                className={`${styles.arrow_icon}`}
                                src="/img/arrow_right.svg"></img>
                        </button>
                    </div>
                    <div
                        className={`${styles.prof_copm_update_wrapper} ${!changed && "hide"} ${
                            !tab.acc && "hide"
                        }`}>
                        <button className={`${styles.prof_copm_update_btn}`}>
                            {/* <Trans>locales.update</Trans> */}
                            {t("update")}
                        </button>
                    </div>

                    <div
                        className={`${styles.prof_comp_orders_container} ${!tab.orders && "hide"}`}>
                        {load ? (
                            <Loader />
                        ) : stateAllOrders && stateAllOrders.length > 0 ? (
                            <>
                                <TableOrders />
                                <div className={`${styles.pag_wrapper}`}>
                                    {page && (
                                        <Pagination
                                            defaultCurrent={+page}
                                            size="small"
                                            showLessItems={true}
                                            total={+(stateOrders.total || 10)}
                                            showSizeChanger={false}
                                            showQuickJumper={false}
                                            onChange={page => setPage(page)}
                                        />
                                    )}
                                </div>
                            </>
                        ) : (
                            <InformationStub />
                        )}
                    </div>
                </div>
            )}
            {tab.points && <RoyalPoints />}
        </div>
    );
};

export default ProfileComponent;
