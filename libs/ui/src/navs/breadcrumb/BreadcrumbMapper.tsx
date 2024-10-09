import { Fragment } from "react";
import * as Breadcrumb from "./Breadcrumb";
import { cn } from "@royalfut/utils";

import type { FC } from "react";

interface IBreadcrumbEntity {
    label: string;
    href?: string;
}

interface IBreadcrumbMapperProps {
    crumbs: Array<IBreadcrumbEntity>;
}

const BreadcrumbMapper: FC<IBreadcrumbMapperProps> = ({ crumbs }) => {
    return (
        <Breadcrumb.Root>
            <Breadcrumb.List className="text-base text-[#94949E] font-normal">
                {crumbs.map((item, idx) => {
                    return (
                        <Fragment key={idx}>
                            <Breadcrumb.Item>
                                {item.href && (
                                    <Breadcrumb.Link href={item.href}>
                                        {item.label}
                                    </Breadcrumb.Link>
                                )}
                                {!item.href && (
                                    <Breadcrumb.Page>
                                        {item.label}
                                    </Breadcrumb.Page>
                                )}
                            </Breadcrumb.Item>
                            {idx !== crumbs.length - 1 && (
                                <Breadcrumb.Separator
                                    className={cn({
                                        "text-white-40":
                                            idx === crumbs.length - 2,
                                    })}
                                />
                            )}
                        </Fragment>
                    );
                })}
            </Breadcrumb.List>
        </Breadcrumb.Root>
    );
};

export default BreadcrumbMapper;
