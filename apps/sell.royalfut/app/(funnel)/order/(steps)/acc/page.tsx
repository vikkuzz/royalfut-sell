import { i18nRedirect } from "@royalfut/hooks";
import { PROJECT_PUBLIC_SELLER_ROUTES } from "@royalfut/collections";

const AccountDetailsPage = () => {
    i18nRedirect(PROJECT_PUBLIC_SELLER_ROUTES.ORDER_INFO);

    return <span>Account Details Page</span>;
};

export default AccountDetailsPage;
