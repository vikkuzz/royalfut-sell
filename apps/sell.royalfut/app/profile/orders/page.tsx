import OrderList from "../_components/OrderList";
import Tabs from "../_components/Tabs";

const ProfileOrdersPage = () => {
    return (
        <div className="flex flex-col gap-8">
            <Tabs page="orders" />
            <OrderList />
        </div>
    );
};

export default ProfileOrdersPage;
