import {
    CoinAmountSelector,
    OrderByPlatforms,
    OrderProcessManager,
    PlatformChoice,
} from "@royalfut/components";
import {
    EAppPlatforms,
    EOrderProcessingStepIds,
    ESEOPlatforms,
} from "@royalfut/enums";
import {
    WWW_OrderProcessingStepsInfo,
    PlatformAppSets,
    PlatformSEOSets,
    PlatformOrderLinks,
} from "@royalfut/collections";
import { cn } from "@royalfut/utils";

import type { FC } from "react";

type TOrderInfoProps =
    | {
          isSEOOptimized: true;
          activePlatformId: ESEOPlatforms | EAppPlatforms;
      }
    | {
          isSEOOPtimized?: false;
      };

export interface IPageProps {
    params?: any;
    searchParams?: any;
}

const OrderInfo: FC<TOrderInfoProps & IPageProps> = ({ ...props }) => {
    return (
        <OrderProcessManager
            title="Buy FC 24 Ultimate Team coins"
            steps={{
                active: EOrderProcessingStepIds.WWW_ORDER_INFO,
                availableSteps:
                    WWW_OrderProcessingStepsInfo[
                        EOrderProcessingStepIds.WWW_ORDER_INFO
                    ]!.allowSteps,
            }}>
            <div>
                <OrderByPlatforms title="Platform">
                    <PlatformChoice.Root
                        className={cn({
                            "sm:[--basis-s:0]":
                                "isSEOOptimized" in props &&
                                props.isSEOOptimized,
                        })}>
                        {"isSEOOptimized" in props && props.isSEOOptimized ? (
                            <PlatformChoice.Links
                                links={PlatformOrderLinks}
                                sets={PlatformSEOSets}
                                activeId={props.activePlatformId}
                            />
                        ) : (
                            <PlatformChoice.Buttons sets={PlatformAppSets} />
                        )}
                    </PlatformChoice.Root>
                </OrderByPlatforms>
                <CoinAmountSelector title="Amount" />
            </div>
        </OrderProcessManager>
    );
};

export default OrderInfo;
