import OrderList from "../../_components/OrderList";
import Tabs from "../../_components/Tabs";
import PaymentConfirmed from "../../_components/PaymentConfirmed";

const PaymentSuccessLayout = () => {
    return (
        <div className="flex flex-col gap-8">
            <Tabs page="withdrawals" />
            <OrderList />
            <PaymentConfirmed />
        </div>
    );
};

export default PaymentSuccessLayout;
