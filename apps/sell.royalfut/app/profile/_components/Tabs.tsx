import React from "react";
import { AUTHORIZED_API_ROUTES } from "@royalfut/collections";
import Link from "next/link";
import { cn } from "@royalfut/utils";

const Tabs = ({ page }: { page: string }) => {
    return (
        <div className="w-full flex">
            <Link
                href={AUTHORIZED_API_ROUTES.ORDERS}
                className={cn(
                    `w-full flex justify-center opacity-40 text-sm font-semibold pb-3 border-b`,
                    {
                        "opacity-100": page === "orders",
                        "border-b-2": page === "orders",
                    }
                )}>
                Deals
            </Link>
            <Link
                href={AUTHORIZED_API_ROUTES.WITHDRAWALS}
                className={cn(
                    `w-full flex justify-center opacity-40 text-sm font-semibold pb-3 border-b`,
                    {
                        "opacity-100": page === "withdrawals",
                        "border-b-2": page === "withdrawals",
                    }
                )}>
                Payouts
            </Link>
        </div>
    );
};

export default Tabs;
