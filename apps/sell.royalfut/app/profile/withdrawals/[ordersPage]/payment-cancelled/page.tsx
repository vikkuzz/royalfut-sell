import Tabs from "../../../_components/Tabs";
import PaymentCancelled from "../../../_components/PaymentCancelled";
import { getPayouts } from "@royalfut/actions";
import { Paginator } from "@royalfut/components";
import WithdrawPageContent from "../../WithdrawPageContent/WithdrawPageContent";

async function PaymentSuccessLayout() {
    const payouts = await getPayouts(null, 1);
    return (
        <div className="flex flex-col gap-8">
            <Tabs page="withdrawals" />
            <PaymentCancelled />
            <WithdrawPageContent payouts={payouts} />
            <Paginator
                page={1}
                orders={payouts}
                route={"/profile/withdrawals"}
            />
        </div>
    );
}

export default PaymentSuccessLayout;
