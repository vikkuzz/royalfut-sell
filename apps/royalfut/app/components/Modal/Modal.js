"use client";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import InputChecker from "../../../components/InputChecker/InputChecker";
import ChangeAvatar from "../../../components/ChangeAvatar/ChangeAvatar";
import ChangePassword from "../../../components/ChangePassword/ChangePassword";
import {
    loginModal,
    modalAva,
    modalCalc,
    modalFunnelCalc,
    modalFunnelMethod,
    modalFunnelMethodVideo,
    modalFunnelProcess,
    modalIframe,
    modalLoyalty,
    modalPassword,
    modalRedirect,
    modalTimer,
} from "../../../redux/actions/royalfutActions";
import GradientBtn from "../../../components/GradientBtn/GradientBtn";
// import { useRouter } from 'next/router';
// import { Trans } from '@lingui/macro';
import RedirectModal from "../../../components/RedirectModal";
import ModalTimer from "../../../components/ModalTimer";
import CoinsChanger from "../../../components/Order/CoinsChanger";
import PriceCurrency from "../../../components/Package/PriceCurrency";
import ModalLoyaltyComponent from "../../../components/LoyaltyProgram/ModalLoyaltyComponent";

import styles from "../../../styles/App.module.scss";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

const Modal = ({ locale }) => {
    const t = useTranslations("modal");
    const modal = useRef(null);
    const wrapper = useRef(null);

    const dispatch = useDispatch();

    const pathname = usePathname();
    const stateModalCalc = useSelector(
        state => state.royalfutReducer.modalCalc
    );
    const stateModalLoyalty = useSelector(
        state => state.royalfutReducer.modalLoyalty
    );
    const stateModalFunnelCalc = useSelector(
        state => state.royalfutReducer.modalFunnelCalc
    );
    const stateModalFunnelMethodVideo = useSelector(
        state => state.royalfutReducer.modalFunnelMethodVideo
    );
    const stateModalFunnelProcess = useSelector(
        state => state.royalfutReducer.modalFunnelProcess
    );
    const stateModalPassword = useSelector(
        state => state.royalfutReducer.modalPassword
    );
    const stateModalAva = useSelector(state => state.royalfutReducer.modalAva);
    const stateUndisabled = useSelector(
        state => state.royalfutReducer.undisabled
    );
    const stateModalIframe = useSelector(
        state => state.royalfutReducer.modalIframe
    );
    const stateModalRedirect = useSelector(
        state => state.royalfutReducer.modalRedirect
    );
    const stateModalTimer = useSelector(
        state => state.royalfutReducer.modalTimer
    );

    const isOutsideClick = (event, ref) => {
        if (!ref.current.contains(event.target) && modal) {
            dispatch(loginModal(false));
        }
        if (
            !ref.current.contains(event.target) &&
            stateModalFunnelMethodVideo
        ) {
            dispatch(modalFunnelMethodVideo(false));
        }
        if (!ref.current.contains(event.target) && stateModalFunnelProcess) {
            dispatch(modalFunnelProcess(false));
        }
        if (!ref.current.contains(event.target) && stateModalFunnelCalc) {
            dispatch(modalFunnelCalc(false));
        }
        if (!ref.current.contains(event.target) && stateModalCalc) {
            dispatch(modalCalc(false));
        }
        if (!ref.current.contains(event.target) && stateModalPassword) {
            dispatch(modalPassword(false));
        }
        if (!ref.current.contains(event.target) && stateModalAva) {
            dispatch(modalAva(false));
        }
        if (!ref.current.contains(event.target) && stateModalRedirect) {
            dispatch(modalRedirect(false));
        }
        if (!ref.current.contains(event.target) && stateModalTimer) {
            localStorage.setItem("modalTimer", false);
            dispatch(modalTimer(false));
        }
        if (!ref.current.contains(event.target) && stateModalIframe) {
            dispatch(modalIframe(false));
        }
        if (!ref.current.contains(event.target) && stateModalLoyalty) {
            dispatch(modalLoyalty(false));
        }
    };

    const [esc, setEsc] = useState(0);
    const [link, setLink] = useState("");

    useEffect(() => {
        setLink(stateModalIframe.link);
    }, [stateModalIframe?.link]);

    useEffect(() => {
        if (stateModalFunnelMethodVideo) {
            dispatch(modalFunnelMethodVideo(false));
        }
        if (stateModalFunnelCalc) {
            dispatch(modalFunnelCalc(false));
        }
        if (stateModalCalc) {
            dispatch(modalCalc(false));
        }
    }, [esc]);

    useEffect(() => {
        function currentBlockStyling(arr) {
            const someTrue = element => element === true;
            if (arr.some(someTrue)) {
                setTimeout(() => {
                    if (modal?.current) {
                        modal.current.classList.add(styles.show_modal);
                    }
                }, 0);
            } else {
                setTimeout(() => {
                    if (modal?.current) {
                        modal.current.classList.remove(styles.show_modal);
                    }
                }, 0);
            }
        }
        currentBlockStyling([
            stateModalPassword,
            stateModalAva,
            stateModalFunnelMethodVideo,
        ]);
    }, [stateModalPassword, stateModalAva, stateModalFunnelMethodVideo]);

    const confirmEditCalcFunnel = () => {
        dispatch(modalFunnelCalc(false));
    };

    return (
        <div
            className={`${
                stateModalFunnelCalc ||
                stateModalFunnelMethodVideo ||
                stateModalFunnelProcess ||
                stateModalPassword ||
                stateModalIframe?.show ||
                stateModalAva ||
                stateModalRedirect ||
                stateModalTimer ||
                stateModalCalc ||
                stateModalLoyalty
                    ? styles.blur
                    : "hide"
            }`}>
            {stateModalCalc && (
                <div
                    className={`${styles.calc_page} for_scroll_off ${stateModalCalc === true && "zindex"}`}
                    ref={modal}
                    onClick={e => {
                        isOutsideClick(e, wrapper);
                    }}>
                    <div
                        ref={wrapper}
                        className={`${styles.modal_calc_wrapper} ${styles.background_modal} ${
                            stateModalCalc === true
                                ? styles.modal_calc_true
                                : styles.modal_calc_false
                        }`}>
                        <div className={`${styles.btn_close_wrapper}`}>
                            <button
                                onClick={() => dispatch(modalCalc(false))}
                                className={`${styles.modal_calc_btn_close}`}></button>
                        </div>
                        <h2 className={`${styles.coins_modal_h2}`}>
                            {/* <Trans>mainblocks10</Trans> */}
                            {t("mainblocks10")}
                        </h2>

                        <div className={`${styles.coins_changer_wrapper}`}>
                            <CoinsChanger title={false} />
                        </div>
                        <div className={`${styles.coins_price_wrapper}`}>
                            <PriceCurrency />
                        </div>

                        <div className={`${styles.buy_btn_wrapper}`}>
                            <GradientBtn
                                size={{ height: 64 }}
                                callback={() => dispatch(modalCalc(false))}>
                                <span className={`${styles.text_buy}`}>
                                    {/* <Trans>seo108</Trans> */}
                                    {t("seo108")}
                                </span>
                            </GradientBtn>
                        </div>
                    </div>
                </div>
            )}
            {stateModalFunnelCalc && (
                <div
                    className={`${styles.calc_page} ${styles.calc_funnel_page} for_scroll_off ${
                        stateModalFunnelCalc === true && "zindex"
                    }`}
                    ref={modal}
                    onClick={e => {
                        isOutsideClick(e, wrapper);
                    }}>
                    <div
                        ref={wrapper}
                        className={`${styles.modal_funnel_calc_wrapper} ${
                            stateModalFunnelCalc === true
                                ? styles.modal_calc_true
                                : styles.modal_calc_false
                        }`}>
                        <div className={`${styles.btn_close_wrapper}`}>
                            <button
                                onClick={() => dispatch(modalFunnelCalc(false))}
                                className={`${styles.modal_calc_btn_close}`}></button>
                        </div>
                        <div className={`${styles.buy_btn_wrapper}`}>
                            <GradientBtn
                                callback={confirmEditCalcFunnel}
                                size={{ height: 64, width: 260 }}>
                                <span className={`${styles.text_buy}`}>
                                    {/* <Trans>seo108</Trans> */}
                                    {t("seo108")}
                                </span>
                            </GradientBtn>
                        </div>
                    </div>
                </div>
            )}
            {stateModalRedirect && (
                <div
                    className={`${styles.calc_page} ${styles.calc_funnel_page} for_scroll_off ${
                        stateModalRedirect === true && "zindex"
                    }`}
                    ref={modal}
                    onClick={e => {
                        isOutsideClick(e, wrapper);
                    }}>
                    <div
                        ref={wrapper}
                        className={`${styles.modal_funnel_calc_wrapper} ${
                            stateModalRedirect === true
                                ? styles.modal_calc_true
                                : styles.modal_calc_false
                        }`}>
                        <div className={`${styles.btn_close_wrapper}`}>
                            <button
                                onClick={() => dispatch(modalRedirect(false))}
                                className={`${styles.modal_calc_btn_close}`}></button>
                        </div>
                        <RedirectModal />
                        <div className={`${styles.buy_btn_wrapper}`}>
                            <Link
                                href={
                                    "https://sbcsolver.com/?referrer=k4q3g74nytsdhb9epoc1mk4x"
                                }
                                rel="nofollow"
                                target="_blank"
                                className="center">
                                <GradientBtn size={{ height: 64, width: 260 }}>
                                    <span className={`${styles.text_buy}`}>
                                        {/* <Trans>a131</Trans> */}
                                        {t("a131")}
                                    </span>
                                </GradientBtn>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
            {stateModalTimer && (
                <div
                    className={`${styles.calc_page} ${styles.calc_funnel_page} for_scroll_off ${
                        stateModalTimer === true && "zindex"
                    }`}
                    ref={modal}
                    onClick={e => {
                        isOutsideClick(e, wrapper);
                    }}>
                    <div
                        ref={wrapper}
                        className={`${styles.modal_funnel_calc_wrapper} ${
                            stateModalTimer === true
                                ? styles.modal_calc_true
                                : styles.modal_calc_false
                        }`}>
                        <div className={`${styles.btn_close_wrapper}`}>
                            <button
                                onClick={() => {
                                    localStorage.setItem("modalTimer", false);
                                    dispatch(modalTimer(false));
                                }}
                                className={`${styles.modal_calc_btn_close}`}></button>
                        </div>
                        <ModalTimer />
                    </div>
                </div>
            )}
            {stateModalLoyalty && (
                <div
                    className={`${styles.calc_page} ${styles.calc_funnel_page} for_scroll_off ${
                        stateModalLoyalty === true && "zindex"
                    }`}
                    ref={modal}
                    onClick={e => {
                        isOutsideClick(e, wrapper);
                    }}>
                    <div
                        ref={wrapper}
                        className={`${styles.modal_funnel_calc_wrapper} ${styles.no_overflow} ${
                            styles.custom_height
                        } ${stateModalLoyalty === true ? styles.modal_calc_true : styles.modal_calc_false}`}>
                        <div className={`${styles.btn_close_wrapper}`}>
                            <button
                                onClick={() => {
                                    dispatch(modalLoyalty(false));
                                }}
                                className={`${styles.modal_calc_btn_close}`}></button>
                        </div>
                        <ModalLoyaltyComponent locale={locale} />
                    </div>
                </div>
            )}
            {stateModalPassword && (
                <div
                    className={`${styles.calc_page} ${styles.method_funnel_page} ${
                        stateModalPassword === true && `zindex`
                    }`}
                    ref={modal}
                    onClick={e => {
                        isOutsideClick(e, wrapper);
                    }}>
                    <div
                        ref={wrapper}
                        className={`${styles.modal_funnel_calc_wrapper} ${styles.password_modal} ${
                            stateModalPassword === true
                                ? styles.modal_calc_true
                                : styles.modal_calc_false
                        }`}>
                        <div className={`${styles.btn_close_wrapper}`}>
                            <button
                                onClick={() => dispatch(modalPassword(false))}
                                className={`${styles.modal_calc_btn_close}`}></button>
                        </div>
                        <ChangePassword />
                    </div>
                </div>
            )}
            {stateModalIframe?.show && (
                <div
                    className={`${styles.calc_page} ${stateModalIframe?.show === true && `zindex`}`}
                    ref={modal}
                    onClick={e => {
                        isOutsideClick(e, wrapper);
                    }}>
                    <div
                        ref={wrapper}
                        className={`${styles.modal_iframe_wrapper}`}>
                        <div className={`${styles.btn_close_wrapper}`}>
                            <button
                                onClick={() => dispatch(modalIframe(false))}
                                className={`${styles.modal_calc_btn_close}`}></button>
                        </div>
                        <iframe
                            className={`${styles.tableorder_iframe}`}
                            src={stateModalIframe.link}></iframe>
                    </div>
                </div>
            )}
            {stateModalAva === true && (
                <div
                    className={`${styles.calc_page} ${styles.method_funnel_page} ${
                        stateModalAva === true && `zindex`
                    }`}
                    ref={modal}
                    onClick={e => {
                        isOutsideClick(e, wrapper);
                    }}>
                    <div
                        ref={wrapper}
                        className={`${styles.modal_funnel_calc_wrapper} ${styles.password_modal} ${
                            stateModalAva === true
                                ? styles.modal_calc_true
                                : styles.modal_calc_false
                        }`}>
                        <div className={`${styles.btn_close_wrapper}`}>
                            <button
                                onClick={() => dispatch(modalAva(false))}
                                className={`${styles.modal_calc_btn_close}`}></button>
                        </div>
                        <ChangeAvatar />
                    </div>
                </div>
            )}

            {stateModalFunnelProcess && (
                <div
                    ref={modal}
                    className={`${styles.calc_page} 
                    
                     ${stateModalFunnelProcess === true && `zindex`}`}
                    onClick={e => {
                        isOutsideClick(e, wrapper);
                    }}>
                    <div
                        ref={wrapper}
                        className={`${styles.modal_funnel_method_wrapper} ${
                            stateModalFunnelProcess === true
                                ? styles.modal_calc_true
                                : styles.modal_calc_false
                        }`}>
                        <div className={`${styles.btn_close_wrapper}`}>
                            <button
                                onClick={() =>
                                    dispatch(modalFunnelProcess(false))
                                }
                                className={`${styles.modal_calc_btn_close}`}></button>
                        </div>
                        <div className={`${styles.wrapper_attention}`}>
                            <div className={`${styles.title_text}`}>
                                <h2 className={`${styles.attention_h}`}>
                                    {/* <Trans>seo103</Trans> */}
                                    {t("seo103")}
                                </h2>
                                <span className={`${styles.attention_text}`}>
                                    {/* <Trans>seo104</Trans> */}
                                    {t("seo104")}
                                </span>
                            </div>
                            <InputChecker classStyle="purchase" />
                        </div>

                        <div className={`${styles.buy_btn_wrapper}`}>
                            <button
                                onClick={() => {
                                    modal?.current?.classList.add(
                                        styles.translate100
                                    );
                                    setTimeout(() => {
                                        dispatch(modalFunnelProcess(false));
                                        modal?.current?.classList.remove(
                                            styles.translate100
                                        );
                                    }, 400);
                                }}
                                className={`${styles.btn_modal_purchase} ${
                                    !stateUndisabled && styles.disabled
                                }`}
                                disabled={stateUndisabled ? false : true}>
                                {/* <Trans>seo108</Trans> */}
                                {t("seo108")}
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {stateModalFunnelMethodVideo && (
                <div
                    ref={modal}
                    className={`${styles.calc_page} ${styles.method_funnel_page} ${
                        stateModalFunnelMethodVideo === true && `zindex`
                    }`}
                    onClick={e => {
                        isOutsideClick(e, wrapper);
                    }}>
                    <div
                        ref={wrapper}
                        className={`${styles.modal_funnel_method_wrapper} ${styles.modal_calc_funnel_video} ${
                            stateModalFunnelMethodVideo === true
                                ? styles.modal_calc_true
                                : styles.modal_calc_false
                        }`}>
                        <div className={`${styles.btn_close_wrapper}`}>
                            <button
                                onClick={() => {
                                    modal.current.classList.add(
                                        styles.translate100
                                    );
                                    dispatch(modalFunnelMethodVideo(false));
                                }}
                                className={`${styles.modal_calc_btn_close}`}></button>
                        </div>

                        <div className={`${styles.buy_btn_wrapper}`}>
                            <GradientBtn
                                callback={() => {
                                    if (pathname.includes("faq")) {
                                        dispatch(modalFunnelMethodVideo(false));
                                    } else {
                                        modal.current.classList.add(
                                            styles.translate100
                                        );
                                        dispatch(modalFunnelMethodVideo(false));
                                        dispatch(modalFunnelMethod(true));
                                    }
                                }}
                                size={{ height: 64, width: 260 }}>
                                <span className={`${styles.text_buy}`}>
                                    {/* <Trans>a2</Trans> */}
                                    {t("a2")}
                                </span>
                            </GradientBtn>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Modal;
