import type { ECCYIDs, EI18nIds } from "@royalfut/enums";
import type { IIdentifiable } from "./tools.interface";

export interface ICCYCollectionEntity extends IIdentifiable<ECCYIDs> {
    name: string;
    currency: string;
    code: string; // ISO 4217
    symbol: string;
    territory: {
        name: string;
        iso: string; // ISO 3166-1 alpha2
    };
    image: {
        symbol: string;
        flag: string;
    };
}

export interface II18nCollectionEntity extends IIdentifiable<EI18nIds> {
    title: string;
    label: string;
    image: {
        flag: string;
    };
}

export type CCYCollection = Record<ECCYIDs, ICCYCollectionEntity>;
export type I18nCollection = Record<EI18nIds, II18nCollectionEntity>;
