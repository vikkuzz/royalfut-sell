import type { PropsWithChildren, FC } from "react";

export type PropsWithClassName<P = unknown> = P & { className?: string };
export type PropsWithCNAndChildren<P = unknown> = PropsWithChildren<
    PropsWithClassName<P>
>;
export type FNCN<P = unknown> = FC<PropsWithClassName<P>>;
export type FNCNChildren<P = unknown> = FC<PropsWithCNAndChildren<P>>;
