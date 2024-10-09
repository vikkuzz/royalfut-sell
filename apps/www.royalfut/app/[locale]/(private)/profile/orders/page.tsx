/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState } from "react";
import { Paginator } from "@royalfut/components";
import { InformationStub, OrderList } from "../_components/OrderList";
import { getOrders } from "@royalfut/actions";
import { isNumber } from "@royalfut/utils";

const ProfileOrdersPage = ({
    params,
}: {
    params: {
        ordersPage: number;
    };
}) => {
    if (!isNumber(params.ordersPage)) {
        params.ordersPage = 1;
    }
    const [orders, setOrders] = useState<any>();
    const [load, setLoad] = useState<boolean>(true);

    useEffect(() => {
        getOrders(null, 1).then(res => {
            setOrders(res);
            setLoad(false);
        });
    }, []);
    return (
        <div className="flex flex-col gap-8">
            {load && "loading..."}
            {!orders?.orders.length && !load && <InformationStub />}
            {orders?.orders.length > 0 && (
                <>
                    <OrderList orders={orders} />
                    <Paginator
                        page={params.ordersPage}
                        orders={orders}
                        route={"/profile/orders"}
                    />
                </>
            )}
        </div>
    );
};

export default ProfileOrdersPage;
