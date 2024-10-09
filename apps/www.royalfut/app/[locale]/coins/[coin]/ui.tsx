import { cn } from "@royalfut/utils";

import type { FC, PropsWithChildren } from "react";
import type { FNCNChildren } from "@royalfut/interfaces";

export const NoticePanel: FC<PropsWithChildren> = ({ children }) => {
    return (
        <p className="rounded-2xl my-8 leading-tight border-l border-secondary border-r text-white py-4 px-6 font-bold text-xl bg-white-5">
            {children}
        </p>
    );
};

export const PurchaseGuaranteesCard: FNCNChildren<{ title: string }> = ({
    title,
    children,
    className,
}) => {
    return (
        <div
            className={cn(
                "py-8 px-7 gap-4 flex flex-row sm:flex-col justify-center items-center bg-black-2 rounded-2xl basis-full sm:basis-1/3 flex-grow",
                className
            )}>
            {children}
            <span className="font-medium text-lg sm:text-base leading-snug text-left sm:text-center capitalize text-inherit w-56 sm:w-auto">
                {title}
            </span>
        </div>
    );
};
