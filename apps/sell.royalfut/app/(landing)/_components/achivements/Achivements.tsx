import { UTCoinMonocolorIcon } from "@royalfut/icons";
import AchivementRecord from "./AchivementRecord";
import { LayoutViewportSectionFrame } from "@royalfut/ui";
import MagicStarAnimation from "./MagicStarAnimation";

const UTCoinGrous = () => {
    return (
        <div className="z-[-1]">
            <UTCoinMonocolorIcon className="absolute bottom-[22%] left-[-30%] sm:bottom-[-22%] sm:left-[-8%] -rotate-[20deg] text-black-1 w-60 h-60" />
            <UTCoinMonocolorIcon className="absolute bottom-[-15%] left-[-5%] sm:bottom-[15%] sm:left-[14%] rotate-12 text-black-1 w-28 h-28" />
            <UTCoinMonocolorIcon className="absolute bottom-[2%] left-0 sm:bottom-[-22%] sm:left-[25%] rotate-12 text-black-1 w-40 h-40" />
        </div>
    );
};

const Achivements = () => {
    return (
        <LayoutViewportSectionFrame asChild>
            <section className="w-full flex flex-col sm:flex-row sm:justify-between mt-24 sm:space-x-4 relative">
                <div className="w-full sm:max-w-[34rem] mb-10 sm:mb-0">
                    <span className="text-white/70 text-2xl font-medium !leading-snug">
                        Before launching this site, we were buying up coins at
                        the request of our{" "}
                    </span>
                    <span className="text-white text-2xl font-bold !leading-snug">
                        ROYALFUT customers
                    </span>
                    <span className="text-white/70 text-2xl font-medium !leading-snug">
                        . And here are the results we achieved (as for 01st
                        March, 2024):
                    </span>
                </div>
                <UTCoinGrous />
                <div className="flex justify-end sm:justify-center flex-1">
                    <div className="flex-col justify-start items-start gap-10 inline-flex sm:ml-24 mr-8 sm:mr-0">
                        <MagicStarAnimation>
                            <AchivementRecord
                                achivement="359,842,427"
                                desc="coins transfered"
                            />
                        </MagicStarAnimation>
                        <MagicStarAnimation>
                            <AchivementRecord
                                achivement="7 hs 48 min"
                                desc="average payout speed after submiting order"
                            />
                        </MagicStarAnimation>
                        <MagicStarAnimation>
                            <AchivementRecord
                                achivement="$16,155.48"
                                desc="has been payed to users"
                            />
                        </MagicStarAnimation>
                    </div>
                </div>
            </section>
        </LayoutViewportSectionFrame>
    );
};

export default Achivements;
