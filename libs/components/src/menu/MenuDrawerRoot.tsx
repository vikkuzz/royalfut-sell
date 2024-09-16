"use client";

import { Sheet } from "@royalfut/ui";
import {
    useUISheetStore,
    useAuthStore,
    useUIGlobalStore,
} from "@royalfut/store";
import { MenuBurgerIcon } from "@royalfut/icons";
import {
    LoginMenuTriggerButton,
    UserMenuTriggerButton,
} from "./ui/TriggerButton";
import { AuthMenuContent, UserMenuContent } from "./ui/MenuContent";
import { DividerMenu } from "./ui/Divider";
import { LocalePicker } from "./ui/LocalePicker";
import { SheetNavigationItems } from "../layout";
import { UserLoyaltyBtnBadge } from "../user";

import styles from "./ui/Divider.module.scss";

const MenuDrawerRoot = () => {
    const { isOpen, setOpen } = useUISheetStore();
    const [headerNav, loyality] = useUIGlobalStore(state => [
        state.header.nav,
        state.features.loyality,
    ]);
    const { isLoggedIn } = useAuthStore(state => ({
        isLoggedIn: state.isLoggedIn,
    }));

    return (
        <Sheet.Root open={isOpen} onOpenChange={setOpen}>
            {isLoggedIn ? (
                <div className="flex items-center">
                    {loyality.isEnabled && (
                        <UserLoyaltyBtnBadge className="hidden sm:flex mr-4" />
                    )}
                    <UserMenuTriggerButton />
                </div>
            ) : (
                <LoginMenuTriggerButton />
            )}
            <Sheet.Trigger
                aria-label="Open Menu"
                className="flex sm:hidden w-max h-max">
                <MenuBurgerIcon className="w-8 h-8 text-white pointer-events-auto" />
            </Sheet.Trigger>
            <Sheet.Content className="w-full max-w-[448px] sm:w-loginSheet flex flex-col justify-between backdrop-blur-3xl px-14 pt-32">
                <Sheet.Header className="flex sm:hidden absolute top-11 left-14">
                    <LocalePicker />
                </Sheet.Header>
                <div className="h-full w-full">
                    {isLoggedIn ? <UserMenuContent /> : <AuthMenuContent />}
                </div>
                <Sheet.Footer className="relative flex mb-16 sm:hidden">
                    <div className="absolute -top-8 w-full">
                        <DividerMenu label="Menu" className={styles.lineMenu} />
                    </div>
                    <SheetNavigationItems links={headerNav} />
                </Sheet.Footer>
            </Sheet.Content>
        </Sheet.Root>
    );
};

export default MenuDrawerRoot;
