import { t } from "@lingui/macro";

import styles from "../../styles/App.module.scss";

const HowItWorks = ({ href }) => {
    return (
        <div className={`${styles.info_method}`}>
            <a href={href} className={`${styles.method_info}`}>
                <span className={`${styles.info_text}`}>
                    {t`locales.marketMethodWhat`.toLowerCase()}
                </span>
                <img alt="what" src="/img/what-question.svg" />
            </a>
        </div>
    );
};

export default HowItWorks;
