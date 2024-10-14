/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState } from "react";
import { InformationStub, OrderList } from "../_components/OrderList";
import { getOrders } from "@royalfut/actions";
import { Pagination } from "@royalfut/ui";

const ProfileOrdersPage = () => {
    const [orders, setOrders] = useState<any>();
    const [load, setLoad] = useState<boolean>(true);
    const [page, setPage] = useState(1);

    useEffect(() => {
        getOrders(null, page).then(res => {
            setOrders(res);
            setLoad(false);
        });
    }, [page]);
    return (
        <div className="flex flex-col gap-8">
            {load && "loading..."}
            {!orders?.orders.length && !load && <InformationStub />}
            {orders?.orders.length > 0 && (
                <>
                    <OrderList orders={orders} />
                    <Pagination
                        currentPage={page}
                        records={{
                            strategy: "jump",
                            totalItems: orders.total,
                            itemsPerPage: orders.limit,
                        }}
                        visiblePagesLimit={3}
                        navigation={{
                            navigationMethod: "manual",
                            onPageChange: setPage,
                        }}
                    />
                </>
            )}
        </div>
    );
};

export default ProfileOrdersPage;
