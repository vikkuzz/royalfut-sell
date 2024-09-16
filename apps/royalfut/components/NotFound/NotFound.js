import Link from "next/link";
import { Trans } from "@lingui/macro";
import GradientBtn from "../GradientBtn";

import styles from "../../styles/NotFound.module.scss";

const NotFound = () => {
    return (
        <div className={`${styles.not_found_container}`}>
            <div className={`${styles.wrapper_pic}`}>
                <img alt="404" src="/img/coins/404.webp"></img>
            </div>

            <div className={`${styles.not_found__group}`}>
                <div className={`${styles.not_found__text}`}>
                    <Trans>seo100</Trans>
                </div>
                <div className={`${styles.description}`}>
                    <Trans>seo101</Trans>
                </div>

                <Link href="/" className="center auto">
                    <GradientBtn size={{ height: 64, width: 275 }}>
                        <span className="center">
                            <Trans>seo102</Trans>
                        </span>
                    </GradientBtn>
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
