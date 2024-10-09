import { isBrowser } from "../is";
import {
    AppPlatformConversionToSEOMap,
    PlatformSEOSets,
} from "@royalfut/collections";

import type { EAppPlatforms } from "@royalfut/enums";

export const getURLWithPlatform = (platform: string) => {
    if (!isBrowser()) {
        throw new Error("getURLWithPlatform only work on browser envionment");
    }

    const pathname = new URL(window.location.href).pathname;
    const seoPlatformArray = Object.keys(PlatformSEOSets);
    const findedSegment = seoPlatformArray.find(
        segment => platform === segment
    );
    const seoPlatform = findedSegment
        ? findedSegment
        : AppPlatformConversionToSEOMap[platform as EAppPlatforms];

    const pathSegments = pathname.split("/").filter(Boolean);
    const matchingSegment = pathSegments.find(segment =>
        seoPlatformArray.includes(segment)
    );

    if (matchingSegment && seoPlatform) {
        const newHref = pathname.replace(
            matchingSegment as string,
            seoPlatform
        );
        return { pathname: newHref, platform: matchingSegment };
    }

    return null;
};
