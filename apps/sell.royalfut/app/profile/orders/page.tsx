import { Paginator, ProfileNavigationTabs } from "@royalfut/components";
import OrderList from "../_components/OrderList";
import { getOrders } from "@royalfut/actions";
import { API_PROJECT_PRIVATE_SELLER_ROUTES } from "@royalfut/collections";

async function ProfileOrdersPage() {
    const orders = await getOrders(
        null,
        1,
        API_PROJECT_PRIVATE_SELLER_ROUTES.SELLER_ORDERS,
    );
    return (
        <div className="flex flex-col gap-8">
            <ProfileNavigationTabs page="orders" />
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
