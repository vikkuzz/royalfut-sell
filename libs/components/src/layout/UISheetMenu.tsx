"use client";

import { Sheet } from "@royalfut/ui";
import { useUISheetStore, useAuthStore } from "@royalfut/store";
import { MenuBurgerIcon } from "@royalfut/icons";
import {
    LoginMenuTriggerButton,
    UserMenuTriggerButton,
} from "./menu/TriggerButton";
import { AuthMenuContent, UserMenuContent } from "./menu/MenuContent";
import { DividerMenu } from "./menu/Divider";
import { CurrencyPickerHover } from "../ccy";
import NavigationLinks from "./Nav";

import styles from "./menu/Divider.module.scss";

const UISheetMenu = () => {
    const { isOpen, setOpen } = useUISheetStore();
    const { isLoggedIn } = useAuthStore(state => ({
        isLoggedIn: state.isLoggedIn,
    }));

    return (
        <Sheet.Root open={isOpen} onOpenChange={setOpen}>
            {isLoggedIn ? (
                <UserMenuTriggerButton />
            ) : (
                <LoginMenuTriggerButton />
            )}
            <Sheet.Trigger className="flex sm:hidden w-max h-max">
                <MenuBurgerIcon className="w-8 h-8 text-white pointer-events-auto" />
            </Sheet.Trigger>
            <Sheet.Content className="w-full max-w-[448px] sm:w-loginSheet flex flex-col justify-between backdrop-blur-3xl px-14 pt-32">
                <Sheet.Header className="flex sm:hidden absolute top-11 left-14">
                    <CurrencyPickerHover className="space-x-3" />
                </Sheet.Header>
                <div className="h-full w-full">
                    {isLoggedIn ? <UserMenuContent /> : <AuthMenuContent />}
                </div>
                <Sheet.Footer className="relative flex mb-16 sm:hidden">
                    <div className="absolute -top-8 w-full">
                        <DividerMenu label="Menu" className={styles.lineMenu} />
                    </div>
                    <NavigationLinks />
                </Sheet.Footer>
            </Sheet.Content>
        </Sheet.Root>
    );
};

export default UISheetMenu;
