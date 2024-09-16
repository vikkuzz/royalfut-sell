import { getPayouts } from "@royalfut/actions";
import Tabs from "../_components/Tabs";
import WithdrawPageContent from "./WithdrawPageContent/WithdrawPageContent";
import { Paginator } from "@royalfut/components";

async function ProfileWithdrawalsPage() {
    const payouts = await getPayouts(null, 1);

    return (
        <div className="flex flex-col gap-8">
            <Tabs page="withdrawals" />
            <WithdrawPageContent payouts={payouts} />
            <Paginator
                page={1}
                orders={payouts}
                route={"/profile/withdrawals"}
            />
        </div>
    );
}

export default ProfileWithdrawalsPage;
