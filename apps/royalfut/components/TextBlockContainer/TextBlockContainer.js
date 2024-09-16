import TextBlock from "../TextBlock/TextBlock";

import styles from "../../styles/TextBlock.module.scss";
import { useTranslations } from "next-intl";

const TextBlockContainer = () => {
    const t = useTranslations("mainblocks");
    return (
        <div className={`${styles.textblock_container}`}>
            <div className={`${styles.textblock_row}`}>
                <TextBlock
                    img={"/img/Benefit1.svg"}
                    title={t(`card_title_1`)}
                    text={t(`card_text_1`)}
                />
                <TextBlock
                    img={"/img/Benefit2.svg"}
                    title={t(`card_title_3`)}
                    text={t(`card_text_3`)}
                />
            </div>
            <div className={`${styles.textblock_row}`}>
                <TextBlock
                    img={"/img/Benefit3.svg"}
                    title={t(`card_title_4`)}
                    text={t(`card_text_4`)}
                />
                <TextBlock
                    img={"/img/Benefit4.svg"}
                    title={t(`card_title_2`)}
                    text={t(`card_text_2`)}
                />
            </div>
        </div>
    );
};

export default TextBlockContainer;
