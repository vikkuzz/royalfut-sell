import Image from "next/legacy/image";
import { useDispatch } from "react-redux";
// import { Trans } from '@lingui/macro';
import { modalLoyalty } from "../../redux/actions/royalfutActions";

import styles from "./RoyalPointsInfo.module.scss";
import { useTranslations } from "next-intl";

const RoyalPointsInfo = () => {
    const dispatch = useDispatch();
    const t = useTranslations("order");

    const showModal = () => {
        dispatch(modalLoyalty(true));
    };
    return (
        <div className={`${styles.container}`}>
            <span className={`${styles.title}`}>
                <div className={`${styles.crown_wrapper}`}>
                    <Image
                        src={"/img/white_crown.svg"}
                        width={16}
                        height={16}
                    />
                </div>
                {/* <Trans>pl_upd37</Trans> */}
                {t("pl_upd37")}
            </span>
            <span className={`${styles.text}`}>
                {/* <Trans>pl_upd28</Trans> */}
                {t("pl_upd28")}
            </span>
            <div className={`${styles.wrapper_btn}`}>
                <button className={`${styles.btn}`} onClick={showModal}>
                    <span className={`${styles.btn_text}`}>
                        {/* <Trans>pl_upd29</Trans> */}
                        {t("pl_upd29")}
                    </span>
                    <div className={styles.pic_wrapper}>
                        <Image
                            src={"/img/arrow_right_violet.svg"}
                            width={24}
                            height={24}
                        />
                    </div>
                </button>
            </div>
        </div>
    );
};

export default RoyalPointsInfo;
