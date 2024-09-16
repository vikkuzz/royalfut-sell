import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spin } from "antd";
// import { Trans, t } from "@lingui/macro";
import api from "../../Api/Api";
import {
    modalPassword,
    showMessage,
    user,
} from "../../redux/actions/royalfutActions";

import styles from "../../styles/TableOrders.module.scss";
import { useTranslations } from "next-intl";

const ChangePassword = () => {
    const t = useTranslations("modal");
    const eye = "/img/eyeRd.svg";
    const eyeClosed = "/img/eye-closedRd.svg";
    const dispatch = useDispatch();
    const stateUser = useSelector(state => state.royalfutReducer.user);
    const stateLocale = useSelector(
        state => state.royalfutLocaleReducer.locale
    );

    const defaultInputs = {
        currPass: "",
        newPass: "",
        confirmPass: "",
    };
    const defaultStatusReq = {
        pending: false,
        fullfield: false,
        rejected: false,
    };

    const confirmNewfieldsetPasswordRef = useRef(null);
    const newfieldsetPasswordRef = useRef(null);
    const fieldsetPasswordRef = useRef(null);
    const password = useRef(null);
    const password1 = useRef(null);
    const password2 = useRef(null);

    const [wrongPassBtn, setWrongPassBtn] = useState(false);
    const [svgEye, setSvgEye] = useState(eye);
    const [inputsValid, setInputsValid] = useState({ ...defaultInputs });
    const [passIsChanged, setPassIsChanged] = useState(false);
    const [statusReq, setStatusReq] = useState(defaultStatusReq);

    const onHandleClickViewPass = e => {
        e.stopPropagation();
        e.preventDefault();
        if (password.current.type == "text") {
            password.current.type = "password";
            setSvgEye(eye);
        } else {
            password.current.type = "text";
            setSvgEye(eyeClosed);
        }
        if (password1.current.type == "text") {
            password1.current.type = "password";
            setSvgEye(eye);
        } else {
            password1.current.type = "text";
            setSvgEye(eyeClosed);
        }
        if (password2.current.type == "text") {
            password2.current.type = "password";
            setSvgEye(eye);
        } else {
            password2.current.type = "text";
            setSvgEye(eyeClosed);
        }
    };

    const onChangePass = e => {
        setInputsValid(prev => {
            return { ...prev, [e.target.dataset.id]: e.target.value };
        });
    };
    const getNotify = () => {
        dispatch(
            showMessage({
                status: "info",
                text: `Password changed successfully`,
            })
        );
    };

    const getError = err => {
        dispatch(showMessage({ status: "error", text: `${err}` }));
    };

    const sendChangePass = () => {
        let obj = {
            user: {
                image: "",
                userLocale: stateLocale?.title,
                region: stateLocale?.title.toUpperCase(),
                origin: {},
                email: stateUser?.email,
                password: password2.current.value,
            },
        };
        setStatusReq({
            pending: true,
            fullfield: false,
            rejected: false,
        });
        api.updateProfile(stateUser?.token, obj, getError).then(res => {
            if (res.user) {
                setPassIsChanged(true);
                setTimeout(() => setPassIsChanged(false), 3000);
                dispatch(modalPassword(false));
                dispatch(user(res.user));
                getNotify();
            }
        });
    };

    const padding = {
        ["padding-right"]: `${inputsValid?.currPass.length > 0 ? 50 : 0}px`,
        border: "1px solid rgba(255,255,255,0.6)",
    };

    const activeInput = e => {
        if (e.target.dataset.id == "currPass") {
            fieldsetPasswordRef.current.style.border = "1px solid #8852F2";
        }
        if (e.target.dataset.id == "newPass") {
            newfieldsetPasswordRef.current.style.border = "1px solid #8852F2";
        }
        if (e.target.dataset.id == "confirmPass") {
            confirmNewfieldsetPasswordRef.current.style.border =
                "1px solid #8852F2";
        }
    };
    const blurInput = e => {
        if (e.target.dataset.id == "currPass") {
            fieldsetPasswordRef.current.style.border =
                "1px solid rgba(255,255,255,0.6)";
        }
        if (e.target.dataset.id == "newPass") {
            newfieldsetPasswordRef.current.style.border =
                "1px solid rgba(255,255,255,0.6)";
        }
        if (e.target.dataset.id == "confirmPass") {
            confirmNewfieldsetPasswordRef.current.style.border =
                "1px solid rgba(255,255,255,0.6)";
        }
    };

    return (
        <div className={`${styles.container}`}>
            <h2 className={`${styles.h}`}>
                {/* <Trans>a1</Trans> */}
                {t("a1")}
            </h2>
            <div className={`${styles.wrapper_pass_inputs}`}>
                <div className={`${styles.curr_pass_wrapper}`}>
                    <h4 className={`${styles.title}`}>
                        {/* <Trans>seo110</Trans> */}
                        {t("seo110")}
                    </h4>

                    <div
                        ref={fieldsetPasswordRef}
                        className={`${styles.prof_comp_fieldset} ${styles.fieldset_pass} ${
                            inputsValid?.currPass != stateUser.password &&
                            inputsValid?.currPass.length > 0 &&
                            styles.red_borders
                        }`}
                        style={padding}
                        onClick={activeInput}>
                        <input
                            ref={password1}
                            data-id={"currPass"}
                            className={`${styles.prof_comp_userdata}`}
                            type="password"
                            placeholder={t(`seo110`)}
                            onChange={e => {
                                setWrongPassBtn(false);
                                onChangePass(e);
                            }}
                            onBlur={blurInput}></input>
                        {inputsValid?.currPass.length > 0 && (
                            <button
                                onClick={onHandleClickViewPass}
                                className={styles.prof_comp_view_pass}
                                type="button"
                                tabIndex={-1}
                                name="show">
                                <img alt="eye" src={svgEye} />
                            </button>
                        )}
                        {inputsValid?.currPass != stateUser.password &&
                            inputsValid?.currPass.length > 0 && (
                                <img
                                    className={`${styles.warning_icon}`}
                                    src="/img/warning_circle.svg"
                                    alt="warning"></img>
                            )}
                    </div>
                </div>
                <div className={`${styles.wrapper_newpass_inputs}`}>
                    <div className={`${styles.curr_pass_wrapper}`}>
                        <h4 className={`${styles.title}`}>
                            {/* <Trans>seo111</Trans> */}
                            {t("seo111")}
                        </h4>

                        <div
                            ref={newfieldsetPasswordRef}
                            className={`${styles.prof_comp_fieldset} ${styles.fieldset_pass}`}
                            style={padding}
                            onClick={activeInput}>
                            <input
                                data-id={"newPass"}
                                ref={password2}
                                className={styles.prof_comp_userdata}
                                type="password"
                                placeholder={t(`seo111`)}
                                onChange={e => {
                                    setWrongPassBtn(false);
                                    onChangePass(e);
                                }}
                                onBlur={blurInput}></input>
                            {inputsValid.newPass.length > 0 && (
                                <button
                                    onClick={onHandleClickViewPass}
                                    className={styles.prof_comp_view_pass}
                                    type="button"
                                    tabIndex={-1}
                                    name="show">
                                    <img alt="eye" src={svgEye} />
                                </button>
                            )}
                            {wrongPassBtn && (
                                <img
                                    className={`${styles.warning_icon}`}
                                    src="/img/warning_circle.svg"></img>
                            )}
                        </div>
                        {inputsValid.newPass.length > 0 &&
                            inputsValid.newPass.length < 8 && (
                                <span className={`${styles.message_password}`}>
                                    {/* <Trans>locales.modalSignSymbols8</Trans> */}
                                    {t("modalSignSymbols8")}
                                </span>
                            )}
                    </div>
                    <div className={`${styles.curr_pass_wrapper}`}>
                        <h4 className={`${styles.title}`}>
                            {/* <Trans>seo112</Trans> */}
                            {t("seo112")}
                        </h4>

                        <div
                            ref={confirmNewfieldsetPasswordRef}
                            className={`${styles.prof_comp_fieldset} ${styles.fieldset_pass}`}
                            style={padding}
                            onClick={activeInput}>
                            <input
                                data-id={"confirmPass"}
                                ref={password}
                                className={styles.prof_comp_userdata}
                                type="password"
                                placeholder={t(`seo112`)}
                                onChange={e => {
                                    setWrongPassBtn(false);
                                    onChangePass(e);
                                }}
                                onBlur={blurInput}></input>
                            {inputsValid.confirmPass.length > 0 && (
                                <button
                                    onClick={onHandleClickViewPass}
                                    className={styles.prof_comp_view_pass}
                                    type="button"
                                    name="show"
                                    tabIndex={-1}>
                                    <img alt="eye" src={svgEye} />
                                </button>
                            )}
                            {wrongPassBtn && (
                                <img
                                    alt="warning"
                                    className={`${styles.warning_icon}`}
                                    src="/img/warning_circle.svg"></img>
                            )}
                        </div>
                        {inputsValid.newPass != inputsValid.confirmPass && (
                            <span className={`${styles.message_password}`}>
                                {/* <Trans>seo113</Trans> */}
                                {t("seo113")}
                            </span>
                        )}
                    </div>
                </div>
            </div>
            <div className={`${styles.buy_btn_wrapper}`}>
                <button
                    type="button"
                    name="change"
                    onClick={sendChangePass}
                    className={`${styles.buy_btn} ${
                        (inputsValid?.currPass != stateUser.password ||
                            inputsValid.newPass == "" ||
                            inputsValid.newPass != inputsValid.confirmPass) &&
                        styles.disable
                    }`}
                    disabled={
                        inputsValid?.currPass != stateUser.password ||
                        inputsValid.newPass == "" ||
                        inputsValid.newPass != inputsValid.confirmPass
                    }>
                    {statusReq.pending ? (
                        <Spin />
                    ) : (
                        // <Trans>seo112</Trans>
                        t("seo112")
                    )}
                </button>
            </div>
        </div>
    );
};

export default ChangePassword;
