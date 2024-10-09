export function mergeArrays<T>(arr1: Array<T>, arr2: Array<T>): Array<T> {
    const mergedArray: Array<T> = [...arr1, ...arr2];
    const uniqueArray: Array<T> = [...new Set(mergedArray)];

    return uniqueArray.filter(Boolean);
}
