import { StarTrastpilotIcon } from "@royalfut/icons";
import { cn } from "@royalfut/utils";

import type { FNCN } from "@royalfut/interfaces";

interface ITrustpilotStarRatingProps {
    rating: number;
    size?: "sm" | "relative";
}

const TrustpilotStarRating: FNCN<ITrustpilotStarRatingProps> = ({
    rating,
    size = "sm",
    className,
}) => {
    const fullStars = Math.floor(rating); // Получаем количество заполненных звёзд

    return (
        <div className={cn("flex gap-0.5", className)}>
            {new Array(5).fill(null).map((_, index) => {
                return (
                    <div
                        key={index}
                        className={cn(
                            "flex bg-white border border-black justify-center items-center",
                            {
                                "w-8 h-8 rounded-md": size === "sm",
                                "w-1/5 h-auto aspect-square rounded-lg":
                                    size === "relative",
                                "bg-extra-trustpilot":
                                    index < fullStars /* Заполненная звезда */,
                                "bg-[linear-gradient(90deg,theme(colors.extra.trustpilot)_60%,rgba(82,84,101,1)_60%)]":
                                    index ===
                                    fullStars /* Заполнение последней звезды */,
                                "bg-[#525465]": index > fullStars,
                            }
                        )}>
                        <StarTrastpilotIcon
                            className={cn("text-white", {
                                "w-2/3 h-2/3": size === "relative",
                                "w-6 h-6": size === "sm",
                            })}
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default TrustpilotStarRating;
