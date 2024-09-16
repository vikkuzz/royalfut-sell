"use client";

import { useMemo } from "react";
import { useTransferSelectorStore } from "@royalfut/store";
import {
    PlayStationMonocolorIcon,
    XboxMonocolorIcon,
    PCMonocolorIcon,
} from "@royalfut/icons";
import { SelectableButton } from "@royalfut/ui";
import { EPlatforms } from "@royalfut/enums";
// import { PROJECT_PUBLIC_ROUTES } from "@royalfut/collections";
import { cn } from "@royalfut/utils";

import type { FC, SVGProps } from "react";
import type { TPlatformSets, FNCN } from "@royalfut/interfaces";

interface IPlatformChoiceProps {
    sets: TPlatformSets;
    cnBtn?: string;
}

const iconMap: Record<EPlatforms, FC<SVGProps<SVGSVGElement>>> = {
    [EPlatforms.PlayStation]: PlayStationMonocolorIcon,
    [EPlatforms.XBox]: XboxMonocolorIcon,
    [EPlatforms.PC]: PCMonocolorIcon,
};

const PlatformChoice: FNCN<IPlatformChoiceProps> = ({
    sets,
    className,
    cnBtn,
}) => {
    const platform = useTransferSelectorStore.use.platform();
    const setPlatform = useTransferSelectorStore.use.setPlatform();

    const platformMap = useMemo(
        () => Object.keys(sets) as Array<EPlatforms>,
        [sets],
    );

    return (
        <div className={cn("flex space-x-4 justify-between", className)}>
            {platformMap.map(item => {
                const Icon = iconMap[item];
                const isActive = platform === item;

                return (
                    <SelectableButton
                        onSelect={() => setPlatform(item)}
                        isActive={isActive}
                        className={cn("gap-1 py-4", cnBtn)}
                        key={sets[item].name}>
                        <span className="text-base font-medium text-white">
                            {sets[item].name}
                        </span>
                        <div className="text-white w-6 h-6">
                            <Icon />
                        </div>
                    </SelectableButton>
                );
            })}
        </div>
    );
};

export default PlatformChoice;
