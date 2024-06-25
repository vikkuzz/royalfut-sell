import { EUIDialogsNames } from "@royalfut/enums";

import type { TPopupDialogLocableStatusTypes } from "@royalfut/interfaces";

export const PopupDialogLocableStatus: Record<
    EUIDialogsNames,
    TPopupDialogLocableStatusTypes
> = {
    [EUIDialogsNames.WITHDRAW]: {
        status: "unlock",
        type: "default",
    },
};
