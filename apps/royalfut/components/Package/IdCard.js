import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/legacy/image";
// import { useRouter } from 'next/router';
// import { Trans } from '@lingui/macro';
import currency from "../../data-elements/currency";
import DropdownOrder from "../DropdownOrder";
import flagLangs from "../../data-elements/countriesTwo";
import PlatformChanger from "./PlatformChanger";
import { useWindowDimensions } from "../../utils/hooks";
import { orderCoinsAmount } from "../../redux/actions/royalfutOrderActions";
import Analitic from "../../Analitic/Analitic";
import CardPoints from "../LoyaltyProgram/CardPoints/CardPoints";
import GradientBtn from "../GradientBtn";

import styles from "./IdCard.module.scss";
import { useTranslations } from "next-intl";

const analitic = new Analitic();

const IdCard = ({ coins = 70000000, loyalty }) => {
    const dispatch = useDispatch();
    const t = useTranslations("order");
    // const router = useRouter();
    const stateCurrency = useSelector(
        state => state.royalfutCurrencyReducer.currency
    );
    const stateStock = useSelector(state => state.royalfutReducer.stock);
    const stateOrderReducer = useSelector(state => state.royalfutOrderReducer);
    const statePlatform = useSelector(state => state.royalfutReducer.platform);

    const [cardCurrency, setCardCurrency] = useState(null);
    const [cardCoef, setCardCoef] = useState(null);
    // const [cardPlatform, setCardPlatform] = useState(null);
    const { width } = useWindowDimensions();

    const getImageSrc = () => {
        if (coins < 300000) return "/img/coins/UT_1.png";
        if (coins < 800000 && coins >= 300000) return "/img/coins/UT_2.png";
        if (coins < 3000000 && coins >= 800000) return "/img/coins/UT_3.png";
        if (coins < 5000000 && coins >= 3000000) return "/img/coins/UT_4.png";
        if (coins < 10000000 && coins >= 5000000) return "/img/coins/UT_5.png";
        if (coins >= 10000000) return "/img/coins/UT_6.png";
    };

    useEffect(() => {
        const t_curr = currency.filter(
            el => el.title === stateCurrency.title
        )[0];
        if (t_curr) {
            setCardCurrency(t_curr.url);
        }
        let t_pl = statePlatform.ps ? 1 : 0;
        if (statePlatform.pc) {
            t_pl = 2;
        }
        const t_coef =
            stateStock.deliveryMethods[0].data[t_pl].pricePerCurrencyMap[
                stateCurrency.title
            ];
        setCardCoef(t_coef);
    }, [stateCurrency, stateStock, statePlatform]);

    const handleBuyPack = () => {
        let t_pl = statePlatform.ps ? "ps" : "xbox";
        if (statePlatform.pc) {
            t_pl = "pc";
        }
        analitic.clickBuyCoinsPack((cardCoef * coins).toFixed(2), t_pl);
        localStorage.setItem(
            "/coins",
            JSON.stringify({ ...stateOrderReducer, order_coins_amount: coins })
        );
        dispatch(orderCoinsAmount(coins));
    };
    return (
        <div className={`${styles.card}`}>
            <div className={`${styles.coins_content}`}>
                <div className={`${styles.coins_card_cover_wrapper}`}>
                    <Image height={151} width={306} src={getImageSrc()} />
                </div>

                <div className={`${styles.coins_wrapper} from-375-to-1024`}>
                    <div className={`${styles.coins_icon_wrapper}`}>
                        <Image
                            width={32}
                            height={32}
                            src={"/img/Coin__tab.svg"}
                        />
                    </div>
                    <span className={`${styles.coins_value}`}>
                        {coins.toLocaleString("ru-RU")}
                    </span>
                </div>

                <div className={`${styles.widget} from-1025-to-1900`}>
                    <div className={`${styles.changer_wrapper}`}>
                        <PlatformChanger small={true} />
                    </div>
                </div>
            </div>

            <div className={`${styles.changer_wrapper} from-375-to-1024`}>
                <PlatformChanger />
            </div>

            <div className={`${styles.wrapper_desk}`}>
                <div className={`${styles.coins_wrapper} from-1025-to-1900`}>
                    <div className={`${styles.coins_icon_wrapper}`}>
                        <Image
                            width={32}
                            height={32}
                            src={"/img/Coin__tab.svg"}
                        />
                    </div>
                    <span className={`${styles.coins_value}`}>
                        {coins.toLocaleString("ru-RU")}
                    </span>
                </div>

                <div className={`${styles.card_btns}`}>
                    <div className={`${styles.desk_mob_block}`}>
                        <div className={styles.mobi_column}>
                            {width <= 1024 && (
                                <span className={styles.mobi_title}>
                                    {/* <Trans>cashback</Trans> */}
                                    {t("cashback")}
                                </span>
                            )}
                            <CardPoints
                                full={true}
                                coins={coins}
                                loyalty={loyalty}
                            />
                        </div>
                        <div className={styles.mobi_column}>
                            <span
                                className={`from-375-to-1024 ${styles.mobi_title}`}>
                                {/* <Trans>ab98</Trans> */}
                                {t("seo51")}
                            </span>
                            <div className={`${styles.price_currency}`}>
                                <div className={`${styles.img_wrapper}`}>
                                    {cardCurrency && (
                                        <Image
                                            src={cardCurrency}
                                            width={24}
                                            height={24}
                                        />
                                    )}
                                </div>
                                {(cardCoef * coins).toFixed(2)}
                                <div className={`${styles.dd_wrapper}`}>
                                    <DropdownOrder
                                        title={stateCurrency?.title}
                                        value={flagLangs}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.buy_btn_wrapper}`}>
                        <Link
                            href={`/coins/${coins / 1000}k/purchase`}
                            onClick={handleBuyPack}>
                            <GradientBtn size={{ height: 64 }}>
                                <span className={`${styles.text_btn}`}>
                                    {/* <Trans>mainblocks10</Trans> */}
                                    {t("mainblocks10")}
                                </span>
                            </GradientBtn>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IdCard;
