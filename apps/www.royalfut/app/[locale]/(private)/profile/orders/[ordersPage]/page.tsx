import { Paginator } from "@royalfut/components";
import { OrderList } from "../../_components/OrderList";
import { getOrders } from "@royalfut/actions";
import { isNumber } from "@royalfut/utils";

async function ProfileOrdersPage({
    params,
}: {
    params: {
        ordersPage: number;
    };
}) {
    if (!isNumber(params.ordersPage)) {
        params.ordersPage = 1;
    }

    const orders = await getOrders(null, params.ordersPage);
    return (
        <div className="flex flex-col gap-8">
            {orders && (
                <>
                    <OrderList orders={orders} />
                    <Paginator
                        page={params.ordersPage}
                        orders={orders}
                        route={"/profile/orders"}
                    />
                </>
            )}
        </div>
    );
}

export default ProfileOrdersPage;
