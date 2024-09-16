"use client";
import React, { useEffect, useRef, useState } from "react";

import styles from "./TransparentBtn.module.scss";

const TransparentBtn = ({ callback, children, size, width }) => {
    const trBtn = useRef(null);

    const customSize = size
        ? {
              width: `${width == "auto" ? "auto" : size.width + "px"}`,
              height: `${size.height}px`,
          }
        : null;

    const [widthBlock, setWidthBlock] = useState(296);

    useEffect(() => {
        setWidthBlock(trBtn?.current.offsetWidth - 1);
    }, [trBtn?.current?.offsetWidth]);
    return (
        <button
            ref={trBtn}
            className={`${styles.transparent_btn}`}
            onClick={callback}
            style={customSize}>
            {children}
        </button>
    );
};

export default TransparentBtn;
