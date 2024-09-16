import React, { useEffect, useState } from "react";

import styles from "./PlatformChanger.module.scss";
import Image from "next/legacy/image";
import { useDispatch, useSelector } from "react-redux";
import { changePlatform } from "../../redux/actions/royalfutActions";
import { orderPlatform } from "../../redux/actions/royalfutOrderActions";

const PlatformChanger = ({ small, heightWidth }) => {
    const dispatch = useDispatch();
    const statePlatform = useSelector(state => state.royalfutReducer.platform);
    const [activePlatform, setActivePlatform] = useState(1);
    const handlePlClick = e => {
        // setActivePlatform(e.target.dataset.id);
        if (e.target.dataset.id == 1) {
            dispatch(changePlatform("ps"));
            dispatch(orderPlatform("ps"));
        }
        if (e.target.dataset.id == 2) {
            dispatch(changePlatform("xbox"));
            dispatch(orderPlatform("xbox"));
        }
        if (e.target.dataset.id == 3) {
            dispatch(changePlatform("pc"));
            dispatch(orderPlatform("pc"));
        }
    };

    useEffect(() => {
        if (statePlatform.ps) {
            setActivePlatform(1);
        }
        if (statePlatform.xbox) {
            setActivePlatform(2);
        }
        if (statePlatform.pc) {
            setActivePlatform(3);
        }
    }, [statePlatform]);

    useEffect(() => {
        if (statePlatform.ps) {
            dispatch(orderPlatform("ps"));
        }
        if (statePlatform.xbox) {
            dispatch(orderPlatform("xbox"));
        }
        if (statePlatform.pc) {
            dispatch(orderPlatform("pc"));
        }
    }, []);

    return (
        <div
            className={`${styles.container}`}
            style={{ width: `${heightWidth?.width}px` }}>
            <button
                onClick={handlePlClick}
                className={`${styles.platform_btn} ${
                    activePlatform == 1 && styles.platform_btn_active
                } ${small && styles.small}`}
                data-id={1}
                style={{ height: `${heightWidth?.height}px` }}>
                <div className={`${styles.img_wrapper}`} data-id={1}>
                    <Image
                        width={24}
                        height={24}
                        src={"/img/ps_icon.svg"}
                        data-id={1}
                    />
                </div>
                PlayStation
            </button>
            <button
                onClick={handlePlClick}
                className={`${styles.platform_btn} ${
                    activePlatform == 2 && styles.platform_btn_active
                } ${small && styles.small}`}
                data-id={2}
                style={{ height: `${heightWidth?.height}px` }}>
                <div className={`${styles.img_wrapper}`} data-id={2}>
                    <Image
                        width={24}
                        height={24}
                        src={"/img/xbox_icon.svg"}
                        data-id={2}
                    />
                </div>
                Xbox
            </button>
            <button
                onClick={handlePlClick}
                className={`${styles.platform_btn} ${
                    activePlatform == 3 && styles.platform_btn_active
                } ${small && styles.small}`}
                data-id={3}
                style={{ height: `${heightWidth?.height}px` }}>
                <div className={`${styles.img_wrapper}`} data-id={3}>
                    <Image
                        width={24}
                        height={24}
                        src={"/img/Origin.svg"}
                        data-id={3}
                    />
                </div>
                PC
            </button>
        </div>
    );
};

export default PlatformChanger;
