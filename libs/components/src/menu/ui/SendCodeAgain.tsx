import { useCallback, useEffect, useState } from "react";
import { Button } from "@royalfut/ui";
import { useTranslations } from "next-intl";

import type { FC } from "react";
import { useMagicLinkStore } from "@royalfut/store";

const SendCodeAgain: FC<{ onClear: () => void }> = ({ onClear }) => {
    const t = useTranslations("auth");
    const { email } = useMagicLinkStore();
    const [timeLeft, setTimeLeft] = useState(32);
    const [isAvailableSendCode, setisAvailableSendCode] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (timeLeft > 0) {
                setTimeLeft((prevTime) => prevTime - 1);
            }
        }, 1000);

        if (timeLeft === 0) {
            setisAvailableSendCode(true);
        }

        return () => clearTimeout(timer);
    }, [timeLeft, isAvailableSendCode]);

    const requestMagicLink = useCallback(async () => {
        try {
            await fetch("https://test-royalfut.com/api/users/fastlogin", {
                method: "POST",
                body: JSON.stringify({ user: { email } }),
                headers: {
                    Accept: "application/json, text/plain",
                    "Content-Type": "application/json;charset=UTF-8",
                },
            });
            await fetch("https://test-royalfut.com/api/users/fastlogin", {
                method: "POST",
                body: JSON.stringify({ user: { email } }),
                headers: {
                    Accept: "application/json, text/plain",
                    "Content-Type": "application/json;charset=UTF-8",
                },
            });
            return false;
        } catch (e) {
            console.error(e);
            return true;
        }
    }, [email]);

    const onSendAgain = useCallback(async () => {
        try {
            setLoading(true);
            onClear();
            const hasError = await requestMagicLink();
            if (!hasError) {
                setisAvailableSendCode(false);
                setTimeLeft(32);
            } else {
                // handle error
            }
            setLoading(false);
        } catch (e) {
            //
        }
    }, [onClear, requestMagicLink]);

    return (
        <div className="w-full p-2 flex-col justify-center items-center space-y-0.5 inline-flex">
            <Button
                as="button"
                onClick={onSendAgain}
                loading={loading}
                disabled={!isAvailableSendCode}
                className="text-center text-white text-base font-bold capitalize leading-normal">
                {t("action.sendCodeAgain")}
            </Button>
            {!isAvailableSendCode && (
                <span className="text-center text-white text-xs font-medium">
                    {timeLeft} sec
                </span>
            )}
        </div>
    );
};

export default SendCodeAgain;
