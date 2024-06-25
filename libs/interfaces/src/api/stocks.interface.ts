/*
https://test-royalfut.com/newapi/seller/stocks:

*/

export interface IStocks {
    id: number;
    deliveryMethod: DeliveryMethod;
    coinPrice: number;
    currency: string;
    perN: number;
    platform: Platform;
}

export enum DeliveryMethod {
    Easy = "Easy",
}

export enum Platform {
    Ps4 = "ps4",
    Xbox = "xbox",
}
