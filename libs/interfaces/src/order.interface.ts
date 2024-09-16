import { ECCYIDs } from "@royalfut/enums";

export interface IOrder {
    id: number;
    platform: string;
    coinsAmount: number;
    estimatedPrice: number;
    currency: ECCYIDs;
    mail: string;
    password: string;
    backupCode1: string;
    backupCode2: string;
    backupCode3: string;
    backupCode4: string;
    backupCode5: string;
    backupCode6: string;
    status: string;
    editable: boolean;
    canPlace: boolean;
    createdAt: string;
}
