import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currentCurrency } from "../../redux/actions/royalfutCurrencyAction";

import styles from "../../styles/DropdownList.module.scss";

const DropdownList = ({ title, value }) => {
    const stateDir = useSelector(state => state.royalfutReducer.direction);
    const stateLocale = useSelector(
        state => state.royalfutLocaleReducer.locale
    );
    const container = useRef(null);
    const drop = useRef(null);
    let [open, setOpen] = useState(false);
    const [currencyData, setCurrencyData] = useState(value);
    const dropOn = () => {
        setOpen(!open);
    };

    const dispatch = useDispatch();
    useEffect(() => {
        let t_data = null;
        if (stateLocale.title != "ru") {
            t_data = value.filter(el => el.title != "RUB");
        } else {
            t_data = [...value];
        }
        setCurrencyData(t_data);
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
            container.current.style.opacity = "1";
            container.current.style.height = "auto";
            container.current.style.top = "-193px";
            container.current.style.zIndex = "1";
        } else {
            container.current.style.opacity = "0";
            container.current.style.height = "0";
            container.current.style.top = "-140px";
            container.current.style.zIndex = "-1";
        }
    }, [open]);
    const changeCurrency = e => {
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
                <span dir={stateDir} className={`${styles.title}`}>
                    {title}
                </span>
                <img
                    alt="arrow"
                    className={`${styles.title_arrow} ${open && styles.rotate}`}
                    src={"../../img/arrow_drop_down.svg"}></img>
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
                                        src={el.url}
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

export default DropdownList;
