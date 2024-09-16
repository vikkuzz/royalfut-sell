"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Pagination } from "antd";
// import { Trans, t, defineMessage } from "@lingui/macro";
import api from "../../Api/Api";
import Loader from "../Loader/Loader";
import Rated from "../Rated/Rated";
import StickyBlock from "../StickyBlock/StickyBlock";
import { showMessage } from "../../redux/actions/royalfutActions";

import styles from "./Reviews.module.scss";
import { useTranslations } from "next-intl";

export const ReviewCard = ({ el, sizeHeight }) => {
    // const countries = {
    //     bahrain: defineMessage({ message: 'country.Bahrain' }),
    //     france: defineMessage({ message: 'country.France' }),
    //     germany: defineMessage({ message: 'country.Germany' }),
    //     kuwait: defineMessage({ message: 'country.Kuwait' }),
    //     netherlands: defineMessage({ message: 'country.Netherlands' }),
    //     qatar: defineMessage({ message: 'country.Qatar' }),
    //     'saudi arabia': defineMessage({ message: 'country.Saudi Arabia' }),
    //     'united arab emirates': defineMessage({ message: 'country.United Arab Emirates' }),
    //     'united kingdom': defineMessage({ message: 'country.United Kingdom' }),
    //     'united states': defineMessage({ message: 'country.United States' }),
    // };

    const geo = el.geo.toLowerCase();

    return (
        <div className={`${styles.testblock} ${styles[sizeHeight]}`}>
            <div className={`${styles.header_review_wrapper}`}>
                <div className={`${styles.author_name_rat}`}>
                    <div className={`${styles.author_name}`}>{el.username}</div>
                    <div className={`${styles.author_country}`}>
                        <img
                            alt="flag"
                            className={`${styles.country_img}`}
                            src={`/img/reviews_flags/${el.geo.toLowerCase()}.svg`}></img>

                        <div className={`${styles.country_name}`}>
                            {/* {Object.keys(countries).includes(geo) ? (<Trans id={countries[geo]} />) : el.geo} */}
                            {el.geo}
                        </div>
                    </div>
                </div>
                <div className={`${styles.author_rat}`}>
                    <img
                        alt="rating"
                        className={styles.rat_img}
                        src="/img/rating.svg"></img>
                </div>
            </div>
            <p className={`${styles.review_text}`}>{el.text}</p>
        </div>
    );
};

const ReviewsContent = () => {
    const t = useTranslations("order");
    const dispatch = useDispatch();
    const [reviews, setReviews] = useState([]);
    const [page, setPage] = useState(1);

    const getError = err => {
        dispatch(showMessage({ status: "error", text: `${err}` }));
    };

    useEffect(() => {
        api.getReviews(getError).then(res => setReviews(res));
    }, [page]);

    return (
        <div className={`${styles.container}`}>
            <h1 className={`${styles.h}`}>
                {/* <Trans>seo132</Trans> */}
                {t("seo132")}
            </h1>
            <div className={`${styles.content_wrapper}`}>
                <div className={`${styles.reviews_wrapper}`}>
                    <div className={`${styles.description}`}>
                        {/* <Trans>seo133</Trans>{' '} */}
                        {t("seo133")}
                        <a
                            rel="nofollow noreferrer"
                            className={`${styles.a_blank}`}
                            target="_blank"
                            href={t(`commentUrl`)}>
                            {/* <Trans>seo134</Trans> */}
                            {t("seo134")}
                        </a>
                    </div>
                    <div
                        className={`${styles.mobile_rat_wrapper} from-375-to-1024`}>
                        <Rated count={0} />
                    </div>
                    {reviews.length > 0 ? (
                        <div className={`${styles.reviews}`}>
                            {reviews.map((el, idx) => (
                                <ReviewCard key={idx} el={el} />
                            ))}
                        </div>
                    ) : (
                        <Loader />
                    )}
                    <div className={`${styles.pagination_wrapper}`}>
                        <Pagination
                            size="small"
                            showLessItems
                            total={800}
                            onChange={page => setPage(page)}
                        />
                    </div>
                </div>
                <div className={`${styles.widgets}`}>
                    <div className="from-1025-to-1900">
                        <Rated count={10} />
                    </div>
                    <StickyBlock />
                </div>
            </div>
        </div>
    );
};

export default ReviewsContent;
