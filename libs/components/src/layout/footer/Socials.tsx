import Link from "next/link";
import {
    TiktokMonocolorIcon,
    TwitchMonocolorIcon,
    YouTubeMonocolorIcon,
    InstagramMonocolorIcon,
} from "@royalfut/icons";
import { EAppSocials } from "@royalfut/enums";

import type { FC, SVGProps } from "react";
import type { TUIGlobalFooterSocials } from "@royalfut/interfaces";

const iconsMap: Record<EAppSocials, FC<SVGProps<SVGSVGElement>>> = {
    [EAppSocials.INSTAGRAM]: InstagramMonocolorIcon,
    [EAppSocials.TIK_TOK]: TiktokMonocolorIcon,
    [EAppSocials.YOU_TUBE]: YouTubeMonocolorIcon,
    [EAppSocials.TWITCH]: TwitchMonocolorIcon,
};

const Socials: FC<TUIGlobalFooterSocials> = ({ items, label }) => {
    return (
        <div className="flex flex-col">
            <div className="text-white text-2xl font-bold mb-3">{label}</div>
            <div className="h-12 justify-start items-start gap-2 inline-flex">
                {items.map(item => {
                    const Icon = iconsMap[item.id];

                    return (
                        <Link
                            href={item.href}
                            target="_blank"
                            key={item.id}
                            aria-label={item.label}
                            className="w-20 h-12 basis-1/4 sm:basis-auto p-2 bg-black-dropdown hover:bg-black-shape rounded-lg justify-center items-center gap-2 flex transition-colors duration-300">
                            <div className="relative">
                                <Icon className="w-6 h-6 text-white" />
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default Socials;
