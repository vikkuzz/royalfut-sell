import { LayoutViewportSectionFrame } from "@royalfut/ui";
import Contacts from "./footer/Contacts";
import Socials from "./footer/Socials";
import NavLinks from "./footer/NavLinks";
import PaymentMethods from "./footer/PaymentMethods";
import { AppCredentials } from "@royalfut/collections";

const Copyright = () => {
    return (
        <div className="text-white-40 text-xs flex items-end font-medium justify-center sm:justify-start mt-9 sm:mt-14">
            {AppCredentials.copyright.symbol} {AppCredentials.copyright.year}{" "}
            {AppCredentials.copyright.title}
        </div>
    );
};

const Footer = () => {
    return (
        <footer className="w-full h-max bg-black-1 pt-11 sm:pt-[6.25rem] pb-6 border-t border-t-white-20">
            <LayoutViewportSectionFrame asChild>
                <div className="flex flex-col space-y-7 sm:space-y-4">
                    <div className="flex flex-col-reverse sm:flex-row w-full justify-between">
                        <div className="flex flex-col space-y-10 sm:space-y-8 mt-9 sm:mt-0">
                            <Contacts />
                            <Socials />
                        </div>
                        <NavLinks />
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
