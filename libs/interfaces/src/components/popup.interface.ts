import type { EUIDialogsNames } from "@royalfut/enums";

export type PopupDialogStateValues<V> = V;

export type TPopupDialogLocableStatusTypes =
    | {
          status: "lock";
          type: "default";
      }
    | {
          status: "unlock";
          type: "default" | "custom";
      };

export interface IPopupDialogStateValuesMap {
    [EUIDialogsNames.WITHDRAW]: PopupDialogStateValues<never>;
    [EUIDialogsNames.WITHDRAW_SUCCESS]: PopupDialogStateValues<never>;
    [EUIDialogsNames.WITHDRAW_FILED]: PopupDialogStateValues<never>;
}
