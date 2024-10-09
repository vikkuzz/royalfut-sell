import { Link as NextLink } from "../navs";
import { cn } from "@royalfut/utils";

import type { FC, ComponentPropsWithoutRef } from "react";
import type { FNCNChildren } from "@royalfut/interfaces";
import type { LinkProps } from "next/link";

const textSizeClasses = "text-base font-medium";

type ProseProps = FNCNChildren<{ id: string }> & {
    Paragraph: FNCNChildren;
    Anchor: FNCNChildren<LinkProps & ComponentPropsWithoutRef<"a">>;
    SubProse: FNCNChildren<{ id: string }>;
    Strong: FNCNChildren<{ id?: string }>;
    MailTo: FC<{ to: string }>;
    List: FC<
        | ({ numerical?: true } & ComponentPropsWithoutRef<"ol">)
        | ({ numerical?: false } & ComponentPropsWithoutRef<"ul">)
    >;
    ListItem: FNCNChildren<{ to?: string }>;
};

const Prose: ProseProps = ({ children, className, id }) => {
    return (
        <h2 className={className} id={id}>
            {children}
        </h2>
    );
};

Prose.Paragraph = ({ children, className }) => {
    return (
        <p className={cn(textSizeClasses, "text-white-65", className)}>
            {children}
        </p>
    );
};

Prose.Paragraph.displayName = "ProseParagraph";

Prose.Anchor = ({ children, className, ...props }) => {
    return (
        <NextLink className={cn(textSizeClasses, className)} {...props}>
            {children}
        </NextLink>
    );
};

Prose.Anchor.displayName = "ProseAnchor";

Prose.SubProse = ({ children, id, className }) => {
    return (
        <h3 className={cn(className)} id={id}>
            {children}
        </h3>
    );
};

Prose.SubProse.displayName = "ProseSubProse";

Prose.Strong = ({ children, id, className }) => {
    return (
        <strong
            id={id}
            className={cn(textSizeClasses, "font-bold text-white", className)}>
            {children}
        </strong>
    );
};

Prose.Strong.displayName = "ProseStrong";

Prose.MailTo = ({ to }) => {
    return (
        <Prose.Anchor target="_blank" href={`mailto:${to}`}>
            {to}
        </Prose.Anchor>
    );
};

Prose.MailTo.displayName = "ProseMailTo";

Prose.List = ({ children, className, numerical = false, ...props }) => {
    const Comp = numerical ? "ol" : "ul";
    return (
        <Comp className={cn(textSizeClasses, className)} {...props}>
            {children}
        </Comp>
    );
};

Prose.List.displayName = "ProseList";

Prose.ListItem = ({ to, children, className }) => {
    return (
        <li
            className={cn(
                textSizeClasses,
                "my-2 first:mt-0 last:mb-0 text-white-65",
                className
            )}>
            {to ? <Prose.Anchor href={to}>{children}</Prose.Anchor> : children}
        </li>
    );
};

Prose.ListItem.displayName = "ProseListItem";

export default Prose;
