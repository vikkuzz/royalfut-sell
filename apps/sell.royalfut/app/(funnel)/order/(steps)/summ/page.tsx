import { redirect } from "next/navigation";
import { PROJECT_PUBLIC_SELLER_ROUTES } from "@royalfut/collections";

const SummarySellPage = () => {
    redirect(PROJECT_PUBLIC_SELLER_ROUTES.ORDER_INFO);

    return <span>Summary and sell page</span>;
};

export default SummarySellPage;
