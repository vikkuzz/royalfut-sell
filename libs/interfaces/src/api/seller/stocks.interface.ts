import type {
    WalletWithdrawMethods,
    EPlatforms,
    ECCYIDs,
} from "@royalfut/enums";

export namespace Stocks {
    interface IEntity {
        id: number;
        deliveryMethod: WalletWithdrawMethods;
        coinPrice: number;
        currency: ECCYIDs;
        perN: number;
        platform: EPlatforms;
    }

    export namespace GET {
        export namespace Response {
            export type Body = Array<IEntity>;
        }
    }
}
