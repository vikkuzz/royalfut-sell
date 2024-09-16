import Image from "next/image";
import { cn } from "@royalfut/utils";

import type { FNCN } from "@royalfut/interfaces";
import type {
    ITrustpilotReviewEntity,
    IReviewsEntity,
} from "@royalfut/interfaces";

const imgCountriesMap: { [key: string]: string } = {
    France: "fr.svg",
    "United States": "us.svg",
    Germany: "de.svg",
    "Saudi Arabia": "sa.svg",
    Netherlands: "nl.svg",
    Portugal: "pt.svg",
    Russia: "ru.svg",
    Spain: "es.svg",
    China: "cn.svg",
    Japan: "jp.svg",
    Italy: "it.svg",
};

interface IReviewCardProps {
    review: IReviewsEntity | ITrustpilotReviewEntity;
}

const ReviewCard: FNCN<IReviewCardProps> = ({ review, className }) => {
    return (
        <div
            className={cn(
                "min-h-0 w-80 flex max-w-md bg-black-shape border border-white-20 rounded-3xl p-6 break-inside-avoid gap-4 flex-col",
                className
            )}>
            <div className="flex flex-col gap-1">
                <div className="flex items-center flex-wrap gap-2">
                    <div className="font-semibold text-xl capitalize w-auto">
                        {review.username}
                    </div>
                    <div className="flex gap-2 items-center w-auto">
                        {imgCountriesMap[review.geo] ? (
                            <Image
                                alt="flag"
                                width={28}
                                height={20}
                                className="w-4 h-4"
                                src={`/image/flags/rounded/${imgCountriesMap[review.geo]}`}
                            />
                        ) : (
                            ""
                        )}
                        <div className="font-medium text-xs text-[rgba(255, 255, 255, 0.8)]">
                            {review.geo}
                        </div>
                    </div>
                </div>
                <div className="w-auto mt-1">
                    <Image
                        alt="rating"
                        width={120}
                        height={24}
                        className="w-32 min-w-[8rem]"
                        src="/image/rating.svg"
                    />
                </div>
            </div>
            {"title" in review && (
                <span className="text-xl text-white-55">{review.title}</span>
            )}
            <p className="font-medium text-base text-white-60 bg-transparent leading-5 h-full overflow-y-auto">
                {review.text}
            </p>
        </div>
    );
};

export default ReviewCard;
