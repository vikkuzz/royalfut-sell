import { redirect } from "next/navigation";
import { PROJECT_PUBLIC_SELLER_ROUTES } from "@royalfut/collections";

const DeliveryPage = () => {
    redirect(PROJECT_PUBLIC_SELLER_ROUTES.ORDER_INFO);

    return <span>Awaiting for delivery Page</span>;
};

export default DeliveryPage;
