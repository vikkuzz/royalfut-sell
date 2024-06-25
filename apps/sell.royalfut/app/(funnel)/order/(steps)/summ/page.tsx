import { redirect } from "next/navigation";
import { PUBLIC_ROUTES } from "@royalfut/collections";

const SummarySellPage = () => {
    redirect(PUBLIC_ROUTES.ORDER_INFO);

    return <span>Summary and sell page</span>;
};

export default SummarySellPage;
