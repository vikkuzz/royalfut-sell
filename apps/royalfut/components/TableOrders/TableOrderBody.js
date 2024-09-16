"use client";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Trans, t } from '@lingui/macro';
import api from "../../Api/Api";
import { getAllOrders, showMessage } from "../../redux/actions/royalfutActions";
import { useWindowDimensions } from "../../utils/hooks";

import styles from "../../styles/TableOrders.module.scss";
import { useTranslations } from "next-intl";

const TableOrderBody = ({ item, orderOpen, data }) => {
    const stateUser = useSelector(state => state.royalfutReducer.user);

    const fieldsetBackupRef = useRef(null);
    const fieldsetEmailRef = useRef(null);
    const fieldsetPasswordRef = useRef(null);
    const codesLabelRef = useRef(null);
    const wrapperCodesRef = useRef(null);

    const password = useRef(null);
    const email = useRef(null);
    const codes = useRef(null);

    const eye = "/img/eyeRd.svg";
    const eyeClosed = "/img/eye-closedRd.svg";
    const defaultCurrentCode = [
        { text: "", id: 0 },
        { text: "", id: 1 },
        { text: "", id: 2 },
        { text: "", id: 3 },
        { text: "", id: 4 },
        { text: "", id: 5 },
        { text: "", id: 6 },
        { text: "", id: 7 },
    ];

    const { width } = useWindowDimensions();

    const EMAIL_REGEXP =
        /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

    function isEmailValid(value) {
        return EMAIL_REGEXP.test(value);
    }

    const [svgEye, setSvgEye] = useState(eye);
    const [userCodes, setUserCodes] = useState([]);
    const [currentCode, setCurrentCode] = useState([...defaultCurrentCode]);
    const [wrongEmailBtn, setWrongEmailBtn] = useState(false);
    const [wrongPassBtn, setWrongPassBtn] = useState(false);
    const [wrongBackup, setWrongBackup] = useState(false);
    const [orderOpenFromBtn, setOrderOpenFromBtn] = useState(false);
    const [disabledBtn, setDisabledBtn] = useState(true);
    const [emailValue, setEmailValue] = useState(item.mail || "");
    const [passwordValue, setPasswordValue] = useState(
        item.email_password || ""
    );
    const [codeCount, setCodeCount] = useState(0);
    const [bufferText, setBufferText] = useState(null);

    const dispatch = useDispatch();

    const t = useTranslations("profile");

    const onHandleWrongAll = () => {
        setWrongPassBtn(true);
        setWrongEmailBtn(true);
    };
    const onHandleWrongBackup = () => {
        setWrongBackup(true);
    };

    const handleDeleteCode = e => {
        e.preventDefault();
        e.stopPropagation();
        let tempCodes = userCodes.filter(el => el.id != e.target.id);
        setUserCodes(tempCodes);
    };

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
    };

    const handleChangeCodes = () => {
        const result = codes.current.value.replace(/[^0-9]/g, "");
        codes.current.value = result;
        setWrongBackup(false);

        let currentTargetCode = result.split("");
        let resultCurrentCode = [...currentCode];

        if (currentTargetCode.length < 8) {
            currentTargetCode.length = 8;
        }

        for (let i = 0; i < currentTargetCode.length; i++) {
            resultCurrentCode.map(el => {
                if (el.id === i) {
                    el.text = currentTargetCode[i];
                }
                return el;
            });
        }
        setCurrentCode(resultCurrentCode);

        if (result.length === 8) {
            let tempCode = result;
            setUserCodes(prev => [...prev, { id: codeCount, text: tempCode }]);
            codes.current.value = "";
            setCurrentCode(defaultCurrentCode);
            setOrderOpenFromBtn(false);
        }
    };

    const getError = err => {
        dispatch(showMessage({ status: "error", text: `${err}` }));
    };

    // const relaunchDelivery =

    const sendBackUpCodes = async e => {
        e.stopPropagation();
        setDisabledBtn(true);
        let tempArr = [];
        userCodes.forEach((el, i) => {
            let field = `backupCode${i + 1}`;
            tempArr.push({ [field]: el.text });
        });
        let sendData = {
            mail: emailValue,
            password: passwordValue,
        };
        tempArr.forEach((el, i) => {
            sendData = { ...sendData, ...el };
        });
        // console.log(sendData);
        await api.place(item.id, sendData, stateUser.token, getError);
        // .then((res) => console.log(res));
        await api
            .getOrders(stateUser.token, undefined, undefined, getError)
            .then(
                res =>
                    setTimeout(() => {
                        dispatch(getAllOrders(res));
                    }),
                300
            );
    };

    useEffect(() => {
        setCodeCount(prev => prev + 1);
        if (wrapperCodesRef && wrapperCodesRef.current) {
            wrapperCodesRef.current.scrollLeft = 999;
        }
        if (userCodes.length < 1) {
            if (codesLabelRef && codesLabelRef.current) {
                codesLabelRef.current.style.display = "flex";
            }
        }
    }, [userCodes]);

    useEffect(() => {
        if (
            passwordValue.length >= 8 &&
            isEmailValid(emailValue) &&
            userCodes.length > 0
        ) {
            setDisabledBtn(false);
        } else {
            setDisabledBtn(true);
        }
    }, [passwordValue, userCodes, emailValue]);

    useEffect(() => {
        if (data.wrong_fields && data.wrong_fields === "log_pass") {
            onHandleWrongAll();
        }
        if (data.wrong_fields && data.wrong_fields === "backup") {
            onHandleWrongBackup();
        }
    }, [data]);

    useEffect(() => {
        if (item?.backup_codes) {
            let res = item.backup_codes.split(",");
            let arr = [];
            for (let i = 0; i < res.length; i++) {
                if (res[i].length > 1) {
                    arr.push({ id: i, text: res[i] });
                }
            }
            setUserCodes(arr);
        }
    }, [item]);

    useEffect(() => {
        if (fieldsetEmailRef != null && fieldsetEmailRef.current) {
            if (wrongEmailBtn) {
                fieldsetEmailRef.current.style.border = "1px solid #E84545";
                email.current.style.color = "#E84545 !important";
            }
            if (!wrongEmailBtn) {
                fieldsetEmailRef.current.style.border =
                    "1px solid rgba(255, 255, 255, 0.6)";
                email.current.style.color = "white";
            }
        }
    }, [wrongEmailBtn]);
    useEffect(() => {
        if (fieldsetBackupRef != null && fieldsetBackupRef.current) {
            if (wrongBackup) {
                fieldsetBackupRef.current.style.border = "1px solid #E84545";
            }
            if (!wrongBackup) {
                fieldsetBackupRef.current.style.border =
                    "1px solid rgba(255, 255, 255, 0.6)";
            }
        }
    }, [wrongBackup]);

    useEffect(() => {
        if (fieldsetPasswordRef != null && fieldsetPasswordRef.current) {
            if (wrongPassBtn) {
                fieldsetPasswordRef.current.style.border = "1px solid #E84545";
                password.current.style.color = "#E84545 !important";
            }
            if (!wrongPassBtn) {
                fieldsetPasswordRef.current.style.border =
                    "1px solid rgba(255, 255, 255, 0.6)";
                password.current.style.color = "white";
            }
        }
    }, [wrongPassBtn]);

    useEffect(
        e => {
            codes.current.value = bufferText;
            handleChangeCodes(e);
        },
        [bufferText]
    );

    const getTextFromBuffer = () => {
        navigator.clipboard
            .readText()
            .then(text => {
                if (text.length != 8) {
                    return;
                } else {
                    setBufferText(text);
                }
            })
            .catch(err => {
                console.error("Something went wrong", err);
            });
    };

    return (
        <div>
            {(item.status === "ACCEPTED" || item.status === "IN_PROGRESS") && (
                <div
                    className={`${styles.tableorder_content} ${!orderOpen && "hide"}`}>
                    <div className={`${styles.inputs_title} `}>
                        {/* <Trans>seo118</Trans> */}
                        {t("eaacc")}
                    </div>
                    <div
                        className={`${styles.wrapper_inputs} ${styles.disable}`}>
                        <div className={`${styles.account_inputs}`}>
                            <div
                                className={`${styles.prof_comp_fieldset_wrapper}`}>
                                <fieldset
                                    className={`${styles.prof_comp_fieldset} ${styles.email_fieldset}`}>
                                    <input
                                        onClick={e => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                        }}
                                        className={styles.prof_comp_userdata}
                                        type="email"
                                        placeholder={t("eaemail")}
                                        defaultValue={
                                            item.email || emailValue || ""
                                        }
                                        readOnly></input>
                                </fieldset>
                            </div>
                            <div
                                className={`${styles.prof_comp_fieldset_wrapper}`}>
                                <fieldset
                                    className={`${styles.prof_comp_fieldset} ${styles.fieldset_pass}`}>
                                    <input
                                        onClick={e => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                        }}
                                        ref={password}
                                        className={styles.prof_comp_userdata}
                                        defaultValue={""}
                                        type="password"
                                        placeholder={t("eapass")}
                                        readOnly></input>
                                    <button
                                        onClick={onHandleClickViewPass}
                                        className={styles.prof_comp_view_pass}
                                        type="button"
                                        title={t("seepass")}>
                                        <img alt="eye" src={svgEye} />
                                    </button>
                                </fieldset>
                            </div>
                        </div>
                        <div className={`${styles.tableorder_codes}`}>
                            <fieldset
                                className={`${styles.prof_comp_fieldset} ${styles.codes_fieldset}`}>
                                <div className={`${styles.wrapper_codes}`}>
                                    {userCodes.length > 0 &&
                                        userCodes.map(el => (
                                            <div
                                                onClick={e => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                }}
                                                id={el.id}
                                                key={el.id}
                                                className={`${styles.tableorder_code_item} ${styles.events_none}`}>
                                                <span
                                                    onClick={e => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                    }}
                                                    className={`${styles.code_text} ${styles.events_none}`}>
                                                    {el.text
                                                        .match(/.{1,4}/g)
                                                        .join(" ")}
                                                </span>{" "}
                                                <button
                                                    id={el.id}
                                                    onClick={handleDeleteCode}
                                                    className={`${styles.close_btn} ${styles.events_none}`}>
                                                    <img
                                                        id={el.id}
                                                        className={`${styles.close_img} ${styles.events_none}`}
                                                        src={
                                                            "/img/Cancel 16px.svg"
                                                        }></img>
                                                </button>
                                            </div>
                                        ))}
                                    <label
                                        className={`${styles.tableorder_code_label} ${styles.events_none}`}>
                                        <input
                                            onClick={e => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                            }}
                                            onChange={handleChangeCodes}
                                            ref={codes}
                                            placeholder={t("eacodes")}
                                            className={`${styles.codes_input} ${styles.prof_comp_userdata} ${styles.events_none}`}
                                            type="tel"
                                            readOnly></input>
                                        <div
                                            className={`${styles.fake_input}`}
                                            onClick={() => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                            }}>
                                            <div
                                                className={`${styles.part1}`}
                                                onClick={() => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                }}>
                                                {currentCode
                                                    .slice(0, 4)
                                                    .map(el => {
                                                        return (
                                                            <div
                                                                onClick={() => {
                                                                    e.preventDefault();
                                                                    e.stopPropagation();
                                                                }}
                                                                key={el.id}
                                                                id={el.id}
                                                                className={`${styles.number}`}>
                                                                {el.text}
                                                            </div>
                                                        );
                                                    })}
                                            </div>
                                            <div
                                                className={`${styles.part2}`}
                                                onClick={() => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                }}>
                                                {currentCode
                                                    .slice(4)
                                                    .map(el => {
                                                        return (
                                                            <div
                                                                onClick={() => {
                                                                    e.preventDefault();
                                                                    e.stopPropagation();
                                                                }}
                                                                key={el.id}
                                                                id={el.id}
                                                                className={`${styles.number}`}>
                                                                {el.text}
                                                            </div>
                                                        );
                                                    })}
                                            </div>
                                        </div>
                                    </label>
                                </div>
                            </fieldset>
                        </div>
                    </div>
                </div>
            )}

            {item.status != "ACCEPTED" &&
                item.status != "IN_PROGRESS" &&
                item.status != "FINISHED" &&
                item.status != "REFUNDED" &&
                item.status != "ERROR_PAYMENT" &&
                item.status != "WAITING_PAYMENT" &&
                item.deliveryMethod === "Easy" && (
                    <div
                        className={`${styles.tableorder_content} ${!orderOpen && "hide"}`}>
                        <div className={`${styles.inputs_title}`}>
                            {/* <Trans>seo118</Trans> */}
                            {t("eaacc")}
                        </div>
                        <div className={`${styles.wrapper_inputs}`}>
                            <div className={`${styles.account_inputs}`}>
                                <div
                                    className={`${styles.prof_comp_fieldset_wrapper}`}>
                                    <fieldset
                                        className={`${styles.prof_comp_fieldset} ${styles.email_fieldset}`}
                                        ref={fieldsetEmailRef}>
                                        <input
                                            onClick={e => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                            }}
                                            className={
                                                styles.prof_comp_userdata
                                            }
                                            type="email"
                                            placeholder={t("eaemail")}
                                            defaultValue={
                                                emailValue || item.mail || ""
                                            }
                                            // defaultValue={stateUser.email}
                                            onChange={e => {
                                                setWrongEmailBtn(false);
                                                setEmailValue(e.target.value);
                                            }}
                                            ref={email}></input>
                                        {wrongEmailBtn && (
                                            <img
                                                alt="warning"
                                                className={`${styles.warning_icon}`}
                                                src="/img/warning_circle.svg"></img>
                                        )}
                                    </fieldset>
                                </div>
                                <div
                                    className={`${styles.prof_comp_fieldset_wrapper}`}>
                                    <fieldset
                                        ref={fieldsetPasswordRef}
                                        className={`${styles.prof_comp_fieldset} ${styles.fieldset_pass}`}>
                                        <input
                                            onClick={e => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                            }}
                                            ref={password}
                                            className={
                                                styles.prof_comp_userdata
                                            }
                                            defaultValue={
                                                passwordValue ||
                                                item.email_password ||
                                                ""
                                            }
                                            // defaultValue={
                                            //     stateUser.password
                                            // }
                                            type="password"
                                            placeholder={t("eapass")}
                                            onChange={e => {
                                                setWrongPassBtn(false);
                                                setPasswordValue(
                                                    e.target.value
                                                );
                                            }}></input>
                                        <button
                                            onClick={onHandleClickViewPass}
                                            className={
                                                styles.prof_comp_view_pass
                                            }
                                            type="button"
                                            title={t("seepass")}>
                                            <img src={svgEye} />
                                        </button>
                                        {wrongPassBtn && (
                                            <img
                                                alt="warning"
                                                className={`${styles.warning_icon}`}
                                                src="/img/warning_circle.svg"></img>
                                        )}
                                    </fieldset>
                                </div>
                            </div>
                            <div className={`${styles.tableorder_codes}`}>
                                <div
                                    ref={fieldsetBackupRef}
                                    className={`${styles.prof_comp_fieldset} ${styles.codes_fieldset}`}
                                    onClick={() => {
                                        if (
                                            !codes.current ===
                                            document.activeElement
                                        ) {
                                            codes.current.focus();
                                        }
                                    }}>
                                    <div
                                        ref={wrapperCodesRef}
                                        className={`${styles.wrapper_codes}`}>
                                        {userCodes.length > 0 &&
                                            userCodes.map(el => (
                                                <div
                                                    onClick={e => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                    }}
                                                    id={el.id}
                                                    key={el.id}
                                                    className={`${styles.tableorder_code_item}`}>
                                                    <span
                                                        onClick={e => {
                                                            e.preventDefault();
                                                            e.stopPropagation();
                                                            codes.current.focus();
                                                        }}
                                                        className={`${styles.code_text}`}>
                                                        {el.text
                                                            .match(/.{1,4}/g)
                                                            .join(" ")}
                                                    </span>{" "}
                                                    <button
                                                        id={el.id}
                                                        onClick={
                                                            handleDeleteCode
                                                        }
                                                        className={`${styles.close_btn}`}>
                                                        <img
                                                            alt="cancel"
                                                            id={el.id}
                                                            className={`${styles.close_img}`}
                                                            src={
                                                                "/img/Cancel 16px.svg"
                                                            }></img>
                                                    </button>
                                                </div>
                                            ))}
                                        <label
                                            ref={codesLabelRef}
                                            className={`${styles.tableorder_code_label} ${
                                                userCodes.length > 5 && "hide"
                                            }`}>
                                            <input
                                                onClick={e => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                }}
                                                onBlur={() =>
                                                    (wrapperCodesRef.current.scrollLeft =
                                                        -999)
                                                }
                                                onChange={handleChangeCodes}
                                                ref={codes}
                                                placeholder={t("eacodes")}
                                                className={`${styles.codes_input} ${styles.prof_comp_userdata}`}
                                                type="tel"
                                                readOnly={
                                                    userCodes.length > 5
                                                }></input>
                                            <div
                                                className={`${styles.fake_input}`}
                                                onClick={e => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                }}>
                                                <div
                                                    className={`${styles.part1}`}
                                                    onClick={e => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                    }}>
                                                    {currentCode
                                                        .slice(0, 4)
                                                        .map(el => {
                                                            return (
                                                                <div
                                                                    onClick={e => {
                                                                        e.preventDefault();
                                                                        e.stopPropagation();
                                                                    }}
                                                                    key={el.id}
                                                                    id={el.id}
                                                                    className={`${styles.number}`}>
                                                                    {el.text}
                                                                </div>
                                                            );
                                                        })}
                                                </div>
                                                <div
                                                    className={`${styles.part2}`}
                                                    onClick={e => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                    }}>
                                                    {currentCode
                                                        .slice(4)
                                                        .map(el => {
                                                            return (
                                                                <div
                                                                    onClick={e => {
                                                                        e.preventDefault();
                                                                        e.stopPropagation();
                                                                    }}
                                                                    key={el.id}
                                                                    id={el.id}
                                                                    className={`${styles.number}`}>
                                                                    {el.text}
                                                                </div>
                                                            );
                                                        })}
                                                </div>
                                            </div>
                                            {width < 1024 && (
                                                <button
                                                    className={`${styles.paste_btn}`}
                                                    type="button"
                                                    onClick={e => {
                                                        e.stopPropagation();
                                                        e.preventDefault();
                                                        getTextFromBuffer();
                                                    }}>
                                                    {/* <Trans>a14</Trans> */}
                                                    {t("paste")}
                                                </button>
                                            )}
                                        </label>
                                    </div>
                                    {orderOpenFromBtn && (
                                        <img
                                            alt="warning"
                                            className={`${styles.warning_icon}`}
                                            src="/img/warning_circle.svg"></img>
                                    )}
                                </div>
                            </div>
                            {orderOpenFromBtn && (
                                <div
                                    className={`${styles.hint} ${styles.red_hint}`}>
                                    {/* <Trans>locales.wrong_backup</Trans> */}
                                    {t("wrngcode")}
                                </div>
                            )}
                            <div className={`${styles.hint}`}>
                                {/* <Trans>seo122</Trans> */}
                                {t("recom")}
                            </div>
                        </div>
                        <div className={`${styles.code_helper}`}>
                            <span className={`${styles.code_helper_text}`}>
                                {/* <Trans>seo123</Trans> */}
                                {t("obtain")}
                            </span>
                            <a
                                rel="nofollow noreferrer"
                                className={`${styles.code_helper_link}`}
                                href="https://myaccount.ea.com/cp-ui/security/index"
                                target="_blank">
                                myaccount.ea.com/cp-ui/security/index
                            </a>
                        </div>
                        {(item.status === "PAYED" ||
                            item.status === "WRONG_CREDENTIALS" ||
                            item.status === "UNASSIGNED_ITEMS" ||
                            item.status === "WRONG_BACKUP") && (
                            <div className={`${styles.form_group}`}>
                                <button
                                    className={`${styles.code_post} ${disabledBtn && styles.disable} ${
                                        disabledBtn && styles.events_none
                                    }`}
                                    onClick={sendBackUpCodes}
                                    disabled={disabledBtn}>
                                    <span className={`${styles.btn_content}`}>
                                        {t("may_upd29")}
                                    </span>
                                </button>
                            </div>
                        )}
                        {(item.status.toLowerCase() === "customer_online" ||
                            item.status.toLowerCase() ===
                                "not_enough_coins_to_start" ||
                            item.status.toLowerCase() ===
                                "no_club_in_fut_web_app" ||
                            item.status.toLowerCase() ===
                                "no_access_to_fifa_21_webapp" ||
                            item.status.toLowerCase() === "no_tm" ||
                            item.status.toLowerCase() ===
                                "transfer_list_full" ||
                            item.status.toLowerCase() ===
                                "login_verification_disabled" ||
                            item.status.toLowerCase() === "console_online" ||
                            item.status.toLowerCase() ===
                                "online_in_fut_web_app") && (
                            <div className={`${styles.form_group}`}>
                                <button
                                    className={`${styles.code_post} ${disabledBtn && styles.disable} ${
                                        disabledBtn && styles.events_none
                                    }`}
                                    onClick={sendBackUpCodes}
                                    disabled={disabledBtn}>
                                    <span className={`${styles.btn_content}`}>
                                        {/* <Trans>locales.saveChanges</Trans> */}
                                        {t("may_upd29")}
                                    </span>
                                </button>
                            </div>
                        )}
                    </div>
                )}
        </div>
    );
};

export default TableOrderBody;
