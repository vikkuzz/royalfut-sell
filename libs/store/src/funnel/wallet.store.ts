import { create } from "zustand";
import {
    DefaultWalletSettings,
    DefaultAppSettings,
} from "@royalfut/collections";
import {
    formatCommaNumber,
    removeCommasFromNumber,
    calculateSumThreshold,
    CoinConverter,
    calculatePrice,
    roundAndFormatFloat,
} from "@royalfut/utils";
import {
    EPlatforms,
    TransferInputValidationErrorTypes,
    TransferValidationCredentials,
    TransferAdjustTypes,
    WalletWithdrawMethods,
    EPaymentCollectionGroups,
} from "@royalfut/enums";
import { useCurrencyStore } from "../ccy";
import { createSelectors } from "../createSelectors";

const initialPrice = roundAndFormatFloat(
    calculatePrice(
        DefaultWalletSettings.transfer.method,
        DefaultWalletSettings.transfer.platform,
        DefaultAppSettings.currency,
        TransferValidationCredentials.MIN_UT_COINS
    )
);

export interface ITransferState {
    method: WalletWithdrawMethods;
    platform: EPlatforms;
    coinUT: number;
    labelUT: string;
    hasError: null | TransferInputValidationErrorTypes;
    price: number;
    payment: EPaymentCollectionGroups;
    labelPrice: string;
    disableAdjust: null | TransferAdjustTypes;
}

interface ITransferActions {
    setUTCoin: (coin: string) => void;
    setPlatform: (platform: EPlatforms) => void;
    setPayment: (method: EPaymentCollectionGroups) => void;
    setPrice: (price: number, label: string) => void;
    resetIfInvalid: () => void;
    adjustSumToThreshold: (mutationType: TransferAdjustTypes) => void;
}

export type TransferStore = ITransferState & ITransferActions;

function sanitizeCoinUTInput(coinUT: string): Partial<ITransferState> {
    const value = removeCommasFromNumber(coinUT);
    if (Number.isNaN(value)) return {};

    let disableAdjust: ITransferState["disableAdjust"] = null;
    let hasError: ITransferState["hasError"] = null;
    if (value > TransferValidationCredentials.MAX_UT_COINS_INPUT) {
        return {
            hasError:
                TransferInputValidationErrorTypes.MORE_THAN_AVAILABLE_MAX_VALUE_OF_COINS,
            disableAdjust: TransferAdjustTypes.PLUS,
        };
    }

    if (value <= TransferValidationCredentials.MIN_UT_COINS) {
        disableAdjust = TransferAdjustTypes.MINUS;
    } else if (value >= TransferValidationCredentials.MAX_UT_COINS) {
        disableAdjust = TransferAdjustTypes.PLUS;
    }

    if (value < TransferValidationCredentials.MIN_UT_COINS) {
        hasError =
            TransferInputValidationErrorTypes.LESS_THAN_AVAILABLE_MIN_VALUE_OF_COINS;
    } else if (value > TransferValidationCredentials.MAX_UT_COINS) {
        hasError =
            TransferInputValidationErrorTypes.MORE_THAN_AVAILABLE_MAX_VALUE_OF_COINS;
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
    coinUT: TransferValidationCredentials.MIN_UT_COINS,
    labelUT: formatCommaNumber(TransferValidationCredentials.MIN_UT_COINS),
    hasError: null,
    price: initialPrice,
    payment: EPaymentCollectionGroups.FIRST,
    labelPrice: formatCommaNumber(initialPrice),
    disableAdjust: TransferAdjustTypes.MINUS,
};

export const useTransferStore = create<TransferStore>(set => ({
    ...initialTransferStore,
    setUTCoin: coinUT => set(sanitizeCoinUTInput(coinUT)),
    setPlatform: platform => set({ platform }),
    setPayment: method => set({ payment: method }),
    setPrice: (price, label) => set({ price, labelPrice: label }),
    resetIfInvalid: () =>
        set(store => {
            const ut = store.coinUT;
            if (ut < TransferValidationCredentials.MIN_UT_COINS) {
                return sanitizeCoinUTInput(
                    String(TransferValidationCredentials.MIN_UT_COINS)
                );
            } else if (ut > TransferValidationCredentials.MAX_UT_COINS) {
                return sanitizeCoinUTInput(
                    String(TransferValidationCredentials.MAX_UT_COINS)
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
                type === TransferAdjustTypes.MINUS
                    ? ut - threshold
                    : ut + threshold;

            if (updatedUT < TransferValidationCredentials.MIN_UT_COINS) {
                return sanitizeCoinUTInput(
                    String(TransferValidationCredentials.MIN_UT_COINS)
                );
            } else if (updatedUT > TransferValidationCredentials.MAX_UT_COINS) {
                return sanitizeCoinUTInput(
                    String(TransferValidationCredentials.MAX_UT_COINS)
                );
            }

            return sanitizeCoinUTInput(String(updatedUT));
        }),
}));

export const useTransferSelectorStore = createSelectors(useTransferStore);

export const useActualPrice = (options?: { priceDecimalPlaces?: number }) => {
    const use = useTransferSelectorStore.use;
    const method = use.method();
    const platform = use.platform();
    const coinUT = use.coinUT();

    const ccyId = useCurrencyStore(state => state.currency);
    const price = roundAndFormatFloat(
        calculatePrice(method, platform, ccyId, coinUT),
        options?.priceDecimalPlaces
    );
    const label = formatCommaNumber(price);

    return { label, price };
};
