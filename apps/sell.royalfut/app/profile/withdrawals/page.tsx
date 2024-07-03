import { getPayouts } from "@royalfut/actions";
import Tabs from "../_components/Tabs";
import WithdrawPageContent from "./WithdrawPageContent/WithdrawPageContent";

async function ProfileWithdrawalsPage() {
    const payouts = await getPayouts();
    return (
        <div className="flex flex-col gap-8">
            <Tabs page="withdrawals" />
            <WithdrawPageContent payouts={payouts} />
        </div>
    );
}

export default ProfileWithdrawalsPage;
