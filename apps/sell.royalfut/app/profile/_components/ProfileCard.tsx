"use client";

import Image from "next/image";
import { LogoutButton } from "@royalfut/components";
import { useUserStore } from "@royalfut/store";

const ProfileCard = () => {
    const { user } = useUserStore(state => ({ user: state.user }));

    if (!user) return null;

    return (
        <div className="w-full sm:min-h-[21.5rem] border border-white-10 rounded-xl bg-black-1 flex justify-center items-center px-7 py-6">
            <div className="flex flex-col items-center space-y-3.5">
                <div
                    className="w-20 h-20 relative rounded-xl overflow-hidden"
                    // className="[--bordered-box-linear-bg-1:hsl(var(--color-black-1))] w-20 h-20 relative rounded-xl overflow-hidden border-2 bordered-box-linear-white-20 border-transparent"
                >
                    <Image
                        src={user.avatar}
                        alt="User Image"
                        className=""
                        fill
                    />
                    <div className="absolute w-full h-full rounded-xl border border-white/20 top-0 left-0 bg-transparent"></div>
                </div>
                <span className="text-xl text-white font-bold text-center">
                    {user.email}
                </span>
                <LogoutButton className="sticky [--bordered-box-linear-bg-1:hsl(var(--color-black-1))]" />
            </div>
        </div>
    );
};

export default ProfileCard;
