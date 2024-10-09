import { EUIDialogsNames } from "@royalfut/enums";

interface IPopupDialogLocableStatus {
    status: "lock" | "unlock";
    type: "default";
}

export const PopupDialogLocableStatus: Record<
    EUIDialogsNames,
    IPopupDialogLocableStatus
> = {
    [EUIDialogsNames.WITHDRAW]: {
        status: "unlock",
        type: "default",
    },
    [EUIDialogsNames.WITHDRAW_SUCCESS]: {
        status: "lock",
        type: "default",
    },
    [EUIDialogsNames.WITHDRAW_FILED]: {
        status: "lock",
        type: "default",
    },
    [EUIDialogsNames.ROYAL_POINTS]: {
        status: "unlock",
        type: "default",
    },
    [EUIDialogsNames.SPONSOR_REDIRECT]: {
        status: "unlock",
        type: "default",
    },
    [EUIDialogsNames.CHOOSE_AVATAR]: {
        status: "unlock",
        type: "default",
    },
    [EUIDialogsNames.COIN_CALCULATION]: {
        status: "unlock",
        type: "default",
    },
};
