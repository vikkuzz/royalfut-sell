import { useState } from "react";
import Image from "next/image";
import { useInterval, useUpdate, useMount } from "@lilib/hooks";
import { EUIDialogsNames } from "@royalfut/enums";
import { usePopupDialogStore } from "@royalfut/store";
import { Link, BorderedBox, GradientButton } from "@royalfut/ui";

import type { FC } from "react";

interface ISponsorRedirectDialogProps {}

const SponsorRedirectDialog: FC<ISponsorRedirectDialogProps> = () => {
    const { popup, value, clear } = usePopupDialogStore();
    const [redirectTimer, setRedirectTimer] = useState(4);
    const [start, cancel] = useInterval(() => {
        setRedirectTimer(count => {
            if (count !== 0) {
                return count - 1;
            }
            return 0;
        });
    }, 1000);

    useMount(() => {
        start();
    });

    useUpdate(() => {
        if (redirectTimer === 0) {
            if (value?.url) {
                window.open(value.url, "_blank");
            }
            cancel();
            clear();
        }
    }, [redirectTimer]);

    if (!value || popup !== EUIDialogsNames.SPONSOR_REDIRECT) {
        return null;
    }

    return (
        <BorderedBox
            design={{ gradient: true }}
            cnBox="center flex-col space-y-10"
            className="center flex flex-col [--rounded:1.75rem] px-8 py-10 max-w-md sm:max-w-[40rem] [--color-illusion-linear-bg:theme(colors.black.shape)]">
            <div className="center relative w-80 sm:w-full py-10">
                <div
                    style={{
                        background:
                            "radial-gradient(circle, rgba(136,82,242,0.8) 0%, rgba(136,82,242,0) 100%, rgba(246,192,60,0) 100%)",
                    }}
                    className="absolute h-2/3 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 blur-[30px] rounded-full pointer-events-none opacity-70"
                />
                <div className="relative w-2/5 h-auto aspect-square">
                    <Image
                        fill
                        src="/image/redirect-pointer.png"
                        alt="redirect"
                        className="object-contain"
                    />
                </div>
            </div>
            <div className="center flex-col gap-10">
                <div className="center flex-col gap-2">
                    <h5 className="text-3xl text-white font-bold">
                        Redirecting...
                    </h5>
                    <span className="text-white-40 justify-center text-center text-base font-medium">
                        You will be automatically redirected to our
                        partner&apos;s site{" "}
                        <span className="text-white sm:min-w-[6.5rem] inline-block text-left">
                            in {redirectTimer} seconds
                        </span>
                    </span>
                </div>
                <GradientButton
                    asChild
                    vsize="3xl"
                    onClick={() => (cancel(), clear())}>
                    <Link href={value.url} target="_blank">
                        Go Now
                    </Link>
                </GradientButton>
            </div>
        </BorderedBox>
    );
};

export default SponsorRedirectDialog;
