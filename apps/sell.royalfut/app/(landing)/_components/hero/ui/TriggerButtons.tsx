import { GradientButtonRegular, Button } from "@royalfut/ui";
import { PROJECT_PUBLIC_SELLER_ROUTES } from "@royalfut/collections";

const TriggerButtons = () => {
    return (
        <div className="relative w-full flex justify-center -mt-12 sm:-mt-[4.375rem] z-[5]">
            <div className="flex flex-col space-y-10">
                <div className="w-full text-center">
                    <span className="text-white-60 max-w-md sm:max-w-lg inline-block text-center text-2xl font-semibold leading-normal">
                        Start getting paid for playing your favourite game with
                        our user-friendly service!
                    </span>
                </div>
                <div className="flex space-y-3 sm:space-y-0 sm:space-x-7 sm:h-16 flex-col sm:flex-row">
                    <GradientButtonRegular
                        as="link"
                        href={PROJECT_PUBLIC_SELLER_ROUTES.ORDER}
                        className="text-xl font-semibold w-full sm:w-72 h-[4.5rem] sm:h-full rounded-xl">
                        Sell FC 24 Coins
                    </GradientButtonRegular>
                    <Button
                        as="link"
                        href="/#how-does-it-work"
                        className="[--bordered-box-linear-bg-1:#12142A] text-xl rounded-xl transition-all duration-300 font-semibold w-full sm:w-72 h-[4.5rem] sm:h-full border border-transparent bordered-box-linear-accent-1 hover:[--bordered-box-linear-bg-1:#1B1D33]">
                        How Does It Work?
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default TriggerButtons;
