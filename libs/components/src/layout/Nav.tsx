import Link from "next/link";
import { cn } from "@royalfut/utils";
import { PUBLIC_ROUTES } from "@royalfut/collections";

import type { FNCN } from "@royalfut/interfaces";

const NavigationLinks: FNCN = ({ className }) => {
    return (
        <nav
            className={cn(
                "flex flex-col sm:flex-row space-y-5 sm:space-x-5 sm:space-y-0",
                className
            )}>
            <Link
                href="/#how-does-it-work"
                className="text-xl text-center font-semibold transition-colors duration-200 text-white hover:text-white-60">
                How Does It Work?
            </Link>
            <Link
                href={PUBLIC_ROUTES.FAQ}
                className="text-xl text-center font-semibold transition-colors duration-200 text-white hover:text-white-60">
                FAQ
            </Link>
        </nav>
    );
};

export default NavigationLinks;
