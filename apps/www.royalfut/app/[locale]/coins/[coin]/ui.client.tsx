"use client";

import { ccyCollection } from "@royalfut/collections";
import {
    useTransferSelectorStore,
    useCurrencyStore,
    useStocksStore,
} from "@royalfut/store";
import { Prose } from "@royalfut/ui";
import {
    calculatePrice,
    formatCommaNumber,
    roundAndFormatFloat,
    calculateDeliveryTime,
} from "@royalfut/utils";
import { PurchaseGuaranteesCard } from "./ui";
import { ClockIcon } from "@royalfut/icons";

import type { FC } from "react";
import { useTranslations } from "next-intl";

export const ProseCoinDetails: FC<{ coin: number; coinLabel: string }> = ({
    coin,
    coinLabel,
}) => {
    const t = useTranslations("chris_coinBundles");
    const use = useTransferSelectorStore.use;
    const stocks = useStocksStore(state => state.stocks ?? undefined);
    const method = use.method();
    const platform = use.platform();
    const ccy = useCurrencyStore(state => state.currency);

    const price = formatCommaNumber(
        roundAndFormatFloat(calculatePrice(method, platform, ccy, coin, stocks))
    );

    const code = ccyCollection[ccy].code;
    const deliveryTime = calculateDeliveryTime(coin, method);
    // FIXME:
    // const deliveryTimeTxt = deliveryTime
    //     ? ` ${coinLabel} coins will be transferred to your account within ${deliveryTime.time[0]}-${deliveryTime.time[1]} ${deliveryTime.translates === "m" ? "min" : "hours"}.`
    //     : "";

    return (
        <Prose.Paragraph>
            {t("coinsAmount.p2", {
                amount: coinLabel,
                price: price,
                currency: code,
                timeValue: deliveryTime
                    ? `${deliveryTime.time[0]}-${deliveryTime.time[1]}`
                    : "",
                time: deliveryTime
                    ? deliveryTime.translates === "m"
                        ? "min"
                        : "hours"
                    : "",
            })}
        </Prose.Paragraph>
    );
};

export const GuaranteesDeliveryCard: FC<{ coin: number }> = ({ coin }) => {
    const t = useTranslations("bailey_coinsAmount");
    const method = useTransferSelectorStore.use.method();
    const deliveryTime = calculateDeliveryTime(coin, method);

    // const label = deliveryTime
    //     ? `${deliveryTime.time[0]}-${deliveryTime.time[1]} ${deliveryTime.translates === "m" ? "min" : "hrs"} delivery time`
    //     : "Express Delivery";
    const label = deliveryTime
        ? t("guaranteesCard.2", {
              timeValue: deliveryTime
                  ? `${deliveryTime.time[0]}-${deliveryTime.time[1]}`
                  : "",
              time: deliveryTime
                  ? deliveryTime.translates === "m"
                      ? "min"
                      : "hours"
                  : "",
          })
        : "Express Delivery";

    return (
        <PurchaseGuaranteesCard className="text-white-65" title={label}>
            <ClockIcon className="w-12 h-12 sm:w-6 sm:h-6" />
        </PurchaseGuaranteesCard>
    );
};
