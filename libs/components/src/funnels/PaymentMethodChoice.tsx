"use client";

import { useMemo } from "react";
import {
    PaymentVisaMonocolorIcon,
    // ApplePayMonocolorIcon,
    // GooglePayIcon,
    // TinkPayIcon,
    // UnionPayIcon,
    TetherRotatedIcon,
    PaymentMastercardRotatedIcon,
    BTCIcon,
    ETHIcon,
} from "@royalfut/icons";
import { SelectableButton } from "@royalfut/ui";
import { useTransferSelectorStore } from "@royalfut/store";
import { cn } from "@royalfut/utils";
import { EPaymentMethodsIds, EPaymentCollectionGroups } from "@royalfut/enums";

import type { SVGProps, FC } from "react";
import type { TPaymentMethodsGetCashSets, FNCN } from "@royalfut/interfaces";

interface IPaymentMethodChoiceProps {
    sets: TPaymentMethodsGetCashSets;
}

export const iconMap: Record<
    EPaymentMethodsIds,
    { cn?: string; cnIcon?: string; Comp: FC<SVGProps<SVGSVGElement>> }
> = {
    [EPaymentMethodsIds.VISA]: {
        cnIcon: "w-8 h-8",
        Comp: PaymentVisaMonocolorIcon,
    },
    [EPaymentMethodsIds.MASTER_CARD]: {
        cn: "-rotate-12",
        cnIcon: "w-7",
        Comp: PaymentMastercardRotatedIcon,
    },
    // [EPaymentMethodsIds.APPLE_PAY]: {
    //     cnIcon: "w-9 h-9",
    //     Comp: ApplePayMonocolorIcon,
    // },
    // [EPaymentMethodsIds.GOOGLE_PAY]: {
    //     cn: "bg-white px-1.5 py-1 rounded-2xl",
    //     cnIcon: "w-8 h-4",
    //     Comp: GooglePayIcon,
    // },
    // [EPaymentMethodsIds.UNION_PAY]: { cnIcon: "w-8 h-10", Comp: UnionPayIcon },
    // [EPaymentMethodsIds.TINK_VISA]: { cnIcon: "h-8 w-16", Comp: TinkPayIcon },
    [EPaymentMethodsIds.TETHER_CRYPTO]: {
        cn: "rotate-12",
        Comp: TetherRotatedIcon,
    },
    [EPaymentMethodsIds.BITCOIN_CRYPTO]: {
        cn: "-rotate-[14deg]",
        Comp: BTCIcon,
    },
    [EPaymentMethodsIds.ETHEREUM_CRYPTO]: { cn: "!ml-px", Comp: ETHIcon },
};

const PaymentMethodChoice: FNCN<IPaymentMethodChoiceProps> = ({
    sets,
    className,
}) => {
    const setPayment = useTransferSelectorStore.use.setPayment();
    const selectedPayment = useTransferSelectorStore.use.payment();

    const paymentMap = useMemo(
        () => Object.keys(sets) as Array<EPaymentCollectionGroups>,
        [sets],
    );

    return (
        <div className="flex flex-wrap gap-2">
            {paymentMap.map((item) => {
                const isActive = selectedPayment === item;

                return (
                    <SelectableButton
                        onSelect={() => setPayment(item)}
                        isActive={isActive}
                        className={cn(
                            "flex-col basis-28 flex-grow py-2 px-2 gap-1.5",
                            className,
                        )}
                        key={sets[item]._id}
                    >
                        <div className="flex space-x-0.5 items-center justify-center h-8 flex-auto">
                            {sets[item].collection.map((payment) => {
                                const Icon = iconMap[payment];

                                return (
                                    <div
                                        key={payment}
                                        className={cn(
                                            "flex items-center justify-center",
                                            Icon.cn,
                                        )}
                                    >
                                        <Icon.Comp
                                            className={cn(
                                                "text-white w-6 h-6",
                                                Icon.cnIcon,
                                            )}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                        <span className="text-[0.625rem] font-medium text-white-40">
                            {sets[item].label}
                        </span>
                    </SelectableButton>
                );
            })}
        </div>
    );
};

export default PaymentMethodChoice;
