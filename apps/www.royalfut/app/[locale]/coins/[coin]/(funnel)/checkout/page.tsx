import { OrderStepProcessing } from "@royalfut/components";
import { Checkout } from "../../../../../../src";
import { PageTitle, BreadcrumbMapper } from "@royalfut/ui";
import { PROJECT_PUBLIC_WWW_ROUTES } from "@royalfut/collections";
import { EPaymentFBPage } from "@royalfut/enums";
import { decodeFormattedShortView } from "@royalfut/utils";
import Revalidate from "./Revalidate";

import type { FC } from "react";

const MobileView = () => {
    return (
        <Checkout.Root className="flex-col gap-5 sm:hidden">
            <Checkout.PaymentMethodCard className="mb-4" />
            <Checkout.PlatformCard />
            <Checkout.EditableCoinsInputCard variant="dialog" />
            <Checkout.BonusCard showSubtotal={false} showTitle />
            <div className="w-full sticky bottom-0 z-10 flex flex-col gap-4 backdrop-blur-md rounded-2xl -mb-4 pb-2">
                <Checkout.PriceCard asCard />
                <Checkout.PayBtn fbPage={EPaymentFBPage.COINS_WITH_AMOUNT} />
            </div>
            <Checkout.DetailsCards />
        </Checkout.Root>
    );
};

const Page: FC<{ params: { coin: string } }> = async ({ params }) => {
    const coinShortView = params.coin.replace("_", ".");
    const coins = decodeFormattedShortView(coinShortView);

    return (
        <>
            <Revalidate coins={coins} />
            <div className="flex flex-col gap-5">
                <BreadcrumbMapper
                    crumbs={[
                        {
                            label: "Home",
                            href: PROJECT_PUBLIC_WWW_ROUTES["HOME"],
                        },
                        {
                            label: "Coin Bundles",
                            href: PROJECT_PUBLIC_WWW_ROUTES["COINS"],
                        },
                        {
                            label: coinShortView,
                            href: `${PROJECT_PUBLIC_WWW_ROUTES["COINS"]}/${coinShortView}`,
                        },
                        {
                            label: "Checkout",
                        },
                    ]}
                />
                <div className="flex flex-col gap-7">
                    <PageTitle className="text-center">Checkout</PageTitle>
                    <OrderStepProcessing>
                        <MobileView />
                        <Checkout.Root className="hidden sm:flex">
                            <Checkout.LeftArea>
                                <Checkout.PaymentMethodCard />
                                <Checkout.EditableCoinsInputCard variant="dialog" />
                            </Checkout.LeftArea>
                            <Checkout.RightArea>
                                <Checkout.PlatformCard />
                                <Checkout.BonusCard
                                    showSubtotal={false}
                                    showTitle
                                />
                                <Checkout.PriceCard asCard mountedDisabledYet />
                                <Checkout.PayBtn
                                    fbPage={EPaymentFBPage.COINS_WITH_AMOUNT}
                                />
                                <Checkout.DetailsCards />
                            </Checkout.RightArea>
                        </Checkout.Root>
                    </OrderStepProcessing>
                </div>
            </div>
        </>
    );
};

export default Page;
