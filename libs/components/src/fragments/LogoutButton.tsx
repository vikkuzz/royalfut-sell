"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@royalfut/ui";
import { ExitIcon } from "@royalfut/icons";
import { useAuthListener, useLogoutCleanup } from "@royalfut/hooks";
import { deleteLogin } from "@royalfut/actions";
import { cn } from "@royalfut/utils";

import type { FNCN } from "@royalfut/interfaces";

const LogoutButton: FNCN = ({ className }) => {
    const t = useTranslations("ye_user");
    const { loggedOut, logoutListener } = useAuthListener();
    const [isWaiting, setIsWaiting] = useState(false);
    const { performAppClean } = useLogoutCleanup();

    return (
        <Button
            onClick={async e => {
                e.preventDefault();
                setIsWaiting(true);
                await deleteLogin();
                loggedOut(() => {
                    setIsWaiting(false);
                    performAppClean();
                });
                logoutListener();
            }}
            loading={isWaiting}
            className={cn(
                "hover:[--bordered-box-linear-bg-1:hsla(var(--color-black-background),85%)] relative h-[3.25rem] rounded-xl before:transition-colors before:duration-300 px-16 py-3.5 space-x-2 before:absolute before:border before:border-transparent before:-top-0.5 before:-left-0.5 before:-right-0.5 before:-bottom-0.5 before:-z-[1] before:rounded-xl before:bordered-box-linear-accent-1 sm:w-56",
                className
            )}>
            <span className="text-base font-semibold text-white whitespace-nowrap">
                {t("action.logOut")}
            </span>
            <ExitIcon className="text-white-40 w-6 h-6" />
        </Button>
    );
};

export default LogoutButton;
