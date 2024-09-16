import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Trans, t } from "@lingui/macro";
import PlugVideo from "../PlugVideo";

import styles from "../../styles/Howdelivery.module.scss";

let player = null;

const Howdelivery = ({ href, idPlayer }) => {
    const easy = useRef(null);
    let [howDelivery, setHowDelivery] = useState({ easy: true, manual: false });
    let [step, setStep] = useState(1);

    const stateModalFunnelMethodVideo = useSelector(
        state => state.royalfutReducer.modalFunnelMethodVideo
    );

    const a = () => {
        return (
            <div>
                <span>
                    <Trans>locales.pageCoinsToStart</Trans>
                </span>
                <a
                    href="https://myaccount.ea.com/cp-ui/security/index"
                    target="_blank"
                    rel="nofollow noreferrer">
                    {" "}
                    myaccount.ea.com.{" "}
                </a>
                <span>
                    <Trans>locales.unused</Trans>
                </span>
            </div>
        );
    };

    let deliveryData = {
        easy: {
            1: {
                title: t`locales.pageCoinsFill`,
                text: t`locales.pageCoinsAfter`,
            },
            2: {
                title: t`locales.pageCoinsFillBackup`,
                text: (
                    <div className={`${styles.txt_block}`}>
                        <span className={`${styles.span}`}>
                            <Trans>locales.pageCoinsToStart</Trans>{" "}
                        </span>
                        <a
                            className={`${styles.ahref}`}
                            href="https://myaccount.ea.com/cp-ui/security/index"
                            target="_blank"
                            rel="nofollow noreferrer">
                            {" "}
                            myaccount.ea.com.{" "}
                        </a>
                        <span className={`${styles.span}`}>
                            <Trans>locales.unused</Trans>
                        </span>
                    </div>
                ),
            },
            3: {
                title: t`locales.pageCoinsWaitCompletion`,
                text: t`locales.pageCoinsDoNotEnter`,
            },
            4: {
                title: t`locales.pageCoinsEnjoy`,
                text: (
                    <div className={`${styles.txt_block}`}>
                        <span className={`${styles.span}`}>
                            <Trans>locales.pageCoinsFeedback</Trans>{" "}
                        </span>
                        <a
                            className={`${styles.ahref}`}
                            href="https://trustpilot.com/evaluate/royalfut.com"
                            target="_blank"
                            rel="nofollow noreferrer">
                            <Trans>locales.trustcom</Trans>
                        </a>
                        <span className={`${styles.span}`}>
                            <Trans>locales.enjoy</Trans>
                        </span>
                    </div>
                ),
            },
        },
        manual: {
            1: {
                title: t`locales.pageCoinsBuyPlayer`,
                text: t`locales.pageCoinsAfterSuccessfully`,
            },
            2: {
                title: t`locales.pageCoinsConfirmPlayer`,
                text: t`locales.pageCoinsThenConfirm`,
            },
            3: {
                title: t`locales.pageCoinsRepeatUntil`,
                text: t`locales.pageCoinsFirstPart`,
            },
            4: {
                title: t`locales.pageCoinsEnjoy`,
                text: (
                    <div className={`${styles.txt_block}`}>
                        <span className={`${styles.span}`}>
                            <Trans>locales.pageCoinsFeedback</Trans>{" "}
                        </span>
                        <a
                            className={`${styles.ahref}`}
                            href="https://trustpilot.com/evaluate/royalfut.com"
                            target="_blank"
                            rel="nofollow noreferrer">
                            <Trans>locales.trustcom</Trans>
                        </a>
                        <span className={`${styles.span}`}>
                            <Trans>locales.enjoy</Trans>
                        </span>
                    </div>
                ),
            },
        },
    };

    useEffect(() => {
        function onYouTubeIframeAPIReady() {
            if (typeof YT != "undefined" && YT.Player) {
                player = new YT.Player(`${idPlayer}`, {
                    videoId: "tYVjCOjLlZQ",
                    playerVars: {
                        playsinline: 1,
                        // autoplay: 1,
                    },
                });
            }
        }
        if (typeof YT != "undefined" && YT.Player) {
            onYouTubeIframeAPIReady();
        } else {
            let interval = setInterval(() => {
                if (typeof YT != "undefined" && YT.Player) {
                    clearInterval(interval);
                }
                onYouTubeIframeAPIReady();
            }, 300);
        }
    }, []);

    useEffect(() => {
        if (howDelivery.manual && player?.seekTo) {
            if (step == 1) {
                player.seekTo(0, true);
            } else if (step == 2) {
                player.seekTo(57, true);
            } else if (step == 3) {
                player.seekTo(105, true);
            } else if (step == 4) {
                player.seekTo(114, true);
            }
        } else if (howDelivery.easy && player?.seekTo) {
            if (step == 1) {
                player.seekTo(0, true);
            } else if (step == 2) {
                player.seekTo(19, true);
            } else if (step == 3) {
                player.seekTo(39, true);
            } else if (step == 4) {
                player.seekTo(42, true);
            }
        }
    }, [step]);

    useEffect(() => {
        setStep(1);
        if (player?.loadVideoById) {
            if (howDelivery.manual) {
                player.loadVideoById("5IxIFgx_src");
            } else if (howDelivery.easy) {
                player.loadVideoById("tYVjCOjLlZQ");
            }
        }
    }, [howDelivery]);

    const onHandleClickTab = e => {
        if (e.target.id === "easy") {
            setHowDelivery({ easy: true, manual: false });
        } else {
            setHowDelivery({ easy: false, manual: true });
        }
    };
    const onHandleChangeStep = e => {
        let currStep = e.target.dataset.id == "-" ? step - 1 : step + 1;
        if (currStep === 5) {
            currStep = 1;
        }
        if (currStep === 0) {
            currStep = 4;
        }

        setStep(currStep);
    };
    return (
        <div
            id={href ? href : "deliveryMain"}
            className={`${styles.how_container} ${
                stateModalFunnelMethodVideo && styles.funnel_padding
            }`}>
            <div className={`${styles.how_title}`}>
                <Trans>locales.hwd</Trans>
            </div>
            <div className={`${styles.wrapper}`}>
                <div
                    id={`${idPlayer}`}
                    ref={easy}
                    className={`${styles.how_yt_wrapper}`}
                    autoPlay={1}>
                    <PlugVideo />
                </div>
                <div className={`${styles.how_container_content}`}>
                    <div className={`${styles.how_tabs_wrapper}`}>
                        <div className={`${styles.how_btn_wrapper}`}>
                            <button
                                onClick={onHandleClickTab}
                                id={"easy"}
                                type="button"
                                className={`${styles.how_tab} ${
                                    howDelivery.easy && styles.how_is_active
                                }`}
                                name="tab">
                                <Trans>locales.comfortMethodName</Trans>
                            </button>
                        </div>
                        <div className={`${styles.how_btn_wrapper}`}>
                            <button
                                onClick={onHandleClickTab}
                                id={"manual"}
                                type="button"
                                name="tab"
                                className={`${styles.how_tab} ${
                                    !howDelivery.easy && styles.how_is_active
                                }`}>
                                <Trans>locales.marketMethodName</Trans>
                            </button>
                        </div>
                    </div>
                    <div className={`${styles.how_container_text}`}>
                        <h2 className={`${styles.how_subtitle}`}>
                            {
                                deliveryData[
                                    howDelivery.easy ? "easy" : "manual"
                                ][step].title
                            }
                        </h2>
                        <div className={`${styles.how_step_text}`}>
                            {
                                deliveryData[
                                    howDelivery.easy ? "easy" : "manual"
                                ][step].text
                            }
                        </div>
                        <div
                            dir={"ltr"}
                            className={`${styles.how_btns_wrapper}`}>
                            <button
                                className={`${styles.how_step_btn}`}
                                data-id="-"
                                type="button"
                                name="step"
                                onClick={onHandleChangeStep}>
                                <img
                                    data-id="-"
                                    className={`${styles.how_step_img}`}
                                    alt="back"
                                    src="/img/arrow_circle_right.svg"></img>
                            </button>
                            <span
                                className={`${styles.how_step_num} ${styles.how_text}`}>
                                {step}
                            </span>
                            <span
                                className={`${styles.how_step_slash} ${styles.how_text}`}>
                                /
                            </span>
                            <span
                                className={`${styles.how_after_slash} ${styles.how_text}`}>
                                {4}
                            </span>
                            <button
                                className={`${styles.how_step_btn}`}
                                data-id="+"
                                type="button"
                                name="plus"
                                onClick={onHandleChangeStep}>
                                <img
                                    data-id="+"
                                    className={`${styles.how_step_img} ${styles.how_step_img_transform}`}
                                    alt="front"
                                    src="/img/arrow_circle_right.svg"></img>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Howdelivery;
