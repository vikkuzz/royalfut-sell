/* eslint-disable max-lines */

import { forwardRef } from "react";
import { Link } from "../navs";
import { EAppContacts, EAppSocials } from "@royalfut/enums";
import { BaseBox } from "../box";
import {
    MailMonocolorIcon,
    TelegramMonocolorIcon,
    WhatsappMonocolorIcon,
    TiktokMonocolorIcon,
    TwitchMonocolorIcon,
    YouTubeMonocolorIcon,
    InstagramMonocolorIcon,
} from "@royalfut/icons";
import { SOCIAL_LINKS, SOCIAL_LABELS } from "@royalfut/collections";
import { cn } from "@royalfut/utils";

import type { FC, SVGProps, ComponentPropsWithoutRef, ElementRef } from "react";
import type {
    FNCN,
    TBoxScreenOrientation,
    TBoxSize,
} from "@royalfut/interfaces";

const transitionCn = "transition-colors duration-300";

type TSize = Exclude<TBoxSize, "xs">;

const iconsMap: Record<
    EAppContacts | EAppSocials,
    FC<SVGProps<SVGSVGElement>>
> = {
    [EAppContacts.WHATS_APP]: WhatsappMonocolorIcon,
    [EAppContacts.TELEGRAM]: TelegramMonocolorIcon,
    [EAppContacts.MAIL]: MailMonocolorIcon,
    [EAppSocials.INSTAGRAM]: InstagramMonocolorIcon,
    [EAppSocials.TIK_TOK]: TiktokMonocolorIcon,
    [EAppSocials.YOU_TUBE]: YouTubeMonocolorIcon,
    [EAppSocials.TWITCH]: TwitchMonocolorIcon,
};

const IconRenderer: FNCN<{
    size: TSize;
    Comp: FC<SVGProps<SVGSVGElement>>;
}> = ({ className, size, Comp }) => {
    return (
        <div className="relative">
            <Comp
                className={cn(
                    "text-white group-hover:text-white-65",
                    transitionCn,
                    {
                        "w-6 h-6": size === "sm",
                        "w-8 h-8": size === "md",
                        "w-11 h-11": size === "lg",
                    },
                    className
                )}
            />
        </div>
    );
};

const Label: FNCN<{ label: string; size: TSize }> = ({
    className,
    label,
    size,
}) => {
    return (
        <span
            className={cn(
                "text-white group-hover:text-white-65",
                transitionCn,
                {
                    "text-base font-medium": size === "sm",
                    "text-lg font-semibold": size === "md",
                    "text-xl font-semibold": size === "lg",
                },
                className
            )}>
            {label}
        </span>
    );
};

const GeneralLink = forwardRef<
    ElementRef<typeof Link>,
    Omit<ComponentPropsWithoutRef<typeof Link>, "target">
>(({ className, children, ...props }, externalRef) => {
    return (
        <Link
            target="_blank"
            className={cn("group center", transitionCn, className)}
            {...props}
            ref={externalRef}>
            {children}
        </Link>
    );
});

interface IMediaInfoLinkProps {
    media: EAppContacts | EAppSocials;
    theme?: "1" | "2";
    size?: TSize;
    href?: string;
}

type TMediaVariantProps =
    | { variant: "icon"; screen: TBoxScreenOrientation; asSize?: boolean }
    | {
          variant: "icon-label";
          label?: string;
          options?: { isLabelHiddenOnMobile?: boolean };
      }
    | { variant: "descriptive"; label?: string };

const MediaInfoLink: FNCN<IMediaInfoLinkProps & TMediaVariantProps> = ({
    className,
    href: propsHref,
    media,
    theme = "1",
    size = "md",
    ...props
}) => {
    const href = propsHref ? propsHref : SOCIAL_LINKS[media];
    const Icon = iconsMap[media];
    const boxCn = cn({
        "bg-black-2 hover:bg-white-5": theme === "1",
        "bg-black-dropdown hover:bg-black-shape": theme === "2",
    });

    if (props.variant === "icon") {
        return (
            <BaseBox
                size={size}
                screen={props.screen}
                className={cn(boxCn, className)}
                asSize={props.asSize}
                asChild>
                <GeneralLink href={href} aria-label={media}>
                    <IconRenderer Comp={Icon} size={size} />
                </GeneralLink>
            </BaseBox>
        );
    }

    const label = props.label ? props.label : SOCIAL_LABELS[media];

    if (props.variant === "icon-label") {
        return (
            <GeneralLink
                href={href}
                aria-label={label}
                className={cn(
                    boxCn,
                    {
                        "gap-2 px-3 py-2.5 rounded-lg": size === "sm",
                        "gap-2.5 px-4 py-2.5 rounded-xl": size === "md",
                        "gap-3 px-6 py-3 rounded-2xl": size === "lg",
                    },
                    className
                )}>
                <IconRenderer Comp={Icon} size={size} />
                <Label
                    size={size}
                    label={label}
                    className={cn({
                        "hidden sm:inline-block":
                            props.options?.isLabelHiddenOnMobile,
                    })}
                />
            </GeneralLink>
        );
    }

    if (props.variant === "descriptive") {
        return (
            <GeneralLink
                href={href}
                aria-label={label}
                className={cn(
                    "w-max",
                    {
                        "gap-2": size === "sm",
                        "gap-2.5": size === "md",
                        "gap-3": size === "lg",
                    },
                    className
                )}>
                <IconRenderer Comp={Icon} size={size} />
                <Label
                    size={size}
                    label={label}
                    className={cn({ underline: media === EAppContacts.MAIL })}
                />
            </GeneralLink>
        );
    }

    return <></>;
};

export default MediaInfoLink;
