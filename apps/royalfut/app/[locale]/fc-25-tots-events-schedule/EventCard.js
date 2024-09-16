import React from "react";

import styles from "./EventCard.module.scss";
import Image from "next/image";
import Link from "next/link";

const EventCard = ({ card }) => {
    return (
        <Link
            href={card.route}
            key={card.id}
            className={`${styles.card_wrapper} ${!card.select && styles.no_select}`}>
            <div className={styles.square}>
                <Image width={280} height={280} src={card.src} />
            </div>
            <p className={styles.card_text_wrapper}>
                <span className={styles.card_date}>{card.date}</span>
                <span className={styles.card_name}>{card.name}</span>
            </p>
        </Link>
    );
};

export default EventCard;
