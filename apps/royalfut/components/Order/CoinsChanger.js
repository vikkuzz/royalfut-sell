import React, { useState, useEffect, useRef, useMemo } from "react";

import { Slider, ConfigProvider } from "antd";
import styles from "./CoinsChanger.module.scss";
import { getCoinsValue, getInputValue, getSum } from "../../utils/functions";
import Image from "next/legacy/image";
// import { Trans } from '@lingui/macro';

import minus from "/img/iconMinus.svg";
import plus from "/img/iconPlus.svg";
import coin from "/img/Coin__tab.svg";
import { useWindowDimensions } from "../../utils/hooks";
import { useDispatch, useSelector } from "react-redux";
import { orderCoinsAmount } from "../../redux/actions/royalfutOrderActions";
import { useTranslations } from "next-intl";

const CoinsChanger = ({ title = true }) => {
    const dispatch = useDispatch();

    const stateOrderCoins = useSelector(
        state => state.royalfutOrderReducer.order_coins_amount
    );
    const stateDir = useSelector(state => state.royalfutReducer.direction);

    const sliderRef = useRef(null);
    // const throttleInProgress = useRef(null);
    const intervalRef = useRef(null);
    const span = useRef(null);
    const inputRef = useRef(null);
    const [inputValue, setInputValue] = useState(1);
    const [myValue, setMyValue] = useState(stateOrderCoins);
    const [inputActive, setInputActive] = useState(null);
    const [widthText, setWidthText] = useState("160px");
    const [isMouseUp, setIsMouseUp] = useState(null);
    const [showSlider, setShowSlider] = useState(null);

    const { width } = useWindowDimensions();

    const t = useTranslations("order");

    const sliderMarks2 = {
        1: {
            style: {
                color: "#fff",
                fontFamily: "Montserrat",
                fontSize: "10px",
                fontStyle: "normal",
                fontWeight: "500",
                lineHeight: "normal",
                opacity: "0.4",
                paddingLeft: "16px",
            },
            label: <span>100K</span>,
        },
        10: {
            style: {
                color: "#fff",
                fontFamily: "Montserrat",
                fontSize: "10px",
                fontStyle: "normal",
                fontWeight: "500",
                lineHeight: "normal",
            },
            label: (
                <div>
                    <span className={`${styles.mark_label}`}>1M</span>
                    {/* <span className={`${styles.mark_disk}`}>-3%</span> */}
                </div>
            ),
        },
        22: {
            style: {
                color: "#fff",
                fontFamily: "Montserrat",
                fontSize: "10px",
                fontStyle: "normal",
                fontWeight: "500",
                lineHeight: "normal",
            },
            label: (
                <div>
                    <span className={`${styles.mark_label}`}>4M</span>
                    {/* <span className={`${styles.mark_disk}`}>-4%</span> */}
                </div>
            ),
        },
        28: {
            style: {
                color: "#fff",
                fontFamily: "Montserrat",
                fontSize: "10px",
                fontStyle: "normal",
                fontWeight: "500",
                lineHeight: "normal",
            },
            label: (
                <div>
                    <span className={`${styles.mark_label}`}>10M</span>
                    {/* <span className={`${styles.mark_disk}`}>-5%</span> */}
                </div>
            ),
        },
        38: {
            style: {
                color: "#fff",
                fontFamily: "Montserrat",
                fontSize: "10px",
                fontStyle: "normal",
                fontWeight: "500",
                lineHeight: "normal",
                // opacity: '0.4',
                paddingRight: "16px",
            },
            label: (
                <div>
                    <span className={`${styles.mark_label}`}>30M</span>
                    {/* <span className={`${styles.mark_disk}`}>-9%</span> */}
                </div>
            ),
        },
    };
    const sliderMarks = {
        1: {
            style: {
                color: "#fff",
                fontFamily: "Montserrat",
                fontSize: "10px",
                fontStyle: "normal",
                fontWeight: "500",
                lineHeight: "normal",
                opacity: "0.4",
                paddingLeft: "16px",
            },
            label: <span>100K</span>,
        },
        10: {
            style: {
                color: "#fff",
                fontFamily: "Montserrat",
                fontSize: "10px",
                fontStyle: "normal",
                fontWeight: "500",
                lineHeight: "normal",
            },
            label: (
                <div>
                    <span className={`${styles.mark_label}`}>1M</span>
                    <span className={`${styles.mark_disk}`}>-3%</span>
                </div>
            ),
        },
        22: {
            style: {
                color: "#fff",
                fontFamily: "Montserrat",
                fontSize: "10px",
                fontStyle: "normal",
                fontWeight: "500",
                lineHeight: "normal",
            },
            label: (
                <div>
                    <span className={`${styles.mark_label}`}>4M</span>
                    <span className={`${styles.mark_disk}`}>-4%</span>
                </div>
            ),
        },
        28: {
            style: {
                color: "#fff",
                fontFamily: "Montserrat",
                fontSize: "10px",
                fontStyle: "normal",
                fontWeight: "500",
                lineHeight: "normal",
            },
            label: (
                <div>
                    <span className={`${styles.mark_label}`}>10M</span>
                    <span className={`${styles.mark_disk}`}>-5%</span>
                </div>
            ),
        },
        33: {
            style: {
                color: "#fff",
                fontFamily: "Montserrat",
                fontSize: "10px",
                fontStyle: "normal",
                fontWeight: "500",
                lineHeight: "normal",
                opacity: "0.4",
                paddingRight: "16px",
            },
            label: <span>20M</span>,
        },
    };

    const notify = text => {
        return (
            <div className={`${styles.wrapper_notify}`}>
                <div className={`${styles.notify_dick}`}></div>
                <div className={`${styles.notify_content}`}>
                    <div>
                        <Image
                            src="/img/warning_circle.svg"
                            width={16}
                            height={16}
                        />
                    </div>
                    <span className={`${styles.notify_text}`}>{text}</span>
                </div>
            </div>
        );
    };

    const onChange = value => {
        if (isNaN(value)) {
            return;
        }
        setInputValue(value);
    };
    const handleChangeCoins = e => {
        setMyValue(e.target.value.replace(/[^0-9]/g, ""));
    };
    const handleFocus = e => {
        setInputActive(true);
    };
    const handleBlur = e => {
        setInputActive(false);
    };
    const handlePlus = () => {
        if (myValue + getSum(myValue) > 30000000) {
            setMyValue(30000000);
        } else {
            setMyValue(prev => prev + getSum(myValue));
        }
        setInputActive(myValue);
        if (!isMouseUp) {
            setIsMouseUp("+");
        }
    };
    const handleMinus = () => {
        if (myValue - getSum(myValue) < 100000) {
            setMyValue(100000);
        } else {
            setMyValue(prev => prev - getSum(myValue));
        }
        setInputActive(myValue);
        if (!isMouseUp) {
            setIsMouseUp("-");
        }
    };
    const handleEnter = event => {
        if (event.keyCode === 13) {
            handleBlur();
            event.target.blur();
        }
    };
    const mouseUp = () => {
        setIsMouseUp(null);
    };

    useMemo(() => {
        if (inputActive === false) {
            setInputValue(getInputValue(myValue));
        } else if (inputActive === true) {
            setInputValue(0);
            setMyValue("");
        } else {
            setInputValue(getInputValue(myValue));
        }
    }, [inputActive]);
    useEffect(() => {
        let rect = span.current?.getBoundingClientRect();
        setWidthText(Math.round(rect.right - rect.left + 15) + "px");

        // if (localStorage.getItem('/order')) {
        //     // let localData = JSON.parse(localStorage.getItem('/order')).order_coins_amount;
        //     // dispatch(orderCoinsAmount(localData));

        //     setMyValue(stateOrderCoins);
        // } else {
        //     dispatch(orderCoinsAmount(100000));
        //     setMyValue(100000);
        //     setInputValue(1);
        // }
        setTimeout(() => {
            setShowSlider(true);
        }, 1000);
    }, []);
    useMemo(() => {
        // console.log(Math.ceil(getCoinsValue(inputValue) / 1000) * 1000);
        /// /setMyValue(getCoinsValue(inputValue));
        setMyValue(Math.round(getCoinsValue(inputValue) / 1000) * 1000);
    }, [inputValue]);
    useEffect(() => {
        let rect = span.current?.getBoundingClientRect();
        setWidthText(Math.round(rect.right - rect.left + 15) + "px");
        dispatch(orderCoinsAmount(myValue));
    }, [myValue]);
    useEffect(() => {
        const handlePlusCount = () => {
            setMyValue(prev => {
                const newValue = prev + getSum(prev);
                if (newValue > 30000000) {
                    return 30000000;
                }
                return newValue;
            });
            setInputActive(prev => {
                const newValue = prev + getSum(prev);
                if (newValue > 30000000) {
                    return 30000000;
                }
                return newValue;
            });
        };
        const handleMinusCount = () => {
            setMyValue(prev => {
                const newValue = prev - getSum(prev);
                if (newValue < 100000) {
                    return 100000;
                }
                return newValue;
            });
            setInputActive(prev => {
                const newValue = prev - getSum(prev);
                if (newValue < 100000) {
                    return 100000;
                }
                return newValue;
            });
        };
        if (isMouseUp === "+") {
            intervalRef.current = setInterval(handlePlusCount, 200);
        } else if (isMouseUp === "-") {
            intervalRef.current = setInterval(handleMinusCount, 200);
        } else {
            clearInterval(intervalRef.current);
        }

        return () => {
            clearInterval(intervalRef.current);
        };
    }, [isMouseUp]);
    return (
        <div className={`${styles.container}`}>
            {title && (
                <h3 className={`${styles.h3}`}>
                    {/* <Trans>ab97</Trans> */}
                    {t("ab97")}
                </h3>
            )}
            <div className={`${styles.coins_wrapper}`}>
                <div>
                    <button
                        dir={stateDir}
                        className={`${styles.plus_minus_btn} ${styles.minus}`}
                        onMouseDown={handleMinus}
                        onMouseUp={mouseUp}
                        onMouseLeave={mouseUp}
                        onContextMenu={() => false}
                        type="button"
                        name="-"
                        disabled={Math.round(myValue) == 100000}>
                        <div className={`${styles.no_select}`}>
                            <Image src={minus} width={32} height={32} />
                        </div>
                    </button>
                    <label
                        className={`${styles.input_wrapper} ${inputActive == true && styles.focus_bcgr}`}>
                        <span
                            className={`${styles.hide} ${styles.span_width}`}
                            ref={span}>
                            {Math.round(myValue)}
                        </span>
                        <div className={styles.shrink_img}>
                            <Image
                                src={coin}
                                width={width > 1024 ? 36 : 24}
                                height={width > 1024 ? 36 : 24}
                            />
                        </div>
                        <input
                            ref={inputRef}
                            className={`${styles.coins_input} ${myValue > 30000000 && styles.red_color}`}
                            onChange={handleChangeCoins}
                            type="tel"
                            value={Math.round(Number(myValue)).toLocaleString(
                                "ru-RU"
                            )}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            onKeyDown={handleEnter}
                            style={{ width: widthText }}
                            maxLength={11}
                        />
                        {myValue < 100000 && notify("The minimum is 100 000")}
                        {myValue > 30000000 &&
                            notify("The maximum is 30 000 000")}
                    </label>

                    <button
                        dir={stateDir}
                        className={`${styles.plus_minus_btn} ${styles.plus}`}
                        onMouseDown={handlePlus}
                        onMouseUp={mouseUp}
                        onMouseLeave={mouseUp}
                        onContextMenu={() => false}
                        type="button"
                        name="+"
                        disabled={Math.round(myValue) == 30000000}>
                        <div className={`${styles.no_select}`}>
                            <Image src={plus} width={32} height={32} />
                        </div>
                    </button>
                </div>
                {showSlider ? (
                    <ConfigProvider
                        theme={{
                            token: {
                                colorPrimary: "#8852F2",
                            },
                            components: {
                                Slider: {
                                    colorPrimary: "#8852F2",
                                    dotActiveBorderColor: "#8852F2",
                                    dotBorderColor: "transparent",
                                    railSize: 7,
                                    dotSize: 0,
                                    handleSize: width <= 1024 ? 36 : 24,
                                    handleColor: "#8852F2",
                                    handleSizeHover: width <= 1024 ? 32 : 24,
                                    handleLineWidth: 1,
                                    handleLineWidthHover: 1,
                                },
                            },
                        }}>
                        <Slider
                            reverse={stateDir == "rtl" ? true : false}
                            ref={sliderRef}
                            marks={sliderMarks2}
                            min={1}
                            max={38}
                            onChange={onChange}
                            value={
                                typeof inputValue === "number" ? inputValue : 0
                            }
                            step={1}
                            // dots={true}
                            tooltip={{ open: false }}
                        />
                    </ConfigProvider>
                ) : (
                    <div
                        className="ant-slider ant-slider-horizontal ant-slider-with-marks"
                        style={{ marginBottom: "44px" }}>
                        <div
                            className="ant-slider-rail"
                            style={{ height: "7px" }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default CoinsChanger;
