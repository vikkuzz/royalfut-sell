import {
    EAppPlatforms,
    EProjects,
    EWalletWithdrawMethods,
} from "@royalfut/enums";

interface ICalculationCredentials {
    MIN_UT_COINS: number;
    MAX_UT_COINS: number;
    MAX_UT_COINS_INPUT: number;
}

const PROJECT_SPECIFIC_CALCULATION_CREDENTIALS: Record<
    EProjects,
    ICalculationCredentials
> = {
    [EProjects.WWW]: {
        MIN_UT_COINS: 100_000,
        MAX_UT_COINS: 30_000_000,
        MAX_UT_COINS_INPUT: 999_999_999,
    },
    [EProjects.SELLER]: {
        MIN_UT_COINS: 100_000,
        MAX_UT_COINS: 20_000_000,
        MAX_UT_COINS_INPUT: 999_999_999,
    },
};

export const CalculationCredentials =
    PROJECT_SPECIFIC_CALCULATION_CREDENTIALS[
        process.env["NEXT_PUBLIC_PROJECT"] as EProjects
    ];

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
        forceValue: CalculationCredentials.MIN_UT_COINS,
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
        forceValue: CalculationCredentials.MAX_UT_COINS,
        step: 2_000_000,
    },
];

export const DefaultWalletSettings = {
    transfer: {
        platform: EAppPlatforms.PlayStation,
        method: EWalletWithdrawMethods.EASY,
    },
};
