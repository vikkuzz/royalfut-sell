import { LayoutViewportSectionFrame } from "@royalfut/ui";
import { cn } from "@royalfut/utils";
import { EPaymentMethodsIds } from "@royalfut/enums";
import {
    PaymentVisaMonocolorIcon,
    PaymentMastercardRotatedIcon,
    ETHIcon,
    TetherRotatedIcon,
    BTCIcon,
} from "@royalfut/icons";

import type { ComponentProps, FC } from "react";

const iconMap: Record<EPaymentMethodsIds, FC<ComponentProps<"svg">>> = {
    [EPaymentMethodsIds.VISA]: PaymentVisaMonocolorIcon,
    [EPaymentMethodsIds.MASTER_CARD]: PaymentMastercardRotatedIcon,
    [EPaymentMethodsIds.TETHER_CRYPTO]: TetherRotatedIcon,
    [EPaymentMethodsIds.BITCOIN_CRYPTO]: BTCIcon,
    [EPaymentMethodsIds.ETHEREUM_CRYPTO]: ETHIcon,
};

const LogoCard: FC<{ payment: EPaymentMethodsIds; imgWrapperCn?: string }> = ({
    payment,
    imgWrapperCn,
}) => {
    const Icon = iconMap[payment];

    return (
        <div className="flex flex-1 min-h-0 col-span-1 bg-white-5 min-w-[6.875rem] rounded-2xl py-5 px-5 md:px-16 justify-center items-center">
            <Icon className={cn("relative h-15 w-15", imgWrapperCn)} />
        </div>
    );
};

const WithdrawalMethods = () => {
    return (
        <LayoutViewportSectionFrame asChild>
            <section className="flex flex-col mt-24 items-center">
                <div className="mb-10">
                    <h2 className="w-auto text-6xl font-bold text-white text-center">
                        Withdrawal methods
                    </h2>
                </div>
                <div className="max-w-xl">
                    <span className="text-white-60 text-base font-medium inline-block leading-tight text-center">
                        Choose any convenient method of withdrawal. The average
                        funds transfer is 1-2h after your withdrawal request.
                    </span>
                </div>
                <div className="flex flex-wrap gap-2 md:gap-6 py-6 md:py-10">
                    <LogoCard
                        payment={EPaymentMethodsIds.MASTER_CARD}
                        imgWrapperCn="w-17 h-16 -rotate-12"
                    />
                    <LogoCard payment={EPaymentMethodsIds.VISA} />
                    <LogoCard
                        payment={EPaymentMethodsIds.BITCOIN_CRYPTO}
                        imgWrapperCn="w-17 h-16 -rotate-12"
                    />
                    <LogoCard
                        payment={EPaymentMethodsIds.TETHER_CRYPTO}
                        imgWrapperCn="w-17 h-16 rotate-12"
                    />
                    <LogoCard payment={EPaymentMethodsIds.ETHEREUM_CRYPTO} />
                </div>
            </section>
        </LayoutViewportSectionFrame>
    );
};

export default WithdrawalMethods;
