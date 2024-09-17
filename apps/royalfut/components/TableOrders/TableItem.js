"use client";
import { useEffect, useRef, useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, usePathname } from "next/navigation";
// import { t, Trans } from '@lingui/macro';
import { getCoords } from "../../utils/functions";
import api from "../../Api/Api";
import {
    getAllOrders,
    showMessage,
    modalIframe,
} from "../../redux/actions/royalfutActions";
import {
    orderCoinsAmount,
    orderPlatform,
    orderStep,
} from "../../redux/actions/royalfutOrderActions";
import currency from "../../data-elements/currency";
import StatusInfo from "./StatusInfo";
import TableOrderBtn from "./TableOrderBtn";
import TableOrderBody from "./TableOrderBody";
import Image from "next/legacy/image";
import Analitic from "../../Analitic/Analitic";
import PointsDisplay from "../Profile/PointsDisplay";

import styles from "../../styles/TableOrders.module.scss";
import { useTranslations } from "next-intl";

const analitic = new Analitic();

const TableItem = ({ item }) => {
    const stateUser = useSelector(state => state.royalfutReducer.user);
    const stateDir = useSelector(state => state.royalfutReducer.direction);

    const fieldsetBackupRef = useRef(null);
    const codesLabelRef = useRef(null);
    const wrapperCodesRef = useRef(null);
    const blockOrder = useRef(null);
    const order = useRef(null);

    let [day, setDay] = useState();
    let [openIframe, setOpenIframe] = useState(false);
    let [orderOpen, setOrderOpen] = useState(false);
    let [orderOpenFromBtn, setOrderOpenFromBtn] = useState(false);
    let [userCodes, setUserCodes] = useState([]);
    let [orderItem, setOrderItem] = useState(null);
    const [wrongEmailBtn, setWrongEmailBtn] = useState(false);
    const [wrongPassBtn, setWrongPassBtn] = useState(false);

    let [codeCount, setCodeCount] = useState(0);
    let [disabledBtn, setDisabledBtn] = useState(true);
    let [emailValue, setEmailValue] = useState("");
    let [passwordValue, setPasswordValue] = useState("");
    const dispatch = useDispatch();
    const router = useRouter();
    const pathname = usePathname();

    const t = useTranslations("profile");

    function AddZero(num) {
        return num >= 0 && num < 10 ? `0${num}` : `${num}`;
    }

    const EMAIL_REGEXP =
        /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

    function isEmailValid(value) {
        return EMAIL_REGEXP.test(value);
    }

    useEffect(() => {
        setCodeCount(prev => prev + 1);
        if (wrapperCodesRef && wrapperCodesRef.current) {
            wrapperCodesRef.current.scrollLeft = 999;
        }
        if (userCodes.length < 1) {
            if (codesLabelRef && codesLabelRef.current) {
                codesLabelRef.current.style.display = "flex";
            }
        }
    }, [userCodes]);

    useEffect(() => {
        if (
            passwordValue.length >= 8 &&
            isEmailValid(emailValue) &&
            userCodes.length > 0
        ) {
            setDisabledBtn(false);
        } else {
            setDisabledBtn(true);
        }
    }, [passwordValue, userCodes, emailValue]);

    useEffect(() => {
        const now = new Date();
        const date = [
            AddZero(now.getMonth() + 1),
            AddZero(now.getDate()),
            now.getFullYear(),
        ].join("/");
        const date2 = [
            AddZero(now.getMonth() + 1),
            AddZero(now.getDate() - 1),
            now.getFullYear(),
        ].join("/");
        let currentDay = moment(item.createdAt).format("L");
        if (currentDay === date) {
            currentDay = t("today");
        }

        if (currentDay === date2) {
            currentDay = t("yesterday");
        }
        setDay(currentDay);
    }, [router?.locale]);

    useEffect(() => {
        if (tableOrders[item.status.toLowerCase()]) {
            setOrderItem(item);
        } else {
            let titem = { ...item };
            titem.status = "unexpected_error";
            setOrderItem(titem);
        }
    }, [item]);

    const handleClickOrder = e => {
        // e.preventDefault();
        // e.stopPropagation();

        setOrderOpen(!orderOpen);

        window.scrollTo(0, getCoords(e.target).top - 200);
    };

    const onHandleOrderOpen = () => {
        setOrderOpenFromBtn(true);
    };

    const onHandleWrongAll = () => {
        setWrongPassBtn(true);
        setWrongEmailBtn(true);
    };

    function useOutsideAlerter(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setOrderOpen(false);
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    useOutsideAlerter(order);

    useEffect(() => {
        if (fieldsetBackupRef != null && fieldsetBackupRef.current) {
            if (orderOpenFromBtn) {
                fieldsetBackupRef.current.style.border = "1px solid #E84545";
            }
            if (!orderOpenFromBtn) {
                fieldsetBackupRef.current.style.border =
                    "1px solid rgba(255, 255, 255, 0.6)";
            }
        }
    }, [orderOpenFromBtn]);

    const retryOrder = order => {
        localStorage.removeItem("/purchase");
        analitic.clickMainBuyCoins();
        dispatch(orderCoinsAmount(order?.coinCount));
        dispatch(orderPlatform(order?.platform));
        dispatch(orderStep(2));
        router.push("/order");
    };

    const doNothing = e => {
        // e.preventDefault();
        // e.stopPropagation();
        return;
    };

    const getLink = async e => {
        // e.preventDefault();
        e.stopPropagation();
        if (item.link) {
            let tLink = item.link.replace("royalfut.", "");
            // dispatch(modalIframePage({ show: true, link: tLink }));

            window.open(tLink, "_blank");

            // router.push(tLink);
        } else {
            await api
                .getIframe(e.target.dataset.id, stateUser.token, getError)
                .then(res => {
                    // let tLink = res.aquiring_link?.replace('royalfut.', '');
                    if (res.status === "ACCEPTED") {
                        api.getOrders(
                            stateUser.token,
                            undefined,
                            undefined,
                            getError
                        ).then(res => {
                            dispatch(getAllOrders(res));
                            let targetItemLink = res.orders.filter(
                                el => el.id == e.target.dataset.id
                            )[0].link;
                            window.open(
                                targetItemLink.replace("royalfut.", ""),
                                "_blank"
                            );
                        });
                    }
                    // console.log(e.target.dataset.id);
                    // window.location.href = tLink;
                    // dispatch(modalIframePage({ show: true, link: tLink }));
                });
        }
    };

    const getError = err => {
        dispatch(showMessage({ status: "error", text: `${err}` }));
    };

    const sendRequest = e => {
        // e.stopPropagation();
        // e.preventDefault();
        setOpenIframe(true);

        if (item.link) {
            dispatch(modalIframe({ show: true, link: item.link }));
        } else {
            api.getIframe(e.target.dataset.id, stateUser.token, getError).then(
                res => {
                    dispatch(
                        modalIframe({ show: true, link: res.acquiringLink })
                    );
                    if (res.status === "ACCEPTED") {
                        api.getOrders(
                            stateUser.token,
                            undefined,
                            undefined,
                            getError
                        ).then(res => dispatch(getAllOrders(res)));
                    }
                }
            );
        }

        // if (e.target.link) {
        //     iframe.current.src = e.target.link;
        // }
    };

    const tableOrders = {
        waiting_payment: {
            btn_text: t("may_upd28"),
            btn_fnc: retryOrder,
            status: "waiting_payment",
            title_status: t("unpaid"),
            backgrd_status: "transparent",
            icon_status: "info",
            description_status: t("unpaid_text"),
            have_body: false,
        },
        error_payment: {
            btn_text: t("may_upd30"),
            btn_fnc: retryOrder,
            status: "error_payment",
            title_status: t("paymentfailed"),
            backgrd_status: "transparent",
            icon_status: "error",
            description_status: t("paymentfailed_text"),
            have_body: false,
        },
        pc_not_supported: {
            btn_text: t("retry"),
            btn_fnc: retryOrder,
            status: "pc_not_supported",
            title_status: t("wrngplatform"),
            backgrd_status: "red",
            icon_status: "error",
            description_status: t("seo196"),
            have_body: false,
        },
        not_enough_coins_to_start: {
            btn_text: t("may_upd34"),
            btn_fnc: doNothing,
            status: "not_enough_coins_to_start",
            title_status: t("seo193"),
            backgrd_status: "red",
            icon_status: "error",
            description_status: t("seo194"),
            have_body: true,
        },
        no_club_in_fut_web_app: {
            btn_text: t("may_upd34"),
            btn_fnc: doNothing,
            status: "no_club_in_fut_web_app",
            title_status: t("seo191"),
            backgrd_status: "red",
            icon_status: "error",
            description_status: t("seo192"),
            have_body: true,
        },
        no_access_to_fifa_21_webapp: {
            btn_text: t("may_upd34"),
            btn_fnc: doNothing,
            status: "no_access_to_fifa_21_webapp",
            title_status: t("seo189"),
            backgrd_status: "red",
            icon_status: "error",
            description_status: t("seo190"),
            have_body: true,
        },
        no_tm: {
            btn_text: t("may_upd34"),
            btn_fnc: doNothing,
            status: "no_tm",
            title_status: t("seo189"),
            backgrd_status: "red",
            icon_status: "error",
            description_status: t("seo190"),
            have_body: true,
        },
        transfer_list_full: {
            btn_text: t("may_upd34"),
            btn_fnc: doNothing,
            status: "transfer_list_full",
            title_status: t("seo187"),
            backgrd_status: "red",
            icon_status: "error",
            description_status: t("seo188"),
            have_body: true,
        },
        login_verification_disabled: {
            btn_text: t("may_upd34"),
            btn_fnc: doNothing,
            status: "login_verification_disabled",
            title_status: t("seo184"),
            backgrd_status: "red",
            icon_status: "error",
            description_status: t("seo185"),
            have_body: true,
        },
        finished: {
            btn_text: t("may_upd31"),
            btn_fnc: retryOrder,
            status: "finished",
            title_status: t("seo171"),
            backgrd_status: "green",
            icon_status: "done",
            description_status: t("seo172"),
            have_body: false,
        },
        payed: {
            btn_text: "",
            btn_fnc: doNothing,
            status: "payed",
            title_status: "Prepaid",
            backgrd_status: "blue",
            icon_status: "info",
            description_status: "Your order will be available for delivery once EA FC 25 is released. Awaiting FIFA 25 release.",
            have_body: false,
        },
        // payed: {
        //     btn_text: t("submit"),
        //     btn_fnc: doNothing,
        //     status: "payed",
        //     title_status: t("seo158"),
        //     backgrd_status: "blue",
        //     icon_status: "info",
        //     description_status: t("seo159"),
        //     have_body: true,
        // },
        accepted: {
            btn_text: "",
            btn_fnc: doNothing,
            status: "accepted",
            title_status: t("pl_upd78"),
            backgrd_status: "transparent",
            icon_status: "anime",
            description_status: t("pl_upd79"),
            have_body: true,
        },
        in_progress: {
            btn_text: "",
            btn_fnc: doNothing,
            status: "in_progress",
            title_status: t("pl_upd80"),
            backgrd_status: "transparent",
            icon_status: "anime",
            description_status: t("pl_upd81"),
            transit_coins: true,
            have_body: true,
        },
        wrong_backup: {
            btn_text: t("may_upd37"),
            btn_fnc: onHandleOrderOpen,
            status: "wrong_backup",
            title_status: t("pl_upd83"),
            backgrd_status: "red",
            icon_status: "wrong_info",
            description_status: t("pl_upd84"),
            have_body: true,
            wrong_fields: "backup",
        },
        unassigned_items: {
            btn_text: t("conttransf"),
            btn_fnc: onHandleOrderOpen,
            status: "unassigned_items",
            title_status: t("coins_page1"),
            backgrd_status: "red",
            icon_status: "wrong_info",
            description_status: t("coins_page2"),
            have_body: true,
        },
        wrong_credentials: {
            btn_text: t("may_upd35"),
            btn_fnc: onHandleWrongAll,
            status: "wrong_credentials",
            title_status: t("seo169"),
            backgrd_status: "red",
            icon_status: "wrong_info",
            description_status: t("seo170"),
            have_body: true,
            wrong_fields: "log_pass",
        },
        console_online: {
            btn_text: t("may_upd34"),
            btn_fnc: doNothing,
            status: "console_online",
            title_status: t("seo179"),
            backgrd_status: "red",
            icon_status: "wrong_info",
            description_status: t("seo180"),
            transit_coins: true,
            have_body: true,
        },
        online_in_fut_web_app: {
            btn_text: t("may_upd34"),
            btn_fnc: doNothing,
            status: "online_in_fut_web_app",
            title_status: t("seo181"),
            backgrd_status: "red",
            icon_status: "wrong_info",
            description_status: t("seo182"),
            transit_coins: true,
            have_body: true,
        },
        customer_online: {
            btn_text: t("may_upd34"),
            btn_fnc: doNothing,
            status: "customer_online",
            title_status: t("seo179"),
            backgrd_status: "red",
            icon_status: "wrong_info",
            description_status: t("seo180"),
            transit_coins: true,
            have_body: true,
        },
        issued_refund: {
            btn_text: t("repeatorder"),
            btn_fnc: retryOrder,
            status: "issued_refund",
            title_status: t("seo173"),
            backgrd_status: "transparent",
            icon_status: "done",
            description_status: t("seo174"),
            have_body: false,
        },
        unexpected_error: {
            btn_text: "",
            btn_fnc: doNothing,
            status: "unexpected_error",
            title_status: t("ab18"),
            backgrd_status: "red",
            icon_status: "wrong_info",
            description_status: t("seo95"),
            have_body: false,
        },
        temporary_provider_error: {
            btn_text: "",
            btn_fnc: doNothing,
            status: "temporary_provider_error",
            title_status: t("coins_page6"),
            backgrd_status: "red",
            icon_status: "wrong_info",
            description_status: t("coins_page7"),
            have_body: false,
        },
        undefined_status: {
            btn_text: "",
            btn_fnc: doNothing,
            status: "undefined_status",
            title_status: "Unexpected Error",
            backgrd_status: "red",
            icon_status: "wrong_info",
            description_status: "Please contact support",
            have_body: false,
        },
        manual: {
            payed: {
                btn_text: t("launch"),
                btn_text_2: t("open"),
                btn_fnc: sendRequest,
                btn_fnc_2: getLink,
                status: "payed",
                title_status: t("await"),
                backgrd_status: "blue",
                icon_status: "info",
                description_status: t("press"),
                have_body: false,
                manual: true,
            },
            in_progress: {
                btn_text: t("launch"),
                btn_text_2: t("open"),
                btn_fnc: sendRequest,
                btn_fnc_2: getLink,
                status: "in_progress",
                title_status: t("await"),
                backgrd_status: "blue",
                icon_status: "info",
                description_status: t("press"),
                have_body: true,
                manual: true,
            },
            accepted: {
                btn_text: t("launch"),
                btn_text_2: t("open"),
                btn_fnc: sendRequest,
                btn_fnc_2: getLink,
                status: "in_progress",
                title_status: t("await"),
                backgrd_status: "blue",
                icon_status: "info",
                description_status: t("press"),
                have_body: false,
                manual: true,
            },
            waiting_payment: {
                btn_text: t("retry"),
                btn_fnc: retryOrder,
                status: "waiting_payment",
                title_status: t("unpaid"),
                backgrd_status: "transparent",
                icon_status: "error",
                description_status: t("unpaid_text"),
                have_body: false,
            },
            error_payment: {
                btn_text: t("retry"),
                btn_fnc: retryOrder,
                status: "error_payment",
                title_status: t("paymentfailed"),
                backgrd_status: "transparent",
                icon_status: "info",
                description_status: t("paymentfailed_text"),
                have_body: false,
            },
            finished: {
                btn_text: t("repeatorder"),
                btn_fnc: retryOrder,
                status: "finished",
                title_status: t("finished"),
                backgrd_status: "green",
                icon_status: "done",
                description_status: t("finished_text"),
                have_body: false,
            },
        },
    };

    return (
        <>
            {orderItem && (
                <div
                    ref={blockOrder}
                    className={`${styles.wrapper_order}`}
                    // onClick={(e) => {
                    //     e.preventDefault();
                    //     e.stopPropagation();
                    // }}
                >
                    <div className={`${styles.tableorder_header_date}`}>
                        <div className={`${styles.tableorder_header_day}`}>
                            {day}
                        </div>
                        <div
                            className={`${styles.tableorder_header_divider}`}></div>
                    </div>

                    {/* {tableOrders[item.status.toLowerCase()] ? ( */}
                    <div
                        ref={order}
                        id={item.id}
                        className={`${styles.tableorders_order} ${
                            orderOpen && styles.tableorder_body_order_open
                        }`}>
                        <div
                            className={`${styles.tableorder_body}`}
                            onClick={
                                item.deliveryMethod.toLowerCase() === "easy"
                                    ? tableOrders[
                                          orderItem.status.toLowerCase()
                                      ]?.have_body === true
                                        ? handleClickOrder
                                        : () => {}
                                    : tableOrders.manual[
                                            orderItem.status.toLowerCase()
                                        ]?.have_body === true
                                      ? handleClickOrder
                                      : console.log("")
                            }>
                            <div className={`${styles.head_order}`}>
                                <div className={`${styles.head_order_p1}`}>
                                    <div
                                        dir="ltr"
                                        className={`${styles.tableorder_item_id}`}>
                                        № {item.id.toLocaleString("ru-RU")}{" "}
                                    </div>
                                    <div
                                        dir="ltr"
                                        className={`${styles.tableorder_item_id}`}>
                                        <Image
                                            src={`/img/${orderItem.platform}_icon.svg`}
                                            width={24}
                                            height={24}
                                        />
                                        {/* <img
                                            alt="platform"
                                            className={`${styles.platform_icons}`}
                                            src="/img/ps_xbx.svg"
                                        ></img> */}
                                    </div>
                                </div>
                                <div
                                    dir={stateDir}
                                    className={`${styles.order_price}`}>
                                    <PointsDisplay order={item} />
                                    <div
                                        className={`${styles.tableorder_item_price}`}>
                                        {currency.filter(
                                            el => el.title === item.currency
                                        )[0]?.currency + " "}
                                        {item?.overallPrice.toFixed(2)}
                                    </div>
                                </div>

                                {item.deliveryMethod.toLowerCase() ===
                                "easy" ? (
                                    tableOrders[orderItem.status.toLowerCase()]
                                        ?.have_body === true ? (
                                        <div
                                            className={`${styles.tableorder_arrow} ${
                                                orderOpen &&
                                                styles.tableorder_arrow_trasform
                                            }`}></div>
                                    ) : null
                                ) : tableOrders.manual[
                                      item.status.toLowerCase()
                                  ]?.have_body === true ? (
                                    <div
                                        className={`${styles.tableorder_arrow} ${
                                            orderOpen &&
                                            styles.tableorder_arrow_trasform
                                        }`}></div>
                                ) : null}
                            </div>
                            <div className={`${styles.order_wrapper_desk}`}>
                                <div className={`${styles.amount_order}`}>
                                    <div className={`${styles.column}`}>
                                        <div className={`${styles.row}`}>
                                            <div
                                                className={`${styles.wrapper_order_icon}`}>
                                                <img
                                                    alt="coins"
                                                    className={`${styles.order_icon}`}
                                                    src="/img/Fut coin.svg"></img>
                                            </div>
                                            <div
                                                className={`${styles.amount_info}`}>
                                                <span>
                                                    {/* <Trans>locales.amount</Trans> */}
                                                    {t("amount")}
                                                </span>
                                                <div>
                                                    {item.coinCount.toLocaleString(
                                                        "ru-RU"
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className={`${!item.mail && "hide"}`}>
                                            {item.mail}
                                        </div>
                                    </div>
                                </div>
                                {item.deliveryMethod === "Easy" ? (
                                    <StatusInfo
                                        item={orderItem}
                                        currentStatus={
                                            tableOrders[
                                                orderItem.status.toLowerCase()
                                            ] || tableOrders.undefined_status
                                        }
                                        open={orderOpen}
                                    />
                                ) : (
                                    <StatusInfo
                                        item={orderItem}
                                        currentStatus={
                                            tableOrders.manual[
                                                orderItem.status.toLowerCase()
                                            ] || tableOrders.undefined_status
                                        }
                                        open={orderOpen}
                                    />
                                )}
                            </div>
                            {item.deliveryMethod === "Easy" && (
                                <>
                                    {tableOrders[orderItem.status.toLowerCase()]
                                        ?.have_body === true &&
                                        orderOpen === false && (
                                            <TableOrderBtn
                                                item={orderItem}
                                                data={
                                                    tableOrders[
                                                        orderItem.status.toLowerCase()
                                                    ] ||
                                                    tableOrders.undefined_status
                                                }
                                                orderOpen={orderOpen}
                                            />
                                        )}
                                    {tableOrders[orderItem.status.toLowerCase()]
                                        ?.have_body === false && (
                                        <TableOrderBtn
                                            item={orderItem}
                                            data={
                                                tableOrders[
                                                    orderItem.status.toLowerCase()
                                                ] ||
                                                tableOrders.undefined_status
                                            }
                                            orderOpen={orderOpen}
                                        />
                                    )}
                                </>
                            )}
                            {item.deliveryMethod === "Manual" && (
                                <>
                                    {tableOrders[orderItem.status.toLowerCase()]
                                        ?.have_body === true &&
                                        orderOpen === false && (
                                            <TableOrderBtn
                                                item={orderItem}
                                                data={
                                                    tableOrders.manual[
                                                        orderItem.status.toLowerCase()
                                                    ] ||
                                                    tableOrders.undefined_status
                                                }
                                                orderOpen={orderOpen}
                                            />
                                        )}
                                </>
                            )}
                            {item.deliveryMethod === "Manual" && (
                                <>
                                    {tableOrders[orderItem.status.toLowerCase()]
                                        ?.have_body === false && (
                                        <TableOrderBtn
                                            item={orderItem}
                                            data={
                                                tableOrders.manual[
                                                    orderItem.status.toLowerCase()
                                                ] ||
                                                tableOrders.undefined_status
                                            }
                                            orderOpen={orderOpen}
                                        />
                                    )}
                                </>
                            )}
                        </div>

                        {item.deliveryMethod != "Manual" &&
                            tableOrders[orderItem.status.toLowerCase()]
                                ?.have_body === true && (
                                <TableOrderBody
                                    item={orderItem}
                                    orderOpen={orderOpen}
                                    data={
                                        tableOrders[
                                            orderItem.status.toLowerCase()
                                        ] || tableOrders.undefined_status
                                    }
                                />
                            )}

                        {item.deliveryMethod === "Manual" &&
                            orderItem.status != "WAITING_PAYMENT" &&
                            orderItem.status != "ERROR_PAYMENT" && (
                                <div
                                    className={`${styles.tableorder_content} ${!orderOpen && "hide"}`}>
                                    {item.status === "IN_PROGRESS" && (
                                        <>
                                            <div
                                                className={`${styles.tableorder_content_title}`}>
                                                {`locales.transferred`.toLocaleString(
                                                    "ru-RU"
                                                )}
                                            </div>
                                            <div
                                                dir="ltr"
                                                className={`${styles.tableorder_content_transfer}`}>
                                                {item.coinTransferred.toLocaleString(
                                                    "ru-RU"
                                                )}{" "}
                                                /{" "}
                                                {item.coinCount.toLocaleString(
                                                    "ru-RU"
                                                )}
                                            </div>
                                        </>
                                    )}
                                    <div
                                        className={`${styles.tableorder_content_progress}`}>
                                        {item.status === "IN_PROGRESS" && (
                                            <>
                                                <div
                                                    className={`${styles.tableorder_content_percent}`}>
                                                    {item.percentTransferred &&
                                                    String(
                                                        item.percentTransferred
                                                    ).indexOf("%") > -1
                                                        ? item.percentTransferred
                                                        : `${item.percentTransferred}%`}
                                                </div>
                                                <div
                                                    className={`${styles.tableorder_content_progressline}`}>
                                                    <div
                                                        className={`${styles.tableorder_line}`}
                                                        style={{
                                                            width: `${
                                                                item.percentTransferred &&
                                                                String(
                                                                    item.percentTransferred
                                                                ).indexOf("%") >
                                                                    -1
                                                                    ? item.percentTransferred
                                                                    : `${item.percentTransferred}%`
                                                            }`,
                                                        }}></div>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            )}
                    </div>
                </div>
            )}
        </>
    );
};

export default TableItem;
