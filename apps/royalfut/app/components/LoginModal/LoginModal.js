"use client";
import styles from "./LoginModal.module.scss";
import { useSelector } from "react-redux";
import dynamic from "next/dynamic";

const DynamicComponentBurgerMenu = dynamic(() => import("../BurgerMenu"));

const LoginModal = () => {
    const stateLoginModal = useSelector(
        state => state.royalfutReducer.loginModal
    );

    return (
        <div
            className={`${styles.app_burgerwrapper} ${stateLoginModal && styles.show_container}`}>
            <DynamicComponentBurgerMenu />
        </div>
    );
};

export default LoginModal;
