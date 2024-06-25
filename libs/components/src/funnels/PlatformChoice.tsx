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

import type { FC, SVGProps } from "react";
import type { TPlatformSets } from "@royalfut/interfaces";

interface IPlatformChoiceProps {
    sets: TPlatformSets;
}

const iconMap: Record<EPlatforms, FC<SVGProps<SVGSVGElement>>> = {
    [EPlatforms.PlayStation]: PlayStationMonocolorIcon,
    [EPlatforms.XBox]: XboxMonocolorIcon,
    [EPlatforms.PC]: PCMonocolorIcon,
};

const PlatformChoice: FC<IPlatformChoiceProps> = ({ sets }) => {
    const platform = useTransferSelectorStore.use.platform();
    const setPlatform = useTransferSelectorStore.use.setPlatform();

    const platformMap = useMemo(
        () => Object.keys(sets) as Array<EPlatforms>,
        [sets]
    );

    return (
        <div className="flex space-x-4 justify-between">
            {platformMap.map(item => {
                const Icon = iconMap[item];
                const isActive = platform === item;

                return (
                    <SelectableButton
                        onSelect={() => setPlatform(item)}
                        isActive={isActive}
                        key={sets[item].name}>
                        <span className="text-base font-medium text-white mb-1">
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
