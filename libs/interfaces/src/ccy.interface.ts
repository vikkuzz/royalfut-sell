import type { ECCYIDs } from "@royalfut/enums";

export interface ICCYCollectionEntity {
    name: string;
    currency: string;
    code: string; // ISO 4217
    symbol: string;
    id: ECCYIDs;
    territory: {
        name: string;
        iso: string; // ISO 3166-1 alpha2
    };
    image: {
        symbol: string;
        flag: string;
    };
}

export type CCYCollection = Record<ECCYIDs, ICCYCollectionEntity>;
