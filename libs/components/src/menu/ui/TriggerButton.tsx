import Image from "next/image";
import { GradientButton, Button, Sheet } from "@royalfut/ui";
import { useUserStore } from "@royalfut/store";
import { useTranslations } from "next-intl";

export const LoginMenuTriggerButton = () => {
    const t = useTranslations("phoenix_pages.auth");
    return (
        <Sheet.Trigger
            className="hidden h-12 px-12 whitespace-nowrap sm:flex no-print"
            asChild>
            <GradientButton>{t("btn.login")}</GradientButton>
        </Sheet.Trigger>
    );
};

export const UserMenuTriggerButton = () => {
    const { user } = useUserStore(state => ({ user: state.user }));

    if (!user) return null;

    return (
        <Sheet.Trigger
            className="hidden h-12 px-0 whitespace-nowrap no-print sm:flex"
            asChild>
            <Button className="relative space-x-4">
                {/* <div className="flex flex-col justify-between items-center h-full">
                    <PrimaryGradientBox className="flex items-center justify-between bg-white-20 rounded-full w-max space-x-1 px-2 py-1">
                        <span className="text-white font-bold text-sm">
                            1250
                        </span>
                        <CrownIcon className="w-4 h-4 text-white" />
                    </PrimaryGradientBox>

                    <span className="text-xs font-medium text-white-40 leading-[normal]">
                        Royal Points
                    </span>
                </div> */}
                <div
                    style={{ boxShadow: "0px 0px 30.8px 0px #E3B7439E" }}
                    className="[--bordered-box-linear-bg-1:#262240] w-12 h-12 relative rounded-xl overflow-hidden border-2 bordered-box-linear-avatar border-transparent">
                    <Image src={user.avatar} alt="User Image" fill />
                </div>
            </Button>
        </Sheet.Trigger>
    );
};
