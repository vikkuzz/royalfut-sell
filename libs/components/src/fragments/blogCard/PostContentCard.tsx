import { ClockIcon } from "@royalfut/icons";
import { ICard, ITag } from "@royalfut/interfaces";
import Image from "next/image";
import { BannerCard } from "../../funnels";
import { redirectedCard } from "@royalfut/collections";

const PostContentCard = ({
    card,
    tags,
}: {
    card: ICard;
    tags: Array<ITag>;
}) => {
    return (
        <div className={"flex w-full flex-col h-auto"}>
            <div className="flex w-auto h-auto gap-3 opacity-60">
                <div className="w-auto h-auto">{card.date}</div>
                <div className="flex w-auto h-auto gap-1 items-center">
                    <ClockIcon className="h-4 fill-white bg-transparent" />
                    <span className="w-auto h-auto bg-transparent whitespace-nowrap">{card.time}</span>
                </div>
            </div>
            <div className="flex gap-1 pt-10 pb-6 w-auto h-auto">
                {card.tags.map((tag) => (
                    <div
                        key={tag}
                        className={
                            "w-auto text-[16px] leading-normal px-2 py-1 h-fit rounded-full bg-primary whitespace-nowrap font-medium"
                        }
                    >
                        {tags?.filter((elem) => elem.slug === tag)[0].text}
                    </div>
                ))}
            </div>
            <div className="flex flex-col h-auto gap-4 w-auto">
                <div className="flex flex-col justify-between h-auto gap-6 w-auto">
                    <h1 className="text-[28px] md:text-[52px] font-bold leading-normal capitalize w-auto h-auto">
                        {card.title}
                    </h1>
                </div>
            </div>
            <div className="flex gap-8 w-auto h-auto">
                <div className="w-full rounded-2xl overflow-hidden h-[174px] min-h-[174px] md:h-[450px] relative">
                    {card.cover && (
                        <Image
                            alt="cover post"
                            fill
                            objectFit="cover"
                            src={`/img/blog/${card.slug}/${card.pic1}.jpg`}
                        />
                    )}
                </div>
                <div className="hidden md:flex max-h-[300px] md:w-auto md:h-auto md:opacity-100">
                    <BannerCard card={redirectedCard} />
                </div>
            </div>
        </div>
    );
};

export default PostContentCard;
