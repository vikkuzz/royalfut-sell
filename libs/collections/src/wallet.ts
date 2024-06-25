import {
    TransferValidationCredentials,
    EPlatforms,
    WalletWithdrawMethods,
} from "@royalfut/enums";

type TCoinRangeCoefficients = Array<
    | {
          forceValue: number;
          step: number;
      }
    | {
          factor: number;
          step: number;
      }
>;

export const CoinRangeCoefficients: TCoinRangeCoefficients = [
    {
        forceValue: TransferValidationCredentials.MIN_UT_COINS,
        step: 100_000,
    },
    {
        factor: 0.033,
        step: 100_000,
    },
    {
        factor: 0.13,
        step: 250_000,
    },
    {
        factor: 0.33,
        step: 1_000_000,
    },
    {
        forceValue: TransferValidationCredentials.MAX_UT_COINS,
        step: 2_000_000,
    },
];

export const DefaultWalletSettings = {
    transfer: {
        platform: EPlatforms.PlayStation,
        method: WalletWithdrawMethods.EASY,
    },
};
