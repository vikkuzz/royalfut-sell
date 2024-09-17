import { ICard } from "@royalfut/interfaces";
import { cn } from "@royalfut/utils";
import Image from "next/image";
import Link from "next/link";

const BannerCard = ({ card }: { card: ICard }) => {
    return (
        <div
            className={
                "flex flex-col justify-end items-center overflow-hidden w-full bg-primary rounded-2xl border-1 border-[white-10] md:max-w-[350px] relative"
            }>
            <div className="h-[375px] w-auto min-h-[125px] absolute top-0">
                {card.cover && (
                    <Image
                        alt="cover card"
                        width={350}
                        height={350}
                        // fill
                        src={"/img/banner_cover_coins.png"}
                        objectFit="cover"
                        quality={100}
                    />
                )}
            </div>
            <div className="flex flex-col h-auto pt-0 pb-0 px-6 gap-4 p-6 z-[2] bg-transparent">
                <span className="text-[24px] font-bold leading-normal capitalize">
                    {card.title}
                </span>
            </div>
            <div className="flex flex-col gap-2 p-6 z-[2]">
                {card.buttons &&
                    card.buttons?.length > 0 &&
                    card.buttons.map((btn, i) => (
                        <Link
                            key={i}
                            href={btn.route}
                            className={cn(
                                "flex justify-center items-center w-full h-12 rounded-xl cursor-pointer font-semibold text-[16px] leading-normal",
                                {
                                    "bg-white text-black hover:bg-white/85":
                                        btn.color === "white",
                                    "bg-transparent hover:bg-white-90 hover:text-black":
                                        btn.color === "transparent",
                                }
                            )}>
                            {btn.text}
                        </Link>
                    ))}
            </div>
        </div>
    );
};

export default BannerCard;
