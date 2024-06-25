"use client";

import { useState, useCallback, useEffect } from "react";
import { Button, runElasticFlyout } from "@royalfut/ui";
import { cn } from "@royalfut/utils";
import { HeartIcon } from "@royalfut/icons";

import styles from "./HeartButton.module.scss";

const animations = new Set();

const HeartButton = () => {
    const [likes, setLikes] = useState<Array<string>>([]);

    const removeLike = useCallback((id: string) => {
        setLikes(prev => prev.filter(item => item !== id));
    }, []);

    useEffect(() => {
        likes.forEach(id => {
            queueMicrotask(() => {
                if (!animations.has(id)) {
                    const el = document.querySelector(
                        `[data-id='${id}']`
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
        const randomId = Math.random();

        setLikes(prev => {
            if (prev.length >= 6) return prev;
            return [...prev, String(randomId)];
        });
    }, []);

    return (
        <Button
            as="button"
            aria-label="Like"
            className={cn("absolute bottom-5 right-8 w-max h-max", styles.like)}
            onClick={handleClick}>
            <div className="w-max h-max relative">
                <HeartIcon className="w-10 h-10 animate-wiggle-more pointer-events-none animate-infinite hover:animate-pause text-[#FF4F6E]" />
                {likes.map(item => {
                    // const colorIdx = getRandomInteger(0, 3);
                    return (
                        <div
                            key={item}
                            data-id={item}
                            className={cn(
                                styles.plusOne,
                                "text-[#FF4F6E] absolute top-1/2 left-1/2 pointer-events-none w-full h-full"
                            )}>
                            <HeartIcon />
                        </div>
                    );
                })}
            </div>
        </Button>
    );
};

export default HeartButton;
