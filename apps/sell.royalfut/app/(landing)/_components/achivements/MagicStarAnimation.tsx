"use client";

import { useCallback, useRef, useId } from "react";
import { useMount } from "@lilib/hooks";
import { cn } from "@royalfut/utils";
import { MagicStarIcon } from "@royalfut/icons";
import styles from "./MagicStarAnimation.module.scss";

import type { RefObject } from "react";
import type { FNCNChildren } from "@royalfut/interfaces";

const MagicStars: FNCNChildren<{ delay?: number }> = ({
    className,
    children,
    delay = 1000,
}) => {
    const id = useId();
    const internalAnimationUniqueIds = useRef<Set<string>>(new Set());
    const intervalIdsRef = useRef<Array<NodeJS.Timer>>([]);
    const starsBoxRef = useRef<HTMLDivElement | null>(null);
    const intersectionObserverRef = useRef<IntersectionObserver | null>(null);

    const rand = useCallback(
        (min: number, max: number) =>
            Math.floor(Math.random() * (max - min + 1)) + min,
        [],
    );

    const animate = useCallback(
        (starRef: RefObject<HTMLDivElement>) => {
            if (starRef.current) {
                const star = starRef.current;
                star.style.setProperty("--star-left", `${rand(-10, 100)}%`);
                star.style.setProperty("--star-top", `${rand(-40, 80)}%`);

                star.style.animation = "none";
                // NOTE: Don't remove
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions, no-unused-expressions
                star.offsetHeight;
                star.style.animation = "";
            }
        },
        [rand],
    );

    const endAnimate = useCallback(() => {
        if (intervalIdsRef.current) {
            internalAnimationUniqueIds.current.clear();
            intervalIdsRef.current.forEach((intervalId) =>
                clearInterval(intervalId),
            );
            intervalIdsRef.current = [];
        }
    }, []);

    const startAnimate = useCallback(
        (stars: NodeListOf<HTMLDivElement>) => {
            if (!stars.length) return;

            const interval = 1000;

            stars.forEach((star, index) => {
                const timerId = setTimeout(
                    () => {
                        const animateStar = () => {
                            animate({ current: star as HTMLDivElement });
                        };
                        animateStar();
                        const uniqueId = `${id}${index}`;

                        if (!internalAnimationUniqueIds.current.has(uniqueId)) {
                            const intervalId = setInterval(animateStar, delay);
                            intervalIdsRef.current.push(intervalId);
                        }
                        internalAnimationUniqueIds.current.add(uniqueId);
                        clearTimeout(timerId);
                    },
                    index * (interval / 3),
                );
            });
        },
        [animate, delay, id],
    );

    useMount(() => {
        const options = {
            root: null,
            rootMargin: "0px",
            threshold: 0.1,
        };

        const callback = (entries: Array<IntersectionObserverEntry>) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    startAnimate(
                        starsBoxRef.current?.querySelectorAll(
                            `[data-id='magic-star-animation-${id}']`,
                        ) as NodeListOf<HTMLDivElement>,
                    );
                } else {
                    endAnimate();
                }
            });
        };

        intersectionObserverRef.current = new IntersectionObserver(
            callback,
            options,
        );
        if (starsBoxRef.current) {
            intersectionObserverRef.current.observe(starsBoxRef.current);
        }

        return () => {
            if (intersectionObserverRef.current) {
                intersectionObserverRef.current.disconnect();
            }
            endAnimate();
        };
    });

    return (
        <div className={cn("relative", className)} ref={starsBoxRef}>
            <span
                data-id={`magic-star-animation-${id}`}
                className={styles.magicStar}
            >
                <MagicStarIcon />
            </span>
            <span
                data-id={`magic-star-animation-${id}`}
                className={styles.magicStar}
            >
                <MagicStarIcon />
            </span>
            <span
                data-id={`magic-star-animation-${id}`}
                className={styles.magicStar}
            >
                <MagicStarIcon />
            </span>
            {children}
        </div>
    );
};

export default MagicStars;
