import { i18nRedirect } from "@royalfut/hooks";
import { PROJECT_PUBLIC_SELLER_ROUTES } from "@royalfut/collections";

const SummarySellPage = () => {
    i18nRedirect(PROJECT_PUBLIC_SELLER_ROUTES.ORDER_INFO);

    return <span>Summary and sell page</span>;
};

export default SummarySellPage;
