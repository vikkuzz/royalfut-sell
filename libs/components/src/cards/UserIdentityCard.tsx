"use client";

import Image from "next/image";
import { useUserStore, usePopupDialogStore } from "@royalfut/store";
import { PencilMonocolorIcon } from "@royalfut/icons";
import { LogoutButton } from "../fragments";
import { BaseBox, Button } from "@royalfut/ui";
import { EUIDialogsNames } from "@royalfut/enums";
import { cn } from "@royalfut/utils";

import type { FNCN } from "@royalfut/interfaces";

const UserIdentityCard: FNCN<{ editable?: boolean }> = ({
    className,
    editable = true,
}) => {
    const { user } = useUserStore(state => ({ user: state.user }));
    const setPopup = usePopupDialogStore(state => state.setPopup);

    if (!user) return null;

    return (
        <div
            className={cn(
                "w-full sm:min-h-[21.5rem] sm:border sm:border-white-10 rounded-xl sm:bg-black-1 flex justify-center items-center px-7 py-6",
                className
            )}>
            <div className="flex flex-col items-center space-y-3.5">
                <BaseBox
                    className="group w-20 h-20 relative"
                    size="lg"
                    rounded={false}
                    asSize
                    asChild
                    // className="[--bordered-box-linear-bg-1:hsl(var(--color-black-1))] w-20 h-20 relative rounded-xl overflow-hidden border-2 bordered-box-linear-white-20 border-transparent"
                >
                    <Button
                        onClick={() => setPopup(EUIDialogsNames.CHOOSE_AVATAR)}>
                        <div className="w-full h-full relative overflow-hidden rounded-xl">
                            <Image
                                src={user.avatar}
                                alt="User Image"
                                className=""
                                fill
                            />
                            <div className="absolute w-full h-full rounded-xl border border-[hsla(0,0%,100%,.2)] top-0 left-0 bg-transparent" />
                        </div>
                        {editable && (
                            <div className="center absolute rounded-full right-1 bottom-1 translate-x-1/2 translate-y-1/2 w-6 h-6 bg-extra-benefit4 hover:bg-primary group-hover:bg-primary transition-colors duration-200">
                                <PencilMonocolorIcon className="text-white w-1/2 h-1/2" />
                            </div>
                        )}
                    </Button>
                </BaseBox>
                <span className="text-xl text-white font-bold text-center">
                    {user.email}
                </span>
                <LogoutButton className="sticky [--bordered-box-linear-bg-1:hsl(var(--color-black-1))]" />
            </div>
        </div>
    );
};

export default UserIdentityCard;
