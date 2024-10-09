"use client";
import { placeOrder } from "@royalfut/actions";
import { mapStatus } from "@royalfut/collections";
import { EAAuthForm } from "@royalfut/components";
import { IOrder } from "@royalfut/interfaces";
import { useTransferEAAccountStore } from "@royalfut/store";
import { GradientButton } from "@royalfut/ui";
import { cn } from "@royalfut/utils";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";

const SharedOrderBody = ({ order }: { order: IOrder }) => {
    const t = useTranslations("profile");
    const { login, password, backups, reset } = useTransferEAAccountStore();
    const [isDisabled, setIsDisabled] = useState(true);

    useEffect(() => {
        if (login && password && backups.length > 0) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    }, [login, password, backups]);

    const sendBackUpCodes = async () => {
        const body = {
            mail: login,
            password: password,
            backupCode1: backups[0]?.code,
            backupCode2: backups[1]?.code,
            backupCode3: backups[2]?.code,
            backupCode4: backups[3]?.code,
        };
        await placeOrder(
            order.id,
            body,
            null,
            "https://test-royalfut.com/"
        ).then(res => {
            console.log(res);
            reset();
        });
    };

    return (
        <div
            data-id={order.id}
            className={cn(
                "flex flex-col items-center gap-2 max-w-[100%] pt-6",
                {
                    "pointer-events-none opacity-40":
                        !mapStatus[order.status.toLowerCase()]?.btn_text,
                }
            )}>
            <EAAuthForm className="w-full" order={order} />
            <span className="self-start pt-3 opacity-60">
                {t("orders.recom")}
            </span>
            <span className="pt-5 w-full">
                <span className="opacity-60">{t("orders.get_backup")}</span>
                <a
                    className="pl-2"
                    rel="nofollow noreferrer"
                    href="https://myaccount.ea.com/cp-ui/security/index"
                    target="_blank">
                    myaccount.ea.com/cp-ui/security/index
                </a>
            </span>
            {mapStatus[order.status.toLowerCase()]?.btn_text && (
                <GradientButton
                    className="w-full md:w-80 h-16 mt-9"
                    onClick={sendBackUpCodes}
                    disabled={isDisabled}>
                    <span className="flex w-full h-16 items-center justify-center">
                        {t(mapStatus[order.status.toLowerCase()].btn_text)}
                    </span>
                </GradientButton>
            )}
        </div>
    );
};

export default SharedOrderBody;
