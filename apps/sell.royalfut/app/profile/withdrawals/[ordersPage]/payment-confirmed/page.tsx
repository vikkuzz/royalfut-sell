import { Paginator, ProfileNavigationTabs } from "@royalfut/components";
import { getPayouts } from "@royalfut/actions";
import PaymentConfirmed from "../../../_components/PaymentConfirmed";
import WithdrawPageContent from "../../WithdrawPageContent/WithdrawPageContent";

async function PaymentSuccessLayout() {
    const payouts = await getPayouts(null, 1);

    return (
        <div className="flex flex-col gap-8">
            <ProfileNavigationTabs page="withdrawals" />
            <WithdrawPageContent payouts={payouts} />
            <Paginator
                page={1}
                orders={payouts}
                route={"/profile/withdrawals"}
            />
            <PaymentConfirmed />
        </div>
    );
}

export default PaymentSuccessLayout;
