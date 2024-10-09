/* eslint-disable max-lines */
import * as UIPagination from "./Pagination.ui";
import {
    calculateTotalPages,
    getAvailablePaginationActions,
    getVisiblePages,
} from "./tools";

import type { FC } from "react";
import type {
    TPaginationOptions,
    IPaginationProps,
    TKnownPaginationRecords,
    IJumpStrategy,
    IPaginationJumpAvailability,
    TPaginationLinkNavigationMethod,
    IPaginationManualNavigationMethod,
} from "./_types";

const defaultProps: Omit<TPaginationOptions, "records"> = {
    navigation: {
        navigationMethod: "link",
        linkType: "params",
        baseUrl: "/",
        searchParamKey: "p",
    },
};

interface INavLinkProps {
    asLink: true;
    href: string;
}

interface IManualLinkProps {
    asLink: false;
    onClick: () => void;
}

interface IPaginationSteps {
    prev: number;
    next: number;
    begin: number;
    end: number;
    jumpPrev: number;
    jumpNext: number;
}

type TNavProps =
    | {
          asLink: true;
          baseUrl: string;
          props: {
              previous: INavLinkProps;
              next: INavLinkProps;
              begin: INavLinkProps;
              end: INavLinkProps;
              jumpPrev: INavLinkProps;
              jumpNext: INavLinkProps;
          };
      }
    | {
          asLink: false;
          props: {
              previous: IManualLinkProps;
              next: IManualLinkProps;
              begin: IManualLinkProps;
              end: IManualLinkProps;
              jumpPrev: IManualLinkProps;
              jumpNext: IManualLinkProps;
          };
      };

// TODO: Refactoring
const Pagination: FC<IPaginationProps> = ({
    currentPage,
    visiblePagesLimit = 4,
    ...restProps
}) => {
    const props: TPaginationOptions = { ...defaultProps, ...restProps };

    const {
        totalItems,
        itemsPerPage,
        strategy = "standard",
        showEdges = true,
        ...restRecords
    } = props.records as TKnownPaginationRecords;
    const totalPages = calculateTotalPages(totalItems, itemsPerPage);
    const visiblePages = getVisiblePages(
        totalPages,
        currentPage,
        visiblePagesLimit
    );
    const jumpCount =
        (restRecords as IJumpStrategy).jumpCount ?? visiblePagesLimit;
    let jump: IPaginationJumpAvailability = {
        canJumpPrev: false,
        canJumpNext: false,
    };
    if (strategy === "jump") {
        jump = getAvailablePaginationActions(
            currentPage,
            totalPages,
            jumpCount
        );
    }
    const stepActions = getAvailablePaginationActions(
        currentPage,
        totalPages,
        1
    );
    const displayBeginEdge = showEdges ? !visiblePages.includes(1) : false;
    const displayEndEdge = showEdges
        ? !visiblePages.includes(totalPages)
        : false;

    const asLink = props.navigation.navigationMethod === "link";
    const navProps = {
        asLink,
    } as TNavProps;

    const paginationSteps: IPaginationSteps = {
        prev: stepActions.canJumpPrev ? currentPage - 1 : currentPage,
        next: stepActions.canJumpNext ? currentPage + 1 : currentPage,
        begin: 1,
        end: totalPages,
        jumpPrev: jump.canJumpPrev ? currentPage - jumpCount : currentPage,
        jumpNext: jump.canJumpNext ? currentPage + jumpCount : currentPage,
    };

    if (navProps.asLink) {
        const restNavProps =
            props.navigation as TPaginationLinkNavigationMethod;
        let url = "";
        if (restNavProps.linkType === "params") {
            url = `${restNavProps.baseUrl}/?${restNavProps.searchParamKey}=`;
        } else if (restNavProps.linkType === "url") {
            url = `${restNavProps.baseUrl}/`;
        }
        navProps.baseUrl = url;

        navProps.props = {
            previous: {
                asLink: true,
                href: `${url}${paginationSteps.prev}`,
            },
            next: {
                asLink: true,
                href: `${url}${paginationSteps.next}`,
            },
            begin: {
                asLink: true,
                href: `${url}${paginationSteps.begin}`,
            },
            end: {
                asLink: true,
                href: `${url}${paginationSteps.end}`,
            },
            jumpPrev: {
                asLink: true,
                href: `${url}${paginationSteps.jumpPrev}`,
            },
            jumpNext: {
                asLink: true,
                href: `${url}${paginationSteps.jumpNext}`,
            },
        };
    } else {
        const restNavProps =
            props.navigation as IPaginationManualNavigationMethod;

        navProps.props = {
            previous: {
                asLink: false,
                onClick: () =>
                    restNavProps.onPageChange(
                        paginationSteps.prev,
                        currentPage
                    ),
            },
            next: {
                asLink: false,
                onClick: () =>
                    restNavProps.onPageChange(
                        paginationSteps.next,
                        currentPage
                    ),
            },
            begin: {
                asLink: false,
                onClick: () =>
                    restNavProps.onPageChange(
                        paginationSteps.begin,
                        currentPage
                    ),
            },
            end: {
                asLink: false,
                onClick: () =>
                    restNavProps.onPageChange(paginationSteps.end, currentPage),
            },
            jumpPrev: {
                asLink: false,
                onClick: () =>
                    restNavProps.onPageChange(
                        paginationSteps.jumpPrev,
                        currentPage
                    ),
            },
            jumpNext: {
                asLink: false,
                onClick: () =>
                    restNavProps.onPageChange(
                        paginationSteps.jumpNext,
                        currentPage
                    ),
            },
        };
    }

    return (
        <UIPagination.Root>
            <UIPagination.Content>
                <UIPagination.Item>
                    <UIPagination.Previous
                        {...navProps.props.previous}
                        disabled={!stepActions.canJumpPrev}
                    />
                </UIPagination.Item>
                {displayBeginEdge && (
                    <UIPagination.Item>
                        <UIPagination.Navigator {...navProps.props.begin}>
                            1
                        </UIPagination.Navigator>
                    </UIPagination.Item>
                )}
                {jump.canJumpPrev && (
                    <UIPagination.Item>
                        <UIPagination.Ellipsis
                            {...navProps.props.jumpPrev}
                            direction="prev"
                        />
                    </UIPagination.Item>
                )}
                {visiblePages.map(page => {
                    const pageProps = navProps.asLink
                        ? {
                              asLink: true,
                              href: `${navProps.baseUrl}${page}`,
                          }
                        : ({
                              asLink: false,
                              onClick: () =>
                                  (
                                      props.navigation as IPaginationManualNavigationMethod
                                  ).onPageChange(page, currentPage),
                          } as IManualLinkProps);

                    return (
                        <UIPagination.Item key={page}>
                            <UIPagination.Navigator
                                {...pageProps}
                                isActive={page === currentPage}>
                                {page}
                            </UIPagination.Navigator>
                        </UIPagination.Item>
                    );
                })}
                {jump.canJumpNext && (
                    <UIPagination.Item>
                        <UIPagination.Ellipsis
                            {...navProps.props.jumpNext}
                            direction="next"
                        />
                    </UIPagination.Item>
                )}
                {displayEndEdge && (
                    <UIPagination.Item>
                        <UIPagination.Navigator {...navProps.props.end}>
                            {totalPages}
                        </UIPagination.Navigator>
                    </UIPagination.Item>
                )}
                <UIPagination.Item>
                    <UIPagination.Next
                        {...navProps.props.next}
                        disabled={!stepActions.canJumpNext}
                    />
                </UIPagination.Item>
            </UIPagination.Content>
        </UIPagination.Root>
    );
};

export default Pagination;
