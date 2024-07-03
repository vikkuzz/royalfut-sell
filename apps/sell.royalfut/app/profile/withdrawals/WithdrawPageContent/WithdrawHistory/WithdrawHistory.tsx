import React from "react";
import WithdrawItem from "./WithdrawItem";
import { IPayoutOrder } from "@royalfut/interfaces";

async function WithdrawHistory({ payouts }: { payouts: any }) {
    return (
        <div className="flex flex-col border border-white-10 rounded-xl bg-white/[.02] px-6 py-5">
            <span className="text-2xl font-bold pb-10">Withdrawal History</span>
            <div className="flex flex-col gap-3">
                {payouts.payouts?.map((order: IPayoutOrder) => {
                    return <WithdrawItem key={order.id} item={order} />;
                })}
            </div>
        </div>
    );
}

export default WithdrawHistory;
