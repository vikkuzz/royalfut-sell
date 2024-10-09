"use client";

import Image from "next/image";
import { useCallback, useState, useRef, useEffect } from "react";
import { cn } from "@royalfut/utils";

import type { FC } from "react";
import type { ComponentPropsWithoutRef } from "react";

interface IProgressiveImageProps
    extends ComponentPropsWithoutRef<typeof Image> {
    lowSrc: string;
}

const ProgressiveImage: FC<IProgressiveImageProps> = ({
    lowSrc,
    src,
    alt,
    className,
    ...props
}) => {
    const [highLoaded, setHighLoaded] = useState(false);
    const imgRef = useRef<HTMLImageElement | null>(null);

    const handleHighLoad = useCallback(() => {
        setHighLoaded(true);
    }, []);

    useEffect(() => {
        const imgEl = imgRef.current;

        if (imgEl) {
            if (imgEl.complete) {
                handleHighLoad();
            } else {
                imgEl.onload = () => {
                    handleHighLoad();
                };
            }
        }
    }, []);

    return (
        <div className="relative w-full h-full">
            {/* Low Quality Image */}
            <Image
                src={lowSrc}
                alt={alt}
                className={cn(
                    "transition-opacity duration-500",
                    {
                        "opacity-0": highLoaded,
                        "opacity-100": !highLoaded,
                    },
                    className
                )}
                fill
                {...props}
            />
            {/* High Quality Image */}
            <Image
                src={src}
                alt={alt}
                onLoad={handleHighLoad}
                ref={imgRef}
                className={cn(
                    "absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500",
                    {
                        "opacity-100": highLoaded,
                        "opacity-0": !highLoaded,
                    }
                )}
                {...props}
            />
        </div>
    );
};

export default ProgressiveImage;
