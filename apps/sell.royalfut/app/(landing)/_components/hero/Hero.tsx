import Title from "./ui/Title";
import Image from "next/image";
import TriggerButtons from "./ui/TriggerButtons";
import PlayingPerson from "./ui/PlayingPerson";
import { FlyCoins, FlyMonies, FlyPayments } from "./ui/FlyingElements";
import { LayoutViewportSectionFrame } from "@royalfut/ui";

const Hero = () => {
    return (
        <LayoutViewportSectionFrame>
            <div className="relative after:bg-gradient-to-b after:from-transparent after:via-transparent after:to-black-background after:absolute after:pointer-events-none after:w-screen after:h-full after:top-0 after:-left-4 md:after:-left-8 sm:overflow-hidden">
                <Title />
                <PlayingPerson />
                <Image
                    src="/image/blured-radial-gradient.png"
                    alt="gradient"
                    fill
                    className="absolute translate-y-10 scale-150 !h-[70%] sm:!h-full sm:translate-y-0 sm:scale-100 z-[-2]"
                />
                <FlyCoins />
                <FlyMonies />
                <FlyPayments />
            </div>
            <TriggerButtons />
        </LayoutViewportSectionFrame>
    );
};

export default Hero;
