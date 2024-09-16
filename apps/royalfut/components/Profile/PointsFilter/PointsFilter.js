import { useEffect, useState } from "react";
// import { useRouter } from 'next/router';
import { translations } from "../../../locales/translations";

import styles from "./PointsFilter.module.scss";
import { useSelector } from "react-redux";

const PointsFilter = ({ filter, setFilter }) => {
    // const router = useRouter();
    const stateLocale = useSelector(
        state => state.royalfutLocaleReducer.locale
    );
    let btns = [
        { text: "all", id: 0 },
        { text: "gained", id: 1 },
        { text: "used", id: 2 },
    ];
    const [filtersArray, setFiltersArray] = useState(
        new Array(btns.length).fill(<></>)
    );

    useEffect(() => {
        changedArray(filter);
    }, [filter, stateLocale]);

    const changedArray = id => {
        const updatedArray = filtersArray.map((el, i) => {
            return (
                <button
                    key={btns[i].id}
                    className={`${styles.btn} ${id == btns[i].id && styles.btn_active}`}
                    tabIndex={0}
                    onClick={onClick}
                    id={btns[i].id}>
                    {translations[stateLocale?.title][btns[i].text]}
                </button>
            );
        });
        setFiltersArray(updatedArray);
    };

    const onClick = e => {
        setFilter(e.target.id);
    };
    return (
        <div className={styles.container}>
            {filtersArray.map((el, i) => (
                <div className={styles.wrapper} key={i}>
                    {el}
                </div>
            ))}
        </div>
    );
};

export default PointsFilter;
