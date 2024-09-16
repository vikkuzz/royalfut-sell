import { useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { t, Trans } from "@lingui/macro";
import Image from "next/legacy/image";
import { orderStep } from "../../redux/actions/royalfutOrderActions";

import styles from "./OrderInfo.module.scss";

const OrderInfo = () => {
    const dispatch = useDispatch();
    const platformRef = useRef(null);
    const stateStock = useSelector(state => state.royalfutReducer.stock);
    const stateCurrency = useSelector(
        state => state.royalfutCurrencyReducer.currency
    );
    const stateOrderCoinsAmount = useSelector(
        state => state.royalfutOrderReducer.order_coins_amount
    );
    const stateOrderPlatform = useSelector(
        state => state.royalfutOrderReducer.order_platform
    );

    const subSection = (titleText, picUrl, text) => {
        return (
            <div className={`${styles.info_item}`}>
                <span className={`${styles.info_title}`}>{titleText}</span>
                <div className={`${styles.info_content}`}>
                    <div className={`${styles.img_wrapper}`}>
                        <Image width={24} height={24} src={picUrl}></Image>
                    </div>
                    <span className={`${styles.info_item_text}`}>{text}</span>
                </div>
            </div>
        );
    };
    const handleBackToStepOne = () => {
        dispatch(orderStep(1));
    };

    useMemo(() => {
        if (stateOrderPlatform == "ps") {
            platformRef.current = {
                name: "PlayStation",
                url: "/img/ps4_icon.svg",
            };
        }
        if (stateOrderPlatform == "ps4") {
            platformRef.current = {
                name: "PlayStation 4",
                url: "/img/ps4_icon.svg",
            };
        }
        if (stateOrderPlatform == "ps5") {
            platformRef.current = {
                name: "PlayStation 5",
                url: "/img/ps4_icon.svg",
            };
        }

        if (stateOrderPlatform == "xbox_one") {
            platformRef.current = {
                name: "Xbox One",
                url: "/img/xbox_icon.svg",
            };
        }
        if (stateOrderPlatform == "xbox") {
            platformRef.current = {
                name: "Xbox",
                url: "/img/xbox_icon.svg",
            };
        }
        if (stateOrderPlatform == "xbox_xs") {
            platformRef.current = {
                name: "Xbox X/S",
                url: "/img/xbox_icon.svg",
            };
        }
        if (stateOrderPlatform == "pc") {
            platformRef.current = {
                name: "PC",
                url: "/img/Origin.svg",
            };
        }
    }, [stateOrderPlatform, stateOrderCoinsAmount, stateStock, stateCurrency]);

    return (
        <div className={`${styles.container}`}>
            <button
                onClick={handleBackToStepOne}
                type="button"
                name="back"
                className={`${styles.gray_text}`}>
                <Image src={"/img/arrowleft_gray.svg"} width={16} height={16} />
                <Trans>ab108</Trans>
            </button>
            {subSection(
                t`ab109`,
                "/img/Futcoin_white.svg",
                Number(stateOrderCoinsAmount).toLocaleString("ru-RU")
            )}
            {subSection(
                t`ab96`,
                platformRef.current?.url,
                platformRef.current?.name
            )}
        </div>
    );
};

export default OrderInfo;
