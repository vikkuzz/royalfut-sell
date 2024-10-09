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
    [EUIDialogsNames.ROYAL_POINTS]: PopupDialogStateValues<never>;
    [EUIDialogsNames.SPONSOR_REDIRECT]: PopupDialogStateValues<{ url: string }>;
    [EUIDialogsNames.CHOOSE_AVATAR]: PopupDialogStateValues<never>;
    [EUIDialogsNames.COIN_CALCULATION]: PopupDialogStateValues<never>;
}
