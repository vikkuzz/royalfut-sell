import React from "react";
import Image from "next/legacy/image";

import styles from "../../styles/MainCover.module.scss";
import { useWindowDimensions } from "../../utils/hooks";
import { useSelector } from "react-redux";

const MainCover = () => {
    const footballer = "/img/No_coins/Hero_image_mobile.webp";
    const footballer768 = "/img/Hero_image_desktop.webp";
    // const footballer = '/img/footballer_cover.png';
    // const footballer768 = '/img/cover_desk.png';

    const stateDir = useSelector(state => state.royalfutReducer.direction);

    const { height, width } = useWindowDimensions();
    return (
        <div className={`${styles.maincover_container}`}>
            <div className="from-375-to-1024">
                <Image
                    src={footballer}
                    alt="cover"
                    width={700}
                    height={700}
                    objectFit="contain" // cover, contain, none
                    priority
                    placeholder="blur"
                    blurDataURL="/img/Hero_image_desktop_low.webp"
                />
            </div>
            <div className={`from-1025-to-1900 ${styles.width100}`}>
                <div className={`${styles.cover_img}`} dir={stateDir}>
                    <Image
                        src={footballer768}
                        width={728}
                        height={612}
                        alt="cover"
                        priority
                        placeholder="blur"
                        blurDataURL="/img/Hero_image_desktop_low.webp"
                    />
                </div>
            </div>
        </div>
    );
};

export default MainCover;
