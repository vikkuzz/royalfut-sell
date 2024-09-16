import React from "react";

import Coupon from "./coupon";
import EventCard from "./EventCard";
import pagesData from "../../../data-elements/leagues";

import styles from "./EventsContent.module.scss";

const EventsContent = () => {
    return (
        <main className={styles.main}>
            <h1 className={`${styles.h1}`}>FC 24 TOTS Events Schedule</h1>
            <div className={`${styles.container_content}`}>
                <div className={styles.text_container}>
                    <h2>Welcome, FIFA fans!</h2>
                    <p className={styles.p3}>
                        <span className={styles.s1}>
                            FC 24 TOTS, or Team of the Season, has arrived to
                            enhance your Ultimate Team journey. Find out more
                            about the upcoming events, and player improvements
                            in our detailed guide.
                        </span>
                    </p>
                    <p className={styles.p3}>
                        <span className={styles.s1}>
                            This year, the Community TOTS may be replaced by the
                            Live TOTS, a dynamic type of TOTS that updates cards
                            based on team performances. Additionally, during the
                            Team of the Season (TOTS) Promo, EA Sports will
                            offer Squad Building Challenges (SBC) and weekly
                            objectives with themed rewards such as packs, TOTS
                            players, and more.
                        </span>
                    </p>
                    <p className={styles.p3}>
                        <span className={styles.s1}>
                            EAS FC 24 is available on PS5, PS4, Xbox Series X,
                            Xbox One, Steam, PC and Nintendo Switch.
                        </span>
                    </p>

                    <h2>
                        <span className={styles.s1}>
                            <b>What is FC 24 Team of the Season?</b>
                        </span>
                    </h2>
                    <p className={styles.p3}>
                        <span className={styles.s1}>
                            FC 24 TOTS honors the standout players across
                            different leagues by providing thrilling
                            enhancements and unique cards reflecting their
                            season-long accomplishments.
                        </span>
                    </p>
                    <h2>
                        <span className={styles.s1}>
                            <b>Maximize Your Experience with Our Schedule</b>
                        </span>
                    </h2>
                    <p className={styles.p3}>
                        <span className={styles.s1}>
                            Never miss a moment of the action with our detailed
                            events schedule, ensuring you're always prepared for
                            the next big release.
                        </span>
                    </p>
                    <p className={styles.p3}>
                        <span className={styles.s1}>
                            Elevate your gaming experience by acquiring shiny
                            coins and embrace your full Ultimate Team potential!
                            Get exclusive discounts on FIFA coins and buy FIFA
                            coins with promo code to maximize your FC 24 TOTS
                            experience.
                        </span>
                    </p>

                    {/* <div className={styles.coupon_container}>
                        <Coupon />
                    </div> */}
                </div>
                <div className={styles.grid}>
                    {pagesData.map(el => (
                        <EventCard key={el.id} card={el} />
                    ))}
                </div>
            </div>
        </main>
    );
};

export default EventsContent;
