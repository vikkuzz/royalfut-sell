import {
    AppPlatformConversionToSEOMap,
    PlatformOrderLinks,
} from "@royalfut/collections";
import { i18nRedirect } from "@royalfut/hooks";
import OrderInfo from "../_routes/OrderInfo";
import { EAppPlatforms, ESEOPlatforms } from "@royalfut/enums";

import type { FC } from "react";

/*
const getPlatformRedirectUrl = async (platform: string) => {
    const headersList = headers();
    const fullUrl = headersList.get("x-url") || "";
    try {
        const { pathname } = new URL(fullUrl);
        const pathSegments = pathname.split('/').filter(Boolean);
        const seoPlatformArray = Object.keys(PlatformSEOSets);
        const matchingSegment = pathSegments.find(segment => seoPlatformArray.includes(segment));

        if (matchingSegment) return null;

        const seoPlatform = AppPlatformConversionToSEOMap[platform as EAppPlatforms] ?? ESEOPlatforms.PlayStation4;
        
        return pathname.replace(platform, seoPlatform);
    } catch (e) {
        return null;
    }
}
*/

const Page: FC<{
    params: { platform: ESEOPlatforms | EAppPlatforms };
}> = async ({ params }) => {
    const convertedPath =
        AppPlatformConversionToSEOMap[params.platform as EAppPlatforms];

    if (convertedPath) {
        const newUrl = PlatformOrderLinks[convertedPath];

        i18nRedirect(newUrl);
    }

    return <OrderInfo isSEOOptimized activePlatformId={params.platform} />;
};

export default Page;
