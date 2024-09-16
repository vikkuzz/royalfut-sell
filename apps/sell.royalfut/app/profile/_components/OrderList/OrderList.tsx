import React from "react";

import styles from "./OrderList.module.scss";
import OrderItem from "./OrderItem/OrderItem";
import { IOrder } from "@royalfut/interfaces";

async function OrderList({ orders }: { orders: any }) {
    return (
        <div className={`${styles.order_list}`}>
            <div className="flex gap-4 flex-col">
                {orders.orders?.map((order: IOrder) => {
                    return <OrderItem key={order.id} order={order} />;
                })}
            </div>
        </div>
    );
}

export default OrderList;
