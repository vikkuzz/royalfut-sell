export function formatCommaNumber(number: number) {
    if (isNaN(number)) {
        return "Invalid number";
    }

    let formattedNumber = number.toString();
    const parts = formattedNumber.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    formattedNumber = parts.join(".");

    return formattedNumber;
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
