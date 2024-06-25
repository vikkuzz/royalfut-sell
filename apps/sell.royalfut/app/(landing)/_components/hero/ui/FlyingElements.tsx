import { cn } from "@royalfut/utils";
import Image from "next/image";
import {
    PaymentMastercardRotatedIcon,
    TetherRotatedIcon,
    RevolutLogomarkIcon,
    PaymentVisaRotatedIcon,
} from "@royalfut/icons";
import styles from "./FlyingElments.module.scss";

import type { FNCN } from "@royalfut/interfaces";

const cnBounce =
    "animate-bounce animate-infinite animate-duration-[1700ms] animate-ease-in-out";

export const FlyCoins = () => {
    return (
        <div>
            <div
                className={cn(
                    "absolute w-max h-max left-[-7%] top-[28%] sm:left-[4%] sm:top-[35%] z-[-1] rotate-[7deg]",
                    cnBounce,
                    "animate-delay-[1500ms]"
                )}>
                <div className={"relative w-16 sm:w-[6.4rem] aspect-[20/19]"}>
                    <Image
                        src="/image/coin-sprite1-min.png"
                        fill
                        alt="earn money"
                    />
                </div>
            </div>
            <div
                className={cn(
                    "absolute w-max h-max left-[12%] top-[51%] sm:left-[40%] sm:top-[44%] z-[-1] rotate-[0deg]",
                    cnBounce,
                    "animate-delay-1000"
                )}>
                <div className={"relative w-16 sm:w-[6.4rem] aspect-[20/19]"}>
                    <Image
                        src="/image/coin-sprite2-min.png"
                        fill
                        alt="earn money"
                    />
                </div>
            </div>
            <div
                className={cn(
                    "absolute w-max h-max left-[0%] bottom-[8%] sm:left-[4%] sm:bottom-[-3%] sm:z-[-1] rotate-[25deg]",
                    cnBounce
                )}>
                <div className={"relative w-20 sm:w-28 aspect-square"}>
                    <Image
                        src="/image/coin-sprite3-min.png"
                        fill
                        alt="earn money"
                    />
                </div>
            </div>
        </div>
    );
};
const cnWiggle =
    "animate-wiggle animate-infinite animate-duration-[1500ms] animate-ease-in-out";
export const FlyMonies = () => {
    return (
        <div>
            <div
                className={cn(
                    "absolute w-max h-max right-[30%] top-[51%] z-[-1] hidden sm:block",
                    cnWiggle,
                    "animate-delay-1000"
                )}>
                <div className={"relative w-32 aspect-[4/2] rotate-[142deg]"}>
                    <Image
                        src="/image/money-sprite3-min.png"
                        fill
                        alt="earn money"
                    />
                </div>
            </div>
            <div
                className={cn(
                    "absolute w-max h-max right-[6%] top-[45%] sm:right-[1%] sm:top-[27%]",
                    cnWiggle,
                    "animate-delay-500"
                )}>
                <div
                    className={
                        "relative w-24 sm:w-32 aspect-[4/2] rotate-[220deg] sm:rotate-[-30deg]"
                    }>
                    <Image
                        src="/image/money-sprite6-min.png"
                        fill
                        alt="earn money"
                    />
                </div>
            </div>
            <div
                className={cn(
                    "absolute w-max h-max right-[-2%] bottom-[17%] sm:right-[6%] sm:bottom-[10%]",
                    cnWiggle
                )}>
                <div
                    className={
                        "relative w-24 sm:w-36 aspect-square rotate-[0deg]"
                    }>
                    <Image
                        src="/image/money-sprite7-min.png"
                        fill
                        alt="earn money"
                    />
                </div>
            </div>
        </div>
    );
};

const mapPaymentIcons = {
    mastercard: PaymentMastercardRotatedIcon,
    tether: TetherRotatedIcon,
    revolut: RevolutLogomarkIcon,
    visa: PaymentVisaRotatedIcon,
};

const PaymentBox: FNCN<{
    month: string;
    payment: string;
    id: keyof typeof mapPaymentIcons;
    cnIcon?: string;
}> = ({ className, month, payment, id, cnIcon }) => {
    const Icon = mapPaymentIcons[id];
    return (
        <div
            className={cn(
                "[--bordered-box-linear-bg-1:#262240] overflow-hidden w-[10.5rem] h-11 sm:h-14 md:w-80 md:h-[4.5rem] absolute px-2 py-1.5 md:px-5 md:py-4 origin-top-left bordered-box-linear-card-fly-payment rounded-xl md:rounded-2xl border border-transparent justify-center items-center gap-1 sm:gap-3 inline-flex",
                styles["shine-border-box"],
                "before:hidden sm:before:block",
                className
            )}>
            <div
                className={cn(
                    "w-5 h-5 md:w-9 md:h-9 relative flex-none",
                    cnIcon
                )}>
                <Icon />
            </div>
            <div className="text-center text-white text-opacity-80 text-xs sm:text-base font-medium">
                {month}
            </div>
            <div className="grow shrink basis-0 text-right whitespace-nowrap text-green-400 text-xs sm:text-lg md:text-xl font-medium uppercase">
                {payment}
            </div>
        </div>
    );
};

export const FlyPayments = () => {
    return (
        <div>
            <PaymentBox
                id="visa"
                className="top-[43%] left-[0%] sm:left-[12%] sm:top-[45%] rotate-[-8.117deg] z-10 before:animate-delay-1000"
                month="January"
                cnIcon="rotate-[9deg] translate-y-px"
                payment="+$120.00"
            />
            <PaymentBox
                id="revolut"
                className="bottom-[28%] -left-[1%] sm:bottom-[25%] sm:left-[3%] rotate-[13.812deg] z-10 before:animate-delay-500"
                month="February"
                cnIcon="-rotate-12 -translate-y-px"
                payment="+£135.00"
            />
            <PaymentBox
                id="mastercard"
                className="top-[36%] -right-[10%] sm:top-[35%] sm:right-[3%] rotate-[13.297deg] z-10 before:!animate-delay-[1000ms]"
                month="December"
                cnIcon="-rotate-[10deg] translate-y-1"
                payment="+€200.00"
            />
            <PaymentBox
                id="tether"
                className="bottom-[32%] right-[2%] sm:bottom-[14%] sm:right-[17%] rotate-[-11.935deg] z-10 before:animate-delay-[300ms]"
                month="January"
                cnIcon="rotate-[8deg]"
                payment="+150.00 USDT"
            />
        </div>
    );
};
