import React, { useState } from "react";

import styles from "../../styles/ChangeAvatar.module.scss";

import { avatars } from "../../data-elements/avatars";
// import { Trans } from '@lingui/macro';
// import { useRouter } from 'next/router';
import api from "../../Api/Api";
import { useDispatch, useSelector } from "react-redux";
import {
    modalAva,
    showMessage,
    user,
} from "../../redux/actions/royalfutActions";
import { useTranslations } from "next-intl";

const ChangeAvatar = () => {
    const t = useTranslations("modal");
    const stateUser = useSelector(state => state.royalfutReducer.user);
    // const router = useRouter();
    const dispatch = useDispatch();
    const [ava, setAva] = useState();
    const handleChangeAvatar = e => {
        setAva(e.target.id);
    };
    const getError = err => {
        dispatch(showMessage({ status: "error", text: `${err}` }));
    };
    const getNotify = () => {
        dispatch(
            showMessage({
                status: "info",
                text: `Avatar changed successfully`,
            })
        );
    };
    const userChangeAvatar = () => {
        let obj = {
            user: {
                profilePicture: Number(ava),
            },
        };
        api.updateProfile(stateUser?.token, obj, getError).then(res => {
            if (res.user) {
                dispatch(user(res.user));
                dispatch(modalAva(false));
                getNotify();
            }
        });
    };
    return (
        <div className={`${styles.container}`}>
            <h2 className={`${styles.title}`}>
                {/* <Trans>a12</Trans> */}
                {t("a12")}
            </h2>
            <div className={`${styles.container_avas}`}>
                {avatars.map(el => {
                    return (
                        <label key={el.id} className={`${styles.wrapper_ava}`}>
                            <input
                                className={`${styles.radio}`}
                                onChange={handleChangeAvatar}
                                type={"radio"}
                                name={"avatar"}
                                value={el.id}
                                id={el.id}></input>
                            <div className={`${styles.border}`}></div>
                            <img
                                alt="ava"
                                className={`${styles.ava}`}
                                src={el.src}></img>
                        </label>
                    );
                })}
            </div>
            <div className={`${styles.buy_btn_wrapper}`}>
                <button
                    onClick={userChangeAvatar}
                    className={`${styles.buy_btn} `}
                    type="button"
                    name="change">
                    {/* <Trans>seo108</Trans> */}
                    {t("seo108")}
                </button>
            </div>
        </div>
    );
};

export default ChangeAvatar;
