import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
// import { useRouter } from 'next/router';
// import { Trans } from '@lingui/macro';
import { platforms } from "../../data-elements/platforms";
import { loginModal } from "../../redux/actions/royalfutActions";

import styles from "../../styles/OptionWithItems.module.scss";
import { useTranslations } from "next-intl";

let count = 0;

const OptionWithItems = () => {
    let stateBuyOff = useSelector(state => state.royalfutReducer.buy_of);
    const content = useRef();
    const dispatch = useDispatch();
    const t = useTranslations("home");

    let [openOption, setOpenOption] = useState(false);
    const clickOption = () => {
        setOpenOption(!openOption);
    };
    useEffect(() => {
        if (openOption) {
            content.current.style.height = "auto";
            content.current.style.overflow = "auto";
            content.current.style.paddingTop = "20px";
        } else {
            content.current.style.height = "0px";
            content.current.style.overflow = "hidden";
            content.current.style.paddingTop = "0px";
        }
    }, [openOption]);

    const chooseOption = () => {
        dispatch(loginModal(false));
    };
    return (
        <div
            className={`${styles.option_container} ${stateBuyOff && "disabled"}`}>
            <button className={`${styles.option_btn}`} onClick={clickOption}>
                {/* <Trans>seo1</Trans> */}
                {t("headerdropdown.buy_coins")}
                <div className={`${styles.img_wrapper}`}>
                    <img
                        alt="arrow"
                        className={`${styles.img}`}
                        src="/img/arrow_drop_down.svg"></img>
                </div>
            </button>
            <div
                ref={content}
                className={`${styles.hidden_container} ${stateBuyOff && "disabled"}`}>
                {platforms.map(el => (
                    <Link
                        key={(count += 1)}
                        href={el.url}
                        onClick={chooseOption}
                        className={`${styles.option_item}`}>
                        {el.name}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default OptionWithItems;
