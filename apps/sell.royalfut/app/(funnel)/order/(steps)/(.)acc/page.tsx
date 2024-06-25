import { OrderStepIds } from "@royalfut/enums";
import { OrderTradeInfo } from "@royalfut/collections";
import { LockSecuredIcon } from "@royalfut/icons";
import EALogin from "./EALogin";
import OrderProcessManager from "../../_components/OrderProcessManager";

import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Account details | Ultimate Team Coin Store",
};

const securityOptions = [
    "End-to-end encryption",
    "Strict access policies",
    "Secure storage",
];

const AccountDetails = () => {
    return (
        <OrderProcessManager
            title="Account details"
            steps={{
                active: OrderStepIds.ACCOUNT_DETAILS,
                availableSteps:
                    OrderTradeInfo[OrderStepIds.ACCOUNT_DETAILS].allowSteps,
            }}>
            <div className="flex flex-col-reverse sm:flex-row sm:justify-between sm:w-full sm:self-center sm:space-x-10">
                <div className="flex flex-col w-full sm:flex-none basis-[140%] sm:w-[23.25rem] sm:max-w-[23.25rem]">
                    <div>
                        <EALogin />
                    </div>
                    <ol className="pl-0 mt-4.5 list-inside list-decimal">
                        <li className="font-medium leading-4 tracking-normal text-left text-xs text-white-60">
                            We would recommend submitting at least 2-3 backup
                            codes
                        </li>
                        <li className="font-medium leading-4 tracking-normal text-left text-xs text-white-60">
                            You can obtain your backup codes on this page:
                            myaccount.ea.com/cp-ui/security/index
                        </li>
                    </ol>
                </div>
                <div className="flex w-full mb-6 sm:mb-0">
                    <div className="flex w-full h-max bg-black-shape rounded-2xl p-4 flex-col">
                        <div className="flex mb-2 w-full items-center sm:items-start">
                            <h3 className="text-2xl leading-7 flex-1 font-bold mr-14">
                                Your data is secured
                            </h3>
                            <div className="relative w-10 h-10 sm:flex-none rounded-full bg-white-10">
                                <LockSecuredIcon className="text-extra-benefit4" />
                            </div>
                        </div>
                        <span className="block text-xs font-medium leading-4 text-white-40">
                            We take all necessary measures to ensure the
                            security of your data and guarantee that it will be
                            used solely for the purpose of processing your
                            order.
                        </span>
                        <ul className="flex pl-0 mt-8 gap-1.5 sm:flex-col sm:gap-1.5">
                            {securityOptions.map((item, idx) => {
                                return (
                                    <li
                                        key={idx}
                                        className="flex items-center gap-1.5">
                                        <span className="w-6 h-6 font-bold bg-extra-benefit4 text-xs flex items-center justify-center rounded-full flex-none text-white">
                                            {idx + 1}
                                        </span>
                                        <span className="font-medium text-xs text-white">
                                            {item}
                                        </span>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </OrderProcessManager>
    );
};

export default AccountDetails;
