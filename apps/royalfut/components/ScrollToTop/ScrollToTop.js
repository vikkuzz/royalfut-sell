import { useEffect, useState } from "react";

import styles from "../../styles/ScrollToTop.module.scss";

const ScrollToTop = () => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        setTimeout(() => setShow(true), 1000);
    }, []);

    return show ? (
        <button
            onClick={() => window.scrollTo(0, 0)}
            className={`${styles.scrolltop}`}
            type="button"
            name="to top">
            <img
                alt="arrow"
                className={`${styles.scrolltop_arrow}`}
                src="/img/whitearrow.svg"
            />
        </button>
    ) : (
        ""
    );
};

export default ScrollToTop;
