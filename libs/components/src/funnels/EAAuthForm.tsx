// prettier-ignore
"use client";

import { Root, Field, Control } from "@radix-ui/react-form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input, Label, ErrorCollapsibleText } from "@royalfut/ui";
import { useTransferEAAccountStore } from "@royalfut/store";
import { useToggle, useUnmount, useUpdate } from "@lilib/hooks";
import { EAMonocolorIcon } from "@royalfut/icons";
import { Label as RadixFormLabel } from "@radix-ui/react-form";
import { ZEmailValidation, ZEAPasswordValidation } from "@royalfut/scheme";
import { OrderBoxTitle } from "./TradeSummary.client";
import PasswordIcons from "./ea-account/PasswordIcons";
import BackupCodesField from "./ea-account/BackupCodesField";

import { useEffect, type FC } from "react";
import type { UseFormGetFieldState } from "react-hook-form";

const profileFormSchema = z.object({
    email: ZEmailValidation,
    password: ZEAPasswordValidation,
});
type ProfileSchema = z.infer<typeof profileFormSchema>;

type ValidationInputType = "error" | "success" | "primary";

const onTouchValidation = (
    fieldState: ReturnType<UseFormGetFieldState<ProfileSchema>>
): { inputType: ValidationInputType; msg?: string; invalid: boolean } => {
    const { invalid, isDirty, isTouched, error } = fieldState;

    if (!isTouched || !isDirty) {
        return { inputType: "primary", msg: error?.message, invalid };
    }

    if (invalid) {
        return { inputType: "error", msg: error?.message, invalid };
    }

    return { inputType: "success", msg: error?.message, invalid };
};

interface IEAAuthFormProps {
    onValid?: () => void;
    onInvalid?: () => void;
}

const EAAuthForm: FC<IEAAuthFormProps> = ({ onValid, onInvalid }) => {
    const { setLogin, login, setPassword, password, reset } =
        useTransferEAAccountStore();
    const [showPassword, { toggle: setShowPassword }] = useToggle(false);
    const {
        register,
        getValues,
        // NOTE: Do not remove unused vars
        // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
        formState: { dirtyFields, errors, isValid, validatingFields },
        getFieldState,
    } = useForm<ProfileSchema>({
        resolver: zodResolver(profileFormSchema),
        mode: "onTouched",
        shouldFocusError: false,
    });
    const emailVerification = onTouchValidation(getFieldState("email"));
    const passwordVerification = onTouchValidation(getFieldState("password"));

    useUpdate(() => {
        if (isValid) {
            onValid?.();
        } else {
            reset();
            onInvalid?.();
        }
    }, [isValid]);

    useUnmount(() => {
        if (isValid) {
            const values = getValues();
            setPassword(values.password);
            setLogin(values.email);
        }
    });

    useEffect(() => {
        const values = getValues();
        setPassword(values.password);
        setLogin(values.email);
    }, [isValid, getValues, setLogin, setPassword ])

    return (
        <Root className="flex flex-col space-y-6">
            <Field name="email">
                <OrderBoxTitle asChild>
                    <Label asChild>
                        <RadixFormLabel>
                            EA account email address
                        </RadixFormLabel>
                    </Label>
                </OrderBoxTitle>
                <Control asChild>
                    <Input
                        {...register("email")}
                        required
                        placeholder="Login"
                        autoComplete={isValid ? "email" : "off"}
                        initialValue={login}
                        icon={{
                            "<>": EAMonocolorIcon,
                            props: {
                                centered: true,
                                className:
                                    "h-6 w-6 text-white-60 left-1 pointer-events-none",
                            },
                        }}
                        borderType="box"
                        vtype={emailVerification.inputType}
                        cnBox="h-14 sm:h-12 w-full relative group inline-flex items-center justify-center z-[1]"
                        type="email"
                        className="text-xs pl-12 pr-4 font-medium"
                    />
                </Control>
                <ErrorCollapsibleText
                    show={emailVerification.inputType === "error"}>
                    {emailVerification.msg}
                </ErrorCollapsibleText>
            </Field>
            <Field name="password">
                <OrderBoxTitle asChild>
                    <Label asChild>
                        <RadixFormLabel>EA account password</RadixFormLabel>
                    </Label>
                </OrderBoxTitle>
                <Control asChild>
                    <Input
                        {...register("password")}
                        required
                        placeholder="Password"
                        initialValue={password}
                        icon={{
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-expect-error
                            "<>": PasswordIcons,
                            props: {
                                centered: true,
                                onClick: setShowPassword.bind(null, undefined),
                            },
                        }}
                        autoComplete={isValid ? "current-password" : "off"}
                        borderType="box"
                        vtype={passwordVerification.inputType}
                        cnBox="h-14 sm:h-12 w-full relative group inline-flex items-center justify-center z-[1]"
                        type={showPassword ? "text" : "password"}
                        className="text-xs pl-12 pr-4 font-medium"
                    />
                </Control>
                <ErrorCollapsibleText
                    show={passwordVerification.inputType === "error"}>
                    {passwordVerification.msg}
                </ErrorCollapsibleText>
            </Field>
            <Field className="flex flex-col" name="backup_codes">
                <OrderBoxTitle asChild>
                    <Label asChild>
                        <RadixFormLabel>EA account backup codes</RadixFormLabel>
                    </Label>
                </OrderBoxTitle>
                <BackupCodesField />
            </Field>
        </Root>
    );
};

export default EAAuthForm;
