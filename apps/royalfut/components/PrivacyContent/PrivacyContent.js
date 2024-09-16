import Link from "next/link";
// import { useRouter } from 'next/router';
// import { Trans } from '@lingui/macro';
import StickyBlock from "../StickyBlock/StickyBlock";
import { privacy } from "../../locales/privacy";

import styles from "../../styles/PrivacyContent.module.scss";
import { useTranslations } from "next-intl";

const PrivacyContent = ({ locale }) => {
    const t = useTranslations("privacy");
    // const router = useRouter();
    return (
        <div className="content">
            <div className={`${styles.wrapper_text_content}`}>
                {privacy[locale].map((el, i) => {
                    return (
                        <p
                            className={`${styles.p_text} ${el.padding == true && styles.p_padding}`}
                            key={i}>
                            <span
                                className={`${styles.marker} ${el.marker == false && "hide"}`}>
                                •
                            </span>
                            <span className={`${styles.el_text}`}>{el.p}</span>
                        </p>
                    );
                })}
                <p className={`${styles.p_text} ${styles.p_block}`}>
                    {/* <Trans>locales.privacya1</Trans> */}
                    {t("privacya1")}{" "}
                    <Link
                        href="/termsold"
                        target={"_blank"}
                        className={`${styles.link}`}>
                        https://royalfut.com
                    </Link>
                    {locale === "de" && " registriert ist."}
                    {locale === "ch" && " 注册之日起生效。"}
                    {locale === "tr" && " kayıt olduğu anda yürürlüğe girer."}
                </p>
                <p className={`${styles.p_text} ${styles.p_block}`}>
                    {/* <Trans>locales.privacya2</Trans> */}
                    {t("privacya2")}{" "}
                    <a
                        href="mailto:support@royalfut.com"
                        target={"_blank"}
                        className={`${styles.link}`}
                        rel="noreferrer">
                        support@royalfut.com
                    </a>
                </p>
            </div>
            <StickyBlock />
        </div>
    );
};

export default PrivacyContent;
