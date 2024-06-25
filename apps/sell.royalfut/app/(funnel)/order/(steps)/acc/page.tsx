import { redirect } from "next/navigation";
import { PUBLIC_ROUTES } from "@royalfut/collections";

const AccountDetailsPage = () => {
    redirect(PUBLIC_ROUTES.ORDER_INFO);

    return <span>Account Details Page</span>;
};

export default AccountDetailsPage;
