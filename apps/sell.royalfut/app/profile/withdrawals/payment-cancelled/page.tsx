import OrderList from "../../_components/OrderList";
import Tabs from "../../_components/Tabs";
import PaymentCancelled from "../../_components/PaymentCancelled";

const PaymentSuccessLayout = () => {
    return (
        <div className="flex flex-col gap-8">
            <Tabs page="withdrawals" />
            <OrderList />
            <PaymentCancelled />
        </div>
    );
};

export default PaymentSuccessLayout;
