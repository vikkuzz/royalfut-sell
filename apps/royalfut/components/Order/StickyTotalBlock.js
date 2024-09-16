import { useMemo, useState } from "react";
import Image from "next/legacy/image";
import { useDispatch, useSelector } from "react-redux";
import GradientBtn from "../GradientBtn";
import { useWindowDimensions } from "../../utils/hooks";
import { orderStep } from "../../redux/actions/royalfutOrderActions";
import DropdownOrder from "../DropdownOrder";
import flagLangs from "../../data-elements/countriesTwo";
import Analitic from "../../Analitic/Analitic";
import PointsBlock from "../LoyaltyProgram/PointsBlock";

import styles from "./StickyTotalBlock.module.scss";
import { useTranslations } from "next-intl";

const analitic = new Analitic();

const StickyTotalBlock = () => {
    const dispatch = useDispatch();
    const stateCurrency = useSelector(
        state => state.royalfutCurrencyReducer.currency
    );
    const stateLoyaltyData = useSelector(
        state => state.royalfutLoyaltyReducer.all_order_loyal_data
    );
    const stateOrderPlatform = useSelector(
        state => state.royalfutOrderReducer.order_platform
    );
    const stateOrderCoins = useSelector(
        state => state.royalfutOrderReducer.order_coins_amount
    );
    const { width } = useWindowDimensions();
    const [size, setSize] = useState({
        width: 190,
        height: 56,
    });

    const t = useTranslations("order");

    const goToCheckout = () => {
        analitic.clickCheckout(
            String(Number(stateLoyaltyData?.orderPrice).toFixed(2)),
            stateOrderPlatform
        );
        dispatch(orderStep(2));
    };

    useMemo(() => {
        if (width < 1024) {
            setSize({
                width: 320,
                height: 48,
            });
        }
    }, [width]);
    return (
        <div className={`${styles.sticky_block}`}>
            <div className={styles.price_bonus_wrapper}>
                <div className={`${styles.price_values}`}>
                    <div className={`${styles.price_all}`}>
                        <span className={`${styles.price_all_title}`}>
                            {t("seo51")}
                        </span>
                        <div className={`${styles.prices_wrapper}`}>
                            <span className={`${styles.price_actual}`}>
                                {stateCurrency?.currency}{" "}
                                {Number(stateLoyaltyData?.orderPrice)
                                    .toFixed(2)
                                    .toLocaleString("ru-RU") || 0}
                                <div className={`${styles.dd_wrapper}`}>
                                    <DropdownOrder
                                        title={stateCurrency.title}
                                        value={flagLangs}
                                    />
                                </div>
                            </span>
                        </div>
                    </div>
                </div>
                {stateLoyaltyData?.points > 0 && (
                    <div className={`${styles.price_all}`}>
                        <span className={`${styles.price_all_title}`}>
                            {t("cashback")}
                        </span>
                        <PointsBlock coins={stateOrderCoins} full={true} />
                    </div>
                )}
            </div>
            <div className={`${styles.wrapper_btn}`}>
                <GradientBtn size={size} callback={goToCheckout}>
                    <span className={`${styles.btn_text_wrapper}`}>
                        <span className={`${styles.btn_text}`}>
                            {t("ab94")}
                        </span>
                        <span className={`${styles.arrow_wrapper}`}>
                            <Image
                                src="/img/arrow_right_checkout.svg"
                                width={24}
                                height={24}
                            />
                        </span>
                    </span>
                </GradientBtn>
            </div>
        </div>
    );
};

export default StickyTotalBlock;
