"use server";

import { headers } from "next/headers";
import { ORDER_PROCESSING_STEPS_INFO } from "@royalfut/collections";

import type { EOrderProcessingStepIds } from "@royalfut/enums";

const compareLastPathSegment = (path1: string, path2: string) => {
    const lastSegment1 = path1.split("/").filter(Boolean).pop();
    const lastSegment2 = path2.split("/").filter(Boolean).pop();

    return lastSegment1 === lastSegment2;
};

export const determineOrderProcessingStepByUrl = async (
    fbStep: EOrderProcessingStepIds
) => {
    const headersList = headers();
    const fullUrl = headersList.get("x-url") || "";
    try {
        const { pathname } = new URL(fullUrl);
        const info = Object.values(ORDER_PROCESSING_STEPS_INFO).find(info => {
            return compareLastPathSegment(info.to, pathname);
        });

        return info?._id || fbStep;
    } catch (e) {
        return fbStep;
    }
};
