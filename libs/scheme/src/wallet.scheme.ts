import { ETransferInputValidationErrorTypes } from "@royalfut/enums";
import { CalculationCredentials } from "@royalfut/collections";
import { formatCommaNumber } from "@royalfut/utils";

export const TransferValidationErrorMsgScheme: Record<
    ETransferInputValidationErrorTypes,
    string
> = {
    [ETransferInputValidationErrorTypes.LESS_THAN_AVAILABLE_MIN_VALUE_OF_COINS]: `The minimum is ${formatCommaNumber(CalculationCredentials.MIN_UT_COINS)}`,
    [ETransferInputValidationErrorTypes.MORE_THAN_AVAILABLE_MAX_VALUE_OF_COINS]: `The maximum is ${formatCommaNumber(CalculationCredentials.MAX_UT_COINS)}`,
};
