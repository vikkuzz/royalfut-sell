import Link from "next/link";
import Image from "next/legacy/image";
// import { Trans } from '@lingui/macro';

import styles from "../../styles/SpecialOffer.module.scss";
import { useTranslations } from "next-intl";

const Product = ({
    title,
    img,
    h3,
    text,
    gradient = "false",
    link,
    handler,
    button = false,
}) => {
    const t = useTranslations("order");
    return (
        <div className={`${styles.offer_container} ${styles.product}`}>
            {title && (
                <h2 className={`${title ? styles.offer_h : "hide"}`}>
                    {title && title}
                </h2>
            )}
            <Link
                href={link ?? ""}
                onClick={handler || (() => null)}
                className={`${styles.offer_content}`}
                style={{ background: `${gradient}` }}>
                {/* <div className={`${styles.offer_timer}`}></div> */}
                <div
                    className={`${styles.offer_cover}`}
                    style={{
                        background: `${gradient != "false" && "transparent"}`,
                    }}>
                    <Image
                        className={`${img && styles.cover}`}
                        src={img}
                        width={800}
                        height={240}
                        alt="cover"
                        loading="lazy"
                        fill
                        objectFit="cover"
                    />
                </div>
                <div
                    className={`${styles.offer_content_text}`}
                    style={{
                        background: `${gradient != "false" && "transparent"}`,
                    }}>
                    <h3 className={`${styles.offer_title}`}>{h3}</h3>
                    <div className={`${styles.offer_text}`}>
                        {text}{" "}
                        {button && (
                            <button className={styles.show}>
                                {/* <Trans>a73</Trans> */}
                                {t("pl_upd29")}
                            </button>
                        )}
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default Product;
