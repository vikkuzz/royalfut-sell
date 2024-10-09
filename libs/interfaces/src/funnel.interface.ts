import type {
    EAppPlatforms,
    EPaymentCollectionGroups,
    EPaymentMethodsIds,
    EOrderProcessingStepIds,
    ESEOPlatforms,
} from "@royalfut/enums";

export interface IPlatformInfo<T extends EAppPlatforms | ESEOPlatforms> {
    _id: T;
    name: {
        v1: string;
        v2?: string;
    };
}

export type TPlatformAppSets = Record<
    EAppPlatforms,
    IPlatformInfo<EAppPlatforms>
>;
export type TPlatformSEOSets = Record<
    ESEOPlatforms,
    IPlatformInfo<ESEOPlatforms>
>;
export type TPlatformSets = Record<string, IPlatformInfo<any>>;

export type TPaymentMethodsCashGroupSets = Record<
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

export interface IOrderProcessingStepInfo {
    _id: EOrderProcessingStepIds;
    to: string;
    title: string;
    allowSteps: Array<EOrderProcessingStepIds>;
    step: number;
}
