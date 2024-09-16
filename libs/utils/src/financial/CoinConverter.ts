import { calculatCoinRange } from "./calculate";
import { CalculationCredentials } from "@royalfut/collections";

class CoinConverter {
    private static instance: CoinConverter;
    public coinRanges = calculatCoinRange();

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private constructor() {}

    public static getInstance(): CoinConverter {
        if (!CoinConverter.instance) {
            CoinConverter.instance = new CoinConverter();
        }
        return CoinConverter.instance;
    }

    public convertInputToCoinValue(value: number): number {
        const numericValue: number = +value;

        if (isNaN(numericValue)) {
            return 1;
        }

        if (numericValue <= 100_000) {
            return 1;
        } else if (numericValue <= 1_000_000) {
            return numericValue / 100_000;
        } else if (numericValue <= 4_000_000) {
            return (numericValue - 1_000_000) / 250_000 + 10;
        } else if (numericValue <= 10_000_000) {
            return (numericValue - 4_000_000) / 1_000_000 + 22;
        } else if (numericValue <= 30_000_000) {
            return (numericValue - 10_000_000) / 2_000_000 + 28;
        } else {
            return 38;
        }
    }

    public calculateCoinsValue(inputValue: number): number {
        const numericValue: number = +inputValue;

        if (isNaN(numericValue)) {
            return 0;
        }

        if (numericValue <= 10) {
            return numericValue * 100_000;
        } else if (numericValue <= 22) {
            return (numericValue - 10) * 250_000 + 1_000_000;
        } else if (numericValue <= 28) {
            return (numericValue - 22) * 1_000_000 + 4_000_000;
        } else if (numericValue <= 38) {
            return (numericValue - 28) * 2_000_000 + 10_000_000;
        } else {
            return 30_000_000;
        }
    }

    get coinMinMax() {
        return {
            min: this.convertInputToCoinValue(
                CalculationCredentials.MIN_UT_COINS
            ),
            max: this.convertInputToCoinValue(
                CalculationCredentials.MAX_UT_COINS
            ),
        };
    }

    public roundCoinsAmount(value: number): number {
        const coinValue = this.convertInputToCoinValue(value);
        return Math.round(this.calculateCoinsValue(+coinValue) / 1000) * 1000;
    }
}

export default CoinConverter.getInstance();
