"use client";

import { useLayoutEffect } from "react";
import { useTransferStore } from "@royalfut/store";
import { CalculationCredentials } from "@royalfut/collections";

import type { FC } from "react";

const Revalidate: FC<{ coins: number }> = ({ coins }) => {
    const utCoins =
        coins > CalculationCredentials["MAX_UT_COINS"]
            ? CalculationCredentials["MAX_UT_COINS"]
            : coins;
    useTransferStore.getState().setUTCoin(String(utCoins));

    useLayoutEffect(() => {
        useTransferStore.getState().setUTCoin(String(utCoins));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return null;
};

export default Revalidate;
