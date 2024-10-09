import { LayoutViewportSectionFrame } from "@royalfut/ui";
import { EPaymentMethodsIds } from "@royalfut/enums";
import { PaymentAvailableList } from "@royalfut/collections";
import {
    PaymentVisaMonocolorIcon,
    PaymentMastercardRotatedIcon,
    ETHIcon,
    TetherRotatedIcon,
    BTCIcon,
    ApplePayMonocolorIcon,
    GooglePayIcon,
    TinkPayIcon,
    UnionPayIcon,
} from "@royalfut/icons";
import { cn } from "@royalfut/utils";

import type { ComponentProps, FC } from "react";

const iconMap: Record<EPaymentMethodsIds, FC<ComponentProps<"svg">>> = {
    [EPaymentMethodsIds.VISA]: PaymentVisaMonocolorIcon,
    [EPaymentMethodsIds.MASTER_CARD]: PaymentMastercardRotatedIcon,
    [EPaymentMethodsIds.TETHER_CRYPTO]: TetherRotatedIcon,
    [EPaymentMethodsIds.BITCOIN_CRYPTO]: BTCIcon,
    [EPaymentMethodsIds.ETHEREUM_CRYPTO]: ETHIcon,
    [EPaymentMethodsIds.UNION_PAY]: UnionPayIcon,
    [EPaymentMethodsIds.TINK_VISA]: TinkPayIcon,
    [EPaymentMethodsIds.APPLE_PAY]: ApplePayMonocolorIcon,
    [EPaymentMethodsIds.GOOGLE_PAY]: GooglePayIcon,
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
                    {PaymentAvailableList.methods.map((id) => {
                        const Icon = iconMap[id];

                        return (
                            <div
                                key={id}
                                className="flex flex-1 min-h-0 col-span-1 bg-white-5 min-w-[6.875rem] rounded-2xl py-5 px-5 md:px-16 justify-center items-center"
                            >
                                <Icon
                                    className={cn("relative", {
                                        "-rotate-12 w-17 h-16":
                                            id ===
                                                EPaymentMethodsIds.MASTER_CARD ||
                                            id ===
                                                EPaymentMethodsIds.BITCOIN_CRYPTO,
                                        "rotate-12 w-17 h-16":
                                            id ===
                                            EPaymentMethodsIds.TETHER_CRYPTO,
                                        "h-15 w-15":
                                            id ===
                                                EPaymentMethodsIds.ETHEREUM_CRYPTO ||
                                            id === EPaymentMethodsIds.VISA,
                                    })}
                                />
                            </div>
                        );
                    })}
                </div>
            </section>
        </LayoutViewportSectionFrame>
    );
};

export default WithdrawalMethods;
