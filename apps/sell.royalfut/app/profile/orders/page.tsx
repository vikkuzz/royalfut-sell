import { Paginator } from "@royalfut/components";
import OrderList from "../_components/OrderList";
import Tabs from "../_components/Tabs";
import { getOrders } from "@royalfut/actions";

async function ProfileOrdersPage() {
    const orders = await getOrders(null, 1);
    return (
        <div className="flex flex-col gap-8">
            <Tabs page="orders" />
            {orders && (
                <>
                    <OrderList orders={orders} />
                    <Paginator
                        page={1}
                        orders={orders}
                        route={"/profile/orders"}
                    />
                </>
            )}
        </div>
    );
}

export default ProfileOrdersPage;
