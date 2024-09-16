import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useRouter } from 'next/router';
import Image from "next/legacy/image";
import Link from "next/link";
// import { Trans } from '@lingui/macro';
import GradientBtn from "../GradientBtn";
import currency from "../../data-elements/currency";
import DropdownOrder from "../DropdownOrder";
import flagLangs from "../../data-elements/countriesTwo";
import { orderCoinsAmount } from "../../redux/actions/royalfutOrderActions";
import Analitic from "../../Analitic/Analitic";
import CardPoints from "../LoyaltyProgram/CardPoints/CardPoints";

import styles from "./PackageCard.module.scss";
// import { t } from '@lingui/macro';
import { useTranslations } from "next-intl";

const analitic = new Analitic();

const PackageCard = ({ coins = 25000000, loyalty }) => {
    const dispatch = useDispatch();
    // const router = useRouter();
    const t = useTranslations("order");
    const stateOrderReducer = useSelector(state => state.royalfutOrderReducer);
    const stateCurrency = useSelector(
        state => state.royalfutCurrencyReducer.currency
    );
    const stateStock = useSelector(state => state.royalfutReducer.stock);
    const statePlatform = useSelector(state => state.royalfutReducer.platform);

    const [cardCurrency, setCardCurrency] = useState(null);
    const [cardCoef, setCardCoef] = useState(null);
    const [cardPlatform, setCardPlatform] = useState(null);

    const getImageSrc = () => {
        if (coins < 300000) return "/img/coins/UT_1.png";
        if (coins < 800000 && coins >= 300000) return "/img/coins/UT_2.png";
        if (coins < 3000000 && coins >= 800000) return "/img/coins/UT_3.png";
        if (coins < 5000000 && coins >= 3000000) return "/img/coins/UT_4.png";
        if (coins < 10000000 && coins >= 5000000) return "/img/coins/UT_5.png";
        if (coins >= 10000000) return "/img/coins/UT_6.png";
    };

    useEffect(() => {
        let t_curr = currency.filter(el => el.title === stateCurrency.title)[0];
        if (t_curr) {
            setCardCurrency(t_curr.url);
        }
        let t_pl = statePlatform.ps ? 1 : 0;
        if (statePlatform.pc) {
            t_pl = 2;
        }
        let t_coef =
            stateStock.deliveryMethods[0].data[t_pl].pricePerCurrencyMap[
                stateCurrency.title
            ];
        setCardCoef(t_coef);

        if (t_pl == 0) {
            setCardPlatform({ name: "Xbox", url: "/img/xbox_icon.svg" });
        } else if (t_pl == 1) {
            setCardPlatform({ name: "PlayStation", url: "/img/ps_icon.svg" });
        } else {
            setCardPlatform({ name: "PC", url: "/img/Origin.svg" });
        }
    }, [stateCurrency, stateStock, statePlatform]);

    const handleBuyPack = () => {
        let t_pl = statePlatform.ps ? "ps" : "xbox";
        if (statePlatform.pc) {
            t_pl = "pc";
        }
        dispatch(orderCoinsAmount(coins));
        analitic.clickBuyCoinsPack((cardCoef * coins).toFixed(2), t_pl);
        localStorage.setItem(
            "/coins",
            JSON.stringify({ ...stateOrderReducer, order_coins_amount: coins })
        );
    };
    const onCoinsPageGo = () => {
        analitic.goOnCoinsPackPage(coins);
    };
    return (
        <div className={`${styles.card}`}>
            <div className={`${styles.coins_content}`}>
                <Link
                    href={`/coins/${coins / 1000}k`}
                    onClick={onCoinsPageGo}
                    className={`${styles.coins_card_cover_wrapper}`}>
                    <Image height={151} width={306} src={getImageSrc()} />
                </Link>
                <div className={`${styles.coins_wrapper}`}>
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
                {cardPlatform?.url && (
                    <div className={`${styles.widget}`}>
                        <div>
                            <Image
                                width={16}
                                height={16}
                                src={cardPlatform.url}
                            />
                        </div>
                        {cardPlatform?.name}
                    </div>
                )}
            </div>
            <div className={`${styles.card_btns}`}>
                <div className={`${styles.price_currency}`}>
                    <div className={`${styles.img_wrapper}`}>
                        {cardCurrency && (
                            <Image src={cardCurrency} width={24} height={24} />
                        )}
                    </div>
                    {(cardCoef * coins).toFixed(2)}
                    <div className={`${styles.dd_wrapper}`}>
                        <DropdownOrder
                            title={stateCurrency?.title}
                            value={flagLangs}
                        />
                    </div>
                    <CardPoints coins={coins} loyalty={loyalty} />
                </div>
                <div className={`${styles.buy_btn_wrapper}`}>
                    <Link href={`/coins/purchase`} onClick={handleBuyPack}>
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
    );
};

export default PackageCard;
