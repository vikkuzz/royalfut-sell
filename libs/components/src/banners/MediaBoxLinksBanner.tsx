import { MediaInfoLink } from "@royalfut/ui";
import { EAppContacts, EAppSocials } from "@royalfut/enums";
import { ShapeSubtract2Icon } from "@royalfut/icons";

import type { FC, PropsWithChildren } from "react";
import { getTranslations } from "next-intl/server";

const TitledBox: FC<PropsWithChildren<{ title: string }>> = ({
    title,
    children,
}) => {
    return (
        <div className="flex flex-col gap-5">
            <p className="font-semibold text-xl text-white-60">{title}</p>
            <div className="flex gap-3">{children}</div>
        </div>
    );
};

const MediaBoxLinksBanner = async () => {
    const t = await getTranslations("phoenix_pages.contacts");
    return (
        <div className="relative p-8 bg-black-1 rounded-3xl flex flex-col gap-8 lg:w-[90%]">
            <ShapeSubtract2Icon className="hidden md:block text-white absolute -right-[18%] z-[-1] -top-[65%] w-3/5 h-auto pointer-events-none opacity-5" />
            <div className="flex flex-wrap gap-14 flex-col sm:flex-row">
                <TitledBox title={t("title.1")}>
                    <MediaInfoLink
                        media={EAppContacts.WHATS_APP}
                        variant="icon"
                        screen="square"
                        size="lg"
                        asSize
                    />
                    <MediaInfoLink
                        media={EAppContacts.TELEGRAM}
                        variant="icon"
                        screen="square"
                        size="lg"
                        asSize
                    />
                </TitledBox>
                <TitledBox title={t("title.2")}>
                    <MediaInfoLink
                        media={EAppSocials.INSTAGRAM}
                        variant="icon"
                        screen="square"
                        size="lg"
                        asSize
                    />
                    <MediaInfoLink
                        media={EAppSocials.TIK_TOK}
                        variant="icon"
                        screen="square"
                        size="lg"
                        asSize
                    />
                    <MediaInfoLink
                        media={EAppSocials.YOU_TUBE}
                        variant="icon"
                        screen="square"
                        size="lg"
                        asSize
                    />
                    <MediaInfoLink
                        media={EAppSocials.TWITCH}
                        variant="icon"
                        screen="square"
                        size="lg"
                        asSize
                    />
                </TitledBox>
            </div>
            <MediaInfoLink
                media={EAppContacts.MAIL}
                variant="descriptive"
                size="md"
            />
        </div>
    );
};

export default MediaBoxLinksBanner;
