import { GradientButton, Link } from "@royalfut/ui";
import { PROJECT_PUBLIC_SELLER_ROUTES } from "@royalfut/collections";

const BuyCoinBanner = () => {
    return (
        <div className="py-12 px-8 max-w-lg sm:max-w-md rounded-3xl bg-black-1 border border-white-10 backdrop-blur-3xl flex-col justify-start items-center gap-1 inline-flex">
            <p className="w-full text-white text-2xl font-bold mb-5">
                Hi there! Are you interested in selling coins?
            </p>
            <div className="flex flex-col space-y-5 w-full">
                <GradientButton asChild className="h-16 w-full rounded-xl">
                    <Link href={PROJECT_PUBLIC_SELLER_ROUTES["ORDER_INFO"]}>
                        Sell Coins
                    </Link>
                </GradientButton>
                {/* <Button
                    className="[--bordered-box-linear-bg-1:theme(colors.black.1)] text-xl rounded-xl font-semibold w-full h-16 border border-transparent bordered-box-linear-accent-1">
                    Sell any player
                </Button> */}
            </div>
        </div>
    );
};

export default BuyCoinBanner;
