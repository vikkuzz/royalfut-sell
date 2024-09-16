"use client";

import { useRouter, usePathname } from "../../../navigation";
import flagLangs from "../../../data-elements/countries";
import { useDispatch, useSelector } from "react-redux";
import { currentLang } from "../../../redux/actions/royalfutLocaleAction";

import styles from "./LanguageChanger.module.scss";
import Image from "next/image";

export default function LanguageChanger({ locale }) {
    const router = useRouter();
    const pathname = usePathname();
    const handleChange = e => {
        router.push(pathname, { locale: e.target.dataset.id });
    };

    return (
        <div className={`${styles.dropdown_container}`}>
            <div className={`${styles.lang_wrapper}`}>
                <div className={`${styles.icon_wrapper}`}>
                    <Image
                        width={24}
                        height={24}
                        src={`/img/flag/${locale}_circle.svg`}
                        loading="lazy"
                        alt="flag"></Image>
                </div>
                <span className={styles.country}>
                    {flagLangs.filter(el => el.title == locale)[0].country}
                </span>
                <div
                    className={`${styles.icon_wrapper} ${styles.arrow_wrapper}`}>
                    <Image
                        width={24}
                        height={24}
                        src={`/img/arrow_drop_down.svg`}
                        loading="lazy"
                        alt="arrow"
                    />
                </div>
            </div>
            <div className={`${styles.lang_container} ${styles.drop_block}`}>
                {flagLangs.map(el => (
                    <button
                        className={`${styles.dropdown_content_item}`}
                        key={el.title}
                        data-id={el.title}
                        value={el.title}
                        onClick={handleChange}>
                        <div
                            data-id={el.title}
                            className={`${styles.icon_wrapper}`}>
                            <Image
                                data-id={el.title}
                                width={24}
                                height={24}
                                src={el.url}
                                loading="lazy"
                                alt="lang"
                                quality={30}
                            />
                        </div>
                        {el.country}
                    </button>
                ))}
            </div>
        </div>
    );
}
