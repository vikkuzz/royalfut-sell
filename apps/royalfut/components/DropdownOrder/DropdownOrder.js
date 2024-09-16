import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currentCurrency } from "../../redux/actions/royalfutCurrencyAction";

import styles from "./DropdownOrder.module.scss";
import Image from "next/legacy/image";

const DropdownOrder = ({ title, value }) => {
    const stateDir = useSelector(state => state.royalfutReducer.direction);
    const stateLocale = useSelector(
        state => state.royalfutLocaleReducer.locale
    );
    const stateCurrency = useSelector(
        state => state.royalfutCurrencyReducer.currency
    );
    const container = useRef(null);
    const drop = useRef(null);
    let [open, setOpen] = useState(false);
    const [currencyData, setCurrencyData] = useState(value);
    const [currencyPreview, setCurrencyPreview] = useState(
        value.filter(el => el.title == title)[0]
    );
    const dropOn = () => {
        setOpen(!open);
    };

    const dispatch = useDispatch();

    useEffect(() => {
        setCurrencyPreview(value.filter(el => el.title == title)[0]);
    }, [stateCurrency]);
    useEffect(() => {
        let t_data = null;
        if (stateLocale.title != "ru") {
            t_data = value.filter(el => el.title != "RUB");
        } else {
            t_data = [...value];
        }
        setCurrencyData(t_data);
        setCurrencyPreview(value.filter(el => el.title == title)[0]);
    }, [stateLocale]);

    useEffect(() => {
        document.addEventListener("click", e => {
            if (drop && drop.current && drop.current != null) {
                if (!drop?.current?.contains(e.target)) {
                    setOpen(false);
                }
            }
        });
        return () => {
            document.removeEventListener("click", e => {
                if (!drop.current.contains(e.target)) {
                    setOpen(false);
                }
            });
        };
    }, []);

    useEffect(() => {
        if (open) {
            container.current.style.display = "flex";
        } else {
            container.current.style.display = "none";
        }
    }, [open]);
    const changeCurrency = e => {
        // e.stopPropagation();
        dispatch(currentCurrency(e.target.id));
        dropOn();
    };

    return (
        <div ref={drop} className={`${styles.container}`}>
            <button
                type="button"
                name="drop"
                className={`${styles.title_wrapper}`}
                onClick={dropOn}>
                {" "}
                <div className={`${styles.preview}`}>
                    <div className={`${styles.preview_wrapper}`}>
                        <Image
                            src={currencyPreview?.url_flag}
                            width={16}
                            height={16}
                        />
                    </div>
                </div>
                <span dir={stateDir} className={`${styles.title}`}>
                    {title}
                </span>
                <img
                    alt="arrow"
                    className={`${styles.title_arrow} ${open && styles.rotate}`}
                    src={"/img/arrow_drop_down.svg"}></img>
            </button>
            <div
                dir={stateDir}
                className={`${styles.value_container}`}
                ref={container}>
                {currencyData.map(el => {
                    if (el.actual !== false) {
                        return (
                            <button
                                type="button"
                                name="currency"
                                id={el.title}
                                key={el.id}
                                className={`${styles.drop_elem}`}
                                onClick={changeCurrency}>
                                <div
                                    id={el.title}
                                    className={`${styles.value_img_wrapper}`}>
                                    <img
                                        alt="item"
                                        id={el.title}
                                        src={el.url_currency}
                                        className={`${styles.value_img2}`}></img>
                                    <img
                                        alt="item"
                                        id={el.title}
                                        src={el.url_flag}
                                        className={`${styles.value_img}`}></img>
                                </div>
                                <span
                                    id={el.title}
                                    className={`${styles.value_title}`}>
                                    {el.title}
                                </span>
                            </button>
                        );
                    }
                })}
            </div>
        </div>
    );
};

export default DropdownOrder;
