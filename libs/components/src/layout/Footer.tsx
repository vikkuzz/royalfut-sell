"use client";

import { LayoutViewportSectionFrame } from "@royalfut/ui";
import { AppCredentials } from "@royalfut/collections";
import Contacts from "./footer/Contacts";
import Socials from "./footer/Socials";
import NavLinks from "./footer/NavLinks";
import { useUIGlobalStore } from "@royalfut/store";
import PaymentMethods from "./footer/PaymentMethods";

const Copyright = () => {
    return (
        <div className="text-white-55 text-xs flex items-end font-medium justify-center sm:justify-start mt-9 sm:mt-14">
            {AppCredentials.copyright.symbol} {AppCredentials.copyright.year}{" "}
            {AppCredentials.copyright.title}
        </div>
    );
};

const Footer = () => {
    const data = useUIGlobalStore(state => state.footer);

    return (
        <footer className="w-full h-max bg-black-1 pt-11 sm:pt-[6.25rem] pb-6 border-t border-t-white-20">
            <LayoutViewportSectionFrame asChild>
                <div className="flex flex-col space-y-7 sm:space-y-4">
                    <div className="flex flex-col-reverse sm:flex-row w-full justify-between">
                        <div className="flex flex-col space-y-10 sm:space-y-8 mt-9 sm:mt-0">
                            <Contacts {...data.contacts} />
                            <Socials {...data.socials} />
                        </div>
                        <NavLinks data={data.nav} />
                    </div>
                    <div className="flex flex-col-reverse sm:flex-row w-full justify-between">
                        <Copyright />
                        <PaymentMethods />
                    </div>
                </div>
            </LayoutViewportSectionFrame>
        </footer>
    );
};

export default Footer;
