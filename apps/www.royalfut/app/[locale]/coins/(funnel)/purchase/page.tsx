import { OrderStepProcessing } from "@royalfut/components";
import { Checkout } from "../../../../../src";
import { PageTitle } from "@royalfut/ui";
import { EPaymentFBPage } from "@royalfut/enums";

const MobileView = () => {
    return (
        <Checkout.Root className="flex-col gap-5 sm:hidden">
            <Checkout.PaymentMethodCard className="mb-4" />
            <Checkout.PlatformCard />
            <Checkout.EditableCoinsInputCard variant="dialog" />
            <Checkout.BonusCard showSubtotal={false} showTitle />
            <div className="w-full sticky bottom-0 z-10 flex flex-col gap-4 backdrop-blur-md rounded-2xl -mb-4 pb-2">
                <Checkout.PriceCard asCard />
                <Checkout.PayBtn fbPage={EPaymentFBPage.COINS} />
            </div>
            <Checkout.DetailsCards />
        </Checkout.Root>
    );
};

const Page = async () => {
    return (
        <div className="flex flex-col gap-7">
            <PageTitle className="text-center">Purchase</PageTitle>
            <OrderStepProcessing>
                <MobileView />
                <Checkout.Root className="hidden sm:flex">
                    <Checkout.LeftArea>
                        <Checkout.PaymentMethodCard />
                        <Checkout.EditableCoinsInputCard variant="dialog" />
                    </Checkout.LeftArea>
                    <Checkout.RightArea>
                        <Checkout.PlatformCard />
                        <Checkout.BonusCard showSubtotal={false} showTitle />
                        <Checkout.PriceCard asCard mountedDisabledYet />
                        <Checkout.PayBtn fbPage={EPaymentFBPage.COINS} />
                        <Checkout.DetailsCards />
                    </Checkout.RightArea>
                </Checkout.Root>
            </OrderStepProcessing>
        </div>
    );
};

export default Page;
