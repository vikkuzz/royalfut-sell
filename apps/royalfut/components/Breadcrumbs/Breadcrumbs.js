import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import { breadcrumbs } from "../../locales/breadcrumbs";

import styles from "../../styles/Breadcrumbs.module.scss";

const Breadcrumbs = () => {
    const stateDir = useSelector(state => state.royalfutReducer.direction);
    const router = useRouter();
    const t = breadcrumbs[router.locale];

    let [crumbs, setCrumbs] = useState([]);

    useEffect(() => {
        if (router.asPath != "/") {
            let currentPath = router.route.split("/").filter(n => n);
            setCrumbs(currentPath);
        }
    }, []);

    return (
        <div className={`${styles.breadcrumbs_container}`}>
            {router.route != "/" && (
                <Link
                    href={"/"}
                    dir={stateDir}
                    className={`${styles.breadcrumbs_link}`}>
                    {t.home}
                    <span className={`${styles.breadcrumbs_separator}`}>/</span>
                </Link>
            )}
            {crumbs.length > 0 &&
                crumbs.map((elem, i, arr) => {
                    if (i != arr.length - 1) {
                        let link = "";
                        crumbs.forEach((el, idx) => {
                            if (idx <= i) {
                                link = link + "/" + el;
                            }
                        });
                        let textCrumb = t[elem];
                        if (elem === "[id]") {
                            textCrumb = `${router.query.id} ${textCrumb}`;
                        }
                        return (
                            <div key={i}>
                                <Link
                                    href={
                                        link.includes("[id]")
                                            ? link.replace(
                                                  "[id]",
                                                  router.query.id
                                              )
                                            : link
                                    }
                                    dir={stateDir}
                                    className={`${styles.breadcrumbs_link}`}>
                                    {textCrumb.toLowerCase()}
                                    <span
                                        className={`${styles.breadcrumbs_separator}`}>
                                        /
                                    </span>
                                </Link>
                            </div>
                        );
                    } else {
                        let textCrumb = t[elem];
                        if (elem === "[id]") {
                            textCrumb = `${router.query.id} ${textCrumb}`;
                        }

                        return (
                            <span
                                key={i}
                                className={`${styles.breadcrumbs_link} ${styles.breadcrumbs_disable}`}>
                                {textCrumb}
                            </span>
                        );
                    }
                })}
        </div>
    );
};

export default Breadcrumbs;
