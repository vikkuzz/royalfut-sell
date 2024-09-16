import Image from "next/image";
import { PROJECT_PUBLIC_SELLER_ROUTES } from "@royalfut/collections";
import {
    OrderByPlatforms,
    CoinAmountSelector,
    CoinsAmountPanel,
} from "@royalfut/components";

import { LayoutViewportSectionFrame } from "@royalfut/ui";

const SellCryptoFunnelCalc = () => {
    return (
        <div className="w-full flex flex-col">
            <div className="flex flex-col w-full">
                <OrderByPlatforms />
                <CoinAmountSelector />
                <CoinsAmountPanel.Root className="mt-6 sm:mt-16 sm:relative">
                    <CoinsAmountPanel.Info
                        display={{
                            ut: { title: "You're about to sell" },
                            ccy: { title: "For this much" },
                            loyality: { hide: true },
                        }}
                    />
                    <CoinsAmountPanel.Button
                        as="link"
                        scroll={true}
                        href={
                            PROJECT_PUBLIC_SELLER_ROUTES.ORDER_ACCOUNT_DETAILS
                        }>
                        Start Selling
                    </CoinsAmountPanel.Button>
                </CoinsAmountPanel.Root>
            </div>
        </div>
    );
};

const Calculator = () => {
    return (
        <section className="flex flex-col mt-24 py-[3.25rem] bg-black-1">
            <div className="mb-12 sm:mb-10">
                <h2 className="w-80 text-6xl font-bold text-white mx-auto">
                    Calculator
                </h2>
            </div>
            <LayoutViewportSectionFrame className="flex flex-col space-y-14">
                <div className="flex justify-center">
                    <div className="flex flex-col max-w-4xl px-4 sm:flex-row w-full justify-around space-y-11 sm:space-y-0">
                        <div className="flex flex-col space-y-6 mx-auto sm:ml-0">
                            <div className="bg-black-shape rounded-full w-32 h-32 relative mx-auto">
                                <div className="w-full h-full relative overflow-hidden rounded-full">
                                    <Image
                                        src={"/image/sharp-intersect1.svg"}
                                        className="absolute scale-150 translate-x-9"
                                        alt="sharp"
                                        fill
                                        priority={false}
                                    />
                                </div>
                                <Image
                                    className="!h-[80%] !top-[unset] !left-3"
                                    alt=""
                                    src="/image/joysticks-game.png"
                                    fill
                                />
                            </div>
                            <p className="text-white text-base font-bold">
                                Choose the platform
                            </p>
                        </div>
                        <div className="w-52 flex flex-col space-y-6 mx-auto">
                            <div className="bg-black-shape rounded-full w-32 h-32 relative mx-auto">
                                <div className="w-full h-full relative overflow-hidden rounded-full">
                                    <Image
                                        src={"/image/sharp-intersect1.svg"}
                                        className="absolute scale-150 -rotate-[75deg] translate-x-16 translate-y-4"
                                        alt="sharp"
                                        fill
                                        priority={false}
                                    />
                                </div>
                                <Image
                                    className="!h-[80%] translate-y-3 translate-x-5"
                                    alt=""
                                    src="/image/coins-ut-group.png"
                                    fill
                                />
                            </div>
                            <p className="text-white text-base font-bold text-center leading-tight">
                                Enter number of coins you want to sell
                            </p>
                        </div>
                        <div className="w-52 flex flex-col space-y-6 mx-auto sm:mr-0">
                            <div className="bg-black-shape rounded-full w-32 h-32 relative mx-auto">
                                <div className="w-full h-full relative overflow-hidden rounded-full">
                                    <Image
                                        src={"/image/sharp-intersect2.svg"}
                                        className="absolute scale-[2] rotate-[245deg] translate-x-4 translate-y-0"
                                        alt="sharp"
                                        fill
                                        priority={false}
                                    />
                                </div>
                                <Image
                                    className="!h-[80%] translate-y-2.5"
                                    alt=""
                                    src="/image/money-group.png"
                                    fill
                                />
                            </div>
                            <p className="text-white text-base font-bold capitalize text-center leading-tight">
                                Find out how much money you can make
                            </p>
                        </div>
                    </div>
                </div>
                <div className="bg-black-dropdown/50 pt-10 pb-8 rounded-[1.75rem]">
                    <div className="max-w-4xl mx-auto px-4">
                        <SellCryptoFunnelCalc />
                    </div>
                </div>
            </LayoutViewportSectionFrame>
        </section>
    );
};

export default Calculator;
