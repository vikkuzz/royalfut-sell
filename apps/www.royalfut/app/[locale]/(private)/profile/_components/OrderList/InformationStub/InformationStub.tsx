import Link from "next/link";

import { useTranslations } from "next-intl";
import { GradientButton } from "@royalfut/ui";
import Image from "next/image";

const InformationStub = () => {
    const t = useTranslations("chris_profile.orders");
    return (
        <div className="flex flex-col">
            <div className="flex justify-center">
                <Image
                    alt="noorder"
                    width={241}
                    height={192}
                    className="w-[241px] h-[192px] md:w-[390px] md:h-[276px]"
                    src="/image/dontHaveOrders.webp"
                />
            </div>
            <div className="flex flex-col gap-4 pt-4 md:pt-2 items-center justify-center">
                <span className="text-2xl font-bold">{t("noorders")}</span>
                <span className="text-base font-medium opacity-60">
                    {t("noorders_text")}
                </span>
            </div>
            <div className="w-full flex justify-center pt-8">
                <Link href={"/"}>
                    <GradientButton className="h-16 w-[350px]">
                        <span>{t("goback")}</span>
                    </GradientButton>
                </Link>
            </div>
        </div>
    );
};

export default InformationStub;
