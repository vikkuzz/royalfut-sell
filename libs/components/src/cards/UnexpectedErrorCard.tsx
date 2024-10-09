"use client";

import { PROJECT_PUBLIC_ROUTES } from "@royalfut/collections";
import { ErrorRoundedFillIcon } from "@royalfut/icons";
import { BaseBox, LinkButton, Button } from "@royalfut/ui";

const UnexpectedErrorCard = () => {
    const reloadPage = () => {
        window.location.reload();
    };

    return (
        <div className="flex flex-col gap-5 bg-[hsla(var(--color-system-error),.1)] rounded-xl px-4 py-6 justify-center items-center mx-auto max-w-sm">
            <div className="flex flex-col gap-3.5 items-center">
                <div className="flex items-center gap-2">
                    <ErrorRoundedFillIcon className="text-system-error w-6 h-6 flex-none" />
                    <span className="text-xl text-white uppercase font-semibold opacity-90 leading-6 text-center tracking-tight	">
                        Unexpected error
                    </span>
                </div>
                <span className="text-base text-white leading-6 text-center">
                    Please try refreshing the page. If the issue persists,
                    contact our support team for assistance.
                </span>
            </div>
            <div className="flex gap-3">
                <BaseBox
                    className="text-white text-base font-medium opacity-80 hover:opacity-100 bg-transparent ring-white ring-1 hover:bg-transparent hover:ring-system-info hover:text-system-info"
                    size="md"
                    screen="landscape"
                    asSize
                    asChild>
                    <LinkButton
                        vtype="secondary"
                        href={PROJECT_PUBLIC_ROUTES["CONTACT"]}>
                        Contact
                    </LinkButton>
                </BaseBox>
                <BaseBox
                    className="text-white text-base font-medium opacity-80 hover:opacity-100 bg-transparent ring-white ring-1 hover:bg-transparent hover:ring-system-info hover:text-system-info"
                    size="md"
                    screen="landscape"
                    asSize
                    asChild>
                    <Button onClick={reloadPage} vtype="secondary">
                        Reload
                    </Button>
                </BaseBox>
            </div>
        </div>
    );
};

export default UnexpectedErrorCard;
