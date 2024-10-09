/* eslint-disable @typescript-eslint/naming-convention */

import type { EAppPlatforms, ESEOPlatforms } from "@royalfut/enums";

export namespace Order {
    interface IOrderReq {
        platform:
            | ESEOPlatforms.PlayStation4
            | EAppPlatforms.PC
            | EAppPlatforms.XBox;
        deliveryMethod: string /** @see EWalletWithdrawMethods First letter is Uppercase */;
        currency: string /** @see ECCYIDs Uppercase */;
        coinCount: number;
        promoCode?: string | null;
    }

    interface IOrderRes {
        order: {
            id: number;
            platform:
                | ESEOPlatforms.PlayStation4
                | EAppPlatforms.PC
                | EAppPlatforms.XBox;
            deliveryMethod: string /** @see EWalletWithdrawMethods First letter is Uppercase */;
            coinCount: number;
            overallPrice: number;
            promoDiscount: number;
            status: "CREATED";
            sumBTC: number;
            sumETH: number;
            sumUSDT: number;
            labels: Array<"EDIT" | "PLACE_ON_FUT" | "PROMO_NOT_FOUND" | string>;
            createdAt: string;
        };
    }

    export namespace Update {
        export namespace PUT {
            export namespace Response {
                export type Body = IOrderRes;
            }

            export namespace Request {
                export type Body = IOrderReq;
            }
        }
    }

    export namespace Create {
        export namespace POST {
            export namespace Response {
                export type Body = IOrderRes;
            }

            export namespace Request {
                export type Body = IOrderReq;
            }
        }
    }
}
