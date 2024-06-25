import React from "react";
import Image from "next/image";
import styles from "./Reviews.module.scss";

interface IReviewCardProps {
    el: any;
    sizeHeight: number;
}

const ReviewCard: React.FC<IReviewCardProps> = ({ el, sizeHeight }) => {
    interface IImgCountries {
        [key: string]: string;
    }
    const imgCountries: IImgCountries = {
        "France": "fr.svg",
        "United States": "us.svg",
        "Germany": "de.svg",
        "Saudi Arabia": "sa.svg",
        "Netherlands": "nl.svg",
    };

    return (
        <div
            className={`min-w-0 min-h-0 w-80 ${styles.testblock} ${styles[sizeHeight]}`}>
            <div className={`${styles.header_review_wrapper} `}>
                <div className={`${styles.author_name_rat}`}>
                    <div className={`${styles.author_name}`}>{el.username}</div>
                    <div className={`${styles.author_country}`}>
                        <Image
                            alt="flag"
                            width={28}
                            height={20}
                            className={`${styles.country_img}`}
                            src={`/image/flags/rounded/${imgCountries[el.geo]}`}
                        />

                        <div className={`${styles.country_name}`}>{el.geo}</div>
                    </div>
                </div>
                <div className={`${styles.author_rat}`}>
                    <Image
                        alt="rating"
                        width={120}
                        height={24}
                        className={styles.rat_img}
                        src="/image/rating.svg"
                    />
                </div>
            </div>
            <p className={`${styles.review_text}`}>{el.text}</p>
        </div>
    );
};

const Reviews = () => {
    const reviews = [
        {
            "id": 818,
            "text": "400k coins to PS4 transferred in 30 minutes\nSo good speed for the money they are asking for thier coins",
            "username": "Léonce Sauvage",
            "geo": "France",
        },
        {
            "id": 363,
            "text": "Much more than satisfactory, tried once, but will more for sure",
            "username": "Serge S.",
            "geo": "France",
        },
        {
            "id": 506,
            "text": "Consider yourself lucky if you've this website\nGet ready to get your coins the fastest and the safest way possible and be able to ask any question to support service and expect to be answered quickly and substantially",
            "username": "Troy Barton",
            "geo": "United States",
        },
        {
            "id": 437,
            "text": "Wow, it actually works, no scammimg or anything and so cheap!",
            "username": "Ulbrecht S.",
            "geo": "Germany",
        },
        {
            "id": 750,
            "text": "I've been using royalfut for fifa 21 all summer and recently switched to fifa 22 and It's safe to say that they did an amazing job of delivering my coins for both titles, didn't fail me once, always on time and always using completely safe delivery methods",
            "username": "Phil Eland",
            "geo": "United States",
        },
        {
            "id": 254,
            "text": "Best option of buying fifa coins\nI ordered 500000 coins using royalfut and they came to my account in not much longer than 40 minutes, it was really great experience especially because I was able to ask anything I might need in live chat where customer support always replies fast and help with everything",
            "username": "Lukas Grosse",
            "geo": "Germany",
        },
        {
            "id": 693,
            "text": "Very good for the money they are asking for the coins",
            "username": "Lanzo S.",
            "geo": "Germany",
        },
        {
            "id": 156,
            "text": "It was very amazing using royalfut site to buy fifa coins, after placing order I was needed to wait very short time before they arrive to my account and also the customer support was really great, very cooperative and helping, will buy more very soon",
            "username": "Adil Halaby",
            "geo": "Saudi Arabia",
        },
        {
            "id": 810,
            "text": "It's surprising how well Royalfut performs in coins delivery field even under pressure of providing the best security possible for clients accounts, especially knowing how poorly some other stores manages to do these things, very good job, Royalfut",
            "username": "Robbert Drenth",
            "geo": "Netherlands",
        },
        {
            "id": 609,
            "text": "Delightful site\nI rarely leave any reviews but this time I really owe to Royalfut, it seems like they're doing an impossible job, everything is so fast and comfy, such a rare case nowadays, do yourself a favor and don't look any further, just choose Royalfut",
            "username": "Bob Dittman",
            "geo": "United States",
        },
    ];
    return (
        <div className="max-w-screen w-full overflow-x-auto pb-6">
            <div className="grid grid-cols-5 grid-rows-2 gap-4 w-max">
                {reviews.map(el => {
                    return <ReviewCard key={el.id} el={el} sizeHeight={310} />;
                })}
            </div>
        </div>
    );
};

export default Reviews;
