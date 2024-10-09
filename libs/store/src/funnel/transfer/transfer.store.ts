/* eslint-disable max-lines */

import { create } from "zustand";
import {
    DefaultWalletSettings,
    CalculationCredentials,
    PaymentAvailableList,
} from "@royalfut/collections";
import {
    formatCommaNumber,
    removeCommasFromNumber,
    calculateSumThreshold,
    CoinConverter,
    calculatePrice,
    roundAndFormatFloat,
    isValueNonDefined,
} from "@royalfut/utils";
import {
    EAppPlatforms,
    ETransferInputValidationErrorTypes,
    ETransferAdjustTypes,
    EWalletWithdrawMethods,
    EPaymentCollectionGroups,
    ECCYIDs,
} from "@royalfut/enums";
import { useCurrencyStore } from "../../ccy";
import { useStocksStore } from "./stocks.provider";
import { createSelectors } from "../../createSelectors";

const initialPrice = 0;

type TPriceBonusRewardsValueType = "perc" | "asis";
interface IPriceBonusRewards {
    value: number;
    type: TPriceBonusRewardsValueType;
}

export interface ITransferState {
    method: EWalletWithdrawMethods;
    platform: EAppPlatforms;
    coinUT: number;
    labelUT: string;
    hasError: null | ETransferInputValidationErrorTypes;
    price: number;
    payment: EPaymentCollectionGroups;
    labelPrice: string;
    bonuses: {
        loyalty?: IPriceBonusRewards;
        discount?: IPriceBonusRewards;
        coupon?: IPriceBonusRewards & { code: string };
    };
    disableAdjust: null | ETransferAdjustTypes;
}

interface ITransferActions {
    setUTCoin: (coin: string) => void;
    setPlatform: (platform: EAppPlatforms) => void;
    setPayment: (method: EPaymentCollectionGroups) => void;
    setPrice: (price: number, label: string) => void;
    resetIfInvalid: () => void;
    setBonuses: <T extends keyof ITransferState["bonuses"]>(
        key: T,
        data: ITransferState["bonuses"][T] | null
    ) => void;
    adjustSumToThreshold: (mutationType: ETransferAdjustTypes) => void;
}

export type TransferStore = ITransferState & ITransferActions;

function sanitizeCoinUTInput(coinUT: string): Partial<ITransferState> {
    const value = removeCommasFromNumber(coinUT);
    if (Number.isNaN(value)) return {};

    let disableAdjust: ITransferState["disableAdjust"] = null;
    let hasError: ITransferState["hasError"] = null;
    if (value > CalculationCredentials.MAX_UT_COINS_INPUT) {
        return {
            hasError:
                ETransferInputValidationErrorTypes.MORE_THAN_AVAILABLE_MAX_VALUE_OF_COINS,
            disableAdjust: ETransferAdjustTypes.PLUS,
        };
    }

    if (value <= CalculationCredentials.MIN_UT_COINS) {
        disableAdjust = ETransferAdjustTypes.MINUS;
    } else if (value >= CalculationCredentials.MAX_UT_COINS) {
        disableAdjust = ETransferAdjustTypes.PLUS;
    }

    if (value < CalculationCredentials.MIN_UT_COINS) {
        hasError =
            ETransferInputValidationErrorTypes.LESS_THAN_AVAILABLE_MIN_VALUE_OF_COINS;
    } else if (value > CalculationCredentials.MAX_UT_COINS) {
        hasError =
            ETransferInputValidationErrorTypes.MORE_THAN_AVAILABLE_MAX_VALUE_OF_COINS;
    }
    const labelUT = formatCommaNumber(value);

    return {
        coinUT: value,
        labelUT,
        hasError,
        disableAdjust,
    };
}

const initialTransferStore: ITransferState = {
    method: DefaultWalletSettings.transfer.method,
    platform: DefaultWalletSettings.transfer.platform,
    coinUT: CalculationCredentials.MIN_UT_COINS,
    labelUT: formatCommaNumber(CalculationCredentials.MIN_UT_COINS),
    hasError: null,
    price: initialPrice,
    bonuses: {},
    payment: EPaymentCollectionGroups.ACQUIRING,
    labelPrice: formatCommaNumber(initialPrice),
    disableAdjust: ETransferAdjustTypes.MINUS,
};

