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
        type: "default"
    },
    [EUIDialogsNames.WITHDRAW_FILED]: {
        status: "lock",
        type: "default"
    }
};