"use client";

import { useCallback, useEffect, useState } from "react";
import { useI18nRouter } from "@royalfut/hooks";
import { TradeSummaryPanel } from "../../ui";
import { GradientButton } from "@royalfut/ui";
import { ArrowChevronRightIcon } from "@royalfut/icons";
import { PROJECT_PRIVATE_WWW_ROUTES } from "@royalfut/collections";

const AwaitingDeliveryAction = () => {
    const router = useI18nRouter();
    const [timeLeft, setTimeLeft] = useState(8);

    const toOrder = useCallback(() => {
        router.replace(PROJECT_PRIVATE_WWW_ROUTES.PROFILE_ORDERS, {
            scroll: true,
        });
    }, [router]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (timeLeft > 0) {
                setTimeLeft(prevTime => prevTime - 1);
            }
        }, 1000);

        if (timeLeft === 0) {
            toOrder();
        }

        return () => clearTimeout(timer);
    }, [timeLeft, toOrder]);

    return (
        <TradeSummaryPanel className="mt-6 sm:mt-9 sm:space-x-2 sm:max-h-max h-max pb-3 sm:pb-0 !flex-col justify-center items-center space-y-0">
            <GradientButton
                onClick={toOrder}
                className="group h-[4.25rem] w-full sm:w-72 mb-4">
                <span className="text-xl">Go to orders</span>
                <ArrowChevronRightIcon className="text-white w-6 h-6 group-hover:animate-shake-r-sm group-hover:animate-infinite group-hover:animate-duration-[1300ms] group-hover:animate-ease-linear" />
            </GradientButton>
            <div className="w-full sm:w-72 text-center flex flex-col justify-center">
                <span className="text-sm font-medium text-white-60">
                    Redirect to the orders automatically
                </span>
                <span className="underline text-white text-sm font-medium">
                    in {timeLeft} seconds
                </span>
            </div>
        </TradeSummaryPanel>
    );
};

export default AwaitingDeliveryAction;
