import { Checkout } from "../../../../../../../src";
import { EPaymentFBPage } from "@royalfut/enums";

const MobileView = () => {
    return (
        <Checkout.Root className="flex-col gap-5 sm:hidden">
            <Checkout.PaymentMethodCard className="mb-4" />
            <Checkout.PlatformCard />
            <Checkout.EditableCoinsInputCard />
            <Checkout.BonusCard />
            <div className="w-full sticky bottom-0 z-10 flex flex-col gap-4 backdrop-blur-md rounded-2xl -mb-6 pb-2">
                <Checkout.PriceCard asCard={true} />
                <Checkout.PayBtn fbPage={EPaymentFBPage.ORDER_PLATFORM} />
            </div>
            <Checkout.DetailsCards />
        </Checkout.Root>
    );
};

const Page = () => {
    return (
        <Checkout.Step>
            <MobileView />
            <Checkout.Root className="hidden sm:flex">
                <Checkout.LeftArea>
                    <Checkout.PaymentMethodCard />
                    <Checkout.EditableCoinsInputCard />
                </Checkout.LeftArea>
                <Checkout.RightArea>
                    <Checkout.PlatformCard />
                    <Checkout.BonusCard>
                        <Checkout.PriceCard asCard={false} />
                    </Checkout.BonusCard>
                    <Checkout.PayBtn fbPage={EPaymentFBPage.ORDER_PLATFORM} />
                    <Checkout.DetailsCards />
                </Checkout.RightArea>
            </Checkout.Root>
        </Checkout.Step>
    );
};

export default Page;
