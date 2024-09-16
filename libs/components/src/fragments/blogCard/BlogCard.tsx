import { ClockIcon } from "@royalfut/icons";
import { ICard, ITag, IWidget } from "@royalfut/interfaces";
import { cn } from "@royalfut/utils";
import Image from "next/image";
import Link from "next/link";

const Widget = ({ item }: { item: IWidget }) => {
    return item.text ? (
        <div
            className={cn("rounded-full py-1 px-2 leading-normal font-medium", {
                "bg-[#EA501F]": item.color === "red",
                "bg-[#349F5E]": item.color === "green",
            })}
        >
            {item.text}
        </div>
    ) : (
        ""
    );
};

const BlogCard = ({
    card,
    tags,
    className,
}: {
    card: ICard;
    tags: Array<ITag>;
    className?: string;
}) => {
    return (
        <Link
            href={`/blog/${card.slug}`}
            className={cn("flex w-[350px] min-w-[332px]", {
                "md:w-[332px]": card.width === "1",
                "md:w-[680px]": card.width === "2",
            })}
        >
            <div
                className={cn(
                    "flex w-full flex-col h-full bg-[#2B2D43] hover:bg-white-20 rounded-2xl border-1 border-[white-10] hover:border-[white-20] cursor-pointer overflow-hidden",
                    className,
                )}
            >
                <div className="h-[174px] w-auto min-h-[174px] relative">
                    {card.cover && (
                        <Image
                            alt="cover post"
                            fill
                            objectFit="cover"
                            src={`/img/blog/${card.slug}/${card.cover}.jpg`}
                            className="w-auto"
                        />
                    )}

                    <div className="flex w-auto h-auto bg-transparent gap-1 absolute right-4 top-4">
                        {card.widgets?.map((widget, i) => (
                            <Widget key={i} item={widget} />
                        ))}
                    </div>
                </div>
                <div className="flex flex-col h-full w-auto bg-transparent py-4 px-6 gap-4">
                    <div className="flex w-auto h-auto bg-transparent gap-3 opacity-60">
                        <div className="w-auto h-auto bg-transparent">{card.date}</div>
                        <div className="flex w-fit h-auto bg-transparent gap-1 items-center flex-nowrap">
                            <ClockIcon className="h-4 w-auto fill-white bg-transparent" />
                            <span className="w-auto h-auto bg-transparent whitespace-nowrap">{card.time}</span>
                        </div>
                    </div>
                    <div className="flex flex-col justify-between h-full w-auto bg-transparent gap-6">
                        <span className="text-[20px] w-auto h-auto bg-transparent font-bold leading-normal capitalize">
                            {card.title}
                        </span>
                        <div className="flex gap-1 w-auto h-auto bg-transparent">
                            {card.tags.map((tag) => (
                                <div
                                    key={tag}
                                    className={
                                        "text-[16px] leading-normal px-2 py-1 h-fit rounded-full bg-primary whitespace-nowrap font-medium w-auto"
                                    }
                                >
                                    {
                                        tags?.filter(
                                            (elem) => elem.slug === tag,
                                        )[0].text
                                    }
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default BlogCard;
