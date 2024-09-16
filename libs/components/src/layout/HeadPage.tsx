import { tags } from "@royalfut/collections";
import { ClockIcon } from "@royalfut/icons";
import { ICard } from "@royalfut/interfaces";
import { cn } from "@royalfut/utils";
import Image from "next/image";
import Link from "next/link";

const HeadPage = ({
    img,
    text,
    bread,
    card,
}: {
    img: string;
    text: string;
    bread?: any;
    card: ICard;
}) => {
    return (
        <div className="flex flex-col gap-6 bg-transparent justify-center relative pb-8 md:py-12 w-full h-auto">
            <Image
                quality={100}
                className="absolute bg-transparent"
                alt="cover head"
                src={img}
                fill
                objectFit="contain"
            />
            {bread && (
                <div className="flex bg-transparent gap-1 w-auto z-[2]">
                    <Link href={"/"} className="text-base w-auto">
                        Home
                    </Link>
                    <span className="w-auto"> / </span>
                    <Link
                        href={"/blog"}
                        className={cn("text-base w-auto", {
                            "opacity-40": !bread.post,
                        })}
                    >
                        Blog
                    </Link>
                    <span className="w-auto"> / </span>
                    {bread.post && (
                        <span className="opacity-40 text-base w-auto">
                            {bread.post.substr(0, 5)}...#
                        </span>
                    )}
                </div>
            )}
            {bread.post && (
                <div className="flex w-auto h-auto bg-transparent gap-3 opacity-60">
                    <div className="w-auto h-auto bg-transparent">
                        {card.date}
                    </div>
                    <div className="flex w-fit h-auto bg-transparent gap-1 items-center flex-nowrap">
                        <ClockIcon className="h-4 w-auto fill-white bg-transparent" />
                        <span className="w-auto h-auto bg-transparent whitespace-nowrap">
                            ~{card.time}
                        </span>
                    </div>
                </div>
            )}
            {bread.post && (
                <div className="flex gap-1 w-auto h-auto bg-transparent z-[2]">
                    {" "}
                    {card.tags.map((tag) => (
                        <div
                            key={tag}
                            className={
                                "text-[16px] leading-normal px-2 py-1 h-fit rounded-full bg-primary whitespace-nowrap font-medium w-auto"
                            }
                        >
                            {tags?.filter((elem) => elem.slug === tag)[0].text}
                        </div>
                    ))}
                </div>
            )}

            <h1 className="block w-auto h-auto bg-transparent text-[28px] md:text-[52px] md:leading-[52px] font-bold leading-normal z-[2]">
                {text}
            </h1>
        </div>
    );
};

export default HeadPage;
