import Link from "next/link";
import { APP_SOCIAL_LINKS } from "@royalfut/collections";
import {
    TiktokMonocolorIcon,
    TwitchMonocolorIcon,
    YouTubeMonocolorIcon,
    InstagramMonocolorIcon,
} from "@royalfut/icons";
import { EAppSocials } from "@royalfut/enums";

import type { FC, SVGProps } from "react";

const iconsMap: Record<EAppSocials, FC<SVGProps<SVGSVGElement>>> = {
    [EAppSocials.INSTAGRAM]: InstagramMonocolorIcon,
    [EAppSocials.TIK_TOK]: TiktokMonocolorIcon,
    [EAppSocials.YOU_TUBE]: YouTubeMonocolorIcon,
    [EAppSocials.TWITCH]: TwitchMonocolorIcon,
};

const Socials = () => {
    return (
        <div className="flex flex-col">
            <div className="text-white text-2xl font-bold mb-3">
                Our socials
            </div>
            <div className="h-12 justify-start items-start gap-2 inline-flex">
                {(Object.keys(iconsMap) as Array<EAppSocials>).map(item => {
                    const Icon = iconsMap[item];

                    return (
                        <Link
                            href={APP_SOCIAL_LINKS[item]}
                            target="_blank"
                            key={item}
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
