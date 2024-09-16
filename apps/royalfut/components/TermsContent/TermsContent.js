// import { Trans } from '@lingui/macro';
import StickyBlock from "../StickyBlock/StickyBlock";
import { terms } from "../../locales/terms";

import styles from "../../styles/TermsContent.module.scss";
import { useTranslations } from "next-intl";

const TermsContent = ({ locale }) => {
    const t = useTranslations("terms");

    return (
        <div className="content">
            <div className={`${styles.wrapper_text_content}`}>
                <h2 className={`${styles.app_h1}`}>
                    {/* <Trans>locales.modalSocialLoginCheck</Trans> */}
                    {t("modalSocialLoginCheck")}
                </h2>
                <p className={`${styles.terms_text}`}>
                    {/* <Trans>locales.terms_text</Trans> */}
                    {t("terms_text")}
                </p>
                <h3 className={`${styles.terms_h}`}>
                    {/* <Trans>locales.user_agreement</Trans> */}
                    {t("user_agreement")}
                </h3>

                {terms[locale].map((el, i) => {
                    if (i === 1) {
                        return (
                            <noindex key={i}>
                                <p
                                    className={`${styles.p_text} ${styles.p_padding}`}>
                                    {el.p}
                                </p>
                            </noindex>
                        );
                    } else
                        return (
                            <p
                                className={`${styles.p_text} ${styles.p_padding}`}
                                key={i}>
                                {el.p}
                            </p>
                        );
                })}
                <p className={`${styles.p_text}`}>
                    <a
                        rel="nofollow"
                        href="/Terms_and_conditions_from_01_10_2020_01_10_2020_07_02_2021.pdf"
                        target={"_blank"}
                        className={`${styles.terms_link}`}>
                        {/* <Trans>locales.termsa1</Trans> */}
                        {t("termsa1")}
                    </a>
                </p>
                <p className={`${styles.p_text}`}>
                    <a
                        rel="nofollow"
                        href="/Terms_and_conditions_from_08_02_2021_08_02_2021_03_06_2021.pdf"
                        target={"_blank"}
                        className={`${styles.terms_link}`}>
                        {/* <Trans>locales.termsa2</Trans> */}
                        {t("termsa2")}
                    </a>
                </p>
                <p className={`${styles.p_text}`}>
                    <a
                        rel="nofollow"
                        href="/Privacy_Policy_from_01_10_2020_01_10_2020_07_02_2021.pdf"
                        target={"_blank"}
                        className={`${styles.terms_link}`}>
                        {/* <Trans>locales.termsa3</Trans> */}
                        {t("termsa3")}
                    </a>
                </p>
            </div>
            <StickyBlock />
        </div>
    );
};

export default TermsContent;
