import React from "react";
import WithdrawHistory from "./WithdrawHistory/WithdrawHistory";

const WithdrawPageContent = () => {
    return (
        <div className="flex flex-col w-full gap-4">
            <div className="flex items-center justify-between border border-white-10 rounded-xl bg-white/[.02] px-6 py-5">
                <span className="text-2xl font-bold">Total income</span>
                <span className="text-3xl font-bold">$320,24</span>
            </div>
            <WithdrawHistory />
        </div>
    );
};

export default WithdrawPageContent;
