import Image from "next/legacy/image";

import styles from "./Offer.module.scss";
import { GradientButtonRegular } from "@royalfut/ui";
import { TrustScore } from "../fragments";

const Offer = () => {
    // const t = useTranslations("mainblocks");
    // const t = await getTranslations("mainblocks");

    // const stateDir = useSelector(state => state.royalfutReducer.direction);
    // let stateBuyOff = useSelector(state => state.royalfutReducer.buy_of);

    return (
        <div className={`${styles.container}`}>
            <div
                className={`${styles.content_offer}`}
            >
                <TrustScore/>
                <span className={`${styles.offer_h_1}`}>
                    Safest option to buy
                </span>
                <span className={`${styles.offer_h1_gradient}`}>
                    FIFA 24 Coins
                </span>
                <div className={`${styles.wrapper_desk_btns}`}>
                    <div
                        // className={`${styles.wrapper_btns} ${stateBuyOff && "disabled"}`}
                        className={`${styles.wrapper_btns}`}
                    >
                        <GradientButtonRegular
                            as="link"
                            href={"/order"}
                            className="text-xl font-semibold w-full sm:w-72 h-[4.5rem] min-h-[46px] sm:h-full rounded-xl md:max-w-[284px]"
                        >
                            Buy Coins
                        </GradientButtonRegular>

                        <div className={`${styles.fees_wrapper}`}>
                            <div
                                className={`${styles.arrow_spiral_wrapper} hidden md:flex md:opacity-100 md:w-auto md:h-auto`}
                            >
                                <Image
                                    alt="arrow"
                                    src="/img/arrow_spiral.svg"
                                    width={50}
                                    height={22}
                                />
                            </div>

                            <div className={`${styles.fees_img_wrapper}`}>
                                0% fees
                            </div>
                            <div
                                className={`${styles.reverse_arrow_spiral_wrapper} md:hidden`}
                            >
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
        </div>
    );
};

export default Offer;