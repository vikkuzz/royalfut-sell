import React from "react";
import styles from "./MainFunnel.module.scss";
import Aside from "../Aside";
import dynamic from "next/dynamic";
import PlatformChanger from "../Package/PlatformChanger";
import StickySecondStep from "./StickySecondStep";
import Image from "next/legacy/image";
import { useSelector } from "react-redux";
import { useTranslations } from "next-intl";

import coins from "../../img/coins_desktop_cover.webp";

const CoinsChangerLoader = () => {
    return <div style={{ height: "154px", width: "100%" }}></div>;
};

const CoinsChanger = dynamic(() => import("../Order/CoinsChanger"), {
    ssr: false,
    loading: CoinsChangerLoader,
});

const MainFunnel = () => {
    const stateDir = useSelector(state => state.royalfutReducer.direction);
    const stateStock = useSelector(state => state.royalfutReducer.stock);
    const t = useTranslations("home");

    return (
        <div dir={stateDir} className={`${styles.container}`}>
            <div className={`${styles.block_header}`}>
                <div className={`${styles.aside_wrapper} from-1025-to-1900`}>
                    <Aside stock={stateStock} />
                </div>
                <div dir={stateDir} className={`${styles.h1_container}`}>
                    <div className={`${styles.h1}`}>
                        <span className={`${styles.h1_white_text}`}>
                            {t("newh1_1")}
                        </span>
                        <h1>{t("newh1_4")}</h1>

                        <div
                            className={`${styles.background_coins} from-375-to-1024`}>
                            <Image
                                // width={900}
                                // height={200}
                                layout="fill"
                                sizes="(max-width: 1024px) 100vw"
                                src={"/img/coins_mobile_h.webp"}
                                placeholder="blur"
                                blurDataURL="/img/coins_3_mobile_pl.png"
                                objectFit="contain"
                                priority={true}
                                quality={20}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div dir={stateDir} className={`${styles.calculator_block}`}>
                <div className={`${styles.desk_block_wrapper}`}>
                    <div className="from-375-to-1024">
                        <PlatformChanger />
                    </div>
                    <div className="from-1025-to-1900">
                        <PlatformChanger
                            small={true}
                            heightWidth={{ height: 56, width: 500 }}
                        />
                    </div>

                    <CoinsChanger title={false} />
                    <StickySecondStep />
                </div>

                <div className={`${styles.coins_img_block} from-1025-to-1900`}>
                    <div className={`${styles.coins_img_wrapper}`}>
                        <Image
                            priority={true}
                            width={540}
                            height={415}
                            src={coins}
                            objectFit="contain"
                            placeholder="blur"
                            blurDataURL="/img/coins_cover_low.png"
                            quality={20}></Image>
                    </div>
                </div>
            </div>
            <div className={`${styles.aside_wrapper} from-375-to-1024`}>
                <Aside stock={stateStock} />
            </div>
        </div>
    );
};

export default MainFunnel;
