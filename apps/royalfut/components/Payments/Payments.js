import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Trans, t } from "@lingui/macro";
import { useRouter } from "next/router";
import { namePaymentMethod } from "../../redux/actions/royalfutActions";

import styles from "./Payments.module.scss";

const PaymentItem = ({ data, handler }) => {
    const router = useRouter();
    return (
        <div
            className={`${styles.wrapper_items} ${data.length === 1 && styles.item_width}`}>
            {data?.map(el => {
                return (
                    <button
                        key={el.name}
                        data-id={el.name}
                        onClick={handler}
                        className={`${styles.item_box} ${data.length === 1 && styles.item_width} ${
                            el.active && styles.item_active
                        } ${!router.asPath.includes("applepay") && el.soon && "disabled"}`}>
                        {el.soon && (
                            <div className={`${styles.soon}`}>
                                <Trans>seo211</Trans>
                            </div>
                        )}
                        <span
                            data-id={el.name}
                            className={`${styles.item_legend} ${el.active && styles.item_legend_active}`}>
                            {el.legend}
                        </span>
                        <div
                            data-id={el.name}
                            className={`${styles.wrapper_logos}`}>
                            {el.imgs.map(elem => {
                                return (
                                    <img
                                        key={el.name + elem}
                                        data-id={el.name}
                                        alt={el.name}
                                        className={`${styles.item_logo}`}
                                        src={elem}
                                        style={{
                                            width: el.width,
                                            height: el.height,
                                            minWidth: el.width,
                                            maxWidth: el.width,
                                            minHeight: el.height,
                                            maxHeight: el.height,
                                        }}
                                    />
                                );
                            })}
                        </div>
                        <div
                            data-id={el.name}
                            className={`${styles.wrapper_input}`}>
                            <img
                                data-id={el.name}
                                className={`${styles.input}`}
                                alt={el.name}
                                src={
                                    el.active
                                        ? "/img/radio_active.svg"
                                        : "/img/radio_not_active.svg"
                                }></img>
                        </div>
                    </button>
                );
            })}
        </div>
    );
};

