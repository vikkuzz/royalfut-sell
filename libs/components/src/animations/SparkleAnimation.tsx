"use client";

import { useMemo, useRef } from "react";
import { getRandomNumber } from "@royalfut/utils";
import { useIsMounted } from "@royalfut/hooks";

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

const SparkleItem: FC<{
    idx: number;
    settings: ISparkleAnimationProps["settings"];
}> = ({ idx, settings = {} }) => {
    const { current: options } = useRef({
        size: getRandomNumber(
            settings.size?.min || 4,
            settings.size?.max || 23
        ),
        pos: {
            r: getRandomNumber(
                settings.pos?.right?.min || 0,
                settings.pos?.right?.max || 20
            ),
            t: getRandomNumber(
                settings.pos?.top?.min || 0,
                settings.pos?.top?.max || 20
            ),
        },
        animation: {
            dur: getRandomNumber(
                settings.animate?.duration?.min || 2,
                settings.animate?.duration?.max || 4
            ),
            del: getRandomNumber(
                settings.animate?.delay?.min || 0.1,
                settings.animate?.delay?.max || 1
            ),
        },
    });

    const sparkleStyle = {
        "--sparkle-pos-r": `${options.pos.r}${settings.pos?.right?.isPercent ? "%" : "px"}`,
        "--sparkle-pos-t": `${options.pos.t}px`,
        "--sparkle-w": `${options.size}px`,
        "--sparkle-h": `${options.size}px`,
        "--sparkle-animation-dur": `${options.animation.dur}s`,
        "--sparkle-animation-del": `${options.animation.del}s`,
        "--sparkle-bg":
            idx % 2 === 0
                ? "var(--color-illusion-shine-accent-1)"
                : "var(--color-illusion-shine-accent-2)",
    } as CSSProperties;

    return <span className={styles["sparkle"]} style={sparkleStyle} />;
};

const SparkleAnimation: FC<ISparkleAnimationProps> = ({
    count = 2,
    settings = {},
}) => {
    const isMounted = useIsMounted();

    const sparkles = useMemo(() => {
        if (!isMounted) return null;
        return new Array(count).fill(null).map((_, idx) => {
            return <SparkleItem key={idx} idx={idx} settings={settings} />;
        });
    }, [count, isMounted, settings]);

    return sparkles;
};

export default SparkleAnimation;
