import { roundToNearestPowerOfTen } from "../numerical";
import {
    CoinRangeCoefficients,
    PricePolicy,
    TPricePolicy,
    CalculationCredentials,
} from "@royalfut/collections";
import {
    EAppPlatforms,
    ECCYIDs,
    EWalletWithdrawMethods,
} from "@royalfut/enums";

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

export const getPriceExchangeRate = (
    method: EWalletWithdrawMethods,
    platform: EAppPlatforms,
    fromCurrency: ECCYIDs,
    toCurrency: ECCYIDs,
    stocks?: TPricePolicy | null
): number => {
    let priceStocks = stocks;

    if (!priceStocks) {
        priceStocks = PricePolicy;
    }

    const stockData = priceStocks[method][platform];
    if (!stockData || !stockData[fromCurrency] || !stockData[toCurrency])
        return 1;

    const fromCurrencyRate = stockData[fromCurrency];
    const toCurrencyRate = stockData[toCurrency];

    return fromCurrencyRate / toCurrencyRate;
};

export function calculatePrice(
    method: EWalletWithdrawMethods,
    platform: EAppPlatforms,
    currency: ECCYIDs,
    coins: number,
    stocks?: TPricePolicy
) {
    let priceStocks = stocks;

    if (!priceStocks) {
        priceStocks = PricePolicy;
    }

    return priceStocks[method][platform][currency] * coins;
}

export function calculateLoyaltyPoint(
    price: number,
    method: EWalletWithdrawMethods,
    platform: EAppPlatforms,
    currency: ECCYIDs,
    cashbackPerc: number,
    stocks?: TPricePolicy | null
) {
    let priceStocks = stocks;

    if (!priceStocks) {
        priceStocks = PricePolicy;
    }

    const usdRate = priceStocks[method][platform][ECCYIDs.USD];
    const actualCcyRate = priceStocks[method][platform][currency];

    const casbhackByCCY = price * (cashbackPerc / 100);
    const pointsByCCY = casbhackByCCY * 10;
    const rateCCYByUSD = usdRate / actualCcyRate;
    const points = pointsByCCY * rateCCYByUSD;

    return {
        pointsPrice: casbhackByCCY,
        points,
    };
}

export function caclulateLoyaltyPerPoint(
    method: EWalletWithdrawMethods,
    platform: EAppPlatforms,
    currency: ECCYIDs,
    stocks?: TPricePolicy
) {
    let priceStocks = stocks;

    if (!priceStocks) {
        priceStocks = PricePolicy;
    }

    const exchangeRate = getPriceExchangeRate(
        method,
        platform,
        currency,
        ECCYIDs.USD,
        priceStocks
    );

    return exchangeRate * 0.1;
}
