import React from "react";

import styles from "./StepThirdContent.module.scss";
import OrderDeliveryStage from "./OrderDeliveryStage";
import { useDispatch } from "react-redux";
import { orderStep } from "../../redux/actions/royalfutOrderActions";

const StepSecondContent = () => {
    const dispatch = useDispatch();
    const backToPayment = () => {
        dispatch(orderStep(2));
    };
    return (
        <div className={`${styles.content}`}>
            <div className={`${styles.main_content}`}>
                <OrderDeliveryStage backToPayment={backToPayment} />
            </div>
        </div>
    );
};

export default StepSecondContent;
