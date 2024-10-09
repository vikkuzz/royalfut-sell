import type { MakeRequiredProps } from "@royalfut/interfaces";

export type TPaginationStrategies = "standard" | "jump";
export interface IPaginationJumpAvailability {
    canJumpPrev: boolean;
    canJumpNext: boolean;
}
export interface IJumpStrategy {
    strategy?: Extract<TPaginationStrategies, "jump">;
    jumpCount?: number;
}
export interface IStandardStrategy {
    strategy?: Extract<TPaginationStrategies, "standard">;
}
export type TStrategiesOptions = IJumpStrategy | IStandardStrategy;
export type TKnownPaginationRecords = {
    totalItems: number;
    itemsPerPage: number;
    showEdges?: boolean;
} & TStrategiesOptions;
// export type TUnknownPaginationRecords = { totalItems: "unknown"; showEdge?: boolean; };

export type TPaginationRecords =
    // | TUnknownPaginationRecords
    TKnownPaginationRecords;

export interface ISearchParamLinkType {
    linkType: "params";
    baseUrl: string;
    searchParamKey: string;
}
export interface IUrlLinkType {
    linkType: "url";
    baseUrl: string;
}

export type TPaginationLink = ISearchParamLinkType | IUrlLinkType;

export type TOnPageChange = (toPage: number, fromPage: number) => void;
export type TPaginationLinkNavigationMethod = {
    navigationMethod: "link";
} & TPaginationLink;
export interface IPaginationManualNavigationMethod {
    navigationMethod: "manual";
    onPageChange: TOnPageChange;
}

export type TPaginationNavigation =
    | TPaginationLinkNavigationMethod
    | IPaginationManualNavigationMethod;

export interface IPaginationProps {
    currentPage: number;
    visiblePagesLimit?: number;
    records: TPaginationRecords;
    navigation?: TPaginationNavigation;
}

export type TPaginationOptions = MakeRequiredProps<
    Omit<IPaginationProps, "currentPage">,
    "navigation"
>;
