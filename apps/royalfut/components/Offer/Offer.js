import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/legacy/image";
import TrustScore from "./TrustScore";
import { orderStep } from "../../redux/actions/royalfutOrderActions";
import Analitic from "../../Analitic/Analitic";
import GradientBtn from "../GradientBtn";

import styles from "./Offer.module.scss";
import { useTranslations } from "next-intl";

const analitic = new Analitic();

const Offer = () => {
    const t = useTranslations("mainblocks");
    const preorder = useTranslations("home.preorder");
    const dispatch = useDispatch();

    const stateDir = useSelector(state => state.royalfutReducer.direction);
    let stateBuyOff = useSelector(state => state.royalfutReducer.buy_of);

    const onBuyCoinsClick = () => {
        dispatch(orderStep(1));
        analitic.clickMainBuyCoins();
    };
    return (
        <div className={`${styles.container}`}>
            <div className={`${styles.content_offer}`} dir={stateDir}>
                <TrustScore />
                <span className={`${styles.offer_h_1}`}>
                    {preorder("safest")}
                </span>
                <span className={`${styles.offer_h1_gradient}`}>
                    {preorder("safest_2")}
                </span>
                <div className={`${styles.wrapper_desk_btns}`}>
                    <div
                        className={`${styles.wrapper_btns} ${stateBuyOff && "disabled"}`}>
                        <Link
                            href={"/order"}
                            onClick={onBuyCoinsClick}
                            className={`${styles.buy_btn_width}`}>
                            <GradientBtn size={{ height: 64 }}>
                                <span className={` ${styles.buy_btn}`}>
                                    {preorder("buy_coins")}
                                </span>
                            </GradientBtn>
                        </Link>
                        <div className={`${styles.fees_wrapper}`}>
                            <div
                                className={`${styles.arrow_spiral_wrapper} from-768-to-1900`}>
                                <Image
                                    alt="arrow"
                                    src="/img/arrow_spiral.svg"
                                    width={50}
                                    height={22}
                                />
                            </div>

                            <div className={`${styles.fees_img_wrapper}`}>
                                {t("ab113")}
                            </div>
                            <div
                                className={`${styles.reverse_arrow_spiral_wrapper} from-375-to-767`}>
                                <Image
                                    alt="arrow"
                                    src="/img/arrow_spiral_1.svg"
                                    width={50}
                                    height={22}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.text_after_block}>{preorder("grinding")}</div>
        </div>
    );
};

export default Offer;
