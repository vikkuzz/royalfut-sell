import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SvgRating from "../SvgRating";

import styles from "./RatedGallery.module.scss";

const RatedGallery = ({ count }) => {
    const stateStock = useSelector(state => state.royalfutReducer.stock);
    const stateDir = useSelector(state => state.royalfutReducer.direction);

    let [rate, setRate] = useState([
        {
            color1: 100,
            color2: 0,
        },
        {
            color1: 100,
            color2: 0,
        },
        {
            color1: 100,
            color2: 0,
        },
        {
            color1: 100,
            color2: 0,
        },
        {
            color1: 50,
            color2: 50,
        },
    ]);

    useEffect(() => {
        let result = [];
        let rateLength = stateStock.rate.split(".")[0];
        let rateLengthEmpty = (5 - stateStock.rate).toFixed(1);
        for (let i = 1; i <= rateLength; i++) {
            result.push({
                color1: 100,
                color2: 0,
            });
        }
        if (rateLength < 5) {
            result.push({
                color1: stateStock.rate.split(".")[1] * 10,
                color2: 0,
            });
        }
        if (rateLengthEmpty > 1) {
            let empty = rateLengthEmpty.split(".")[0];
            for (let i = 1; i <= empty; i++) {
                result.push({
                    color1: 0,
                    color2: 0,
                });
            }
        }

        setRate(result);
    }, [stateStock.rate]);

    return (
        <div className={`${styles.container}`}>
            <div className={`${styles.rating}`}>
                {rate.map(el => {
                    return (
                        <div
                            dir={stateDir}
                            key={(count += 1)}
                            className={`${styles.back}`}>
                            <SvgRating
                                classStyle={`${styles.aside_rate_svg}`}
                                colorPercent1={el.color1}
                                colorPercent2={el.color2}
                                id={`grad${(count += 1)}`}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default RatedGallery;
