import { PointsHistoryCard } from "@royalfut/components";
import { getCoinOrderTransactionData } from "@royalfut/actions";
import { PrimaryGradientBox } from "@royalfut/ui";
import { LoyaltyRanging, LoyaltyBalanceSummary } from "./ui.client";

const PointsPage = async () => {
    const transactionItemsPerPage = 8;
    const transactionOrders = await getCoinOrderTransactionData(
        1,
        transactionItemsPerPage
    );

    return (
        <>
            <PrimaryGradientBox
                className="center w-full h-max rounded-xl pt-12 pb-8 text-center"
                withHover={false}>
                <div className="max-w-[20.75rem] flex flex-col gap-4">
                    <h2 className="text-xl font-bold text-white">
                        Your ROYAL Points Balance
                    </h2>
                    <LoyaltyBalanceSummary />
                    <p className="font-medium text-sm sm:text-xs text-white">
                        Cover part of the order price with cashback points
                        received from previous purchases. Unlock additional
                        benefits with each new tier reached.
                    </p>
                </div>
            </PrimaryGradientBox>
            <LoyaltyRanging />
            {transactionOrders && (
                <PointsHistoryCard.Root
                    groups={transactionOrders.groups}
                    totalPages={transactionOrders.total ?? 0}
                    orders={transactionOrders.orders ?? []}
                    itemsPerPage={transactionItemsPerPage}>
                    <PointsHistoryCard.Header />
                    <PointsHistoryCard.Body />
                    <PointsHistoryCard.Footer />
                </PointsHistoryCard.Root>
            )}
        </>
    );
};

export default PointsPage;
