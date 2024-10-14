import type {
    ECCYIDs,
    ESEOPlatforms,
    EWalletWithdrawMethods,
} from "@royalfut/enums";

export interface IOrder {
    id: number;
    platform: string;
    coinsAmount: number;
    coinCount?: number;
    estimatedPrice: number;
    overallPrice?: number;
    currency: ECCYIDs;
    mail: string;
    password: string;
    email_password?: string;
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
    percentTransferred?: string | number;
    coinTransferred?: string | number;
    backup_codes?: string;
    cashback?: number;
    cashbackUsed?: number;
}

export interface IMapStatus {
    [key: string]: {
        status: string;
        label: string;
        image: string;
        theme: string;
        description: string;
        body: boolean;
        btn_text: string;
        btn_fnc: string;
        transit_coins?: boolean;
        wrong_fields?: string;
        send_btn_text?: string;
        nsI18n?: string;
    };
}

export interface ICoinOrderTransactionData {
    id: number;
    platform: ESEOPlatforms;
    deliveryMethod: EWalletWithdrawMethods;
    coinCount: number;
    overallPrice: number;
    currency: ECCYIDs;
    status: string;
    orderType: string;
    labels: Array<string>;
    createdAt: string;
    coinTransferred: number;
    percentTransferred: number;
    login: string;
    psn_password: string;
    email_password: string;
    backup_codes: string;
    cashback: number;
    cashbackUsed: number;
}
