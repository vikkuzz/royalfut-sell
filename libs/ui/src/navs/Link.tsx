import { forwardRef } from "react";
import NextLink from "next/link";
import { I18nLink } from "@royalfut/hooks";

import type { ElementRef, ComponentPropsWithoutRef } from "react";

const Link = forwardRef<
    ElementRef<typeof NextLink>,
    ComponentPropsWithoutRef<typeof NextLink> & { provider?: "i18n" | "next" }
>(({ provider = "i18n", ...props }, externalRef) => {
    const Comp = provider === "next" ? NextLink : I18nLink;

    return <Comp ref={externalRef} {...(props as any)} />;
});

export default Link;
