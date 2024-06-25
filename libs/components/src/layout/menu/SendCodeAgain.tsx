import { useCallback, useEffect, useState } from "react";
import { Button } from "@royalfut/ui";

import type { FC } from "react";

const SendCodeAgain: FC<{ onClear: () => void }> = ({ onClear }) => {
    const [timeLeft, setTimeLeft] = useState(32);
    const [isAvailableSendCode, setisAvailableSendCode] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (timeLeft > 0) {
                setTimeLeft(prevTime => prevTime - 1);
            }
        }, 1000);

        if (timeLeft === 0) {
            setisAvailableSendCode(true);
        }

        return () => clearTimeout(timer);
    }, [timeLeft, isAvailableSendCode]);

    const onSendAgain = useCallback(async () => {
        try {
            setLoading(true);
            onClear();
            await new Promise(resolve =>
                setTimeout(() => {
                    setisAvailableSendCode(false);
                    setTimeLeft(32);
                    resolve(null);
                }, 3000)
            );
            setLoading(false);
        } catch (e) {
            //
        }
    }, [onClear]);

    return (
        <div className="w-full p-2 flex-col justify-center items-center space-y-0.5 inline-flex">
            <Button
                as="button"
                onClick={onSendAgain}
                loading={loading}
                disabled={!isAvailableSendCode}
                className="text-center text-white text-base font-bold capitalize leading-normal">
                Send code again
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
