import { cn } from "@royalfut/utils";
import Image from "next/image";
import Link from "next/link";

const BannerCard = () => {
    return (
        <div
            className={
                "flex flex-col justify-end overflow-hidden w-full bg-primary rounded-2xl border-1 border-[white-10] md:max-w-[332px] relative"
            }>
            <div className="w-full h-full absolute z-[1]">
                <Image
                    alt="cover card"
                    width={100}
                    height={75}
                    className="w-full h-3/4"
                    src={"/image/banner_coins_cover.png"}
                />
            </div>
            <div className="flex flex-col h-auto py-4 px-6 gap-4 p-6">
                <span className="text-2xl font-bold leading-normal capitalize">
                    Hi there! What about coins?
                </span>
            </div>
            <div className="flex flex-col gap-2 p-6 z-[2]">
                <Link
                    href={"/order"}
                    className={cn(
                        "flex justify-center items-center w-full h-12 rounded-xl cursor-pointer font-semibold text-xl leading-normal bg-white text-black hover:opacity-80"
                    )}>
                    Buy now
                </Link>
            </div>
        </div>
    );
};

export default BannerCard;
