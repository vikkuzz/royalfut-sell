"use client"
import Lottie from "lottie-react";

import BuyCoins from "./Buy Coins.json";

const LottieAnimation = () => {
    return (
        <Lottie animationData={BuyCoins} loop={true} />
    );
};

export default LottieAnimation;
