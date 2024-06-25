// import round from "lodash.round";

export function roundToNearestPowerOfTen(value: number) {
    const magnitude = Math.pow(10, Math.floor(Math.log10(value)));
    const roundedValue = Math.ceil(value / magnitude) * magnitude;
    return roundedValue;
}

export function roundAndFormatFloat(num: number, decimalPlaces = 2) {
    const roundedNum = num.toFixed(2); // round(num, decimalPlaces)
    const numStr = roundedNum.toString();

    // Remove trailing zeros
    const trimmedNum = numStr.replace(/(\.\d*?[1-9])0+$/, "$1");

    return +trimmedNum;
}