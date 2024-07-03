import Header from "./Header";
import UISheetMenu from "./UISheetMenu";

import type { FNCN } from "@royalfut/interfaces";
import LottieAnimation from "./WrapperLottieClient";

const PubicHeader: FNCN = ({ className }) => {
    return (
        <Header className={className}>
            <div className="[--tw-shadow-colored:0_0px_46px_-4px_var(--tw-shadow-color)] w-24 h-8 relative bg-green-300 rounded-3xl shadow-green-300 shadow-2xl">
                <LottieAnimation/>
            </div>
            <UISheetMenu />
        </Header>
    );
};

export default PubicHeader;
