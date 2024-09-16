export function excludeProps<T extends Record<string, any>, K extends keyof T>(
    obj: T,
    propsToExclude: Array<K>,
): Omit<T, K> {
    const result: Partial<T> = {};

    for (const prop in obj) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (!propsToExclude.includes(prop as K)) {
            result[prop] = obj[prop];
        }
    }

    return result as Omit<T, K>;
}
