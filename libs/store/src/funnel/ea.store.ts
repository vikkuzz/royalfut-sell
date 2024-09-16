import { create } from "zustand";

import type { IBackupCodeEntity } from "@royalfut/interfaces";

export interface ITransferEAAccountState {
    login: string;
    password: string;
    isFilled: boolean;
    backups: Array<IBackupCodeEntity>;
}

interface ITransferEAAccountActions {
    setLogin: (value: string) => void;
    setPassword: (value: string) => void;
    setBackups: (code: IBackupCodeEntity, method?: "push" | "pulloff") => void;
    reset: () => void;
}

export type TransferEAAccountStore = ITransferEAAccountState &
    ITransferEAAccountActions;

const initialTransferEAAccountStore: ITransferEAAccountState = {
    login: "",
    password: "",
    isFilled: false,
    backups: [],
};

export const useTransferEAAccountStore = create<TransferEAAccountStore>(
    (set) => ({
        ...initialTransferEAAccountStore,
        setLogin: (value) =>
            set((state) => {
                let isFilled = state.isFilled;

                if (value.length > 0 && state.password.length > 0) {
                    isFilled = true;
                } else {
                    isFilled = false;
                }

                return {
                    login: value,
                    isFilled,
                };
            }),
        setPassword: (value) =>
            set((state) => {
                let isFilled = state.isFilled;

                if (state.login.length > 0 && value.length > 0) {
                    isFilled = true;
                } else {
                    isFilled = false;
                }

                return { password: value, isFilled };
            }),
        setBackups: (code, method = "push") =>
            set((state) => {
                if (method === "push") {
                    return {
                        backups: [...state.backups, code],
                    };
                } else if (method === "pulloff") {
                    return {
                        backups: state.backups.filter(
                            (item) => item.id !== code.id,
                        ),
                    };
                }

                return {};
            }),
        reset: () => set(initialTransferEAAccountStore),
    }),
);
