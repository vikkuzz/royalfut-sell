import { useEffect } from "react";
import Image from "next/legacy/image";
// import { Trans } from '@lingui/macro';
import { useDispatch } from "react-redux";
import { changeMethod } from "../../redux/actions/royalfutActions";

import styles from "./OrderDeliveryPlug.module.scss";
import { useTranslations } from "next-intl";

const OrderDeliveryPlug = () => {
    const dispatch = useDispatch();
    const t = useTranslations("order");

    useEffect(() => {
        dispatch(changeMethod("easy"));
    }, []);
    return (
        <div className={`${styles.container}`}>
            <span className={`${styles.title_wrapper}`}>
                <Image src={"/img/info.svg"} width={12} height={12} />
                <span className={`${styles.title}`}>
                    {/* <Trans>pl_upd26</Trans> */}
                    {t("pl_upd26")}
                </span>
            </span>
            <span className={`${styles.text}`}>
                {/* <Trans>pl_upd27</Trans> */}
                {t("pl_upd27")}
            </span>
        </div>
    );
};

export default OrderDeliveryPlug;
