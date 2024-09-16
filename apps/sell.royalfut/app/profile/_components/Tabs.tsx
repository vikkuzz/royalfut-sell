import Link from "next/link";
import { cn } from "@royalfut/utils";

const Tabs = ({ page }: { page: string }) => {
    return (
        <div className="w-full flex">
            <Link
                href={"/profile/orders"}
                className={cn(
                    `w-full flex justify-center opacity-40 text-sm font-semibold pb-3 border-b`,
                    {
                        "opacity-100 border-b-2": page === "orders",
                    }
                )}>
                Deals
            </Link>
            <Link
                href={"/profile/withdrawals"}
                className={cn(
                    `w-full flex justify-center opacity-40 text-sm font-semibold pb-3 border-b`,
                    {
                        "opacity-100 border-b-2": page === "withdrawals",
                    }
                )}>
                Payouts
            </Link>
        </div>
    );
};

export default Tabs;
