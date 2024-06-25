import { redirect } from "next/navigation";
import { PUBLIC_ROUTES } from "@royalfut/collections";

const DeliveryPage = () => {
    redirect(PUBLIC_ROUTES.ORDER_INFO);

    return <span>Awaiting for delivery Page</span>;
};

export default DeliveryPage;
