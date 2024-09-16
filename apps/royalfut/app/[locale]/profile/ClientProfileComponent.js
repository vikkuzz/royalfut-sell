"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import ProfileComponent from "../../components/Profile/Profile";
import {
    getAllOrders,
    modalAva,
    showMessage,
    userlogout,
} from "../../../redux/actions/royalfutActions";
import { avatars } from "../../../data-elements/avatars";
import { deleteCookie } from "../../../utils/functions";
import api from "../../../Api/Api";

import styles from "../../../styles/App.module.scss";
import { useTranslations } from "next-intl";
import { useSse } from "../../../utils/hooks";

const ClientProfileComponent = () => {
    const router = useRouter();
    const pathname = usePathname();
    const stateUser = useSelector(state => state.royalfutReducer.user);
    const stateOrders = useSelector(state => state.royalfutReducer.allOrders);
    const t = useTranslations("profile");
    const dispatch = useDispatch();

    const messageSse = useSse();

    const getError = err => {
        dispatch(showMessage({ status: "error", text: `${err}` }));
    };

    useEffect(() => {
        let localUser = JSON.parse(localStorage.getItem("localUser"));
        if (!localUser?.token) {
            router.push("/");
        }
    }, [pathname]);

    useEffect(() => {
        if (stateUser?.token) {
            api.getOrders(
                stateUser.token,
                10,
                stateOrders.page === 0 ? 1 : stateOrders.page,
                getError
            ).then(res => {
                dispatch(getAllOrders(res));
            });
        }
    }, [messageSse]);

    const logout = () => {
        deleteCookie("auth-token");
        localStorage.clear();
        dispatch(userlogout());
        dispatch(userCreateOrder({}));
        dispatch(getPromoOrder(null));
        router.push("/");
    };

    return (
        <div className={styles.wrapper_with_h1}>
            <h1 className={styles.profile_h1}>{t("h1")}</h1>
            <div className={`${styles.app_main} ${styles.profile_main}`}>
                <div className={`${styles.app_profile_wrapper}`}>
                    <picture className={`${styles.app_profile_ava}`}>
                        <img
                            alt="ava"
                            src={`${avatars.filter(el => el.id == stateUser.profilePicture)[0]?.src}`}
                            className={styles.img_profile}
                        />

                        <button
                            onClick={() => dispatch(modalAva(true))}
                            className={`${styles.app_profile_btn_ava}`}></button>
                    </picture>
                    <h2 className={`${styles.app_profile_h1}`}>
                        {stateUser.email}
                    </h2>
                    <button
                        onClick={logout}
                        className={`${styles.logout_btn} calc_btn buy_btn`}>
                        {t("logout")}
                        <img
                            alt="logout"
                            className={`${styles.logout_icon} calc_icon`}
                            src="/img/logout.svg"
                        />
                    </button>
                </div>
                <ProfileComponent />
            </div>
        </div>
    );
};

export default ClientProfileComponent;
