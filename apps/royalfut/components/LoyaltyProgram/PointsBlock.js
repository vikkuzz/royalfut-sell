import { useSelector } from "react-redux";

import styles from "./PointsBlock.module.scss";
import Image from "next/legacy/image";

const PointsBlock = ({ full, mobile }) => {
    const stateLoyaltyOrderData = useSelector(
        state => state.royalfutLoyaltyReducer.all_order_loyal_data
    );
    const stateCurrency = useSelector(
        state => state.royalfutCurrencyReducer.currency
    );

    return stateLoyaltyOrderData && stateLoyaltyOrderData?.points > 0 ? (
        <div
            className={`${styles.container} ${full && styles.full} ${mobile && styles.mobile}`}>
            <div className={styles.points_block}>
                <div className={`${styles.points}`}>
                    +{stateLoyaltyOrderData?.points || 0}
                </div>
                <div className={`${styles.points_icon}`}>
                    <Image width={12} height={12} src={"/img/crown_icon.svg"} />
                </div>
            </div>
            {full && !mobile && (
                <div className={`${styles.points_price_wrapper}`}>
                    <span>≈</span>
                    <span>
                        {stateLoyaltyOrderData?.priceCash || 0}{" "}
                        {stateCurrency?.title}
                    </span>
                </div>
            )}
        </div>
    ) : (
        ""
    );
};

export default PointsBlock;
