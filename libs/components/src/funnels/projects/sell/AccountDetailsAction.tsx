"use client";

import { useCallback, useEffect, useState } from "react";
import { useI18nRouter } from "@royalfut/hooks";
import {
    useAuthStore,
    useCurrencyStore,
    useOrderStore,
    useOrderTradeStepsStore,
    useTransferEAAccountStore,
    useTransferStore,
    useUISheetStore,
} from "@royalfut/store";
import ActionPairNavigations from "../ActionPairNavigations";
import { getToken } from "@royalfut/actions";
import { updateSellOrder, startSell } from "@royalfut/actions";
import { EOrderProcessingStepIds } from "@royalfut/enums";
import { OrderProcessingStepsInfo } from "@royalfut/collections";

const AccountDetailsAction = () => {
    const isLoggedIn = useAuthStore(state => state.isLoggedIn);
    const { allowRoutes = [] } = useOrderTradeStepsStore(state => ({
        allowRoutes: state.allowSteps,
    }));
    const router = useI18nRouter();
    const { setOpen } = useUISheetStore();
    // const setCompleted = useOrderTradeStepsStore(
    //     state => state.setStepsCompleted
    // );
    const { setStepId } = useOrderTradeStepsStore(state => ({
        setStepId: state.setStepId,
    }));
    const { order } = useOrderStore(state => ({ order: state.order }));
    const token = getToken();
    const platform = useTransferStore(state => state.platform);
    const coinsAmount = useTransferStore(state => state.coinUT);
    const currency = useCurrencyStore(state => state.currency);
    const mail = useTransferEAAccountStore(state => state.login);
    const password = useTransferEAAccountStore(state => state.password);
    const backupCodes = useTransferEAAccountStore(state => state.backups);
    // const st = useTransferEAAccountStore(state => state);

    const [reqt, setReqt] = useState(false);

    const loginAction = useCallback(() => {
        setOpen(true);
    }, [setOpen]);

    // const sellAction = useCallback(
    //     async (routing: () => void) => {
    //         await updateSellOrder(
    //             order?.id,
    //             await token,
    //             platform,
    //             coinsAmount,
    //             currency,
    //             mail,
    //             password,
    //             backupCodes[0].code
    //         );
    //         routing();
    //         setCompleted([EOrderProcessingStepIds.SUMMARY_AND_SELL]);
    //     },
    //     [setCompleted]
    // );
    const req = async () => {
        const modOrder = await updateSellOrder(
            order?.id,
            await token,
            platform,
            coinsAmount,
            currency,
            mail,
            password,
            backupCodes[0].code
        );
        if (modOrder) {
            await startSell(
                modOrder.id,
                await token,
                modOrder.mail,
                modOrder.password,
                modOrder?.backupCode1
            );
        }

        setReqt(true);
        router.push(
            `${OrderProcessingStepsInfo[EOrderProcessingStepIds.SELLER_AWAITING_FOR_DELIVERY].to}`,
            {
                scroll: true,
            }
        );
        setStepId(EOrderProcessingStepIds.SELLER_AWAITING_FOR_DELIVERY, {
            markCurrentStepAsCompleted: true,
        });
    };

    useEffect(() => {
        async function clientReq() {
            await updateSellOrder(
                order?.id,
                await token,
                platform,
                coinsAmount,
                currency,
                mail,
                password,
                backupCodes[0].code
            );
        }
        if (reqt) {
            clientReq();
            setReqt(false);
        }
    }, [
        reqt,
        backupCodes,
        coinsAmount,
        currency,
        mail,
        order?.id,
        password,
        platform,
        token,
    ]);

    return (
        <ActionPairNavigations
            prev={{
                disabled: !allowRoutes.includes(
                    EOrderProcessingStepIds.SELLER_ORDER_INFO
                ),
                id: EOrderProcessingStepIds.SELLER_ORDER_INFO,
                label: "Back",
                classNames: {
                    txt: "mr-3",
                },
            }}
            next={{
                disabled:
                    mail !== "" && password !== "" && backupCodes.length !== 0
                        ? false
                        : true,
                id: EOrderProcessingStepIds.SELLER_AWAITING_FOR_DELIVERY,
                label: isLoggedIn ? "Next" : "Log In",
                onAction: isLoggedIn ? req : loginAction,
                classNames: {
                    txt: "ml-3",
                },
            }}
        />
    );
};

export default AccountDetailsAction;
