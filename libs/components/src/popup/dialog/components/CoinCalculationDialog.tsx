import {
    CalculationCoinsPanel,
    CoinsAmountPanel,
    CryptoSellAmountInput,
} from "../../../funnels";

const CoinCalculationDialog = () => {
    return (
        <CalculationCoinsPanel.Root className="w-full flex flex-col w-[33rem] sm:w-[56rem]">
            <CalculationCoinsPanel.Body className="border border-white-20 w-full sm:py-12 bg-black-shape">
                <div className="flex flex-col w-full">
                    <div className="flex flex-col w-full gap-6">
                        <div className="w-full flex flex-col justify-start items-start sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-2">
                            <p className="font-bold text-3xl sm:text-xl">
                                Choose your own amount
                            </p>
                        </div>
                        <CryptoSellAmountInput />
                    </div>
                    <CoinsAmountPanel.Root className="mt-6 sm:mt-10 sm:relative sm:space-x-0 bg-transparent p-0 py-5 sm:py-0 bg-transparent backdrop-blur-sm sm:backdrop-blur-none">
                        <CoinsAmountPanel.Info className="sm:bg-transparent sm:px-0 sm:py-0 sm:gap-9">
                            <CoinsAmountPanel.InfoGroup>
                                <CoinsAmountPanel.CCY />
                            </CoinsAmountPanel.InfoGroup>
                            <CoinsAmountPanel.Loyalty />
                        </CoinsAmountPanel.Info>
                    </CoinsAmountPanel.Root>
                </div>
            </CalculationCoinsPanel.Body>
        </CalculationCoinsPanel.Root>
    );
};

export default CoinCalculationDialog;
