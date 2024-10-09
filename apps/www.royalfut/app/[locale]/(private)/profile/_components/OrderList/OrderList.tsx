import React from "react";

import styles from "./OrderList.module.scss";
import OrderItem from "./OrderItem/OrderItem";
import { IOrder } from "@royalfut/interfaces";

function OrderList({ orders }: { orders: any }) {
    // const customOrders = [orders.orders[0]];
    // customOrders[0].status = "wrong_credentials";
    // customOrders[0].coinTransferred = "100000";
    // customOrders[0].percentTransferred = "50";
    // console.log(customOrders);
    return (
        <div className={`${styles.order_list}`}>
            <div className="flex gap-4 flex-col">
                {orders.orders.map((order: IOrder) => {
                    return <OrderItem key={order.id} order={order} />;
                })}
            </div>
        </div>
    );
}

export default OrderList;
