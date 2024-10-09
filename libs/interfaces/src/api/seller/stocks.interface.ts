import type {
    EWalletWithdrawMethods,
    EAppPlatforms,
    ECCYIDs,
} from "@royalfut/enums";

export namespace Stocks {
    interface IEntity {
        id: number;
        deliveryMethod: EWalletWithdrawMethods;
        coinPrice: number;
        currency: ECCYIDs;
        perN: number;
        platform: EAppPlatforms;
    }

    export namespace GET {
        export namespace Response {
            export type Body = Array<IEntity>;
        }
    }
}
