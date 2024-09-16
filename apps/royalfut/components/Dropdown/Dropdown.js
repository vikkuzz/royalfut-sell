import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import flagLangs from "../../data-elements/countries";
import currency from "../../data-elements/currency";
import { useOutsideClick } from "../../utils/hooks";

import styles from "../../styles/Dropdown.module.scss";
import { changeDir, getCalcFunnel } from "../../redux/actions/royalfutActions";
import { currentCurrency } from "../../redux/actions/royalfutCurrencyAction";
import { currentLang } from "../../redux/actions/royalfutLocaleAction";
// import { useRouter } from 'next/router';
import Image from "next/legacy/image";
import { usePathname, useRouter } from "../../navigation";

const DropdownContent = ({ data, callback }) => {
    const stateDir = useSelector(state => state.royalfutReducer.direction);
    const dispatch = useDispatch();

    const router = useRouter();
    const pathname = usePathname();

    const changeLang = e => {
        e.stopPropagation();

        dispatch(currentLang(e.target.dataset.id));
        if (e.target.dataset.id === "ar") {
            if (stateDir === "ltr") {
                dispatch(changeDir("rtl"));
            }
        } else {
            if (stateDir === "rtl") {
                dispatch(changeDir("ltr"));
            }
        }

        callback && callback();
        router.replace(pathname, { locale: e.target.dataset.id });
    };

    return (
        <div className={`${styles.dropdown__scroll}`}>
            {data.map(el => {
                return (
                    <button
                        key={el.id}
                        data-id={el.title}
                        className={`${styles.dropdown__content_item}`}
                        onClick={changeLang}
                        type="button"
                        name="lang">
                        <img
                            alt="item"
                            data-id={el.title}
                            className={`${styles.dropdown__content_item_img}`}
                            src={el.url}
                            loading="lazy"
                        />
                        <div
                            data-id={el.title}
                            className={`${styles.dropdown__content_item_title_country}`}>
                            {el.country}
                        </div>
                    </button>
                );
            })}
        </div>
    );
};

const DropdownCurrencyContent = ({ data, callback }) => {
    const dispatch = useDispatch();
    const stateLocale = useSelector(
        state => state.royalfutLocaleReducer.locale
    );
    const stateCalcFunnel = useSelector(
        state => state.royalfutReducer.calcFunnel
    );

    const [currencyData, setCurrencyData] = useState(data);

    useEffect(() => {
        let t_data = null;
        if (stateLocale.title != "ru") {
            t_data = data.filter(el => el.title != "RUB");
        } else {
            t_data = [...data];
        }
        setCurrencyData(t_data);
    }, [stateLocale]);

    const changeCurrency = e => {
        e.stopPropagation();
        dispatch(currentCurrency(e.target.id));

        let userCurrency = currency.filter(
            el => el.title.toLowerCase() == e.target.id.toLowerCase()
        )[0];
        dispatch(getCalcFunnel({ ...stateCalcFunnel, currency: userCurrency }));
        callback && callback();
    };

    return (
        <div className={`${styles.dropdown__scroll} ${styles.drop_currency}`}>
            {currencyData.map(el => {
                return (
                    <button
                        id={el.title}
                        key={el.id}
                        className={`${styles.dropdown__content_item}`}
                        onClick={changeCurrency}
                        type="button"
                        name="currency">
                        <img
                            alt="item"
                            id={el.title}
                            className={`${styles.dropdown__content_item_img}`}
                            src={el.url}
                            loading="lazy"
                        />
                        <div
                            id={el.title}
                            className={`${styles.dropdown__content_item_title_country}`}>
                            {`${el.title}`}
                        </div>
                    </button>
                );
            })}
        </div>
    );
};

let count = 0;

const DropdownLang = ({ burger = false, serverLocale }) => {
    const lang = useSelector(state => state.royalfutLocaleReducer.locale);
    const [componentLocale, setComponentLocale] = useState(null);
    useEffect(() => {
        if (!lang) {
            let currentLang = flagLangs.filter(
                el => el.title.toLowerCase() === serverLocale.toLowerCase()
            )[0];
            setComponentLocale(currentLang);
        } else {
            setComponentLocale(lang);
        }
    }, [serverLocale, lang]);
    return componentLocale ? (
        <div className={`${styles.countries}`}>
            <div className={`${styles.locale}`}>
                <div className={`${styles.circle}`}>
                    <div className={`${styles.dropdown__country_img}`}>
                        <Image
                            alt="flag"
                            width={16}
                            height={16}
                            priority={false}
                            src={componentLocale.url}
                            loading="lazy"
                        />
                    </div>
                </div>
                <span
                    className={`${burger && styles.burger_drop_lang} bcgr-transparent`}>
                    {componentLocale.country}
                </span>
            </div>
            <div className={`${styles.dropdown__arrow}`} />
        </div>
    ) : (
        ""
    );
};

