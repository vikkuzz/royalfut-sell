import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/legacy/image";
// import { Trans } from '@lingui/macro';
import { orderPlatform } from "../../redux/actions/royalfutOrderActions";
import Analitic from "../../Analitic/Analitic";
import pc from "/img/Origin.svg";
import ps from "/img/ps_icon.svg";
import xb from "/img/xbox_icon.svg";

import styles from "./PlatformSection.module.scss";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { changePlatform } from "../../redux/actions/royalfutActions";

const analitic = new Analitic();

const PlatformSection = () => {
    const t = useTranslations("order");
    const router = useRouter();
    const platforms_data = [
        {
            name: "ps",
            id: "ps",
            title: "PlayStation",
            img: ps,
            active: false,
        },
        {
            name: "xbox",
            id: "xbox",
            title: "Xbox",
            img: xb,
            active: false,
        },
        {
            name: "pc",
            id: "pc",
            title: "PC",
            img: pc,
            active: false,
        },
    ];
    const all_platforms_data = [
        {
            name: "ps4",
            id: "ps4",
            title: "PlayStation 4",
            img: ps,
            active: false,
        },
        {
            name: "ps4",
            id: "ps5",
            title: "PlayStation 5",
            img: ps,
            active: false,
        },
        {
            name: "xbox",
            id: "xbox_one",
            title: "Xbox One",
            img: xb,
            active: false,
        },
        {
            name: "xbox",
            id: "xbox_xs",
            title: "Xbox X/S",
            img: xb,
            active: false,
        },
        {
            name: "pc",
            id: "pc",
            title: "PC",
            img: pc,
            active: false,
        },
    ];
    const stateOrderPlatform = useSelector(
        state => state.royalfutOrderReducer.order_platform
    );
    const stateOrderPage = useSelector(
        state => state.royalfutOrderReducer.order_page
    );
    const dispatch = useDispatch();
    const [statePlatforms, setStatePlatforms] = useState(platforms_data);

    const handlePlClick = e => {
        let pl = null;
        if (e.target.dataset.id.includes("ps")) {
            pl = "ps";
        } else if (e.target.dataset.id.includes("xbox")) {
            pl = "xbox";
        } else {
            pl = "pc";
        }
        dispatch(orderPlatform(e.target.dataset.id));
        dispatch(changePlatform(pl));
        router.push(`/order/${e.target.dataset.id}`);
    };

    useEffect(() => {
        if (stateOrderPage) {
            setStatePlatforms(all_platforms_data);

            let t_statePl = all_platforms_data.map(el => {
                if (!stateOrderPlatform) {
                    if (el.id == stateOrderPage) {
                        el.active = true;
                    } else {
                        el.active = false;
                    }
                } else {
                    if (el.id == stateOrderPlatform) {
                        el.active = true;
                    } else {
                        el.active = false;
                    }
                }

                return { ...el };
            });
            setStatePlatforms(t_statePl);
        }
    }, [stateOrderPage]);

    useMemo(() => {
        analitic.choosePlatform(stateOrderPlatform);
        let t_statePl = statePlatforms.map(el => {
            if (el.id == stateOrderPlatform) {
                el.active = true;
            } else {
                el.active = false;
            }
            return { ...el };
        });
        setStatePlatforms(t_statePl);
    }, [stateOrderPlatform]);

    return (
        <div className={`${styles.container}`}>
            <h3 className={`${styles.h3}`}>
                {/* <Trans>seo28</Trans> */}
                {t("seo28")}
            </h3>
            <div className={`${styles.pl_wrapper}`}>
                {statePlatforms.map(el => {
                    return (
                        <div
                            data-id={el.id}
                            key={el.id}
                            className={`${styles.platform_item}`}>
                            <button
                                data-id={el.id}
                                onClick={handlePlClick}
                                className={`${styles.pl_btn} ${el.active && styles.pl_btn_active}`}>
                                <span
                                    data-id={el.id}
                                    className={`${styles.pl_title}`}>
                                    {el.title}
                                </span>
                                <Image
                                    data-id={el.id}
                                    width={24}
                                    height={24}
                                    src={el.img}
                                />
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default PlatformSection;
