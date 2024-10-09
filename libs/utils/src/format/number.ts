import { isValueNonDefined } from "../is";

export function formatBySymbolNumber(num: number, symbol: string) {
    if (isValueNonDefined(num)) {
        return "Invalid number";
    }

    let formattedNumber = num.toString();
    const parts = formattedNumber.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, symbol);
    formattedNumber = parts.join(".");

    return formattedNumber;
}

export function formatCommaNumber(num: number) {
    return formatBySymbolNumber(num, ",");
}

export function removeCommasFromNumber(formattedNumber: string) {
    return Number(formattedNumber.replace(/,/g, ""));
}

export function formatNumberShortView(num: number): string {
    const suffixes = ["", "K", "M", "B", "T"];
    const numLength = Math.floor(Math.log10(Math.abs(num)) / 3);

    if (numLength <= 0) {
        return num.toString();
    }

    const shortNum = parseFloat((num / Math.pow(1000, numLength)).toFixed(2));
    const suffix = suffixes[numLength];

    return shortNum + suffix;
}

export function decodeFormattedShortView(formatted: string): number {
    const suffixes = ["", "K", "M", "B", "T"];
    const regex = /^(\d+(\.\d+)?)([KMBT]?)$/; // Match a number with an optional suffix
    const match = formatted.match(regex);

    if (!match) {
        throw new Error("Invalid formatted number");
    }

    const [, numStr, , suffix] = match;
    const num = parseFloat(numStr);
    const multiplier = Math.pow(1000, suffixes.indexOf(suffix));

    return num * multiplier;
}

export function isNumber(value: number | string): boolean {
    if (typeof value === "number") {
        return !isNaN(value);
    }
    if (typeof value === "string") {
        return !isNaN(parseFloat(value)) && value.trim() !== "";
    }
    return false;
}
