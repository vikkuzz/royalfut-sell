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

export interface IOptionCardEntity {
    id: EUIOptionCardIDs;
    title: string;
    desc: string;
}

export interface IBenefitCardEntity {
    id: EUIBenefitIDs;
    title: string;
    desc: string;
}
