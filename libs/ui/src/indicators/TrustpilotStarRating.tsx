import { StarTrastpilotIcon } from "@royalfut/icons";
import { cn } from "@royalfut/utils";

import type { FC } from "react";

interface ITrustpilotStarRatingProps {
    rating: number;
}

const TrustpilotStarRating: FC<ITrustpilotStarRatingProps> = ({ rating }) => {
    const fullStars = Math.floor(rating); // Получаем количество заполненных звёзд

    return (
        <div className="flex gap-0.5">
            {new Array(5).fill(null).map((_, index) => {
                return (
                    <div
                        key={index}
                        className={cn(
                            "flex w-8 h-8 bg-white border border-black rounded-md justify-center items-center",
                            {
                                "bg-extra-trustpilot":
                                    index < fullStars /* Заполненная звезда */,
                                "bg-[linear-gradient(90deg,theme(colors.extra.trustpilot)_60%,rgba(82,84,101,1)_60%)]":
                                    index ===
                                    fullStars /* Заполнение последней звезды */,
                                "bg-[#525465]": index > fullStars,
                            }
                        )}
                    >
                        <StarTrastpilotIcon className="w-6 h-6 text-white" />
                    </div>
                );
            })}
        </div>
    );
};

export default TrustpilotStarRating;
