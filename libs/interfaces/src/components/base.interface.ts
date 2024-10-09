import type { PropsWithChildren, FC, ComponentProps } from "react";

export type PropsWithClassName<P = unknown> = P & { className?: string };
export type PropsWithCNAndChildren<P = unknown> = PropsWithChildren<
    PropsWithClassName<P>
>;
export type FNCN<P = unknown> = FC<PropsWithClassName<P>>;
export type FNCNChildren<P = unknown> = FC<PropsWithCNAndChildren<P>>;
export type FCIcon = FC<ComponentProps<"svg">>;
export type TBoxScreenOrientation = "square" | "landscape";
export type TBoxSize = "xs" | "sm" | "md" | "lg";

export interface IBoxInnerProps {
    size?: TBoxSize;
    screen?: TBoxScreenOrientation;
    asSize?: boolean;
    rounded?: boolean;
}
