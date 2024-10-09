import { i18nRedirect } from "@royalfut/hooks";
import { PROJECT_PUBLIC_SELLER_ROUTES } from "@royalfut/collections";

const DeliveryPage = () => {
    i18nRedirect(PROJECT_PUBLIC_SELLER_ROUTES.ORDER_INFO);

    return <span>Awaiting for delivery Page</span>;
};

export default DeliveryPage;
