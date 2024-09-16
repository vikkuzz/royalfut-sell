import { Trans } from "@lingui/macro";

import styles from "../../styles/H1.module.scss";

const H1 = () => {
    return (
        <div className={`${styles.h1_container}`}>
            <h1 className={`${styles.h1}`}>
                <span className={`${styles.h1_white_text}`}>
                    <Trans>mainblocks16</Trans>
                </span>
                <span>
                    <Trans>mainblocks17</Trans>
                </span>
                <span>
                    <Trans>mainblocks18</Trans>
                </span>
            </h1>
            <span className={`${styles.under_h1}`}>
                <Trans>locales.main_h2</Trans>
            </span>
        </div>
    );
};

export default H1;
