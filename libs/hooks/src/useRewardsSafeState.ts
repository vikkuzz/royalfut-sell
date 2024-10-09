import { ECCYIDs } from "@royalfut/enums";
import {
    useAuthStore,
    useUserBonusStore,
    useRewardsStore,
    useTransferSelectorStore,
    useCurrencyStore,
    useStocksStore,
} from "@royalfut/store";
import {
    calculateLoyaltyPoint,
    calculatePrice,
    getPriceExchangeRate,
    isValueNonDefined,
} from "@royalfut/utils";

export const useLoyaltyPointsCashbackPerc = () => {
    const isLoggedIn = useAuthStore(state => state.isLoggedIn);
    const fallbackLoyaltyLevel = useRewardsStore(
        state => state.loyalty.startingLevel
    );
    const userCashbackPercent = useUserBonusStore(
        state =>
            state.info?.cashbackPercent ?? fallbackLoyaltyLevel?.cashbackPercent
    );

    const perc = isLoggedIn
        ? userCashbackPercent
        : fallbackLoyaltyLevel?.cashbackPercent;

    return isValueNonDefined(perc) ? null : perc;
};

const usePriceAndExchangeRate = () => {
    const activeCurrency = useCurrencyStore(state => state.currency);
    const use = useTransferSelectorStore.use;
    const stocks = useStocksStore(state => state.stocks);
    const method = use.method();
    const coins = use.coinUT();
    const platform = use.platform();

    if (!stocks || !method || !platform) return null;

    const basePriceInUsd = calculatePrice(
        method,
        platform,
        ECCYIDs.USD,
        coins,
        stocks
    );
    const exchangeRateToActiveCurrency = getPriceExchangeRate(
        method,
        platform,
        ECCYIDs.USD,
        activeCurrency,
        stocks
    );

    if (!exchangeRateToActiveCurrency) return null;

    return {
        basePriceInUsd,
        exchangeRateToActiveCurrency,
    };
};

const calculateMaxPoints = (totalCashback: number): number => {
    return Math.floor(totalCashback * 10);
};

const calculatePointsForPrice = (usdPrice: number, percent: number): number => {
    return Math.floor(usdPrice * (percent / 100) * 10);
};

const convertPointsToPrice = (points: number, exchangeRate: number): string => {
    return (points / 10 / exchangeRate).toFixed(2);
};

export const useLoyaltyDiscountCalculation = () => {
    const isLoggedIn = useAuthStore(state => state.isLoggedIn);
    const userBonuses = useUserBonusStore(state => state.info);
    const pricingInfo = usePriceAndExchangeRate();

    if (!isLoggedIn) return null;

    if (!userBonuses || !pricingInfo) return null;

    const { basePriceInUsd, exchangeRateToActiveCurrency } = pricingInfo;

    const maxLoyaltyPoints = calculateMaxPoints(userBonuses.totalCashback);
    const requiredLoyaltyPoints = calculatePointsForPrice(
        basePriceInUsd,
        userBonuses.bonusPartPercent
    );

    const usableLoyaltyPoints = Math.min(
        maxLoyaltyPoints,
        requiredLoyaltyPoints
    );
    const equivalentPriceForLoyaltyPoints = convertPointsToPrice(
        usableLoyaltyPoints,
        exchangeRateToActiveCurrency
    );

    return {
        loyaltyPointsUsed: !isLoggedIn ? 0 : usableLoyaltyPoints,
        priceEquivalentForPoints: !isLoggedIn
            ? "0"
            : equivalentPriceForLoyaltyPoints,
    };
};

export const useLoyaltyPointsCalc = () => {
    const use = useTransferSelectorStore.use;
    const price = use.price();
    const method = use.method();
    const platform = use.platform();
    const ccy = useCurrencyStore(state => state.currency);
    const stocks = useStocksStore(state => state.stocks);
    const cashbackPerc = useLoyaltyPointsCashbackPerc();

    if (!cashbackPerc) {
        return null;
    }

    const loyalty = calculateLoyaltyPoint(
        price,
        method,
        platform,
        ccy,
        cashbackPerc,
        stocks
    );

    if (
        Math.floor(loyalty.points) === 0 ||
        loyalty.pointsPrice === 0 ||
        isValueNonDefined(loyalty.points) ||
        isValueNonDefined(loyalty.pointsPrice)
    ) {
        return null;
    }

    return loyalty;
};

export const useUserCurrentLoyaltyLevelId = () => {
    const isLoggedIn = useAuthStore(state => state.isLoggedIn);
    const { levels, fallbackLevel } = useRewardsStore(state => ({
        levels: state.loyalty.levelsByStatus,
        fallbackLevel: state.loyalty.startingLevel?.level,
    }));
    const userLevel = useUserBonusStore(
        state => state.info?.level ?? fallbackLevel
    );

    return isLoggedIn
        ? {
              level: userLevel ?? null,
              id: levels
                  ? (Object.values(levels).find(
                        item => item.level === userLevel
                    )?._id ?? null)
                  : null,
          }
        : {
              level: fallbackLevel ?? null,
              id: levels
                  ? (Object.values(levels).find(
                        item => item.level === fallbackLevel
                    )?._id ?? null)
                  : null,
          };
};
