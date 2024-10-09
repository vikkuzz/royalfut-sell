/* eslint-disable max-lines */

"use client";

import { useCallback, useState, useMemo } from "react";
import { Root, Field, Control } from "@radix-ui/react-form";
import { useForm } from "react-hook-form";
import { checkPromo } from "@royalfut/actions";
import { CInput, ErrorCollapsibleText, Button } from "@royalfut/ui";
import { useTransferSelectorStore } from "@royalfut/store";
import {
    CouponIcon,
    CheckVIcon,
    XIcon,
    ErrorRoundedFillIcon,
} from "@royalfut/icons";
import { cn } from "@royalfut/utils";

import type { FC } from "react";

const enum EStatusErrorResLabels {
    SERVER_ERROR = "server error",
    NOT_FOUND = "promocode not found",
    EXPIRED_CODE = "promocode is expired",
    EXCEED_QUANTITY = "promocode exceed quantity usage",
    MIN_ORDERS_NOT_APPLICABLE = "min order coins sum not applicable for promocode",
}

const labelStatusesMap: Record<EStatusErrorResLabels, string> = {
    [EStatusErrorResLabels.SERVER_ERROR]: "Something went wrong, please again",
    [EStatusErrorResLabels.NOT_FOUND]: "Promo code not found",
    [EStatusErrorResLabels.EXPIRED_CODE]: "Promo code is expired",
    [EStatusErrorResLabels.EXCEED_QUANTITY]: "Promocode exceed quantity usage",
    [EStatusErrorResLabels.MIN_ORDERS_NOT_APPLICABLE]:
        "Min order coins sum not applicable",
};

const cnInput =
    "text-xs pl-8 pr-4 py-1.5 font-medium text-white relative w-full h-full inline-flex justify-start items-center ";

interface ICouponSchema {
    coupon: string;
}

type TStatus = "failed" | "success";

const CouponForm = () => {
    const use = useTransferSelectorStore.use;
    const coinUT = use.coinUT();
    const discount = use.bonuses().coupon?.value;
    const setBonuses = use.setBonuses();
    const [isActive, setIsActive] = useState(false);
    const [loading, setLoading] = useState(false);
    const [editable, setEditable] = useState(true);
    const [failedMsg, setFailedMsg] = useState("");
    const [status, setStatus] = useState<TStatus | null>(null);
    const { register, handleSubmit, watch, reset, setFocus } =
        useForm<ICouponSchema>({
            mode: "onChange",
            shouldFocusError: true,
        });
    const { coupon } = watch();

    const isFormatCouponValid = useMemo(() => coupon?.length >= 3, [coupon]);

    const onSubmit = handleSubmit(async (data: ICouponSchema) => {
        setLoading(true);
        setEditable(false);

        try {
            const res = await checkPromo(data.coupon, coinUT);
            if (!res) {
                throw new Error(EStatusErrorResLabels.SERVER_ERROR);
            }

            if (res?.error && res.error.length !== 0) {
                throw new Error(res.error);
            }

            setBonuses("coupon", {
                type: "perc",
                value: res.discount,
                code: data.coupon,
            });
            setStatus("success");
        } catch (e) {
            setStatus("failed");
            const err = e as Error;
            const msg =
                labelStatusesMap[
                    err.message.toLowerCase() as EStatusErrorResLabels
                ];
            setFailedMsg(msg);
        } finally {
            setLoading(false);
        }
    });

    const onReset = useCallback(() => {
        reset();
        setStatus(null);
        setIsActive(true);
        setEditable(true);
        setLoading(false);
        setFocus("coupon");
        setBonuses("coupon", null);
        setFailedMsg("");
    }, [reset, setBonuses, setFocus]);

    return (
        <Root className="flex flex-col" onSubmit={onSubmit}>
            <Field name="coupon">
                <CInput.Root
                    data-active={isActive || isFormatCouponValid}
                    data-editable={editable}
                    className={cn(
                        "h-10 sm:h-9 w-full relative inline-flex items-center justify-center z-[1]",
                        {
                            "[--input-background:var(--color-white-10)]":
                                !editable,
                        }
                    )}>
                    <CInput.Frame bordered={editable}>
                        <div className="w-full h-full pointer-events-none flex justify-between absolute top-0 left-0 z-[1]">
                            {!status && (
                                <WithoutStatusEdges
                                    isValid={isFormatCouponValid}
                                    loading={loading}
                                />
                            )}

                            {!!status && (
                                <WithStatusEdges
                                    status={status}
                                    onReset={onReset}
                                />
                            )}
                        </div>
                    </CInput.Frame>
                    {editable ? (
                        <Control asChild>
                            <CInput.Comp
                                {...register("coupon", {
                                    onBlur: () => setIsActive(false),
                                })}
                                required
                                placeholder="Have a coupon?"
                                onFocus={() => setIsActive(true)}
                                borderType="box"
                                // initialValue=""
                                vtype="primary"
                                className={cn(
                                    "placeholder:text-white-40 focus:outline-none",
                                    cnInput
                                )}
                            />
                        </Control>
                    ) : (
                        <span
                            className={cn(
                                "bg-transparent border border-transparent mt-px",
                                cnInput,
                                {
                                    "text-white-40": loading,
                                    "text-system-success": status === "success",
                                    "text-system-error": status === "failed",
                                }
                            )}>
                            {status === "success" && discount
                                ? `${coupon} (${discount}%)`
                                : coupon}
                        </span>
                    )}
                </CInput.Root>
                <ErrorCollapsibleText show={status === "failed"}>
                    {failedMsg}
                </ErrorCollapsibleText>
            </Field>
        </Root>
    );
};

const WithoutStatusEdges: FC<{ isValid: boolean; loading: boolean }> = ({
    loading,
    isValid,
}) => {
    return (
        <>
            <CInput.Icon
                className={cn(
                    "pointer-events-none left-1 transition-colors duration-200",
                    {
                        "text-white-40": loading,
                        "group-data-[active=true]:text-white-60 group-data-[active=false]:text-white-40":
                            !loading,
                    }
                )}>
                <CouponIcon />
            </CInput.Icon>
            {isValid && (
                <Button
                    type="submit"
                    loading={loading}
                    className={cn(
                        "rounded text-xs h-[80%] right-1 top-1/2 -translate-y-1/2 z-[2] font-semibold text-white",
                        {
                            "bg-transparent px-0": loading,
                            "px-3 bg-white-10 hover:bg-white-20": !loading,
                        }
                    )}>
                    Apply
                </Button>
            )}
        </>
    );
};

const WithStatusEdges: FC<{ status: TStatus; onReset: () => void }> = ({
    status,
    onReset,
}) => {
    return (
        <>
            <CInput.Icon
                className={cn("center w-4 h-4 left-1 rounded-full", {
                    "bg-system-success": status === "success",
                    "text-system-error": status === "failed",
                })}>
                <div>
                    {status === "success" && (
                        <CheckVIcon className="w-2 h-2 text-white" />
                    )}
                    {status === "failed" && (
                        <ErrorRoundedFillIcon className="w-full h-full" />
                    )}
                </div>
            </CInput.Icon>
            <Button
                type="button"
                className="h-[80%] right-3 top-1/2 -translate-y-1/2 z-[2]"
                onClick={onReset}>
                <XIcon className="w-5 h-5 text-white" />
            </Button>
        </>
    );
};

export default CouponForm;
