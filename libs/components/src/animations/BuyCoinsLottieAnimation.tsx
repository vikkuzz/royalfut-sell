"use client";

import { LazyLottie } from "@royalfut/ui";

const BuyCoinsLottieAnimation = () => {
    return (
        <LazyLottie
            getJson={() => import("./buyCoinsAnimation.json")}
            id="buy-coins-lottie"
            loop
        />
    );
};

export default BuyCoinsLottieAnimation;
