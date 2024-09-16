import React from "react";

import styles from "./GradientBtn.module.scss";

const GradientBtn = ({ callback, size, children }) => {
    const customSize = size
        ? { width: `${size.width}px`, height: `${size.height}px` }
        : null;
    return (
        <button
            className={`${styles.gradient_btn}`}
            onClick={callback}
            style={customSize}
            type="button"
            name="gradient btn">
            {children}
        </button>
    );
};

export default GradientBtn;
