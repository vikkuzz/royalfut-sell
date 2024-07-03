import { ECCYIDs } from "@royalfut/enums";

export interface IPayouts {
    page:         number;
    pageSize:     number;
    totalPages:   number;
    totalRecords: number;
    payouts:      Array<IPayoutOrder>;
}

export interface IPayoutOrder {
    id:             number;
    userId:         number;
    orderId:        any;
    withdrawByType: null | string;
    amount:         number;
    currency:       ECCYIDs;
    transactionId:  any;
    createdAt:      string;
    updatedAt:      any;
}