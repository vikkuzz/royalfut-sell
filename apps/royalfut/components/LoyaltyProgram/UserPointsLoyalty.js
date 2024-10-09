import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/legacy/image";

import styles from "./UserPointsLoyalty.module.scss";
import Link from "next/link";

const UserPointsLoyalty = ({ id = 1, link = true, coins }) => {
    const stateStock = useSelector(state => state.royalfutReducer.stock);
    const statePlatform = useSelector(state => state.royalfutReducer.platform);

    const stateLoyaltyUser = useSelector(
        state => state.royalfutLoyaltyReducer.user_loyalty
    );

    const [points, setPoints] = useState(null);

    useEffect(() => {
        if (stateLoyaltyUser?.totalCashback) {
            if (coins) {
                const delivery = "0";
                let platform = 1; // ps4

                if (statePlatform.xbox) {
                    platform = 0; // xbox
                } else if (statePlatform.pc) {
                    platform = 2; // pc
                }

                let price = (
                    coins *
                    stateStock.deliveryMethods[delivery].data[platform]
                        .pricePerCurrencyMap.USD
                ).toFixed(2); // цена общая в долларах

                let cashPrice =
                    price * (stateLoyaltyUser?.bonusPartPercent / 100);

                let pointsValue = Math.floor(cashPrice * 10); // кол-во баллов которые можем списать
                let maxPoints = Math.floor(stateLoyaltyUser.totalCashback * 10); // накопленные баллы

                if (maxPoints > pointsValue) {
                    setPoints(pointsValue);
                } else {
                    setPoints(maxPoints);
                }
            } else {
                setPoints(Math.floor(stateLoyaltyUser.totalCashback * 10));
            }
        }
    }, [stateLoyaltyUser?.totalCashback, coins, statePlatform, stateStock]);

    return link ? (
        <Link
            href={"/profile?tab=points"}
            data-id={id}
            className={`${styles.container}`}>
            <span data-id={id}>{points || 0}</span>
            <div data-id={id} className={`${styles.wrapper_img}`}>
                <Image
                    data-id={id}
                    src={"/img/white_crown.svg"}
                    width={12}
                    height={12}
                />
            </div>
        </Link>
    ) : (
        <div data-id={id} className={`${styles.container}`}>
            <span data-id={id}>{points}</span>
            <div data-id={id} className={`${styles.wrapper_img}`}>
                <Image
                    data-id={id}
                    src={"/img/white_crown.svg"}
                    width={12}
                    height={12}
                />
            </div>
        </div>
    );
};
export default UserPointsLoyalty;
