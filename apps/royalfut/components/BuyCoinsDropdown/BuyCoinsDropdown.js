import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

import styles from "../../styles/Dropdown.module.scss";
import { changePlatform, order } from "../../redux/actions/royalfutActions";
// import { Trans } from "@lingui/macro";
import { orderStep } from "../../redux/actions/royalfutOrderActions";
import Analitic from "../../Analitic/Analitic";
import { useTranslations } from "next-intl";

const analitic = new Analitic();

const BuyCoinsDropdown = () => {
    const stateDir = useSelector(state => state.royalfutReducer.direction);
    const buycoinsRef = React.createRef();
    const t = useTranslations("home");

    const dispatch = useDispatch();

    const onMouseEnterBlock = (e, ref) => {
        e.stopPropagation();
        ref.current.classList.remove("hide");
    };

    const onMouseLeaveBlock = (e, ref) => {
        e.stopPropagation();
        ref.current.classList.add("hide");
    };

    return (
        <div className={`${styles.dropdown_container} ${styles.drop_cont}`}>
            <div
                className={`${styles.drop_wrap}`}
                onMouseEnter={e => {
                    e.stopPropagation();
                    window.innerWidth > 1024
                        ? onMouseEnterBlock(e, buycoinsRef)
                        : null;
                }}
                onMouseLeave={e => {
                    e.stopPropagation();
                    window.innerWidth > 1024
                        ? onMouseLeaveBlock(e, buycoinsRef)
                        : null;
                }}>
                <div className={`${styles.wrapper_arrow}`}>
                    <Link
                        href={"/order"}
                        prefetch={true}
                        onClick={e => {
                            onMouseLeaveBlock(e, buycoinsRef);
                            dispatch(orderStep(1));
                            analitic.clickMainBuyCoins();
                        }}
                        className={`${styles.dropdown_countries} ${styles.dropdown__links}`}>
                        {/* <Trans>seo1</Trans> */}
                        {t("preorder.buy_coins")}
                    </Link>

                    <div
                        dir={stateDir}
                        className={`${styles.buy_coins_drop} dropdown__arrow`}
                    />
                </div>
                <div
                    className={`${styles.dropdown__buycoins_content} hide`}
                    ref={buycoinsRef}>
                    <div className={`${styles.content_wrap}`}>
                        <div className={`${styles.buycoins_item}`}>
                            <Link
                                href={`/order/ps4`}
                                className={`${styles.buycoins_link}`}
                                onClick={e => {
                                    dispatch(changePlatform("ps"));
                                    dispatch(order({}));
                                    onMouseLeaveBlock(e, buycoinsRef);
                                    dispatch(orderStep(1));
                                    analitic.choosePlatform("ps4");
                                }}>
                                PlayStation 4
                            </Link>
                        </div>
                        <div className={`${styles.buycoins_item}`}>
                            <Link
                                href={`/order/ps5`}
                                className={`${styles.buycoins_link}`}
                                onClick={e => {
                                    dispatch(order({}));
                                    dispatch(changePlatform("ps"));
                                    onMouseLeaveBlock(e, buycoinsRef);
                                    dispatch(orderStep(1));
                                    analitic.choosePlatform("ps5");
                                }}>
                                PlayStation 5
                            </Link>
                        </div>
                        <div className={`${styles.buycoins_item}`}>
                            <Link
                                href={`/order/xbox_one`}
                                className={`${styles.buycoins_link}`}
                                onClick={e => {
                                    dispatch(order({}));
                                    dispatch(changePlatform("xbox"));
                                    onMouseLeaveBlock(e, buycoinsRef);
                                    dispatch(orderStep(1));
                                    analitic.choosePlatform("xbox_one");
                                }}>
                                Xbox One
                            </Link>
                        </div>
                        <div className={`${styles.buycoins_item}`}>
                            <Link
                                href={`/order/xbox_xs`}
                                className={`${styles.buycoins_link}`}
                                onClick={e => {
                                    dispatch(order({}));
                                    dispatch(changePlatform("xbox"));
                                    onMouseLeaveBlock(e, buycoinsRef);
                                    dispatch(orderStep(1));
                                    analitic.choosePlatform("xbox_xs");
                                }}>
                                Xbox Series X|S
                            </Link>
                        </div>
                        <div className={`${styles.buycoins_item}`}>
                            <Link
                                href={`/order/pc`}
                                className={`${styles.buycoins_link}`}
                                onClick={e => {
                                    dispatch(order({}));
                                    dispatch(changePlatform("pc"));
                                    onMouseLeaveBlock(e, buycoinsRef);
                                    dispatch(orderStep(1));
                                    analitic.choosePlatform("pc");
                                }}>
                                PC
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BuyCoinsDropdown;
