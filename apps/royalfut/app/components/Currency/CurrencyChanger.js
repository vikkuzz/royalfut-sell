"use client";

import currency from "../../../data-elements/currency";
import { useDispatch, useSelector } from "react-redux";

import styles from "./CurrencyChanger.module.scss";
import Image from "next/image";
import { currentCurrency } from "../../../redux/actions/royalfutCurrencyAction";
import { useEffect } from "react";

export default function CurrencyChanger() {
    const dispatch = useDispatch();
    const stateCurrency = useSelector(
        state => state.royalfutCurrencyReducer.currency
    );

    useEffect(() => {
        const localCurrency = localStorage.getItem("currency");
        if (localCurrency) {
            dispatch(currentCurrency(JSON.parse(localCurrency).title));
        }
    }, []);

    const handleChange = e => {
        dispatch(currentCurrency(e.target.dataset.id));
    };

    return (
        <div className={`${styles.dropdown_container}`}>
            <div className={`${styles.lang_wrapper}`}>
                <span>{stateCurrency.title}</span>
                <div
                    className={`${styles.icon_wrapper} ${styles.arrow_wrapper}`}>
                    <Image
                        width={24}
                        height={24}
                        src={`/img/arrow_drop_down.svg`}
                        loading="lazy"
                        alt="arrow"
                    />
                </div>
            </div>
            <div className={`${styles.lang_container} ${styles.drop_block}`}>
                {currency.map(el => (
                    <button
                        className={`${styles.dropdown_content_item}`}
                        key={el.title}
                        data-id={el.title}
                        value={el.title}
                        onClick={handleChange}>
                        <div className={`${styles.icon_wrapper}`}>
                            <Image
                                width={24}
                                height={24}
                                src={el.url}
                                loading="lazy"
                                alt="lang"
                            />
                        </div>
                        {el.title}
                    </button>
                ))}
            </div>
        </div>
    );
}
