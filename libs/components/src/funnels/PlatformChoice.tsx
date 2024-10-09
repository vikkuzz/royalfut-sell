"use client";

import { useMemo } from "react";
import { useTransferSelectorStore } from "@royalfut/store";
import {
    PlayStationMonocolorIcon,
    XboxMonocolorIcon,
    PCMonocolorIcon,
} from "@royalfut/icons";
import {
    PlatformAppSets,
    SEOPlatformConversionMap,
} from "@royalfut/collections";
import { SelectableButton } from "@royalfut/ui";
import { EAppPlatforms, ESEOPlatforms } from "@royalfut/enums";
import { cn } from "@royalfut/utils";

import type { FC, SVGProps, ComponentPropsWithoutRef } from "react";
import type { FNCN, IPlatformInfo } from "@royalfut/interfaces";

export const Root: FC<ComponentPropsWithoutRef<"div">> = ({
    className,
    children,
    ...props
}) => {
    return (
        <div
            className={cn(
                "[--basis-s:calc(33.33%_-_theme(spacing[4]))] flex gap-4 justify-start flex-wrap sm:flex-nowrap",
                className
            )}
            {...props}>
            {children}
        </div>
    );
};

const iconMap: Record<
    EAppPlatforms | ESEOPlatforms,
    FC<SVGProps<SVGSVGElement>>
> = {
    [EAppPlatforms.PlayStation]: PlayStationMonocolorIcon,
    [ESEOPlatforms.PlayStation4]: PlayStationMonocolorIcon,
    [ESEOPlatforms.PlayStation5]: PlayStationMonocolorIcon,
    [EAppPlatforms.XBox]: XboxMonocolorIcon,
    [ESEOPlatforms.XBoxOne]: XboxMonocolorIcon,
    [ESEOPlatforms.XBoxXS]: XboxMonocolorIcon,
    [EAppPlatforms.PC]: PCMonocolorIcon,
};

export const Badge: FNCN = ({ className }) => {
    const platform = useTransferSelectorStore.use.platform();
    const Icon = iconMap[platform];

    return (
        <div className={cn("flex items-center gap-1", className)}>
            <div className="text-white w-4 h-4">
                <Icon />
            </div>
            <span className="text-xs font-semibold text-white">
                {PlatformAppSets[platform].name.v1}
            </span>
        </div>
    );
};

interface IPlatformChoiceButtonsBaseProps {
    size?: "sm" | "md";
}

export const Showcase: FC<
    {
        id: EAppPlatforms | ESEOPlatforms;
        name: string;
    } & IPlatformChoiceButtonsBaseProps
> = ({ id, size, name }) => {
    const Icon = iconMap[id];

    return (
        <>
            <span
                className={cn("font-medium text-white text-center", {
                    "text-sm": size === "sm",
                    "text-base": size === "md",
                })}>
                {name}
            </span>
            <div
                className={cn("text-white ", {
                    "w-4 h-4": size === "sm",
                    "w-6 h-6": size === "md",
                })}>
                <Icon />
            </div>
        </>
    );
};

const cnBaseBtn = "gap-1 py-4 basis-[var(--basis-s)] flex-grow flex-shrink-0";

interface ILinksProps {
    links: Record<EAppPlatforms | ESEOPlatforms, string>;
    sets: Record<string, IPlatformInfo<ESEOPlatforms | EAppPlatforms>>;
    activeId?: ESEOPlatforms | EAppPlatforms;
}

type TSelectedBtn = Omit<
    ComponentPropsWithoutRef<typeof SelectableButton>,
    "children" | "onSelect" | "isActive" | "asLink"
>;

export const Links: FNCN<
    IPlatformChoiceButtonsBaseProps & ILinksProps & TSelectedBtn
> = ({ links, sets, className, size = "md", activeId, ...props }) => {
    const setPlatform = useTransferSelectorStore.use.setPlatform();
    const platformMap = useMemo(
        () => Object.keys(sets) as Array<ESEOPlatforms | EAppPlatforms>,
        [sets]
    );

    return (
        <>
            {platformMap.map(id => {
                const platformEntity = sets[id];
                const isActive = activeId === id;
                const href = links[id];
                const name =
                    id === ESEOPlatforms.XBoxXS
                        ? platformEntity.name.v2 || platformEntity.name.v1
                        : platformEntity.name.v1;

                return (
                    <SelectableButton
                        asLink={true}
                        onSelect={() =>
                            setPlatform(SEOPlatformConversionMap[id])
                        }
                        isActive={isActive}
                        href={href}
                        className={cn(cnBaseBtn, "", className)}
                        key={id}
                        {...(props as any)}>
                        <Showcase id={id} name={name} size={size} />
                    </SelectableButton>
                );
            })}
        </>
    );
};

interface IButtonsProps {
    sets: Record<string, IPlatformInfo<EAppPlatforms>>;
}

export const Buttons: FNCN<
    IPlatformChoiceButtonsBaseProps & IButtonsProps & TSelectedBtn
> = ({ className, size = "md", sets, ...props }) => {
    const platform = useTransferSelectorStore.use.platform();
    const setPlatform = useTransferSelectorStore.use.setPlatform();
    const platformMap = useMemo(
        () => Object.keys(sets) as Array<EAppPlatforms>,
        [sets]
    );

    return (
        <>
            {platformMap.map(id => {
                const isActive = platform === id;
                const platformEntity = sets[id];

                return (
                    <SelectableButton
                        asLink={false}
                        onSelect={() => setPlatform(id)}
                        isActive={isActive}
                        className={cn(cnBaseBtn, className)}
                        key={id}
                        {...(props as any)}>
                        <Showcase
                            id={id}
                            name={platformEntity.name.v1}
                            size={size}
                        />
                    </SelectableButton>
                );
            })}
        </>
    );
};
