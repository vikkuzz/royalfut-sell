import { useMemo } from "react";
import { getRandomNumber } from "@royalfut/utils";

import styles from "./SparkleAnimation.module.scss";
import type { FC, CSSProperties } from "react";

interface ISparkleAnimationProps {
    count?: number;
    settings?: {
        size?: {
            min: number;
            max: number;
        };
        pos?: {
            right?: {
                min: number;
                max: number;
                isPercent?: boolean;
            };
            top?: {
                min: number;
                max: number;
            };
        };
        animate?: {
            duration?: {
                min: number;
                max: number;
            };
            delay?: {
                min: number;
                max: number;
            };
        };
    };
}

const SparkleAnimation: FC<ISparkleAnimationProps> = ({
    count = 2,
    settings = {},
}) => {
    const memoizedSettings = useMemo(() => settings, [settings]);

    const sparkles = useMemo(() => {
        return new Array(count).fill(null).map((_, idx) => {
            const size = getRandomNumber(
                memoizedSettings.size?.min || 4,
                memoizedSettings.size?.max || 23
            );
            const sparkleStyle = {
                "--sparkle-pos-r": `${getRandomNumber(memoizedSettings.pos?.right?.min || 0, memoizedSettings.pos?.right?.max || 20)}${memoizedSettings.pos?.right?.isPercent ? "%" : "px"}`,
                "--sparkle-pos-t": `${getRandomNumber(memoizedSettings.pos?.top?.min || 0, memoizedSettings.pos?.top?.max || 20)}px`,
                "--sparkle-w": `${size}px`,
                "--sparkle-h": `${size}px`,
                "--sparkle-animation-dur": `${getRandomNumber(memoizedSettings.animate?.duration?.min || 2, memoizedSettings.animate?.duration?.max || 4)}s`,
                "--sparkle-animation-del": `${getRandomNumber(memoizedSettings.animate?.delay?.min || 0.1, memoizedSettings.animate?.delay?.max || 1)}s`,
                "--sparkle-bg":
                    idx % 2 === 0
                        ? "var(--color-illusion-shine-accent-1)"
                        : "var(--color-illusion-shine-accent-2)",
            } as CSSProperties;

            return (
                <span
                    key={idx}
                    className={styles["sparkle"]}
                    style={sparkleStyle}
                />
            );
        });
    }, [count, memoizedSettings]);

    return sparkles;
};

export default SparkleAnimation;
