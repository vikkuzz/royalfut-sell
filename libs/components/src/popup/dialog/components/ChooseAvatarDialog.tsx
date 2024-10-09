import { useState, useCallback } from "react";
import Image from "next/image";
import { usePopupDialogStore, useUserStore } from "@royalfut/store";
import { GradientButton, Button } from "@royalfut/ui";
import { updateUser } from "@royalfut/actions";
import { UserProfileAvatars } from "@royalfut/collections";
import { CheckVIcon } from "@royalfut/icons";
import { cn } from "@royalfut/utils";

const findImgIndex = (img?: string) => {
    if (!img) return;
    return Number(
        Object.keys(UserProfileAvatars).find(
            idx =>
                UserProfileAvatars[
                    Number(idx) as unknown as keyof typeof UserProfileAvatars
                ] === img
        )
    );
};

const ChooseAvatarDialog = () => {
    const { clear } = usePopupDialogStore();
    const { user, setUser } = useUserStore(state => ({
        user: state.user,
        setUser: state.setUser,
    }));
    const [choicedAvatar, setChoicedAvatar] = useState(
        findImgIndex(user?.avatar)
    );
    const [loading, setLoading] = useState(false);

    const confirm = useCallback(async () => {
        try {
            setLoading(true);
            if (!choicedAvatar) throw new Error();
            const res = await updateUser({
                user: { profilePicture: choicedAvatar },
            });

            if ("hasError" in res) {
                throw new Error();
            }

            setUser(res);
            clear();
        } catch (e) {
            // clear();
        } finally {
            setLoading(false);
        }
    }, [choicedAvatar, clear, setUser]);

    return (
        <div className="center flex flex-col border border-white-20 rounded-xl sm:px-14 pt-16 pb-14 shadow-lg bg-black-shape">
            <div className="flex flex-col items-center gap-9 px-14 sm:px-28">
                <h3 className="text-2.5xl font-bold">Choose your avatar</h3>
                <div className="flex flex-wrap w-80 gap-3 justify-between">
                    {Object.values(UserProfileAvatars).map(item => {
                        const imgIdx = findImgIndex(item);
                        return (
                            <Button
                                className="group relative basis-[calc(25%-theme(spacing[2.5]))] h-auto aspect-square"
                                onClick={() => {
                                    setChoicedAvatar(imgIdx);
                                }}
                                key={item}>
                                <div
                                    className={cn(
                                        "overflow-hidden relative w-full h-full rounded-2xl",
                                        {
                                            "border-extra-benefit4 border-2":
                                                imgIdx === choicedAvatar,
                                            "border-[hsla(0,0%,100%,.2)] border group-hover:border-extra-benefit4 hover:border-extra-benefit4":
                                                imgIdx !== choicedAvatar,
                                        }
                                    )}>
                                    <Image src={item} alt="" fill />
                                </div>
                                {imgIdx === choicedAvatar && (
                                    <div className="center absolute rounded-full right-1 bottom-1 translate-x-1/2 translate-y-1/2 w-5 h-5 bg-extra-benefit4">
                                        <CheckVIcon className="text-white w-1/2 h-1/2 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
                                    </div>
                                )}
                            </Button>
                        );
                    })}
                </div>
                <GradientButton
                    onClick={confirm}
                    loading={loading}
                    className={`group w-full sm:w-full py-5`}>
                    <span className="text-xl">Confirm</span>
                </GradientButton>
            </div>
        </div>
    );
};

export default ChooseAvatarDialog;