export const useTransferStore = create<TransferStore>(set => ({
    ...initialTransferStore,
    setUTCoin: coinUT => set(sanitizeCoinUTInput(coinUT)),
    setPlatform: platform => set({ platform }),
    setPayment: method =>
        set(store => {
            const discountPercentage = PaymentAvailableList.discount[method];
            let bonuses = store.bonuses ?? {};

            if (discountPercentage) {
                bonuses = {
                    ...bonuses,
                    discount: {
                        value: discountPercentage,
                        type: "perc",
                    },
                };
            } else {
                bonuses = {
                    ...bonuses,
                    discount: undefined,
                };
            }

            return {
                payment: method,
                bonuses,
            };
        }),
    setPrice: (price, label) => set({ price, labelPrice: label }),
    setBonuses: (key, data) =>
        set(store => {
            const bonuses = store.bonuses ?? {};

            return {
                bonuses: {
                    ...bonuses,
                    [key]: data,
                },
            };
        }),
    resetIfInvalid: () =>
        set(store => {
            const ut = store.coinUT;
            if (ut < CalculationCredentials.MIN_UT_COINS) {
                return sanitizeCoinUTInput(
                    String(CalculationCredentials.MIN_UT_COINS)
                );
            } else if (ut > CalculationCredentials.MAX_UT_COINS) {
                return sanitizeCoinUTInput(
                    String(CalculationCredentials.MAX_UT_COINS)
                );
            }
            const roundedUT = CoinConverter.roundCoinsAmount(ut);
            return sanitizeCoinUTInput(String(roundedUT));
        }),
    adjustSumToThreshold: type =>
        set(store => {
            const ut = store.coinUT;
            const threshold = calculateSumThreshold(ut);
            const updatedUT =
                type === ETransferAdjustTypes.MINUS
                    ? ut - threshold
                    : ut + threshold;

            if (updatedUT < CalculationCredentials.MIN_UT_COINS) {
                return sanitizeCoinUTInput(
                    String(CalculationCredentials.MIN_UT_COINS)
                );
            } else if (updatedUT > CalculationCredentials.MAX_UT_COINS) {
                return sanitizeCoinUTInput(
                    String(CalculationCredentials.MAX_UT_COINS)
                );
            }

            return sanitizeCoinUTInput(String(updatedUT));
        }),
}));

export const useTransferSelectorStore = createSelectors(useTransferStore);

export const useTransferActualPrice = (options?: {
    priceDecimalPlaces?: number;
    withoutDiscount?: boolean;
    forceCCYID?: ECCYIDs;
}) => {
    const use = useTransferSelectorStore.use;
    const stocks = useStocksStore(state => state.stocks ?? undefined);
    const method = use.method();
    const bonuses = use.bonuses();
    const platform = use.platform();
    const coinUT = use.coinUT();

    const ccyId = useCurrencyStore(
        state => options?.forceCCYID || state.currency
    );
    const originalPrice = roundAndFormatFloat(
        calculatePrice(method, platform, ccyId, coinUT, stocks),
        options?.priceDecimalPlaces
    );
    let finalPrice = originalPrice;

    if (!options?.withoutDiscount) {
        Object.values(bonuses).forEach(item => {
            if (isValueNonDefined(item, false) || item.value <= 0) return;

            if (item.type === "perc") {
                finalPrice = finalPrice - (finalPrice * item.value) / 100;
            }

            if (item.type === "asis") {
                finalPrice -= item.value;
            }
        });

        finalPrice = roundAndFormatFloat(
            finalPrice,
            options?.priceDecimalPlaces
        );
    }

    const label = formatCommaNumber(finalPrice);
    const originalPriceLabel = formatCommaNumber(originalPrice);

    return {
        label,
        price: finalPrice,
        originalPrice: { price: originalPrice, label: originalPriceLabel },
    };
};
