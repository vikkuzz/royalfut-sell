export type MakeRequiredProps<T, K extends keyof T> = Omit<T, K> & {
    [P in K]-?: T[P];
};
export type MakeRequiredAndNonNullableProps<T, K extends keyof T> = Omit<
    T,
    K
> & { [P in K]-?: NonNullable<T[P]> };

export type NonUndefined<T> = T extends undefined ? never : T;

export type WithRequiredProperty<Type, Key extends keyof Type> = Type & {
    [Property in Key]-?: Type[Property];
};
