import { Link } from "@royalfut/ui";

import type { FC } from "react";
import type { TProjectGlobalFooterNavigation } from "@royalfut/interfaces";

const NavLinks: FC<{ data: Array<TProjectGlobalFooterNavigation> }> = ({
    data,
}) => {
    return (
        <div className="flex space-y-9 sm:space-y-0 sm:space-x-[6.75rem] flex-col sm:flex-row md:mr-24 md: gap-9">
            {/* <div className="flex-col justify-start items-start space-y-3 inline-flex">
                <div className="text-white text-2xl font-bold">Platforms</div>
                <div className="flex-col justify-start items-start gap-2 flex">
                    {(Object.keys(PlatformAppSets) as Array<EAppPlatforms>).map(
                        item => {
                            return <PlatformLink id={item} key={item} />;
                        }
                    )}
                </div>
            </div> */}
            {data.map(item => (
                <div
                    key={item.label}
                    className="flex-col justify-start items-start inline-flex">
                    <div className="self-stretch text-white text-2xl font-bold">
                        {item.label}
                    </div>
                    <div className="self-stretch flex-col justify-start items-start gap-2 flex">
                        {item.links.map(link => {
                            return (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    aria-label={link.label}
                                    className="self-stretch text-white-60 hover:text-white active:text-white text-base font-medium">
                                    {link.label}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default NavLinks;
