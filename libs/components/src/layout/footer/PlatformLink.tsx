"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@royalfut/ui";
import { useTransferSelectorStore } from "@royalfut/store";
import { PlatformSets, PROJECT_PUBLIC_ROUTES } from "@royalfut/collections";

import type { FC } from "react";
import type { EPlatforms } from "@royalfut/enums";

interface IPlatformLinkProps {
    id: EPlatforms;
}

const PlatformLink: FC<IPlatformLinkProps> = ({ id }) => {
    const router = useRouter();
    const setPlatform = useTransferSelectorStore.use.setPlatform();

    const onRoutePlatform = useCallback(() => {
        setPlatform(id);
        router.push(PROJECT_PUBLIC_ROUTES["ORDER"]);
    }, [id, router, setPlatform]);

    return (
        <Button
            as="button"
            onClick={onRoutePlatform}
            className="text-white-60 hover:text-white active:text-white text-base font-medium"
        >
            {PlatformSets[id].short_name}
        </Button>
    );
};

export default PlatformLink;
