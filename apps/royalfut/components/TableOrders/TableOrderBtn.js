"use client";
import React, { useEffect, useState } from "react";
import GradientBtn from "../GradientBtn";
import TransparentBtn from "../TransparentBtn";

import styles from "../../styles/TableOrders.module.scss";
import { useWindowDimensions } from "../../utils/hooks";

const TableOrderBtn = ({ item, data }) => {
    let [btn, setBtn] = useState();
    let [btnDesign, setBtnDesign] = useState();

    const { width } = useWindowDimensions();

    useEffect(() => {
        let currentStatus = item.status.toLowerCase();
        if (
            currentStatus === "finished" ||
            currentStatus === "pc_not_supported" ||
            currentStatus === "error_payment" ||
            currentStatus === "waiting_payment"
        ) {
            setBtnDesign(true);
        } else {
            setBtnDesign(false);
        }
        setBtn(data);
    }, [item, data]);

    return (
        <div data-id={item.id} className={`${styles.wrapper_tableorder_btn}`}>
            {!data.manual ? (
                <>
                    {width > 1024 && (
                        <div
                            data-id={item.id}
                            className={`${styles.empty_block} `}></div>
                    )}
                </>
            ) : (
                <button
                    data-id={item.id}
                    onClick={data.btn_fnc_2}
                    className={`${styles.manual_button}`}>
                    <span data-id={item.id} className={`${styles.link_text}`}>
                        {data.btn_text_2}
                    </span>

                    <img
                        data-id={item.id}
                        className={`${styles.pic_link}`}
                        alt="icon"
                        src="/img/External_link.svg"></img>
                </button>
            )}
            {btn?.btn_text && btnDesign === false && (
                <div data-id={item.id} className={`${styles.btn_desk_wrapper}`}>
                    {btnDesign === false && (
                        <GradientBtn
                            callback={() => btn.btn_fnc(item)}
                            size={{ height: 48 }}
                            data-id={item.id}>
                            <span
                                data-id={item.id}
                                className={`${styles.btn_text_style}`}>
                                {data.btn_text}
                            </span>
                        </GradientBtn>
                    )}
                </div>
            )}
            {btn?.btn_text && btnDesign === true && (
                <div data-id={item.id} className={`${styles.btn_desk_wrapper}`}>
                    {btnDesign === true && (
                        <TransparentBtn
                            callback={() => btn.btn_fnc(item)}
                            size={{ height: 48 }}>
                            <span
                                data-id={item.id}
                                className={`${styles.btn_text_style}`}>
                                {data.btn_text}
                            </span>
                        </TransparentBtn>
                    )}
                </div>
            )}
        </div>
    );
};

export default TableOrderBtn;
