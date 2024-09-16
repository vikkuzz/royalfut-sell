import Link from "next/link";
import {
    MailMonocolorIcon,
    TelegramMonocolorIcon,
    WhatsappMonocolorIcon,
} from "@royalfut/icons";
import { EAppContacts } from "@royalfut/enums";
import { cn } from "@royalfut/utils";

import type { FC, SVGProps } from "react";
import type { TUIGlobalFooterContacts } from "@royalfut/interfaces";

const iconsMap: Record<EAppContacts, FC<SVGProps<SVGSVGElement>>> = {
    [EAppContacts.WHATS_APP]: WhatsappMonocolorIcon,
    [EAppContacts.TELEGRAM]: TelegramMonocolorIcon,
    [EAppContacts.MAIL]: MailMonocolorIcon,
};

const Contacts: FC<TUIGlobalFooterContacts> = ({ label, items }) => {
    return (
        <div className="flex flex-col">
            <div className="text-white text-2xl font-bold mb-3">{label}</div>
            <div className="h-12 sm:h-11 justify-start items-start gap-2 inline-flex">
                {items.map(item => {
                    const Icon = iconsMap[item.id];

                    return (
                        <Link
                            href={item.href}
                            target="_blank"
                            aria-label={item.label}
                            key={item.id}
                            className={cn(
                                "px-3 py-2 basis-1/4 h-full bg-black-dropdown hover:bg-black-shape rounded-lg justify-center items-center gap-2 flex transition-colors duration-300",
                                {
                                    "basis-1/5": item.id !== EAppContacts.MAIL,
                                    "flex-1 basis-1/4":
                                        item.id === EAppContacts.MAIL,
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
                                            item.id !== EAppContacts.MAIL,
                                        "inline-block":
                                            item.id === EAppContacts.MAIL,
                                    }
                                )}>
                                {item.label}
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default Contacts;
