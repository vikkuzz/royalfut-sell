// prettier-ignore
/* eslint-disable max-lines */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useRef, useState } from "react";
import { DefaultAppSettings, posts, tags } from "@royalfut/collections";
import {
    BannerCard,
    BlogCard,
    Dropdown,
    PostContentCard,
    StickyCoupon,
} from "@royalfut/components";
import { useEffect } from "react";
import Image from "next/image";
import { cn } from "@royalfut/utils";
import { renderElement } from "../../utils";
import { LayoutViewportSectionFrame } from "@royalfut/ui";
import { PromoBanner } from "../../../../src";

const HtmlRenderer = ({ htmlObject }: { htmlObject: any }) => {
    return <div>{renderElement(htmlObject)}</div>;
};

const Nav = ({
    scrollLeft,
    scrollRight,
    goto,
    numBullets,
    activeBullet,
}: {
    scrollLeft: any;
    scrollRight: any;
    goto: any;
    numBullets: number;
    activeBullet: number;
}) => {
    const [bulls, setBulls] = useState<Array<any>>([]);
    useEffect(() => {
        const arr = [];
        for (let i = 0; i <= numBullets; i++) {
            if (i === activeBullet) {
                arr.push({ active: true });
            } else {
                arr.push({ active: false });
            }
        }
        setBulls(arr);
    }, [numBullets, activeBullet]);
    return (
        <div className="flex gap-6 justify-center">
            <button
                className="hover:opacity-80 min-w-[48px]"
                onClick={() => scrollLeft()}>
                <Image
                    width={48}
                    height={48}
                    alt="left"
                    src={"/image/arrow_circle_right.svg"}></Image>
            </button>
            <div className="flex gap-1 items-center flex-wrap md:flex-nowrap transition-all duration-300">
                {bulls.map((el, i) => {
                    return (
                        <button
                            key={i}
                            data-id={i}
                            onClick={goto}
                            className={cn(
                                "rounded-full bg-white-50 w-[8px] h-[8px] hover:bg-white",
                                {
                                    "bg-white w-[12px] h-[12px]": el.active,
                                }
                            )}></button>
                    );
                })}
            </div>
            <button
                className="rotate-180 hover:opacity-80 min-w-[48px]"
                onClick={() => scrollRight()}>
                <Image
                    width={48}
                    height={48}
                    alt="right"
                    src={"/image/arrow_circle_right.svg"}></Image>
            </button>
        </div>
    );
};
const Gallery = () => {
    const galleryRef = useRef<HTMLDivElement>(null);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [activeBullet, setActiveBullet] = useState(0);
    useEffect(() => {
        console.log(scrollPosition);
        if (galleryRef.current) {
            galleryRef.current.scrollLeft = scrollPosition;
        }
        let position = Math.round(scrollPosition / 350);
        if (position > posts.length) {
            position = posts.length;
        }
        setActiveBullet(position);
    }, [scrollPosition]);

    function throttle<T extends (...args: Array<any>) => any>(
        func: T,
        limit: number
    ): (...args: Parameters<T>) => void {
        let lastFunc: NodeJS.Timeout | null = null;
        let lastRan: number | null = null;
        return function (this: any, ...args: Parameters<T>): void {
            const context = this;
            if (lastRan === null) {
                func.apply(context, args);
                lastRan = Date.now();
            } else {
                if (lastFunc) clearTimeout(lastFunc);
                lastFunc = setTimeout(
                    () => {
                        if (lastRan !== null && Date.now() - lastRan >= limit) {
                            func.apply(context, args);
                            lastRan = Date.now();
                        }
                    },
                    limit - (Date.now() - lastRan)
                );
            }
        };
    }
    const scrollLeft = throttle(() => {
        if (scrollPosition <= 0) {
            setScrollPosition(0);
        } else if (galleryRef.current) {
            setScrollPosition(galleryRef.current.scrollLeft - 362);
        }
    }, 1000);
    const scrollRight = throttle(() => {
        if (scrollPosition < 0) {
            setScrollPosition(0);
        } else if (galleryRef.current) {
            if (scrollPosition + 350 >= galleryRef.current.scrollWidth) return;
            setScrollPosition(galleryRef.current.scrollLeft + 362);
        }
    }, 1000);
    const goto = (e: { target: { dataset: { id: number } } }) => {
        setScrollPosition(e.target.dataset.id * 362);
    };
    return (
        <div>
            <div
                ref={galleryRef}
                className="max-w-screen w-full overflow-x-auto pb-6 scroll-smooth">
                <div className="grid grid-flow-col grid-rows-1 gap-4 w-max">
                    {posts.map(el => {
                        el.width = "1";
                        return (
                            <BlogCard
                                key={el.slug}
                                className="max-w-[350px]"
                                card={el}
                                tags={tags}
                            />
                        );
                    })}
                </div>
            </div>
            <Nav
                scrollLeft={scrollLeft}
                scrollRight={scrollRight}
                goto={goto}
                numBullets={posts.length}
                activeBullet={activeBullet}
            />
        </div>
    );
};
const Index = ({ params, posts }: { params: { post: string }; posts: any }) => {
    // useEffect(() => {const getTranslates = async () => {await getTranslatesFromCsv(posts);};getTranslates();}, []);
    const card = posts.filter(
        (el: { slug: any }) => String(el.slug) === params.post
    )[0];
    return (
        <div className="flex flex-col gap-6">
            {card && <PostContentCard card={card} />}
            <div className="flex gap-6">
                <div className="flex flex-col gap-10 max-w-full">
                    <div className="flex gap-6">
                        <div className="flex flex-col gap-10 max-w-[1074px]">
                            <div className="flex gap-8 w-auto h-auto">
                                <div className="w-full rounded-2xl overflow-hidden h-[174px] min-h-[174px] md:h-[450px] relative">
                                    {card.pic1 && (
                                        <Image
                                            alt="cover post"
                                            fill
                                            objectFit="cover"
                                            src={`/image/blog/${card.slug}/${card.pic1}.jpg`}
                                        />
                                    )}
                                </div>
                            </div>
                            {card.body1 && (
                                <HtmlRenderer htmlObject={card.body1} />
                            )}
                            <div className="flex w-full md:justify-center">
                                <div className="max-w-[796px]">
                                    <StickyCoupon coupon={"return5"} />
                                </div>
                            </div>
                            <div className="w-full rounded-2xl overflow-hidden h-[174px] min-h-[174px] md:h-[450px] relative">
                                {card.pic2 && (
                                    <Image
                                        alt="cover post"
                                        fill
                                        objectFit="cover"
                                        src={`/image/blog/${card.slug}/${card.pic2}.jpg`}
                                    />
                                )}
                            </div>
                            {card.body2 && (
                                <HtmlRenderer htmlObject={card.body2} />
                            )}
                            <div className="flex">
                                <Dropdown />
                            </div>
                        </div>
                        <div className="sticky top-24 hidden md:flex max-h-[448px] min-w-[350px] md:w-auto md:h-auto md:opacity-100">
                            <BannerCard />
                        </div>
                    </div>
                    <LayoutViewportSectionFrame className="flex flex-col mt-24">
                        <PromoBanner
                            rate={DefaultAppSettings.trustScore.rate}
                        />
                    </LayoutViewportSectionFrame>
                    <div className="flex flex-col gap-6 pt-6 md:pt-6">
                        <span className="text-[28px] font-bold md:text-[36px] leading-normal">
                            What else
                        </span>
                        <Gallery />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Index;
