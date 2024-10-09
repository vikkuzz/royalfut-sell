import type { EUIBenefitIDs, EUIOptionCardIDs } from "@royalfut/enums";

export interface ICarouselPromoCards {
    id: string;
    url: string;
    title: string;
    action: {
        title: string;
    };
    description: string;
}

export type TOptionCardEntity = {
    id: EUIOptionCardIDs;
    title: string;
    desc: string;
} & (
    | { type: "link"; url: string }
    | { type?: "sponsor"; url: string }
    | object
);

export interface IBenefitCardEntity {
    id: EUIBenefitIDs;
    title: string;
    desc: string;
}

export interface IBaseNavIdEntity {
    id: string;
    label: string;
}
