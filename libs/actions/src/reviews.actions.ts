"use server";

import { API_PROJECT_PUBLIC_ROUTES } from "@royalfut/collections";

import type { IAPI } from "@royalfut/interfaces";

export const getTrustpilotReviews =
    async (): Promise<IAPI.WWW.Reviews.Trustpilot.GET.Response.Body> => {
        try {
            const res = await fetch(API_PROJECT_PUBLIC_ROUTES.GET_REVIEWS, {
                method: "GET",
                headers: {
                    Accept: "application/json, text/plain",
                    "Content-Type": "application/json",
                },
                cache: "no-cache",
            });

            if (res.status >= 400) {
                throw new Error();
            }

            const body: IAPI.WWW.Reviews.Trustpilot.GET.Response.Body =
                await res.json();
            if (!body) {
                throw new Error();
            }

            return body;
        } catch (e) {
            return [];
        }
    };
