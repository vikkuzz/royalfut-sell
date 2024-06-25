import React from "react";
import ordersData from "../../../ordersData";
import WithdrawItem from "./WithdrawItem";

const WithdrawHistory = () => {
    return (
        <div className="flex flex-col border border-white-10 rounded-xl bg-white/[.02] px-6 py-5">
            <span className="text-2xl font-bold pb-10">Withdrawal History</span>
            <div className="flex flex-col gap-3">
                {ordersData.orders.map(order => {
                    return <WithdrawItem key={order.id} item={order} />;
                })}
            </div>
        </div>
    );
};

export default WithdrawHistory;
