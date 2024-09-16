import { useEffect, useMemo, useState } from "react";
import Image from "next/legacy/image";
// import { Trans, t } from "@lingui/macro";
import { useDispatch, useSelector } from "react-redux";
import { namePaymentMethod } from "../../redux/actions/royalfutActions";

import styles from "./OrderPayments.module.scss";
import { useTranslations } from "next-intl";

const OrderPayments = () => {
    const dispatch = useDispatch();
    const statePayment = useSelector(
        state => state.royalfutReducer.paymentMethod
    );

    const t = useTranslations("order");

    let pay_data = [
        {
            id: 1,
            legend: "Visa, MC, etc.",
            imgs: ["/img/Visa36x36.svg", "/img/Mastercard36x36.svg"],
            active: true,
            name: "acquiring",
            width: "24px",
            height: "24px",
        },
        {
            id: 2,
            legend: "UnionPay",
            imgs: ["/img/UnionPay36x36.svg"],
            active: false,
            name: "unionPay",
            width: "33px",
            height: "33px",
        },
        {
            id: 3,
            legend: t(`a139`),
            imgs: ["/img/tink_flags.svg"],
            active: false,
            name: "eubanktransfer",
            width: "61px",
            height: "37px",
            present: ["/img/tink_flags_column.svg"],
            present_width: "47px",
            present_height: "40px",
        },
        // {
        //     id: 4,
        //     legend: 'Apple Pay',
        //     imgs: ['/img/apple_pay_full.svg'],
        //     active: false,
        //     name: 'apple',
        //     width: '54px',
        //     height: '36px',
        //     soon: false,
        // },
        // {
        //     id: 5,
        //     legend: 'Google Pay',
        //     imgs: ['/img/google_pay_full 1.svg'],
        //     active: false,
        //     name: 'gPay',
        //     width: '41px',
        //     height: '22px',
        //     soon: false,
        //     present: ['/img/google_pay_full 1.svg'],
        //     present_width: '56px',
        //     present_height: '44px',
        // },

        {
            id: 6,
            legend: t(`a24`),
            imgs: ["/img/Tether.svg", "/img/bitcoin.svg", "/img/etherium.svg"],
            active: false,
            name: "crypto",
            width: "24px",
            height: "24px",
            disc: "-3%",
        },
    ];

    const [payments, setPayments] = useState(pay_data);

    const handlePayClick = e => {
        dispatch(namePaymentMethod(e.target.dataset.id));
    };

    useEffect(() => {
        dispatch(namePaymentMethod("acquiring"));
    }, []);

    useMemo(() => {
        let t_statePayment = payments.map(el => {
            if (el.name == statePayment) {
                el.active = true;
            } else {
                el.active = false;
            }
            return { ...el };
        });
        setPayments(t_statePayment);
    }, [statePayment]);

    return (
        <div className={`${styles.container}`}>
            <h3 className={`${styles.order_payment_h3}`}>
                {/* <Trans>a135</Trans> */}
                {t("a135")}
            </h3>
            <div className={`${styles.payment_section}`}>
                {payments.map(el => {
                    return (
                        <label
                            data-id={el.name}
                            key={el.id}
                            className={`${styles.label_payment}`}>
                            {el.disc && (
                                <div className={`${styles.disc}`}>
                                    {el.disc}
                                </div>
                            )}
                            <button
                                data-id={el.name}
                                type="button"
                                name="payment"
                                className={`${styles.payment_btn} ${el.active && styles.payment_btn_active}`}
                                onClick={handlePayClick}>
                                <div
                                    data-id={el.name}
                                    className={`${styles.imgs_wrapper}`}>
                                    {el.imgs.map(elem => {
                                        return (
                                            <div
                                                data-id={el.name}
                                                className={`${styles.image_item}`}
                                                key={elem}>
                                                <Image
                                                    data-id={el.name}
                                                    src={elem}
                                                    width={
                                                        el.width ? el.width : 36
                                                    }
                                                    height={
                                                        el.height
                                                            ? el.height
                                                            : 36
                                                    }
                                                />
                                            </div>
                                        );
                                    })}
                                </div>
                                {el.legend}
                            </button>
                        </label>
                    );
                })}
            </div>
        </div>
    );
};

export default OrderPayments;
