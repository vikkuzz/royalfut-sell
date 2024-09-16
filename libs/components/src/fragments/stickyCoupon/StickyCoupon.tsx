"use client";
import { useRef, useState } from "react";
import styles from "./SpecialOffer.module.scss";
import { cn } from "@royalfut/utils";
import { Button, GradientButtonRegular } from "@royalfut/ui";
import Image from "next/image";
// import GradientBtn from "../GradientBtn/GradientBtn";
// import { Trans } from "@lingui/macro";

const StickyCoupon = ({ coupon }: { coupon: string }) => {
    const promocode = useRef<HTMLInputElement>(null);
    const [copyText, setCopyText] = useState(false);

    const copy = () => {
        const copy = promocode.current as unknown as
            | HTMLInputElement
            | HTMLTextAreaElement;
        if (copy) {
            copy.select();
            document.execCommand("copy");
            setCopyText(true);
        }
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="relative flex flex-col bg-[#2b2d43] border border-[rgba(255,255,255,0.2)] shadow-[0px_12px_20px_rgba(0,0,0,0.4)] rounded-[28px] overflow-hidden transition-all duration-300 ease-in-out bg-[url('/image/top-left-coin.png')] bg-no-repeat">
                <div className="w-full flex flex-col p-[28px_20px] z-10 bg-[url('/image/bottom-right-coin.png')] bg-right-bottom bg-no-repeat">
                    <h3 className=" w-full text-center bg-inherit font-bold text-[24px] leading-[29px] pb-[8px]">
                        Use this coupon to get a discount for your next order
                    </h3>
                    <div className="flex flex-col md:flex-row md:gap-[16px] md:pt-[16px]">
                        <GradientButtonRegular
                            as="link"
                            href={"/order"}
                            className="w-full text-2xl my-[16px] h-[64px] font-semibold md:my-0"
                        >
                            Buy Coins
                        </GradientButtonRegular>
                        <Button
                            as="button"
                            onClick={copy}
                            className={cn(
                                "flex relative text-xl rounded-2xl transition-all duration-300 font-semibold w-full hover:bg-white/10 h-[64px]",
                                {
                                    "animate-shadow-pulse duration-2000": copyText,
                                },
                            )}
                        >
                            <Image
                                alt="border"
                                src={"/img/border.svg"}
                                fill
                                className="absolute"
                                // objectFit="cover"
                            />
                            <label className="flex bg-transparent cursor-pointer">
                                <input
                                    ref={promocode}
                                    defaultValue={coupon.toUpperCase()}
                                    readOnly
                                    className={`flex w-auto bg-transparent justify-center border-0 text-center font-semibold outline-none select-none ${styles.input_text}`}
                                ></input>
                                <img
                                    alt="copy"
                                    src={`${!copyText ? `/img/content_copy.svg` : `/img/done_green.svg`}`}
                                    className="bg-transparent w-auto h-[24px] align-self-end"
                                />
                            </label>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StickyCoupon;
