"use server";

import {
    API_PROJECT_PUBLIC_ROUTES,
    API_PROJECT_PRIVATE_WWW_ROUTES,
    API_PROJECT_PUBLIC_WWW_ROUTES,
} from "@royalfut/collections";
import { getToken } from "./auth.actions";
import { ELoyaltyProgrammaAchievementIDs } from "@royalfut/enums";

import type { IAPI, TLoyaltyProgramStatusedLevels } from "@royalfut/interfaces";

export async function getBonusInfo(): Promise<IAPI.Root.Bonus.Info.GET.Response.Body | null> {
    const token = await getToken();
    try {
        const res = await fetch(API_PROJECT_PRIVATE_WWW_ROUTES.BONUS_INFO, {
            method: "GET",
            headers: {
                Accept: "application/json, text/plain",
                "Content-Type": "application/json",
                ...(token
                    ? {
                          Authorization: `Token ${token}`,
                      }
                    : {}),
            },
        });

        if (res.status >= 400) {
            throw new Error();
        }

        const body: IAPI.Root.Bonus.Info.GET.Response.Body = await res.json();

        if (!body) {
            throw new Error();
        }

        return body;
    } catch (e) {
        return null;
    }
}

const mapLoyaltyLevels = (
    levelsArray: IAPI.Root.Bonus.Levels.GET.Response.Body
) => {
    return levelsArray.reduce((acc, curr) => {
        const levelMapping: Record<number, ELoyaltyProgrammaAchievementIDs> = {
            0: ELoyaltyProgrammaAchievementIDs.BRONZE,
            1: ELoyaltyProgrammaAchievementIDs.SILVER,
            2: ELoyaltyProgrammaAchievementIDs.GOLD,
            3: ELoyaltyProgrammaAchievementIDs.INFORM,
            4: ELoyaltyProgrammaAchievementIDs.HERO,
            5: ELoyaltyProgrammaAchievementIDs.ICON,
        };

        const levelKey = levelMapping[curr.level];

        acc[levelKey] = {
            _id: levelKey,
            nextLevelId: levelMapping[curr.level + 1] ?? null,
            level: curr.level,
            requirements: {
                purchases: curr.minOrders,
                coins: curr.coins,
            },
            benefits: {
                cashbackPerc: curr.cashbackPercent,
                bonusPartPerc: curr.bonusPartPercent,
            },
        };

        return acc;
    }, {} as TLoyaltyProgramStatusedLevels);
};

export async function getBonusLevels(): Promise<{
    levels: IAPI.Root.Bonus.Levels.GET.Response.Body;
    levelsByStatus: TLoyaltyProgramStatusedLevels | null;
} | null> {
    try {
        // const token = await getToken();
        const res = await fetch(API_PROJECT_PUBLIC_ROUTES.BONUS_LEVELS, {
            method: "GET",
            headers: {
                Accept: "application/json, text/plain",
                "Content-Type": "application/json",
                // ...(token
                //     ? {
                //           Authorization: `Token ${token}`,
                //       }
                //     : {}),
            },
        });
        if (res.status >= 400) {
            throw new Error();
        }

        const body: IAPI.Root.Bonus.Levels.GET.Response.Body = await res.json();
        if (!body) {
            throw new Error();
        }

        const levels = body.sort((a, b) => a.level - b.level);
        const statused: TLoyaltyProgramStatusedLevels | null =
            !levels || levels?.length === 0 ? null : mapLoyaltyLevels(levels);

        return {
            levels,
            levelsByStatus: statused,
        };
    } catch (e) {
        return null;
    }
}

export async function checkPromo(
    code: string,
    coins: number
): Promise<IAPI.WWW.Promo.CheckPromCode.POST.Response.Body | null> {
    try {
        const reqBody: IAPI.WWW.Promo.CheckPromCode.POST.Request.Body = {
            promoCode: code,
            coinsCount: coins,
        };

        const res = await fetch(API_PROJECT_PUBLIC_WWW_ROUTES.CHECK_PROMO, {
            method: "POST",
            headers: {
                Accept: "application/json, text/plain",
                "Content-Type": "application/json",
                mode: "no-cors",
            },
            body: JSON.stringify(reqBody),
        });

        if (res.status >= 400) {
            throw new Error();
        }

        const body: IAPI.WWW.Promo.CheckPromCode.POST.Response.Body =
            await res.json();

        if (!body) {
            throw new Error();
        }

        return body;
    } catch (e) {
        return null;
    }
}
