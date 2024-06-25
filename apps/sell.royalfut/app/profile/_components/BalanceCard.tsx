"use client";

import { Button, PrimaryGradientBox } from "@royalfut/ui";
import { usePopupDialogStore, useCurrencyStore } from "@royalfut/store";
import { ccyCollection } from "@royalfut/collections";
import { EUIDialogsNames } from "@royalfut/enums";

const BalanceCard = () => {
    const { setPopup } = usePopupDialogStore();
    const ccyId = useCurrencyStore(state => state.currency);

    return (
        <PrimaryGradientBox
            withHover={false}
            className="w-full sm:min-h-[20.9rem] rounded-xl px-7 py-6 flex space-x-4 sm:space-x-0 sm:flex-col justify-between">
            <div className="flex flex-col space-y-8">
                <div className="flex flex-col space-y-4">
                    <p className="text-white/60 text-base font-medium">
                        Available balance{" "}
                        <span className="inline sm:hidden">
                            {ccyCollection[ccyId].symbol}
                        </span>
                    </p>
                    <span className="inline-block text-white font-bold text-5xl sm:text-[3.25rem] leading-10">
                        <span className="hidden sm:inline">
                            {ccyCollection[ccyId].symbol}
                        </span>{" "}
                        503,20
                    </span>
                </div>
                <Button
                    as="button"
                    className="flex sm:hidden px-10 py-6 text-primary font-semibold text-base bg-white hover:bg-white-60 rounded-2xl">
                    Withdraw
                </Button>
            </div>
            <div className="flex justify-between">
                <div className="flex flex-col space-y-3">
                    <div className="flex flex-col space-y-1">
                        <p className="text-white/60 text-base font-medium">
                            Payouts in Progress
                        </p>
                        <span className="text-white text-3xl sm:text-2xl font-bold">
                            {ccyCollection[ccyId].symbol} 23,30
                        </span>
                    </div>
                    <div className="flex flex-col space-y-1">
                        <p className="text-white/60 text-base font-medium">
                            Pending Deals
                        </p>
                        <span className="text-white text-3xl sm:text-2xl font-bold">
                            {ccyCollection[ccyId].symbol} 250,20
                        </span>
                    </div>
                </div>
                <div className="flex items-end">
                    <div className="flex justify-end">
                        <Button
                            as="button"
                            onClick={() => setPopup(EUIDialogsNames.WITHDRAW)}
                            className="hidden sm:flex px-10 py-6 text-primary font-semibold text-base bg-white hover:opacity-90 rounded-2xl">
                            Withdraw
                        </Button>
                    </div>
                </div>
            </div>
        </PrimaryGradientBox>
    );
};

export default BalanceCard;
