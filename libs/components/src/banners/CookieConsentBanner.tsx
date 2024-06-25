import Link from "next/link";
import { CookieIcon } from "@royalfut/icons";
import { PUBLIC_ROUTES } from "@royalfut/collections";
import { CookieBannerForm } from "./CookieBanner.client";

const CookieConsentBanner = () => {
    return (
        <div className="block pointer-events-none fixed inset-x-0 bottom-0 z-30 px-6 pb-6 sm:opacity-90 sm:hover:opacity-100 sm:transition-opacity sm:duration-200">
            <div className="relative pointer-events-auto mx-auto max-w-xl rounded-xl bg-black-shape p-6 shadow-lg ring-1 ring-white-20">
                <CookieIcon className="w-5 h-5 text-secondary translate-y-px inline absolute" />
                <p className="text-sm font-medium text-white-60">
                    <span className="w-6 inline-block" />
                    This website uses cookies to optimize functionality and
                    offer a delightful browsing experience. Feel free to explore
                    our website with the confidence that your privacy is
                    respected, and you have control over cookie consent. See our{" "}
                    <Link
                        target="_blank"
                        href={`${PUBLIC_ROUTES.COOKIE_POLICY}`}
                        className="font-semibold text-white underline hover:text-white-60 transition-colors duration-300">
                        Cookie Policy.
                    </Link>
                </p>
                <CookieBannerForm />
            </div>
        </div>
    );
};

export default CookieConsentBanner;
