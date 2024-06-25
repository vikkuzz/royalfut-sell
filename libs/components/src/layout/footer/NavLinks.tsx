import Link from "next/link";
import { PUBLIC_ROUTES } from "@royalfut/collections";
// import PlatformLink from "./PlatformLink";

// import type { EPlatforms } from "@royalfut/enums";

const InfoMap = [
    // {
    //     label: "Delivery",
    //     href: PUBLIC_ROUTES.DELIVERY,
    // },
    {
        label: "Payment",
        href: PUBLIC_ROUTES.PAYMENT,
    },
    {
        label: "Terms and condtitions",
        href: PUBLIC_ROUTES.TERMS_AND_CONDITIONS,
    },
    {
        label: "Privacy policy",
        href: PUBLIC_ROUTES.PRIVACY_POLICY,
    },
    {
        label: "Cookie Policy",
        href: PUBLIC_ROUTES.COOKIE_POLICY,
    },
];

const NavLinks = () => {
    return (
        <div className="flex space-y-9 sm:space-y-0 sm:space-x-[6.75rem] flex-col sm:flex-row md:mr-24">
            {/* <div className="flex-col justify-start items-start space-y-3 inline-flex">
                <div className="text-white text-2xl font-bold">Platforms</div>
                <div className="flex-col justify-start items-start gap-2 flex">
                    {(Object.keys(PlatformSets) as Array<EPlatforms>).map(
                        item => {
                            return <PlatformLink id={item} key={item} />;
                        }
                    )}
                </div>
            </div> */}
            <div className="flex-col justify-start items-start space-y-3 inline-flex">
                <div className="self-stretch text-white text-2xl font-bold">
                    Info
                </div>
                <div className="self-stretch flex-col justify-start items-start gap-2 flex">
                    {InfoMap.map(item => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className="self-stretch text-white-60 hover:text-white active:text-white text-base font-medium">
                            {item.label}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NavLinks;
