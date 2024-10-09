import Image from "next/image";
import { useTranslations } from "next-intl";
import { WhatQuestionIcon, SpiralArrowIcon } from "@royalfut/icons";
import { cn } from "@royalfut/utils";

import type { FC } from "react";

interface ICardProps {
    picture: {
        src: string;
        cn?: string;
    };
    title: string;
    desc: string;
    withArrow?: boolean;
    dir?: string;
}

const Card: FC<ICardProps> = ({
    picture,
    desc,
    title,
    withArrow = false,
    dir,
}) => {
    return (
        <div className="relative flex flex-col items-center space-y-6 mx-auto sm:ml-0 sm:basis-1/3">
            <div
                className={
                    "bg-black-shape overflow-hidden rounded-full w-60 h-60 relative mx-auto"
                }>
                <Image
                    alt=""
                    className={cn(
                        "!h-auto aspect-square object-cover max-w-none",
                        {
                            "!right-[auto]": dir === "rtl",
                        },
                        picture.cn
                    )}
                    src={picture.src}
                    fill
                />
            </div>
            <div className="gap-2 flex flex-col items-center">
                <p className="text-white text-2xl font-bold">{title}</p>
                <span className="text-center text-white-60 text-base leading-snug font-medium">
                    {desc}
                </span>
            </div>
            {withArrow && (
                <div
                    className={cn(
                        "absolute -left-5 -bottom-[15%] translate-y-full sm:left-[auto] sm:translate-y-0 sm:bottom-[auto] sm:right-0 sm:translate-x-[60%] sm:top-1/4",
                        {
                            "md:-rotate-180 xs:!bottom-[100%]": dir === "rtl",
                        }
                    )}>
                    <SpiralArrowIcon className="text-black-shape w-40 h-20 rotate-90 sm:rotate-0" />
                </div>
            )}
        </div>
    );
};

const DeliveryProcess = ({ dir }: { dir?: string }) => {
    const t = useTranslations("car_home");
    const tr = useTranslations("li_home");

    return (
        <div className="flex flex-col gap-12">
            <div className="flex flex-col items-center justify-center w-full mx-auto gap-4">
                <h3 className="text-center text-5xl sm:text-4xl font-bold">
                    {tr("delivery.process.title")}
                </h3>
                <div className="flex items-center gap-2">
                    <WhatQuestionIcon className="text-white-60 w-6 h-6" />
                    <span className="text-center text-white-60 text-base leading-snug font-medium">
                        {t("delivery.process.desc")}
                    </span>
                </div>
            </div>
            <div
                dir={dir}
                className="flex flex-col sm:flex-row w-full justify-around space-y-11 gap-6 sm:space-y-0">
                <Card
                    picture={{
                        src: "/image/delivery-process-1.png",
                        cn: "!w-[130%] !-left-[28%] !-top-[18%]",
                    }}
                    title={t("delivery.process.card.1.title")}
                    desc={t("delivery.process.card.1.desc")}
                    withArrow={dir !== "rtl"}
                    dir={dir}
                />
                <Card
                    picture={{
                        src: "/image/delivery-process-2.png",
                        cn: "!w-[140%] !-left-[28%] !-top-[23%]",
                    }}
                    title={t("delivery.process.card.2.title")}
                    desc={t("delivery.process.card.2.desc")}
                    withArrow
                    dir={dir}
                />
                <Card
                    picture={{
                        src: "/image/delivery-process-3.png",
                        cn: "!w-[150%] !-left-[20%] !-top-[26%]",
                    }}
                    title={t("delivery.process.card.3.title")}
                    desc={t("delivery.process.card.3.desc")}
                    withArrow={dir === "rtl"}
                    dir={dir}
                />
            </div>
        </div>
    );
};

export default DeliveryProcess;
