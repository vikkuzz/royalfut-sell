import { EWalletWithdrawMethods } from "@royalfut/enums";

interface IDeliveryTime {
    type: string;
    time: Array<string>;
    translates: string;
}

const timeRanges: Record<
    EWalletWithdrawMethods,
    Record<string, [string, string]>
> = {
    [EWalletWithdrawMethods.EASY]: {
        "1000-299999": [".15", ".30"],
        "300000-799999": [".30", ".50"],
        "800000-1499999": [".50", ".80"],
        "1500000-2999999": ["1.5", "3"],
        "3000000-4999999": ["3", "5"],
        "5000000-1000000000": ["5", "10"],
    },
    [EWalletWithdrawMethods.MANUAL]: {
        "1000-299999": [".25", ".35"],
        "300000-799999": [".35", ".55"],
        "800000-1499999": ["1", "1.5"],
        "1500000-2999999": ["1.5", "3"],
        "3000000-4999999": ["3", "5"],
        "5000000-1000000000": ["5", "10"],
    },
};

const getTimeRange = (
    amount: number,
    method: EWalletWithdrawMethods
): [string, string] | undefined => {
    const ranges = timeRanges[method];
    for (const [range, time] of Object.entries(ranges)) {
        const [min, max] = range.split("-").map(Number);
        if (amount >= min && amount <= max) {
            return time;
        }
    }
    return undefined;
};

export const calculateDeliveryTime = (
    amount: number,
    method: EWalletWithdrawMethods,
    short = false
): IDeliveryTime | undefined => {
    const time = getTimeRange(amount, method);
    if (!time) return undefined;

    const isShort = short ? "Short" : "";
    const isHour = time.some(t => !t.startsWith("."));

    return {
        type: `delivery${isHour ? "Hours" : "Minutes"}${isShort}`,
        time: time.map(t => (t.startsWith(".") ? t.slice(1) : t)),
        translates: isHour ? "h" : "m",
    };
};