const Dropdown = ({ burger = false, serverLocale }) => {
    const currentCurrency = useSelector(
        state => state.royalfutCurrencyReducer.currency
    );
    const countryRef = React.createRef();
    const countryRefMobile = React.createRef();
    const currencyRef = React.createRef();
    const currencyRefMobile = React.createRef();

    function hideContent(ref) {
        ref.current.classList.toggle("hide");
    }

    useOutsideClick(countryRef, "hide");
    useOutsideClick(currencyRef, "hide");
    useOutsideClick(countryRefMobile, "hide");
    useOutsideClick(currencyRefMobile, "hide");

    const onMouseEnterBlock = (e, ref) => {
        e.stopPropagation();
        ref.current.classList.remove("hide");
    };

    const onMouseLeaveBlock = (e, ref) => {
        e.stopPropagation();
        ref.current.classList.add("hide");
    };
    const hideBlock = () => {
        hideContent(countryRef);
    };
    const hideMobileBlock = () => {
        hideContent(countryRefMobile);
    };
    const hideMobileCurrency = () => {
        hideContent(currencyRefMobile);
    };
    const hideCurrency = () => {
        hideContent(currencyRef);
    };

    return (
        <div className={`${styles.dropdown_container}`}>
            <div className={styles.mobile_drop_container}>
                <div className={`${styles.row}`}>
                    <div
                        onMouseEnter={e => {
                            e.stopPropagation();
                            window.innerWidth > 1024
                                ? onMouseEnterBlock(e, countryRef)
                                : null;
                        }}
                        onMouseLeave={e => {
                            e.stopPropagation();
                            window.innerWidth > 1024
                                ? onMouseLeaveBlock(e, countryRef)
                                : null;
                        }}
                        onClick={e => {
                            e.stopPropagation();
                            window.innerWidth > 1024
                                ? onMouseEnterBlock(e, countryRef)
                                : onMouseEnterBlock(e, countryRefMobile);
                        }}
                        className={`${styles.dropdown_selects}`}>
                        <div className={`${styles.dropdown_countries}`}>
                            <DropdownLang
                                burger={burger}
                                serverLocale={serverLocale}
                            />
                        </div>
                        <div className={`${styles.drop_px}`}>
                            <div
                                className={`${styles.dropdown__content}  hide`}
                                ref={countryRef}>
                                <DropdownContent
                                    data={flagLangs}
                                    container={countryRef}
                                    callback={hideBlock}
                                />
                            </div>
                        </div>
                    </div>
                    <div
                        onMouseEnter={e => {
                            e.stopPropagation();
                            window.innerWidth > 1024
                                ? onMouseEnterBlock(e, currencyRef)
                                : null;
                        }}
                        onMouseLeave={e => {
                            e.stopPropagation();
                            window.innerWidth > 1024
                                ? onMouseLeaveBlock(e, currencyRef)
                                : null;
                        }}
                        onClick={e => {
                            e.stopPropagation();
                            window.innerWidth > 1024
                                ? onMouseEnterBlock(e, currencyRef)
                                : onMouseEnterBlock(e, currencyRefMobile);
                        }}
                        className={`${styles.dropdown_currency}`}>
                        <div className={`${styles.wrapper_arrow}`}>
                            {currentCurrency.title || "USD"}
                            <div className={`${styles.dropdown__arrow}`} />
                        </div>
                        <div className={`${styles.drop_px}`}>
                            <div
                                className={`${styles.dropdown__content} hide`}
                                ref={currencyRef}>
                                <DropdownCurrencyContent
                                    data={currency}
                                    callback={hideCurrency}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`${styles.mobile_container}`}>
                    <div
                        className={`${styles.dropdown__content}  hide`}
                        ref={countryRefMobile}>
                        <DropdownContent
                            data={flagLangs}
                            container={countryRefMobile}
                            callback={hideMobileBlock}
                        />
                    </div>
                    <div
                        className={`${styles.dropdown__content} hide`}
                        ref={currencyRefMobile}>
                        <DropdownCurrencyContent
                            data={currency}
                            callback={hideMobileCurrency}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dropdown;
