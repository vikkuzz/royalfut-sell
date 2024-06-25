import React from "react";

import styles from "./OrderList.module.scss";
import OrderItem from "./OrderItem/OrderItem";
import ordersData from "../../ordersData";
import { getOrders } from "@royalfut/actions";
import { IOrder } from "@royalfut/interfaces";

async function OrderList() {
    const orders = await getOrders();
    console.log(orders,
        orders.orders?.filter((el: { status: string }) => el.status !== "CREATED")
    );

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
