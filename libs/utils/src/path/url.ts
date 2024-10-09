import { isValueNonDefined } from "../is";

export function addSearchParams(
    baseUrl: string,
    params: Record<string, string | number | undefined | null>
) {
    const url = new URL(baseUrl);

    Object.entries(params).forEach(([key, value]) => {
        if (!isValueNonDefined(value)) {
            url.searchParams.append(key, value + "");
        }
    });

    return url.toString();
}
