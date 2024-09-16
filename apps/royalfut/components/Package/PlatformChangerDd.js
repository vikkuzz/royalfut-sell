import Image from "next/legacy/image";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePlatform } from "../../redux/actions/royalfutActions";

import styles from "./PlatformChangerDd.module.scss";
import { useWindowDimensions } from "../../utils/hooks";
import { orderPlatform } from "../../redux/actions/royalfutOrderActions";

const PlatformChangerDd = () => {
    const dd_container = useRef(null);
    const dd = useRef(null);
    const dd_arrow = useRef(null);
    const ps_btn = useRef(null);
    const xbox_btn = useRef(null);
    const pc_btn = useRef(null);
    const dispatch = useDispatch();
    const statePlatform = useSelector(state => state.royalfutReducer.platform);
    const [activePlatform, setActivePlatform] = useState("PlayStation");
    const [activePlatformIcon, setActivePlatformIcon] =
        useState("/img/ps_icon.svg");

    const { width, height } = useWindowDimensions();

    const rotateArrow = () => {
        if (width <= 1024) {
            let varStyle = styles.content_active ?? styles.hide_block;
            if (!dd.current.classList.contains(varStyle)) {
                dd_arrow.current.style.transform = "rotate(0deg)";
            } else {
                dd_arrow.current.style.transform = "rotate(180deg)";
            }
        }
    };

    const timedHideBlock = () => {
        if (width > 1024) {
            dd.current.classList.add(styles.hide_block);
            setTimeout(
                () => dd.current.classList.remove(styles.hide_block),
                1000
            );
        } else {
            dd.current.classList.toggle(styles.content_active);
        }
        rotateArrow();
    };

    const handlePlClick = e => {
        if (e.target.dataset.id == 1) {
            dispatch(changePlatform("ps"));
        } else if (e.target.dataset.id == 2) {
            dispatch(changePlatform("xbox"));
        } else if (e.target.dataset.id == 3) {
            dispatch(changePlatform("pc"));
        }
        timedHideBlock();
        rotateArrow();
    };

    useEffect(() => {
        const handleClick = e => {
            if (!e.target.closest(".dd_container")) {
                dd.current.classList.remove(styles.content_active);
                rotateArrow();
            }
        };

        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, [statePlatform]);

    useEffect(() => {
        if (statePlatform.ps === true) {
            setActivePlatform("PlayStation");
            setActivePlatformIcon("/img/ps_icon.svg");
            dispatch(orderPlatform("ps"));
        }
        if (statePlatform.xbox) {
            setActivePlatform("Xbox");
            setActivePlatformIcon("/img/xbox_icon.svg");
            dispatch(orderPlatform("xbox"));
        }
        if (statePlatform.pc) {
            setActivePlatform("PC");
            setActivePlatformIcon("/img/Origin.svg");
            dispatch(orderPlatform("pc"));
        }
    }, [statePlatform]);
    return (
        <div className={`${styles.container_dd} dd_container`}>
            <button
                className={`${styles.dd_active_btn}`}
                ref={dd_container}
                onClick={handlePlClick}
                // onClick={width < 1024 ? removeHideClass : console.log('')}
            >
                <div className={`${styles.active_img_wrapper}`}>
                    <Image
                        width={24}
                        height={24}
                        src={activePlatformIcon}></Image>
                </div>
                <span className={`${styles.dd_active_text}`}>
                    {activePlatform}
                </span>
                <div className={`${styles.arrow_wrapper}`} ref={dd_arrow}>
                    <Image
                        width={24}
                        height={24}
                        src={"/img/arrow_drop_down.svg"}
                    />
                </div>
            </button>
            <div className={`${styles.gap}`}></div>
            <div className={`${styles.container_content_dd}`} ref={dd}>
                <button
                    onClick={handlePlClick}
                    className={`${styles.platform_btn} `}
                    data-id={1}
                    ref={ps_btn}>
                    <div className={`${styles.img_wrapper}`} data-id={1}>
                        <Image
                            width={24}
                            height={24}
                            src={"/img/ps_icon.svg"}
                            data-id={1}
                        />
                    </div>
                    PlayStation
                    <div
                        data-id={1}
                        className={`${styles.fake_radio} ${styles.no_select}`}>
                        <img
                            data-id={1}
                            alt="coins"
                            className={`${styles.radio_pic} ${styles.no_select}`}
                            src={
                                activePlatform === "PlayStation"
                                    ? "/img/radio_active.svg"
                                    : "/img/radio_not_active.svg"
                            }></img>
                    </div>
                </button>
                <button
                    onClick={handlePlClick}
                    className={`${styles.platform_btn} `}
                    data-id={2}
                    ref={xbox_btn}>
                    <div className={`${styles.img_wrapper}`} data-id={2}>
                        <Image
                            width={24}
                            height={24}
                            src={"/img/xbox_icon.svg"}
                            data-id={2}
                        />
                    </div>
                    Xbox
                    <div
                        data-id={2}
                        className={`${styles.fake_radio} ${styles.no_select}`}>
                        <img
                            data-id={2}
                            alt="coins"
                            className={`${styles.radio_pic} ${styles.no_select}`}
                            src={
                                activePlatform === "Xbox"
                                    ? "/img/radio_active.svg"
                                    : "/img/radio_not_active.svg"
                            }></img>
                    </div>
                </button>
                <button
                    onClick={handlePlClick}
                    className={`${styles.platform_btn} `}
                    data-id={3}
                    ref={pc_btn}>
                    <div className={`${styles.img_wrapper}`} data-id={3}>
                        <Image
                            width={24}
                            height={24}
                            src={"/img/Origin.svg"}
                            data-id={3}
                        />
                    </div>
                    PC
                    <div
                        data-id={3}
                        className={`${styles.fake_radio} ${styles.no_select}`}>
                        <img
                            data-id={3}
                            alt="coins"
                            className={`${styles.radio_pic} ${styles.no_select}`}
                            src={
                                activePlatform === "PC"
                                    ? "/img/radio_active.svg"
                                    : "/img/radio_not_active.svg"
                            }></img>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default PlatformChangerDd;
