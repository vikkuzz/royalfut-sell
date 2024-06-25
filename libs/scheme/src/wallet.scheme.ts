import {
    TransferInputValidationErrorTypes,
    TransferValidationCredentials,
} from "@royalfut/enums";
import { formatCommaNumber } from "@royalfut/utils";

export const TransferValidationErrorMsgScheme: Record<
    TransferInputValidationErrorTypes,
    string
> = {
    [TransferInputValidationErrorTypes.LESS_THAN_AVAILABLE_MIN_VALUE_OF_COINS]: `The minimum is ${formatCommaNumber(TransferValidationCredentials.MIN_UT_COINS)}`,
    [TransferInputValidationErrorTypes.MORE_THAN_AVAILABLE_MAX_VALUE_OF_COINS]: `The maximum is ${formatCommaNumber(TransferValidationCredentials.MAX_UT_COINS)}`,
};
