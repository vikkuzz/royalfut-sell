import { create } from "zustand";
import { EUIDialogsNames } from "@royalfut/enums";
import { PopupDialogLocableStatus } from "@royalfut/collections";

import type {
    IPopupDialogStateValuesMap,
    TPopupDialogLocableStatusTypes,
} from "@royalfut/interfaces";

interface IBasePopupDialogStore {
    clear: () => void;
    setPopup: (popup: EUIDialogsNames) => void;
}

export interface IPopupDialogStore<T extends EUIDialogsNames>
    extends IBasePopupDialogStore {
    popup: T | null;
    value: IPopupDialogStateValuesMap[T] | null;
    lockable: TPopupDialogLocableStatusTypes;
    setLockable: (lockable: TPopupDialogLocableStatusTypes) => void;
    setPopupValue: <E extends EUIDialogsNames = T>(
        value: IPopupDialogStateValuesMap[E] | null
    ) => void;
}

export interface IPopupDialogStoreMap {
    [EUIDialogsNames.WITHDRAW]: IPopupDialogStore<EUIDialogsNames.WITHDRAW>;
}

export type PopupDialogsStore = IPopupDialogStoreMap[EUIDialogsNames.WITHDRAW];

const determinePopupLocableStatus = (
    name: EUIDialogsNames
): TPopupDialogLocableStatusTypes => {
    const status = PopupDialogLocableStatus[name];

    if (!status)
        return {
            status: "unlock",
            type: "default",
        };

    return status;
};

const initialPopupDialogsStore = {
    popup: null,
    lockable: {
        status: "unlock",
        type: "default",
    },
    value: null,
};

export const usePopupDialogStore = create<PopupDialogsStore>(
    set =>
        ({
            ...initialPopupDialogsStore,
            setPopup: popup =>
                set({ popup, lockable: determinePopupLocableStatus(popup) }),
            setLockable: (lockable: TPopupDialogLocableStatusTypes) =>
                set({ lockable }),
            setPopupValue: value => set({ value }),
            clear: () => set(initialPopupDialogsStore as PopupDialogsStore),
        }) as PopupDialogsStore
);
