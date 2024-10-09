import { getPayouts } from "@royalfut/actions";
import { Paginator, ProfileNavigationTabs } from "@royalfut/components";
import WithdrawPageContent from "./WithdrawPageContent/WithdrawPageContent";

async function ProfileWithdrawalsPage() {
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
        </div>
    );
}

export default ProfileWithdrawalsPage;
