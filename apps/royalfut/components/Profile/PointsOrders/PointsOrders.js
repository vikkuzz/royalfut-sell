import React from "react";

import styles from "./PointsOrders.module.scss";
import PointsDisplay from "../PointsDisplay";
import { getOrderDate } from "../../../utils/functions";

const PointsOrders = ({ orders }) => {
    return (
        <div className={`${styles.container}`}>
            {orders?.map(el => {
                return (
                    <div key={el.id} className={styles.order}>
                        <div className={styles.order_data_wrapper}>
                            <span className={styles.order_title}>
                                Order № {el.id}{" "}
                            </span>
                            <span className={styles.order_time}>
                                {getOrderDate(el.createdAt)}
                            </span>
                        </div>
                        <div className={styles.points_block}>
                            <PointsDisplay order={el} />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default PointsOrders;
