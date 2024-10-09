// import {
//     OrderBoxTitle,
//     PaymentMethodChoice,
//     PlatformChoiceAccordion,
//     TransferCoinsEditableInputCard
// } from "@royalfut/components";
// import {
//     OrderProcessingStepsInfo,
//     PaymentMethodsCashGroupSets,
//     PlatformAppSets,
// } from "@royalfut/collections";
// import { EOrderProcessingStepIds } from "@royalfut/enums";
// import EarnMoney from "./EarnMoney";
// import OrderProcessManager from "../../_components/OrderProcessManager";

import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Summary and Sell | Ultimate Team Coin Store",
};

const SummaryAndSell = async () => {
    return (
        <></>
        // <OrderProcessManager
        //     title="Summary and sell"
        //     steps={{
        //         active: EOrderProcessingStepIds.SUMMARY_AND_SELL,
        //         availableSteps:
        //             OrderProcessingStepsInfo[EOrderProcessingStepIds.SUMMARY_AND_SELL].allowSteps,
        //     }}>
        //     <div className="flex flex-col-reverse sm:flex-row sm:justify-between sm:w-full sm:self-center sm:space-x-10">
        //         <div className="flex flex-col w-full sm:flex-none basis-[140%] sm:w-[23.25rem] sm:max-w-[23.25rem] mb-0.5 sm:mb-0">
        //             <div>
        //                 <OrderBoxTitle>
        //                     Your comfort way to get cash
        //                 </OrderBoxTitle>
        //                 <PaymentMethodChoice sets={PaymentMethodsCashGroupSets} />
        //             </div>
        //         </div>
        //         <div className="flex flex-col w-full mb-6 sm:mb-0 space-y-3">
        //             <div className="flex flex-col w-full overflow-hidden bg-black-shape rounded-2xl p-4">
        //                 <OrderBoxTitle className="mb-2">Platform</OrderBoxTitle>
        //                 <PlatformChoiceAccordion sets={PlatformAppSets} />
        //             </div>
        //             <TransferCoinsEditableInputCard title="Coins for sale" />
        //             <div className="flex flex-col w-full h-max bg-black-shape rounded-2xl p-4">
        //                 <OrderBoxTitle className="mb-2">
        //                     You’ll get
        //                 </OrderBoxTitle>
        //                 <EarnMoney />
        //             </div>
        //         </div>
        //     </div>
        // </OrderProcessManager>
    );
};

export default SummaryAndSell;
