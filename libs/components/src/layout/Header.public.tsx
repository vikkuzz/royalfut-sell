"use client";
import Header from "./Header";
import UISheetMenu from "./UISheetMenu";
import Lottie from "lottie-react";

import BuyCoins from "./Buy Coins.json";

import type { FNCN } from "@royalfut/interfaces";

const PubicHeader: FNCN = ({ className }) => {
    return (
        <Header className={className}>
            <div className="[--tw-shadow-colored:0_0px_46px_-4px_var(--tw-shadow-color)] w-24 h-8 relative bg-green-300 rounded-3xl shadow-green-300 shadow-2xl">
                <Lottie animationData={BuyCoins} loop={true} />
            </div>
            <UISheetMenu />
        </Header>
    );
};

export default PubicHeader;
