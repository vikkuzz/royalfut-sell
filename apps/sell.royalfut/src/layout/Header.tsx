import { GeneralHeader, BuyCoinsLottieAnimation } from "@royalfut/components";

import type { FNCN } from "@royalfut/interfaces";

const Header: FNCN = ({ className }) => {
    return (
        <GeneralHeader className={className}>
            <div className="[--tw-shadow-colored:0_0px_46px_-4px_var(--tw-shadow-color)] w-24 h-8 relative bg-green-300 rounded-3xl shadow-green-300 shadow-2xl">
                <BuyCoinsLottieAnimation />
            </div>
        </GeneralHeader>
    );
};

export default Header;
