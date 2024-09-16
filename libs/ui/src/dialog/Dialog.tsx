"use client";

import { forwardRef, useCallback } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { XIcon } from "@royalfut/icons";
import { cn } from "@royalfut/utils";

import type {
    ElementRef,
    ComponentPropsWithoutRef,
    HTMLAttributes,
} from "react";
import type {
    TPopupDialogLocableStatusTypes,
    FNCN,
} from "@royalfut/interfaces";

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogClose = DialogPrimitive.Close;

const DialogPortal: FNCN<DialogPrimitive.DialogPortalProps> = ({
    className,
    children,
    ...props
}) => (
    <DialogPrimitive.Portal {...props}>
        <div
            className={cn(
                "fixed inset-0 z-50 flex items-start justify-center sm:items-center",
                className,
            )}
        >
            {children}
        </div>
    </DialogPrimitive.Portal>
);
DialogPortal.displayName = DialogPrimitive.Portal.displayName;

const DialogOverlay = forwardRef<
    ElementRef<typeof DialogPrimitive.Overlay>,
    ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
    <DialogPrimitive.Overlay
        ref={ref}
        className={cn(
            "fixed inset-0 z-50 bg-[hsla(var(--color-black-background),80%)] backdrop-blur-sm transition-all duration-1000 data-[state=closed]:animate-out data-[state=open]:animate-in",
            className,
        )}
        {...props}
    />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = forwardRef<
    ElementRef<typeof DialogPrimitive.Content>,
    ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
        lockable?: TPopupDialogLocableStatusTypes;
        withOverlay?: boolean;
    }
>(
    (
        {
            className,
            children,
            onPointerDownOutside: _onPointerDownOutside,
            onEscapeKeyDown: _onEscapeKeyDown,
            withOverlay = true,
            lockable = { status: "unlock", type: "default" },
            ...props
        },
        ref,
    ) => {
        const onPointerDownOutside = useCallback<
            NonNullable<
                DialogPrimitive.DialogContentProps["onPointerDownOutside"]
            >
        >(
            (e) => {
                if (lockable.status === "lock") {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    e.stopPropagation();
                }
                if (_onPointerDownOutside) _onPointerDownOutside(e);
            },
            [_onPointerDownOutside, lockable],
        );

        const onEscapeKeyDown = useCallback<
            NonNullable<DialogPrimitive.DialogContentProps["onEscapeKeyDown"]>
        >(
            (e) => {
                if (lockable.status === "lock") {
                    e.preventDefault();
                    e.stopPropagation();
                    e.stopImmediatePropagation();
                }
                if (_onEscapeKeyDown) _onEscapeKeyDown(e);
            },
            [_onEscapeKeyDown, lockable],
        );

        return (
            <DialogPortal>
                {withOverlay ? <DialogOverlay /> : null}
                <DialogPrimitive.Content
                    ref={ref}
                    className={cn(
                        "fixed z-50 grid w-max top-1/2 -translate-y-1/2 gap-4 animate-in data-[state=open]:fade-in-90 zoom-in-90 data-[state=open]:slide-in-from-bottom-0",
                        "focus-visible:outline-none",
                        className,
                    )}
                    onPointerDownOutside={onPointerDownOutside}
                    onEscapeKeyDown={onEscapeKeyDown}
                    {...props}
                >
                    {children}
                    {lockable.status === "lock" ||
                    lockable.type === "custom" ? null : (
                        <DialogClose className="absolute w-8 h-8 bg-white-10 rounded-full flex justify-center items-center right-4 top-4 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus-withing:outline-none focus:ring-white-20 focus:ring-offset-0 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                            <XIcon className="h-4 w-4 text-white" />
                            <span className="sr-only">Close</span>
                        </DialogClose>
                    )}
                </DialogPrimitive.Content>
            </DialogPortal>
        );
    },
);
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({
    className,
    ...props
}: HTMLAttributes<HTMLDivElement>) => (
    <div
        className={cn(
            "flex flex-col space-y-1.5 text-center sm:text-left",
            className,
        )}
        {...props}
    />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({
    className,
    ...props
}: HTMLAttributes<HTMLDivElement>) => (
    <div
        className={cn(
            "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
            className,
        )}
        {...props}
    />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = forwardRef<
    ElementRef<typeof DialogPrimitive.Title>,
    ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
    <DialogPrimitive.Title
        ref={ref}
        className={cn(
            "text-lg font-semibold leading-none tracking-tight",
            className,
        )}
        {...props}
    />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = forwardRef<
    ElementRef<typeof DialogPrimitive.Description>,
    ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
    <DialogPrimitive.Description
        ref={ref}
        className={cn("text-sm text-muted-foreground", className)}
        {...props}
    />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export default {
    Root: Dialog,
    Trigger: DialogTrigger,
    Content: DialogContent,
    Header: DialogHeader,
    Footer: DialogFooter,
    Close: DialogClose,
    Title: DialogTitle,
    Description: DialogDescription,
};