const Payments = () => {
    const router = useRouter();
    const stateCurrency = useSelector(
        state => state.royalfutCurrencyReducer.currency
    );
    let pay_data = [
        {
            id: 1,
            title: t`a136`,
            active: true,
            items: [
                {
                    id: 1,
                    legend: "Visa, MC, etc.",
                    imgs: ["/img/Visa36x36.svg", "/img/Mastercard36x36.svg"],
                    active: true,
                    name: "acquiring",
                },
                {
                    id: 2,
                    legend: "UnionPay",
                    imgs: ["/img/UnionPay36x36.svg"],
                    active: false,
                    name: "unionPay",
                },
                {
                    id: 3,
                    legend: "Apple Pay",
                    imgs: ["/img/apple_pay_full.svg"],
                    active: false,
                    name: "apple",
                    width: "54px",
                    height: "28px",
                    soon: true,
                },
                {
                    id: 4,
                    legend: "Google Pay",
                    imgs: ["/img/google_pay_full.svg"],
                    active: false,
                    name: "gPay",
                    width: "80px",
                    height: "56px",
                    soon: true,
                    present: ["/img/google_pay_full.svg"],
                    present_width: "56px",
                    present_height: "44px",
                },
            ],
        },
        {
            id: 2,
            title: t`a137`,
            active: false,
            soon: false,
            items: [
                {
                    id: 1,
                    legend: t`a139`,
                    imgs: ["/img/tink_flags.svg"],
                    active: false,
                    name: "eubanktransfer",
                    width: "75px",
                    height: "34px",
                    present: ["/img/tink_flags_column.svg"],
                    present_width: "47px",
                    present_height: "40px",
                },
            ],
        },
        {
            id: 3,
            title: t`a138`,
            active: false,
            soon: false,
            items: [
                {
                    id: 1,
                    legend: "USD Tether / Bitcoin / Etherium / etc.",
                    imgs: [
                        "/img/Tether.svg",
                        "/img/bitcoin.svg",
                        "/img/etherium.svg",
                    ],
                    active: false,
                    name: "crypto",
                },
            ],
        },
    ];
    let pay_ru_data = [
        {
            id: "1ru",
            title: t`a136`,
            active: true,
            items: [
                {
                    id: "1_1ru",
                    legend: "Visa, MasterCard, МИР",
                    imgs: [
                        "/img/Visa36x36.svg",
                        "/img/Mastercard36x36.svg",
                        "/img/Mir36x36.svg",
                    ],
                    active: true,
                    name: "acquiring",
                },
            ],
        },

        {
            id: "2ru",
            title: t`a138`,
            active: false,
            soon: false,
            items: [
                {
                    id: "2_1ru",
                    legend: "USD Tether / Bitcoin / Etherium / etc.",
                    imgs: [
                        "/img/Tether.svg",
                        "/img/bitcoin.svg",
                        "/img/etherium.svg",
                    ],
                    active: false,
                    name: "crypto",
                },
            ],
        },
    ];
    const dispatch = useDispatch();

    const [paymentCategory, setPaymentCategory] = useState(pay_data);
    const [currentCategory, setCurrentCategory] = useState({
        category: null,
        item: null,
        active_category: null,
        imgs: [],
        width: null,
        height: null,
    });
    const [currentItem, setCurrentItem] = useState(
        localStorage?.getItem("item") || "1"
    );

    const onHandleClick = e => {
        e.stopPropagation();
        e.preventDefault();
        let t_data = paymentCategory.map(el => {
            return { ...el };
        });
        for (let i = 0; i < t_data.length; i++) {
            if (t_data[i].id === e.target.dataset.id) {
                t_data[i].active = !t_data[i].active;
                if (i === 0) {
                    t_data[i].items[currentItem - 1].active = true;
                } else {
                    t_data[i].items[0].active = true;
                }
            }
            if (t_data[i].id !== e.target.dataset.id) {
                t_data[i].active = false;
                t_data[i].items[0].active = false;
            }
        }
        setPaymentCategory(t_data);
    };

    useEffect(() => {
        if (stateCurrency.title === "RUB") {
            setPaymentCategory(pay_ru_data);
        } else {
            setPaymentCategory(pay_data);
        }
    }, [stateCurrency]);

    useEffect(() => {
        let t_data = paymentCategory.map(el => {
            return { ...el };
        });
        let current_item = { ...currentCategory };
        for (let i = 0; i < t_data.length; i++) {
            if (t_data[i].active === true) {
                current_item.category = t_data[i].id;
            }
            let tt_data = t_data[i].items;
            for (let j = 0; j < tt_data.length; j++) {
                if (tt_data[j].active === true) {
                    current_item.item = tt_data[j].id;
                    current_item.active_category = t_data[i].id;
                    if (tt_data[j].present) {
                        current_item.imgs = tt_data[j].present;
                        current_item.width = tt_data[j].present_width;
                        current_item.height = tt_data[j].present_height;
                    } else if (!tt_data[j].present) {
                        current_item.imgs = tt_data[j].imgs;
                        current_item.width = tt_data[j].width;
                        current_item.height = tt_data[j].height;
                    }
                }
            }
        }
        setCurrentCategory(current_item);
    }, [paymentCategory]);

    const onItemClick = e => {
        let t_data = paymentCategory.map(el => {
            return { ...el };
        });
        for (let i = 0; i < t_data.length; i++) {
            let tt_data = t_data[i].items;
            for (let j = 0; j < tt_data.length; j++) {
                if (tt_data[j].name == e.target.dataset.id) {
                    tt_data[j].active = true;
                    if (i == 0) {
                        setCurrentItem(tt_data[j].id);
                        localStorage.setItem("item", tt_data[j].id);
                    }
                }
                if (tt_data[j].name != e.target.dataset.id) {
                    tt_data[j].active = false;
                }
            }
        }
        setPaymentCategory(t_data);
    };

    useEffect(() => {
        let t_data = paymentCategory.map(el => {
            return { ...el };
        });
        for (let i = 0; i < t_data.length; i++) {
            let tt_data = t_data[i].items;
            for (let j = 0; j < tt_data.length; j++) {
                if (tt_data[j].active === true) {
                    dispatch(namePaymentMethod(tt_data[j].name));
                }
            }
        }
    }, [paymentCategory, dispatch]);

    return (
        <div className={`${styles.container}`}>
            {paymentCategory?.map(el => {
                return (
                    <div
                        data-id={el.id}
                        key={el.id}
                        onClick={onHandleClick}
                        className={`${styles.acc_item} ${
                            !router.asPath.includes("applepay") &&
                            el.soon &&
                            "disabled"
                        }`}>
                        {" "}
                        {el.soon && (
                            <div className={`${styles.soon}`}>
                                <Trans>seo211</Trans>
                            </div>
                        )}
                        <div
                            data-id={el.id}
                            className={`${styles.wrapper_header}`}>
                            <span
                                data-id={el.id}
                                className={`${styles.header_text}`}>
                                {el.title}
                            </span>

                            {el.id === currentCategory.active_category && (
                                <div
                                    data-id={el.name}
                                    className={`${styles.wrapper_logos} ${styles.width_auto}`}>
                                    {currentCategory?.imgs?.map(element => {
                                        return (
                                            <img
                                                key={element}
                                                data-id={el.name}
                                                className={`${styles.item_logo}`}
                                                src={element}
                                                style={{
                                                    width: currentCategory.width,
                                                    height: currentCategory.height,
                                                    minWidth:
                                                        currentCategory.width,
                                                    maxWidth:
                                                        currentCategory.width,
                                                    minHeight:
                                                        currentCategory.height,
                                                    maxHeight:
                                                        currentCategory.height,
                                                }}
                                            />
                                        );
                                    })}
                                </div>
                            )}

                            <div
                                data-id={el.id}
                                className={`${styles.wrapper_header_arrow}`}>
                                <img
                                    data-id={el.id}
                                    className={`${styles.header_arrow} ${el.active && styles.checked_arrow}`}
                                    src="/img/arrow_drop_down.svg"></img>
                            </div>
                        </div>
                        <div
                            className={`${styles.wrapper_block} ${el.active && styles.checked}`}
                            onClick={e => {
                                e.preventDefault();
                                e.stopPropagation();
                            }}>
                            <PaymentItem
                                data={el.items}
                                handler={onItemClick}
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Payments;
