import { forwardRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    useMagicLinkStore,
    useUserStore,
    useUIGlobalStore,
} from "@royalfut/store";
import { LogoutButton } from "../../fragments";
import CodeVerification from "./CodeVerification";
import AuthViaMagicLink from "./AuthViaMagicLink";
import { useTranslations } from "next-intl";
import { UserLoyaltyBtnBadge } from "../../user";
import ProfileNav from "./ProfileNav";

import type { ElementRef, ComponentPropsWithoutRef } from "react";

export const AuthMenuContent = forwardRef<
    ElementRef<"div">,
    ComponentPropsWithoutRef<"div">
>(({ ...props }, externalRef) => {
    const { isSendedLink, email } = useMagicLinkStore();
    const t = useTranslations("auth");
    const title = isSendedLink ? t("text.code") : t("text.authTitle");

    return (
        <div ref={externalRef} {...props}>
            <h5 className="text-4xl font-bold text-center text-white mb-4">
                {title}
            </h5>
            <p className="text-base font-medium text-center leading-tight inline-block">
                {isSendedLink ? (
                    <>
                        {t.rich("notify.sentConfirmationCode", {
                            address: email,
                            mail: chunks => (
                                <span className="font-bold tracking-wide">
                                    {chunks}
                                </span>
                            ),
                        })}
                        {/* We&apos;ve sent you a six-digit confirmation code to{" "}
                        <span className="font-bold tracking-wide">{email}</span>
                        . Please enter it below to confirm your email address. */}
                    </>
                ) : (
                    t("text.codeInfo")
                )}
            </p>
            {isSendedLink ? <CodeVerification /> : <AuthViaMagicLink />}
        </div>
    );
});
AuthMenuContent.displayName = "AuthMenuContent";

export const UserMenuContent = () => {
    const { user } = useUserStore(state => ({ user: state.user }));
    const loyality = useUIGlobalStore(state => state.features.loyality);

    if (!user) return null;

    return (
        <div className="flex flex-col">
            <div className="flex flex-col justify-center items-center space-y-4">
                <div
                    style={{ boxShadow: "0px 0px 30.8px 0px #E3B7439E" }}
                    className="[--bordered-box-linear-bg-1:#262240] w-20 h-20 relative rounded-xl overflow-hidden border-2 bordered-box-linear-avatar border-transparent"
                >
                    <Image src={user.avatar} alt="User Image" fill />
                </div>
                {loyality.isEnabled && <UserLoyaltyBtnBadge />}
                {/* <div className="flex flex-col justify-between items-center h-full space-y-1">
                    <PrimaryGradientBox
                        className="flex items-center justify-between bg-white-20 rounded-full w-max space-x-1 px-2 py-1"
                        asChild>
                        <Link href="/profile">
                            <span className="text-white font-bold text-sm">
                                1250
                            </span>
                            <CrownIcon className="w-4 h-4 text-white" />
                        </Link>
                    </PrimaryGradientBox>

                    <span className="text-xs font-medium text-white-40 leading-[normal]">
                        Royal Points
                    </span>
                </div> */}
                <Link
                    href="/profile"
                    className="text-xl text-white font-bold text-center hover:text-secondary transition-colors duration-300"
                >
                    {user.email}
                </Link>

                <LogoutButton className="[--bordered-box-linear-bg-1:hsla(var(--color-black-background),95%)]" />
            </div>
            <ProfileNav />
        </div>
    );
};
