import React from "react";
import "./Rating.scss"; // Создайте CSS-файл для стилей
import Image from "next/image";

interface IRatingProps {
    rating: number;
}

const Rating: React.FC<IRatingProps> = ({ rating }) => {
    const fullStars = Math.floor(rating); // Получаем количество заполненных звёзд
    // const fractionalStar = (rating - fullStars) * 100; // Получаем процент заполнения последней звёзды

    return (
        <div className="rating">
            {[...Array(5)].map((_, index) => {
                let starClass = "star";
                if (index < fullStars) {
                    starClass += " filled";
                } else if (index === fullStars) {
                    starClass += " partial";
                } else if (index > fullStars) {
                    starClass += " not_filled";
                }
                return (
                    <div key={index} className={starClass}>
                        <Image
                            alt="star"
                            src={"/image/star.svg"}
                            width={24}
                            height={24}
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default Rating;
