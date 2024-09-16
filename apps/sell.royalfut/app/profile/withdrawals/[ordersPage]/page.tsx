import { Paginator } from "@royalfut/components";
import Tabs from "../../_components/Tabs";
import { getPayouts } from "@royalfut/actions";
import { isNumber } from "@royalfut/utils";
import WithdrawPageContent from "../WithdrawPageContent/WithdrawPageContent";

async function ProfileWithdrawPage({
    params,
}: {
    params: { ordersPage: number };
}) {
    if (!isNumber(params.ordersPage)) {
        params.ordersPage = 1;
    }

    const orders = await getPayouts(null, params.ordersPage);
    return (
        <div className="flex flex-col gap-8">
            <Tabs page="orders" />
            {orders && (
                <>
                    <WithdrawPageContent payouts={orders} />
                    <Paginator
                        page={params.ordersPage}
                        orders={orders}
                        route={"/profile/withdrawals"}
                    />
                </>
            )}
        </div>
    );
}

export default ProfileWithdrawPage;
