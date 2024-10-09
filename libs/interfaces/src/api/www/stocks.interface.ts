/* eslint-disable @typescript-eslint/naming-convention */

import type {
    EWalletWithdrawMethods,
    EAppPlatforms,
    ECCYIDs,
} from "@royalfut/enums";

export namespace Stocks {
    export namespace POST {
        export namespace Response {
            export interface Body {
                deliveryMethods: Array<{
                    type: EWalletWithdrawMethods;
                    data: Array<{
                        platform: EAppPlatforms;
                        pricePerCurrencyMap: Record<ECCYIDs, number>;
                    }>;
                }>;
                currency: ECCYIDs;
                locale: string;
                region: string;
                minLimitSumCoins: number;
                maxLimitSumCoins: number;
                discount: Array<unknown>;
                lastRefreshedDate: string;
                paypalEnabled: boolean;
                rate: string;
                reviews: string;
                provider: string;
            }
        }

        export namespace Request {
            export interface Body {
                ip: string;
            }
        }
    }
}
