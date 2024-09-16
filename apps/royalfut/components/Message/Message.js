"use client";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/legacy/image";
// import { useRouter } from 'next/router';
// import { Trans, t } from '@lingui/macro';
import { showMessage } from "../../redux/actions/royalfutActions";
import messagesData from "../../data-elements/messageData";

import styles from "../../styles/App.module.scss";
import { useTranslations } from "next-intl";

const Message = () => {
    const t = useTranslations("message");
    const message = useRef(null);
    // const router = useRouter();
    const dispatch = useDispatch();
    const stateShowMessage = useSelector(
        state => state.royalfutReducer.showMessage
    );
    const [currentMessage, setCurrentMessage] = useState(null);

    useEffect(() => {
        let temp = null;
        let contentContainer = document.getElementById("content_container");

        let coords = contentContainer.getBoundingClientRect();
        if (stateShowMessage?.status) {
            temp = messagesData.filter(
                el => el.status === stateShowMessage.status
            )[0];
            if (stateShowMessage?.text?.toLowerCase().includes("failed")) {
                return;
            }
            if (
                stateShowMessage?.text
                    ?.toLowerCase()
                    .includes("missingPromoCode")
            ) {
                // temp.text = t`locales.invalidPromo`;
                temp.text = t(`invalidPromo`);
            }
            if (stateShowMessage?.text?.toLowerCase().includes("email")) {
                // temp.text = t`seo98`;
                temp.text = t(`seo98`);
            } else if (stateShowMessage?.text?.includes("422")) {
                // temp.text = t`wntwrng`;
                temp.text = t(`wntwrng`);
                temp.button = true;
            } else {
                temp.text = stateShowMessage?.text;
            }

            setCurrentMessage(temp);
            if (message?.current) {
                message.current.style.backgroundColor = `${stateShowMessage.background}`;
            }
        }
        if (!stateShowMessage?.status) {
            setCurrentMessage(null);
        }

        if (stateShowMessage) {
            setTimeout(() => dispatch(showMessage(null)), 4000);
        }
        if (!stateShowMessage) {
            message.current.style.opacity = "0";
            // message.current.style.position = 'absolute';
            message.current.style.maxWidth = "343px";
            message.current.style.zIndex = "-2";
            message.current.style.top = "-16px";
            message.current.style.transition = "all .3s";

            message.current.style.transform = "translate(8px,-100%)";
        }
        if (stateShowMessage) {
            message.current.style.opacity = "1";
            message.current.style.transition = "all .3s";

            message.current.style.zIndex = "11";
            message.current.style.transform = "translate(0px)";
            message.current.style.top = "90px";
            if (coords.width > 375 && coords.width < 796) {
                message.current.style.right = `${(coords.width - 343) / 2}px`;
            } else if (coords.width > 796 && coords.width < 1440) {
                message.current.style.right = `${coords.left + 32}px`;
            } else {
                message.current.style.right = `${coords.left}px`;
            }

            message.current.style.width = "auto";

            message.current.style.maxWidth = "343px";
        }
    }, [stateShowMessage]);

    useEffect(() => {
        message.current.style.background = `${currentMessage?.background}`;
        // if (currentMessage?.text?.includes('email or password')) {
        //     let tmessage = { ...currentMessage };
        //     tmessage.text = t`seo98`;
        //     setCurrentMessage(tmessage);
        // }
    }, [currentMessage]);

    return (
        <div ref={message} className={`${styles.login_message}`}>
            {currentMessage && (
                <div className={`${styles.login_message_content}`}>
                    <Image
                        alt="message"
                        width={20}
                        className={`${styles.info_pic}`}
                        height={20}
                        src={currentMessage.img}
                    />

                    <div className={`${styles.container_btn}`}>
                        <div>{currentMessage.text}</div>
                        {currentMessage.button && (
                            <div>
                                <button
                                    type="button"
                                    onClick={() => {
                                        window.location.reload();
                                    }}
                                    className={`${styles.reload_btn}`}>
                                    {/* <Trans>refresh</Trans> */}
                                    {t("refresh")}
                                </button>
                            </div>
                        )}
                    </div>

                    <button
                        type="button"
                        name="close"
                        onClick={() => dispatch(showMessage(null))}
                        className={`${styles.close_btn}`}>
                        <Image
                            alt="message"
                            width="16px"
                            height="16px"
                            className={`${styles.close_btn_pic}`}
                            src="/img/whitecross.svg"
                        />
                    </button>
                </div>
            )}
        </div>
    );
};

export default Message;
