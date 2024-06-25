"use client";

import { useCallback, Suspense, lazy } from "react";
import { Dialog } from "@royalfut/ui";
import { SpineIcon } from "@royalfut/icons";
import { usePopupDialogStore } from "@royalfut/store";
import { EUIDialogsNames } from "@royalfut/enums";

const WithdrawDialog = lazy(() => import("./components/WithdrawDialog"));

const Nope = () => <></>;

const renderDialog = (view: EUIDialogsNames | null) => {
    switch (view) {
        case EUIDialogsNames.WITHDRAW:
            return WithdrawDialog;
        default:
            return Nope;
    }
};
const Loader = () => {
    return (
        <Dialog.Content lockable={{ status: "lock", type: "default" }}>
            <div className="center gap-y-3 flex-col rounded-xl px-44 py-36">
                <SpineIcon className="w-10 h-10 animate-spin" />
            </div>
        </Dialog.Content>
    );
};

const PopupDialog = () => {
    const { popup, clear, lockable } = usePopupDialogStore(state => ({
        popup: state.popup,
        clear: state.clear,
        lockable: state.lockable,
    }));

    const handleOpenChange = useCallback(
        (open: boolean) => {
            if (!open) {
                clear();
            }
        },
        [clear]
    );
    const View = renderDialog(popup);

    return (
        <Dialog.Root open={!!popup} onOpenChange={handleOpenChange}>
            <Suspense fallback={<Loader />}>
                <Dialog.Content lockable={lockable}>
                    <View />
                </Dialog.Content>
            </Suspense>
        </Dialog.Root>
    );
};

export default PopupDialog;
