import { roundToNearestPowerOfTen } from "../numerical";
import {
    CoinRangeCoefficients,
    PricePolicy,
    TPricePolicy,
    CalculationCredentials,
} from "@royalfut/collections";
import { EPlatforms, ECCYIDs, WalletWithdrawMethods } from "@royalfut/enums";

export function calculateSumThreshold(sum: number) {
    const thresholds = [
        { threshold: 100_000, value: 10_000 },
        { threshold: 300_000, value: 10_000 },
        { threshold: 500_000, value: 20_000 },
        { threshold: 1_000_000, value: 50_000 },
        { threshold: 3_000_000, value: 100_000 },
        { threshold: 6_000_000, value: 500_000 },
        { threshold: 999_999_999, value: 1_000_000 },
    ];

    for (const { threshold, value } of thresholds) {
        if (sum < threshold) {
            return value;
        }
    }

    return 1_000_000;
}

export function calculatCoinRange(
    min: number = CalculationCredentials.MIN_UT_COINS,
    max: number = CalculationCredentials.MAX_UT_COINS
) {
    const result = [];
    const stepFactors = CoinRangeCoefficients;

    for (let i = 0; i < stepFactors.length; i++) {
        const range = stepFactors[i];

        if ("forceValue" in range) {
            result.push({ breakpoint: range.forceValue, step: range.step });
        } else {
            const calculatedRange = (max - min) * range.factor;
            result.push({
                breakpoint: roundToNearestPowerOfTen(calculatedRange),
                step: range.step,
            });
        }
    }

    return result.sort((a, b) => a.breakpoint - b.breakpoint);
}

export function calculatePrice(
    method: WalletWithdrawMethods,
    platform: EPlatforms,
    currency: ECCYIDs,
    coins: number,
    stocks?: TPricePolicy,
) {
    if (stocks && stocks[method][platform]) {
        return stocks[method][platform][currency] * coins;
    } else {
        return PricePolicy[method][platform][currency] * coins;
    }
}
