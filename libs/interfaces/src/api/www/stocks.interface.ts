/* eslint-disable @typescript-eslint/naming-convention */

import type {
    WalletWithdrawMethods,
    EPlatforms,
    ECCYIDs,
} from "@royalfut/enums";

export namespace Stocks {
    export namespace POST {
        export namespace Response {
            export interface Body {
                deliveryMethods: Array<{
                    type: WalletWithdrawMethods;
                    data: Array<{
                        platform: EPlatforms;
                        pricePerCurrencyMap: Record<ECCYIDs, number>;
                    }>;
                }>;
            }
        }

        export namespace Request {
            export interface Body {
                ip: string;
            }
        }
    }
}
