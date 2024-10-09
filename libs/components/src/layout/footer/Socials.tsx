import { PROJECT_PUBLIC_ROUTES } from "@royalfut/collections";
import { Link, MediaInfoLink } from "@royalfut/ui";

import type { FC } from "react";
import type { TProjectGlobalFooterSocials } from "@royalfut/interfaces";

const Socials: FC<TProjectGlobalFooterSocials> = ({ items, label }) => {
    return (
        <div className="flex flex-col">
            <Link
                href={PROJECT_PUBLIC_ROUTES["CONTACT"]}
                className="text-white w-max text-2xl font-bold mb-3 hover:text-white-70 transition-colors duration-200">
                {label}
            </Link>
            <div className="h-12 justify-start items-start gap-2 inline-flex">
                {items.map(item => {
                    return (
                        <MediaInfoLink
                            href={item.href}
                            variant="icon"
                            key={item.id}
                            media={item.id}
                            screen="landscape"
                            size="sm"
                            theme="2"
                            className="basis-1/4 sm:basis-auto"
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Socials;
