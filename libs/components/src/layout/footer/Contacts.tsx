import { EAppContacts } from "@royalfut/enums";
import { PROJECT_PUBLIC_ROUTES } from "@royalfut/collections";
import { Link, MediaInfoLink } from "@royalfut/ui";
import { cn } from "@royalfut/utils";

import type { FC } from "react";
import type { TProjectGlobalFooterContacts } from "@royalfut/interfaces";

const Contacts: FC<TProjectGlobalFooterContacts> = ({ label, items }) => {
    return (
        <div className="flex flex-col">
            <Link
                href={PROJECT_PUBLIC_ROUTES["CONTACT"]}
                className="text-white w-max text-2xl font-bold mb-3 hover:text-white-70 transition-colors duration-200">
                {label}
            </Link>
            <div className="h-12 sm:h-11 justify-start items-start gap-2 inline-flex">
                {items.map(item => {
                    return (
                        <MediaInfoLink
                            key={item.id}
                            variant="icon-label"
                            media={item.id}
                            href={item.href}
                            label={item.label}
                            size="sm"
                            theme="2"
                            options={{
                                isLabelHiddenOnMobile:
                                    item.id !== EAppContacts.MAIL,
                            }}
                            className={cn("basis-1/4 h-full", {
                                "basis-1/5": item.id !== EAppContacts.MAIL,
                                "flex-1 basis-1/4":
                                    item.id === EAppContacts.MAIL,
                            })}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Contacts;
