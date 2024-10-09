"use client";

import { useState, useCallback, useEffect } from "react";
import { useToggle, useTimeout } from "@lilib/hooks";
import { Button, runElasticFlyout } from "@royalfut/ui";
import { cn } from "@royalfut/utils";
import { HeartIcon } from "@royalfut/icons";

import styles from "./HeartButton.module.scss";

const animations = new Set();

const HeartButton = () => {
    const [likes, setLikes] = useState<Array<string>>([]);
    const [scaleOrigin, { toggleOn, toggleOff }] = useToggle(false);
    const [removeScale, cancel] = useTimeout(() => {
        toggleOff();
    }, 150);

    const removeLike = useCallback((id: string) => {
        setLikes((prev) => prev.filter((item) => item !== id));
    }, []);

    useEffect(() => {
        likes.forEach((id) => {
            queueMicrotask(() => {
                if (!animations.has(id)) {
                    const el = document.querySelector(
                        `[data-id='${id}']`,
                    ) as HTMLDivElement;
                    if (el) {
                        runElasticFlyout(el, removeLike.bind(null, id));
                    }
                }
                animations.add(id);
            });
        });
    }, [likes, removeLike]);

    const handleClick = useCallback(() => {
        cancel();
        toggleOn();
        removeScale();
        const randomId = Math.random();

        setLikes((prev) => {
            if (prev.length >= 6) return prev;
            return [...prev, String(randomId)];
        });
    }, [cancel, removeScale, toggleOn]);

    return (
        <Button
            aria-label="Like"
            className={cn(
                "group absolute bottom-5 right-8 w-max h-max",
                styles.like,
            )}
            onClick={handleClick}
        >
            <div className="w-max h-max relative">
                <div
                    className={cn("transition-transform duration-75", {
                        "scale-125": scaleOrigin,
                        "scale-100": !scaleOrigin,
                    })}
                >
                    <HeartIcon className="w-10 h-10 animate-wiggle-more pointer-events-none animate-infinite group-hover:animate-pause group-hover:opacity-90 text-[#FF4F6E]" />
                </div>
                {likes.map((item) => {
                    // const colorIdx = getRandomInteger(0, 3);
                    return (
                        <div
                            key={item}
                            data-id={item}
                            className={cn(
                                styles.plusOne,
                                "text-[#FF4F6E] absolute top-1/2 left-1/2 pointer-events-none w-full h-full",
                            )}
                        >
                            <HeartIcon />
                        </div>
                    );
                })}
            </div>
        </Button>
    );
};

export default HeartButton;
