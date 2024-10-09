export const isBrowser = () =>
    typeof window !== "undefined" && window.document !== undefined;

export const isValueNonDefined = (
    value: any,
    includeNaNCheck: boolean = true
) => {
    if (value === undefined || value === null) {
        return true;
    }

    if (includeNaNCheck && typeof value === "number" && isNaN(value)) {
        return true;
    }

    return false;
};
