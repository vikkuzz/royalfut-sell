import React from "react";

import styles from "./OrderList.module.scss";
import OrderItem from "./OrderItem/OrderItem";
import ordersData from "../../ordersData";
import { getOrders } from "@royalfut/actions";

async function OrderList() {
    const orders = await getOrders();
    console.log(
        orders.filter((el: { status: string }) => el.status !== "CREATED")
    );
    return (
        <div className={`${styles.order_list}`}>
            <div className="flex gap-4 flex-col">
                {ordersData.orders.map(order => {
                    return <OrderItem key={order.id} order={order} />;
                })}
            </div>
        </div>
    );
}

export default OrderList;
