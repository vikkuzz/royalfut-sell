import {
    PlatformChoice,
    CryptoSellAmountInput,
    CoinsAmountPanel,
    CalculationCoinsPanel,
} from "@royalfut/components";
import { useTranslations } from "next-intl";
import {
    PlatformAppSets,
    PROJECT_PUBLIC_WWW_ROUTES,
} from "@royalfut/collections";
import { ShowPrizeProvider } from "./prize.provider";
import { CoinsAmountPanelActionPrizeEffect } from "./ui.client";
import HeroCoinShowcase from "./HeroCoinShowcase";

const CryptoExchangeForm = () => {
    const t = useTranslations("quinn_pages.home");

    return (
        <ShowPrizeProvider>
            <CalculationCoinsPanel.Root>
                <CalculationCoinsPanel.Sparkle />
                <CalculationCoinsPanel.IllusionBorder />
                <CalculationCoinsPanel.Body>
                    <div className="flex flex-col w-full md:w-3/5">
                        <div className="flex flex-col w-full gap-6">
                            <PlatformChoice.Root className="[--selectable-btn-bg-interactive:var(--color-black-shape)] md:w-3/4">
                                <PlatformChoice.Buttons
                                    sets={PlatformAppSets}
                                    className="flex-row-reverse items-center gap-2"
                                />
                            </PlatformChoice.Root>
                            <CryptoSellAmountInput />
                        </div>
                        <CoinsAmountPanel.Root className="mt-6 sm:mt-12 sm:relative sm:space-x-0">
                            <CoinsAmountPanel.Info className="sm:bg-transparent sm:px-0 sm:py-0 sm:gap-9">
                                <CoinsAmountPanel.InfoGroup>
                                    <CoinsAmountPanel.CCY
                                        title={t("calc.panel.info.ccy")}
                                    />
                                </CoinsAmountPanel.InfoGroup>
                                <CoinsAmountPanel.Loyalty />
                            </CoinsAmountPanel.Info>
                            <CoinsAmountPanelActionPrizeEffect
                                href={
                                    PROJECT_PUBLIC_WWW_ROUTES["ORDER_CHECKOUT"]
                                }
                            />
                        </CoinsAmountPanel.Root>
                    </div>
                    <div className="hidden justify-end w-2/5 h-full md:flex">
                        <HeroCoinShowcase />
                    </div>
                </CalculationCoinsPanel.Body>
            </CalculationCoinsPanel.Root>
        </ShowPrizeProvider>
    );
};

export default CryptoExchangeForm;
