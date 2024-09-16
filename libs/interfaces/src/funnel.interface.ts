import type {
    EPlatforms,
    EPaymentCollectionGroups,
    EPaymentMethodsIds,
} from "@royalfut/enums";

export interface IPlatformInfo {
    _id: EPlatforms;
    name: string;
    short_name: string;
}

export type TPlatformSets = Record<EPlatforms, IPlatformInfo>;

export type TPaymentMethodsGetCashSets = Record<
    EPaymentCollectionGroups,
    {
        _id: EPaymentCollectionGroups;
        label: string;
        collection: Array<EPaymentMethodsIds>;
    }
>;

export interface IBackupCodeEntity {
    code: string;
    id: string;
}
