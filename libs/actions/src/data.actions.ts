"use server";

import { getTranslations } from "next-intl/server";
import { PROJECT_PUBLIC_ROUTES, EXTERNAL_LINKS } from "@royalfut/collections";
import { EUIBenefitIDs, EUIOptionCardIDs } from "@royalfut/enums";

import type {
    IBenefitCardEntity,
    ICarouselPromoCards,
    TOptionCardEntity,
} from "@royalfut/interfaces";

export const getBenefitCards = async (): Promise<Array<IBenefitCardEntity>> => {
    const t = await getTranslations("vpr_home");

    return [
        {
            id: EUIBenefitIDs.EXPERIENCE,
            title: t("benefit.1.title"),
            desc: t("benefit.1.desc"),
        },
        {
            id: EUIBenefitIDs.SAFE,
            title: t("benefit.2.title"),
            desc: t("benefit.2.desc"),
        },
        {
            id: EUIBenefitIDs.SERVICE,
            title: t("benefit.3.title"),
            desc: t("benefit.3.desc"),
        },
        {
            id: EUIBenefitIDs.PRICING,
            title: t("benefit.4.title"),
            desc: t("benefit.4.desc"),
        },
    ];
};

export const getOptionCards = async (): Promise<Array<TOptionCardEntity>> => {
    const t = await getTranslations("car_home");

    return [
        {
            id: EUIOptionCardIDs.COIN_BUNDLES,
            title: t("coins.options.1.title"),
            desc: t("coins.options.1.desc"),
            type: "link",
            url: PROJECT_PUBLIC_ROUTES["COINS"],
        },
        {
            id: EUIOptionCardIDs.SBC_SOLVER,
            title: t("coins.options.2.title"),
            desc: t("coins.options.2.title"),
            type: "sponsor",
            url: `${EXTERNAL_LINKS.SBC_SOLVER}?referrer=k4q3g74nytsdhb9epoc1mk4x`,
        },
    ];
};

export const getPromoCarouselData = async (): Promise<
    Array<ICarouselPromoCards>
> => {
    const [t1, t2] = await Promise.all([
        getTranslations("cs_home"),
        getTranslations("vpr_home"),
    ]);

    return [
        {
            id: "1",
            url: "/video/promo/1.mp4",
            action: {
                title: t1("carousel.promo.action.title"),
            },
            title: t1("carousel.promo.1.title"),
            description: t2("carousel.promo.1.desc"),
        },
        {
            id: "2",
            url: "/video/promo/2.mp4",
            title: t1("carousel.promo.2.title"),
            action: {
                title: t1("carousel.promo.action.title"),
            },
            description: t1("carousel.promo.2.desc"),
        },
        {
            id: "3",
            url: "/video/promo/3.mp4",
            title: t1("carousel.promo.3.title"),
            action: {
                title: t1("carousel.promo.action.title"),
            },
            description: t1("carousel.promo.3.desc"),
        },
        {
            id: "4",
            url: "/video/promo/4.mp4",
            title: t1("carousel.promo.4.title"),
            action: {
                title: t1("carousel.promo.action.title"),
            },
            description: t1("carousel.promo.4.desc"),
        },
        {
            id: "5",
            url: "/video/promo/5.mp4",
            title: t1("carousel.promo.5.title"),
            action: {
                title: t1("carousel.promo.action.title"),
            },
            description: t1("carousel.promo.5.desc"),
        },
    ];
};
