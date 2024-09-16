"use client";
// import { useRouter } from 'next/router';
// import { Trans, t } from '@lingui/macro';
// import { useLingui } from '@lingui/react';
// import { loadCatalog } from '../utils/useLinguiInit';
// import MainContainer from '../components/MainContainer';
// import { seoTags } from '../data-elements/seoTags';

import { useTranslations } from "next-intl";
import styles from "../../../styles/App.module.scss";

const Cookie = () => {
    const t = useTranslations("cookie");
    /**
     * This hook is needed to subscribe your
     * component for changes if you use t`` macro
     */
    // useLingui();
    // const router = useRouter();
    // const seo = seoTags[router.locale];

    return (
        // <MainContainer
        //     title={seo.delivery.title}
        //     description={seo.delivery.description}
        //     customStyle={'.no_backgr_img'}
        // >
        <div className={`${styles.app_main} ${styles.terms_main}`}>
            <h1 className={`${styles.app_h1} ${styles.delivery_h}`}>
                {/* t('ab53') */}
                {t("ab53")}
            </h1>
            <p className={styles.p_cook}>
                {/* t('ab54') */}
                {t("ab54")}
            </p>

            <h2 className={`${styles.h2_cook}`}>{t("ab55")}</h2>
            <p className={styles.p_cook}>{t("ab56")}</p>
            <h2 className={`${styles.h2_cook}`}>{t("ab57")}</h2>
            <h3 className={`${styles.h3_cook}`}>{t("ab58")}</h3>
            <p className={styles.p_cook}>{t("ab59")}</p>
            <h3 className={`${styles.h3_cook}`}>{t("ab60")}</h3>
            <p className={styles.p_cook}>{t("ab61")}</p>
            <h3 className={`${styles.h3_cook}`}>{t("ab62")}</h3>
            <p className={styles.p_cook}>{t("ab63")}</p>
            <h3 className={`${styles.h3_cook}`}>{t("ab64")}</h3>
            <p className={styles.p_cook}>{t("ab65")}</p>
            <p className={styles.p_cook}>{t("ab66")}</p>
            <ol className={`${styles.cook_ol}`}>
                <li>1. {t("ab67")}</li>
                <li>2. {t("ab68")}</li>
                <li>3. {t("ab69")}</li>
            </ol>
            <p className={`${styles.p_cook} initial`}>
                {t("ab70")}
                <a href={t(`ab71`)}>
                    <b>{t("ab71")}</b>
                </a>
            </p>
            <h2 className={`${styles.h2_cook}`}>{t("ab73")}</h2>
            <p className={styles.p_cook}>{t("ab74")}</p>
            <p className={styles.p_cook}>{t("ab75")}</p>
            <h2 className={`${styles.h2_cook}`}>{t("ab76")}</h2>
            <p className={styles.p_cook}>{t("ab77")}</p>
            <h2 className={`${styles.h2_cook}`}>{t("ab78")}</h2>
            <p className={styles.p_cook}>
                {t(`ab79`).replace("support@royalfut.com.", "")}
                <a
                    href="mailto:support@royalfut.com"
                    className={`${styles.mail}`}>
                    support@royalfut.com.
                </a>
            </p>
        </div>
        // </MainContainer>
    );
};

// export const getStaticProps = async (ctx) => {
//     const translation = await loadCatalog(ctx.locale);

//     return {
//         props: { translation }
//     };
// };

export default Cookie;
