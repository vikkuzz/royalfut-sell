import { useDispatch, useSelector } from "react-redux";
import Image from "next/legacy/image";
// import { Trans } from '@lingui/macro';
import { modalCalc } from "../../redux/actions/royalfutActions";

import styles from "./CoinsBlock.module.scss";
import { useTranslations } from "next-intl";

const CoinsBlock = () => {
    const dispatch = useDispatch();
    const t = useTranslations("order");
    const stateCurrency = useSelector(
        state => state.royalfutCurrencyReducer.currency
    );
    const stateOrderPrice = useSelector(
        state => state.royalfutOrderReducer.order_price
    );
    const stateOrderCoins = useSelector(
        state => state.royalfutOrderReducer.order_coins_amount
    );
    const getModal = () => {
        dispatch(modalCalc(true));
    };

    return (
        <div className={`${styles.container}`}>
            <span className={`${styles.coins_text}`}>
                {/* <Trans>locales.pageAmountCoinsLabel</Trans> */}
                {t("pageAmountCoinsLabel")}
            </span>
            <div className={`${styles.coins_int}`}>
                <div className={`${styles.coins_block_img}`}>
                    <Image
                        width={36}
                        height={36}
                        src={"/img/Preset order.svg"}
                    />
                </div>
                <div className={`${styles.coins_data_wrapper}`}>
                    <div className={`${styles.coins_amount}`}>
                        {stateOrderCoins?.toLocaleString("ru-RU")}{" "}
                        {/* <Trans>locales.pageCoinsFifaCoins</Trans> */}
                        {t("pageCoinsFifaCoins")}
                    </div>
                    <div className={`${styles.price_block}`}>
                        <span className={`${styles.currency}`}>
                            {stateCurrency?.currency}
                        </span>
                        <span className={`${styles.price_amount}`}>
                            {stateOrderPrice?.toFixed(2)}
                        </span>
                    </div>
                </div>
                <div className={styles.btns_block}>
                    <button
                        className={`${styles.coins_block_btn}`}
                        onClick={getModal}>
                        <Image
                            width={32}
                            height={32}
                            src={"/img/change_avatar_transp.svg"}
                        />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CoinsBlock;
