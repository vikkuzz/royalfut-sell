import Hero from "./_components/hero";
import Achivements from "./_components/achivements";
import WhyUs from "./_components/whyus";
import HowDoesItWork from "./_components/guide";
import FIFA24CoinsPromo from "./_components/FIFA24CoinsPromo";
import WithdrawalMethods from "./_components/methods";
import Calculator from "./_components/calculator";
import Reviews from "./_components/reviews/Reviews";
import InfograficMain from "./_components/InfograficMain";
import Aside from "./_components/aside/Aside";

const Index = async () => {
    return (
        <div className="flex flex-col">
            <Aside />
            <Hero />
            <InfograficMain />
            <Achivements />
            <HowDoesItWork />
            <WhyUs />
            <WithdrawalMethods />
            <Reviews />
            <Calculator />
            <FIFA24CoinsPromo />
        </div>
    );
};

export default Index;
