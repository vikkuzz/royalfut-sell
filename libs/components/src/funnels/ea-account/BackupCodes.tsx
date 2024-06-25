/* eslint-disable max-lines */
import { forwardRef, useRef, useState, useCallback } from "react";
import { useComposedRef, useClickOutside, useMount } from "@lilib/hooks";
import { InputOTP } from "@royalfut/ui";
import { generateUniqueId, cn } from "@royalfut/utils";
import { useTransferEAAccountStore } from "@royalfut/store";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import BackupBasketBox from "./BackupBasketBox";

import type { ElementRef, ComponentPropsWithoutRef } from "react";
import type { IBackupCodeEntity } from "@royalfut/interfaces";

interface IBackupCodesProps {
    onEmptyBlur?(): void;
}

const BackupCodes = forwardRef<
    ElementRef<"input">,
    ComponentPropsWithoutRef<"input"> & IBackupCodesProps
>(({ className, onEmptyBlur }, externalRef) => {
    const { backups, setBackups } = useTransferEAAccountStore();
    const inputRef = useRef<HTMLInputElement>(null);
    const centerViewrRef = useRef<HTMLDivElement>(null);
    const composedRef = useComposedRef(inputRef, externalRef);
    const [inputValue, setInputValue] = useState<string>("");
    const onForwardFocus = useCallback(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    useMount(() => {
        if (backups.length === 0) {
            onForwardFocus();
        }
    });

    const onChangeInputValue = useCallback((value: string) => {
        setInputValue(value);
        setTimeout(() => {
            centerViewrRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
                inline: "end",
            });
        }, 100);
    }, []);

    const onComplete = useCallback(
        (value: string) => {
            onChangeInputValue("");
            setBackups({ code: value, id: generateUniqueId() });
            setTimeout(() => {
                centerViewrRef.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "nearest",
                    inline: "end",
                });
            }, 100);
        },
        [onChangeInputValue, setBackups]
    );

    const onRemoveBackup = useCallback(
        (code: IBackupCodeEntity) => {
            setBackups(code, "pulloff");
        },
        [setBackups]
    );

    const onBlurInput = useCallback(() => {
        if (inputValue.length === 0 && backups.length === 0) {
            onEmptyBlur?.();
        }
    }, [backups.length, inputValue.length, onEmptyBlur]);

    useClickOutside(inputRef, () => {
        onBlurInput();
    });

    return (
        <div className="w-full h-full flex pointer-events-none">
            <InputOTP.Root
                containerClassName={cn(
                    "w-full h-full pointer-events-[all]",
                    className
                )}
                className={className}
                onComplete={onComplete}
                maxLength={8}
                value={inputValue}
                onChange={onChangeInputValue}
                ref={composedRef}>
                <ScrollArea.Root
                    onClick={onForwardFocus}
                    onFocus={onForwardFocus}
                    type="hover"
                    className="w-full h-full flex">
                    <ScrollArea.Viewport
                        asChild
                        role="scrollbar"
                        id="dataset-table"
                        className="h-full w-max z-[1] !flex pointer-events-auto">
                        <div className="w-max h-full flex pointer-events-auto">
                            {backups.length ? (
                                <div className="relative flex items-center gap-2 mr-2 w-max top-1/2 -translate-y-1/2">
                                    {backups.map(backup => {
                                        return (
                                            <BackupBasketBox
                                                onRemove={onRemoveBackup}
                                                key={backup.id}
                                                {...backup}
                                            />
                                        );
                                    })}
                                </div>
                            ) : null}
                            <div
                                className="flex h-full w-max"
                                ref={centerViewrRef}>
                                <InputOTP.Group
                                    className={cn(
                                        "flex relative items-center h-full border-none flex-none justify-center focus-visible:outline-none",
                                        "space-x-1 pointer-events-none mr-2"
                                    )}>
                                    <InputOTP.Slot
                                        className={cn(
                                            "h-full text-center text-white text-base font-medium leading-normal",
                                            "w-3 after:absolute after:left-1/2 after:pointer-events-none after:w-full after:-translate-x-1/2 after:bottom-1.5 after:h-px after:bg-white-40"
                                        )}
                                        index={0}
                                    />
                                    <InputOTP.Slot
                                        className={cn(
                                            "h-full text-center text-white text-base font-medium leading-normal",
                                            "w-3 after:absolute after:left-1/2 after:pointer-events-none after:w-full after:-translate-x-1/2 after:bottom-1.5 after:h-px after:bg-white-40"
                                        )}
                                        index={1}
                                    />
                                    <InputOTP.Slot
                                        className={cn(
                                            "h-full text-center text-white text-base font-medium leading-normal",
                                            "w-3 after:absolute after:left-1/2 after:pointer-events-none after:w-full after:-translate-x-1/2 after:bottom-1.5 after:h-px after:bg-white-40"
                                        )}
                                        index={2}
                                    />
                                    <InputOTP.Slot
                                        className={cn(
                                            "h-full text-center text-white text-base font-medium leading-normal",
                                            "w-3 after:absolute after:left-1/2 after:pointer-events-none after:w-full after:-translate-x-1/2 after:bottom-1.5 after:h-px after:bg-white-40"
                                        )}
                                        index={3}
                                    />
                                </InputOTP.Group>
                                <InputOTP.Group
                                    className={cn(
                                        "flex relative items-center h-full border-none flex-none justify-center focus-visible:outline-none",
                                        "space-x-1 pointer-events-none"
                                    )}>
                                    <InputOTP.Slot
                                        className={cn(
                                            "h-full text-center text-white text-base font-medium leading-normal",
                                            "w-3 after:absolute after:left-1/2 after:pointer-events-none after:w-full after:-translate-x-1/2 after:bottom-1.5 after:h-px after:bg-white-40"
                                        )}
                                        index={4}
                                    />
                                    <InputOTP.Slot
                                        className={cn(
                                            "h-full text-center text-white text-base font-medium leading-normal",
                                            "w-3 after:absolute after:left-1/2 after:pointer-events-none after:w-full after:-translate-x-1/2 after:bottom-1.5 after:h-px after:bg-white-40"
                                        )}
                                        index={5}
                                    />
                                    <InputOTP.Slot
                                        className={cn(
                                            "h-full text-center text-white text-base font-medium leading-normal",
                                            "w-3 after:absolute after:left-1/2 after:pointer-events-none after:w-full after:-translate-x-1/2 after:bottom-1.5 after:h-px after:bg-white-40"
                                        )}
                                        index={6}
                                    />
                                    <InputOTP.Slot
                                        className={cn(
                                            "h-full text-center text-white text-base font-medium leading-normal",
                                            "w-3 after:absolute after:left-1/2 after:pointer-events-none after:w-full after:-translate-x-1/2 after:bottom-1.5 after:h-px after:bg-white-40"
                                        )}
                                        index={7}
                                    />
                                </InputOTP.Group>
                            </div>
                        </div>
                    </ScrollArea.Viewport>
                    <ScrollArea.Scrollbar
                        className="flex select-none z-[1] cursor-default pointer-events-auto touch-none absolute !-bottom-5 rounded-full w-[90%] mx-auto p-0.5 bg-white-20/30 transition-colors duration-[160ms] ease-out hover:bg-white-40/30 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2"
                        orientation="horizontal">
                        <ScrollArea.Thumb className="flex-1 pointer-events-[all] bg-primary rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-full before:min-h-[0.875rem]" />
                    </ScrollArea.Scrollbar>
                </ScrollArea.Root>
            </InputOTP.Root>
        </div>
    );
});
BackupCodes.displayName = "BackupCodes";

export default BackupCodes;
