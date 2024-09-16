import { LayoutViewportSectionFrame } from "@royalfut/ui";
import Title from "./ui/Title";
import TriggerButtons from "./ui/TriggerButtons";
import PlayingPerson from "./ui/PlayingPerson";
import BluredRoundedGradient from "./ui/BluredRoundedGradient";
import { FlyCoins, FlyMonies, FlyPayments } from "./ui/FlyingElements";

const Hero = () => {
    return (
        <LayoutViewportSectionFrame className="overflow-x-hidden sm:overflow-x-auto">
            <div className="relative after:bg-gradient-to-b after:from-transparent after:via-transparent after:to-black-background after:absolute after:pointer-events-none after:w-screen after:h-full after:top-0 after:-left-4 md:after:-left-8 sm:overflow-hidden">
                <Title />
                <PlayingPerson />
                <BluredRoundedGradient />
                <FlyCoins />
                <FlyMonies />
                <FlyPayments />
            </div>
            <TriggerButtons />
        </LayoutViewportSectionFrame>
    );
};

export default Hero;
