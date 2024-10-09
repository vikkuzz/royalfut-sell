import {
    isToday,
    isYesterday,
    isThisWeek,
    isThisMonth,
    isThisYear,
    parseISO,
} from "date-fns";
import { API_PROJECT_PRIVATE_WWW_ROUTES } from "@royalfut/collections";
import { ETimePeriod } from "@royalfut/enums";
import { getToken } from "./auth.actions";

import type { IAPI } from "@royalfut/interfaces";

function isLastWeek(date: Date): boolean {
    const now = new Date();
    const lastWeekStart = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() - 7
    );
    return date > lastWeekStart && date < now && !isThisWeek(date);
}

function isLastMonth(date: Date): boolean {
    const now = new Date();
    const lastMonthStart = new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        now.getDate()
    );
    return date > lastMonthStart && !isThisMonth(date);
}

function groupByTime(
    items: IAPI.WWW.Profile.Order.GET.Response.Body["orders"]
) {
    const groups: IAPI.WWW.Profile.Order.GET.Response.Body["groups"] = {
        [ETimePeriod.TODAY]: [],
        [ETimePeriod.YESTERDAY]: [],
        [ETimePeriod.LAST_WEEK]: [],
        [ETimePeriod.LAST_MONTH]: [],
        [ETimePeriod.LAST_YEAR]: [],
        [ETimePeriod.OLDER]: [],
    };

    items.forEach(item => {
        const createdAt = parseISO(item.createdAt);
        if (isToday(createdAt)) {
            groups[ETimePeriod.TODAY].push(item);
        } else if (isYesterday(createdAt)) {
            groups[ETimePeriod.YESTERDAY].push(item);
        } else if (isThisWeek(createdAt)) {
            groups[ETimePeriod.LAST_WEEK].push(item);
        } else if (isLastWeek(createdAt)) {
            groups[ETimePeriod.LAST_WEEK].push(item);
        } else if (isThisMonth(createdAt)) {
            groups[ETimePeriod.LAST_MONTH].push(item);
        } else if (isLastMonth(createdAt)) {
            groups[ETimePeriod.LAST_MONTH].push(item);
        } else if (isThisYear(createdAt)) {
            groups[ETimePeriod.LAST_YEAR].push(item);
        } else {
            groups[ETimePeriod.OLDER].push(item);
        }
    });

    return groups;
}

export const getCoinOrderTransactionData = async (
    page: number,
    limit: number
): Promise<IAPI.WWW.Profile.Order.GET.Response.Body | null> => {
    try {
        const token = await getToken();
        const res = await fetch(
            `${API_PROJECT_PRIVATE_WWW_ROUTES.GET_ORDER}?page=${page}&limit=${limit}`,
            {
                method: "GET",
                headers: {
                    Accept: "application/json, text/plain",
                    "Content-Type": "application/json",
                    Authorization: `Token ${token}`,
                },
                cache: "no-cache",
            }
        );

        if (res.status >= 400) {
            throw new Error();
        }

        const body: IAPI.WWW.Profile.Order.GET.Response.Body = await res.json();
        if (!body) {
            throw new Error();
        }

        return { ...body, groups: groupByTime(body.orders) };
    } catch (e) {
        return null;
    }
};
