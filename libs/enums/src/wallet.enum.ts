export const enum TransferValidationCredentials {
    MIN_UT_COINS = 100_000,
    MAX_UT_COINS = 20_000_000,
    MAX_UT_COINS_INPUT = 999_999_999,
}

export const enum TransferAdjustTypes {
    MINUS = "minus",
    PLUS = "plus",
}

export const enum TransferInputValidationErrorTypes {
    LESS_THAN_AVAILABLE_MIN_VALUE_OF_COINS = "ltamvoc",
    MORE_THAN_AVAILABLE_MAX_VALUE_OF_COINS = "mtamvoc",
}

export const enum WalletWithdrawMethods {
    EASY = "easy",
    MANUAL = "manual",
}
