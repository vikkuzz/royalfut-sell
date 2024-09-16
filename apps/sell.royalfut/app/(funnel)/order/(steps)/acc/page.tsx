import { redirect } from "next/navigation";
import { PROJECT_PUBLIC_SELLER_ROUTES } from "@royalfut/collections";

const AccountDetailsPage = () => {
    redirect(PROJECT_PUBLIC_SELLER_ROUTES.ORDER_INFO);

    return <span>Account Details Page</span>;
};

export default AccountDetailsPage;
