export interface II18nRunnerExecutorSchema {
    project: "sell.royalfut" | "royalfut" | "www.royalfut";
    target: "dev" | "start" | "build";
    i18nKeys?: Array<string>;
}
