import Link from "next/link";
import {
    MailMonocolorIcon,
    TelegramMonocolorIcon,
    WhatsappMonocolorIcon,
} from "@royalfut/icons";
import { EAppContacts } from "@royalfut/enums";
import { APP_SOCIAL_LINKS, AppCredentials } from "@royalfut/collections";
import { cn } from "@royalfut/utils";

import type { FC, SVGProps } from "react";

const InfoContacts = {
    [EAppContacts.WHATS_APP]: {
        label: "WhatsApp",
    },
    [EAppContacts.TELEGRAM]: {
        label: "Telegram",
    },
    [EAppContacts.MAIL]: {
        label: AppCredentials.mail.support,
    },
};

const iconsMap: Record<EAppContacts, FC<SVGProps<SVGSVGElement>>> = {
    [EAppContacts.WHATS_APP]: WhatsappMonocolorIcon,
    [EAppContacts.TELEGRAM]: TelegramMonocolorIcon,
    [EAppContacts.MAIL]: MailMonocolorIcon,
};

const Contacts = () => {
    return (
        <div className="flex flex-col">
            <div className="text-white text-2xl font-bold mb-3">Contacts</div>
            <div className="h-12 sm:h-11 justify-start items-start gap-2 inline-flex">
                {(Object.keys(InfoContacts) as Array<EAppContacts>).map(
                    item => {
                        const Icon = iconsMap[item];

                        return (
                            <Link
                                href={APP_SOCIAL_LINKS[item]}
                                target="_blank"
                                key={item}
                                className={cn(
                                    "px-3 py-2 basis-1/4 h-full bg-black-dropdown hover:bg-black-shape rounded-lg justify-center items-center gap-2 flex transition-colors duration-300",
                                    {
                                        "basis-1/5": item !== EAppContacts.MAIL,
                                        "flex-1 basis-1/4":
                                            item === EAppContacts.MAIL,
                                    }
                                )}>
                                <div className="relative">
                                    <Icon className="w-6 h-6 text-white" />
                                </div>
                                <div
                                    className={cn(
                                        "text-white text-base font-medium",
                                        {
                                            "hidden sm:inline-block":
                                                item !== EAppContacts.MAIL,
                                            "inline-block":
                                                item === EAppContacts.MAIL,
                                        }
                                    )}>
                                    {InfoContacts[item].label}
                                </div>
                            </Link>
                        );
                    }
                )}
            </div>
        </div>
    );
};

export default Contacts;
