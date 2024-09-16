"use client";
// import { useRouter } from 'next/router';
import Image from "next/legacy/image";
// import { Trans } from '@lingui/macro';
// import { useLingui } from '@lingui/react';
// import { loadCatalog } from '../utils/useLinguiInit';
// import MainContainer from '../components/MainContainer';
// import { seoTags } from '../data-elements/seoTags';
import Aside from "../../../components/Aside";
import PageChanger from "../../../components/PageChanger/PageChanger";
import banner_desk from "../../../public/img/Boost_desktop.png";
import BonusBlock from "../../../components/BonusBlock/BonusBlock";
// import api from '../Api/Api';

import styles from "../../../styles/App.module.scss";
import { useTranslations } from "next-intl";

// export async function getServerSideProps(ctx) {
//     const [stock, translation] = await Promise.all([
//         api.getStock(),
//         loadCatalog(ctx.locale)
//     ]);

//     return { props: { stock, translation } };
// }

const Boost = ({ stock }) => {
    /**
     * This hook is needed to subscribe your
     * component for changes if you use t`` macro
     */
    // useLingui();
    // const router = useRouter();
    const t = useTranslations("boost");

    return (
        // <MainContainer
        //     title={seoTags[router.locale]['wl-boost'].title}
        //     customStyle="."
        // >
        <div className={`${styles.app_main}`}>
            <div className={`${styles.desk_h_wrapper}`}>
                <h1 className={`${styles.h_coins}`}>WL Boost</h1>
                <div className={`${styles.aside_wrapper} from-1025-to-1900`}>
                    <Aside stock={stock} />
                </div>
            </div>
            <div className={`${styles.changer_container}`}>
                <div className={`${styles.changer_wrapper}`}>
                    <PageChanger />
                    <div className={`${styles.demo_wrapper}`}>
                        <div className={`${styles.demo_block}`}>
                            <div
                                className={`${styles.banner_div} from-1025-to-1900`}>
                                <Image
                                    objectFit="contain"
                                    src={banner_desk}
                                    width={672}
                                    height={275}></Image>
                            </div>
                            <div
                                className={`${styles.banner_div} from-375-to-1024`}>
                                <Image
                                    objectFit="cover"
                                    src={banner_desk}
                                    width={672}
                                    height={275}></Image>
                            </div>
                            <div className={`${styles.text_content}`}>
                                <h2 className={styles.boost_h2}>{t("aa5")}</h2>
                                <span className={`${styles.boost_description}`}>
                                    {t("aa6")}
                                </span>
                                <div className={`${styles.wrapper_social}`}>
                                    <span className={`${styles.title_social}`}>
                                        {t("via")}
                                    </span>
                                    <div className={`${styles.wrapper_icons}`}>
                                        <a
                                            className={`${styles.social_link}`}
                                            href="mailto:support@royalfut.com">
                                            <img
                                                alt="mail"
                                                className={`${styles.social_icon}`}
                                                src="/img/wmail.svg"
                                            />
                                        </a>
                                        <a
                                            className={`${styles.social_link}`}
                                            href="https://api.whatsapp.com/send?phone=74952604325">
                                            <img
                                                alt="mail"
                                                className={`${styles.social_icon}`}
                                                src="/img/whiteWhatsapp.svg"
                                            />
                                        </a>
                                        <a
                                            className={`${styles.social_link}`}
                                            href="https://t.me/royalfutcoins">
                                            <img
                                                alt="mail"
                                                className={`${styles.social_icon}`}
                                                src="/img/Telegram.svg"
                                            />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${styles.block_bonuses} from-1025-to-1900`}>
                    <BonusBlock />
                </div>
            </div>
        </div>
        // </MainContainer>
    );
};

export default Boost;
