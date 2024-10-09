"use client";

import { forwardRef } from "react";
import { Button } from "@royalfut/ui";
import { EUIDialogsNames } from "@royalfut/enums";
import { usePopupDialogStore } from "@royalfut/store";

import type { ElementRef, ComponentPropsWithoutRef } from "react";

export const OptionSponsorCardAction = forwardRef<
    ElementRef<"button">,
    ComponentPropsWithoutRef<"button"> & { url: string }
>(({ children, url, ...props }, externalRef) => {
    const { setPopup, setPopupValue } = usePopupDialogStore();

    return (
        <Button
            onClick={() => {
                setPopupValue<EUIDialogsNames.SPONSOR_REDIRECT>({ url });
                setPopup(EUIDialogsNames.SPONSOR_REDIRECT);
            }}
            {...props}
            ref={externalRef}>
            {children}
        </Button>
    );
});
OptionSponsorCardAction.displayName = "OptonSponsorCardAction";
