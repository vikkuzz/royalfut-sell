import { useState, useCallback } from "react";
import { EAMonocolorIcon, EyeIcon } from "@royalfut/icons";
import { Button } from "@royalfut/ui";
import { cn } from "@royalfut/utils";

import type {
    MouseEventHandler,
    PropsWithoutRef,
    HTMLAttributes,
    ComponentType,
} from "react";

const PasswordIcons: ComponentType<
    PropsWithoutRef<HTMLAttributes<HTMLElement>>
> = ({ className, onClick, ...props }) => {
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword: MouseEventHandler<HTMLButtonElement> =
        useCallback(
            e => {
                e.preventDefault();
                setShowPassword(prev => !prev);
                onClick?.(e);
            },
            [onClick]
        );

    return (
        <div
            className="w-full h-full pointer-events-none flex justify-between absolute top-0 left-0 z-[1]"
            {...props}>
            <EAMonocolorIcon
                className={cn(
                    "h-6 w-6 text-white-60 pointer-events-none left-1",
                    className
                )}
            />
            <Button
                onClick={toggleShowPassword}
                type="button"
                className={cn(
                    "w-max h-max pointer-events-[all] right-7",
                    className
                )}>
                <EyeIcon
                    className="w-6 h-6 text-white"
                    view={showPassword ? "lock" : "open"}
                />
            </Button>
        </div>
    );
};

export default PasswordIcons;
