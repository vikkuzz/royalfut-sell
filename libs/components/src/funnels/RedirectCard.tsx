import { ICard } from "@royalfut/interfaces";
import { cn } from "@royalfut/utils";
import Image from "next/image";
import Link from "next/link";

const RedirectCard = ({ card }: { card: ICard }) => {
    return (
        <div
            className={
                "flex flex-col overflow-hidden w-full bg-primary rounded-2xl border-1 border-[white-10] md:max-w-[332px]"
            }>
            <div className="h-[174px] w-auto min-h-[174px] relative">
                {card.cover && (
                    <Image
                        alt="cover card"
                        fill
                        src={card.cover}
                        objectFit="cover"
                    />
                )}
            </div>
            <div className="flex flex-col h-full py-4 px-6 gap-4 p-6">
                <span className="text-[20px] font-bold leading-normal capitalize">
                    {card.title}
                </span>
            </div>
            <div className="flex flex-col gap-2 p-6">
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

export default RedirectCard;
