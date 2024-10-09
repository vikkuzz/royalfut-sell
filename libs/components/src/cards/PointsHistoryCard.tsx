/* eslint-disable max-lines */
"use client";

import { createContext, useContext, useState } from "react";
import { Pagination, PoorTabs } from "@royalfut/ui";
import { LoyaltyPointsBadge } from "../badges";
import { useUpdate } from "@lilib/hooks";
import { ETimePeriod } from "@royalfut/enums";
import { getCoinOrderTransactionData } from "@royalfut/actions";
import { cn, formatDateToMMDDYYYYHHMMSS } from "@royalfut/utils";

import type { FC, PropsWithChildren } from "react";
import type {
    FNCNChildren,
    IAPI,
    ICoinOrderTransactionData,
} from "@royalfut/interfaces";

const enum EFilterTabValueIDs {
    ALL = "all",
    EARNED = "earned",
    SPENT = "spent",
}

const timePeriodLabelMap: Record<ETimePeriod, string> = {
    [ETimePeriod.TODAY]: "Today",
    [ETimePeriod.YESTERDAY]: "Yesterday",
    [ETimePeriod.LAST_WEEK]: "Last Week",
    [ETimePeriod.LAST_MONTH]: "Last Month",
    [ETimePeriod.LAST_YEAR]: "Last Year",
    [ETimePeriod.OLDER]: "Historic",
};

interface IPointsHistoryState {
    page: number;
    totalPages: number;
    orders: Array<ICoinOrderTransactionData>;
    itemsPerPage: number;
    groups: IAPI.WWW.Profile.Order.GET.Response.Body["groups"];
}

interface IPointsHistoryActions {
    setPage: (page: number) => void;
    setTotalPages: (total: number) => void;
}

type TPointsHistoryStoreProviderProps = IPointsHistoryState &
    IPointsHistoryActions;

const PointsHistoryContext =
    createContext<TPointsHistoryStoreProviderProps | null>(null);

interface IHistoryProviderProps {
    totalPages: number;
    orders: Array<ICoinOrderTransactionData>;
    groups: IAPI.WWW.Profile.Order.GET.Response.Body["groups"];
    itemsPerPage: number;
}

const PointsHistoryProvider: FC<PropsWithChildren<IHistoryProviderProps>> = ({
    children,
    ...props
}) => {
    const { value: tabValue } = PoorTabs.use();
    const [totalPages, setTotalPages] = useState(props.totalPages);
    const [page, setPage] = useState(1);
    const [orders, setOrders] = useState(props.orders);
    const [groups, setGroups] = useState(props.groups);
    const [filteredGroups, setFilteredGroups] = useState(props.groups);

    useUpdate(() => {
        const fetchOrders = async () => {
            const transactionOrders = await getCoinOrderTransactionData(
                page,
                props.itemsPerPage
            );

            if (transactionOrders) {
                setOrders(transactionOrders.orders);
                setGroups(transactionOrders.groups);
                setTotalPages(transactionOrders.total);
            }
        };
        fetchOrders();
    }, [page]);

    useUpdate(() => {
        let filtered: typeof groups = {} as typeof groups;

        if (tabValue === EFilterTabValueIDs.ALL) {
            filtered = groups;
        }

        if (tabValue === EFilterTabValueIDs.EARNED) {
            Object.keys(groups).forEach(group => {
                filtered[group as ETimePeriod] = groups[
                    group as ETimePeriod
                ].filter(item => item.cashback !== 0);
            });
        }

        if (tabValue === EFilterTabValueIDs.SPENT) {
            Object.keys(groups).forEach(group => {
                filtered[group as ETimePeriod] = groups[
                    group as ETimePeriod
                ].filter(item => item.cashbackUsed !== 0);
            });
        }

        setFilteredGroups(filtered);
    }, [tabValue, groups]);

    return (
        <PointsHistoryContext.Provider
            value={{
                totalPages,
                groups: filteredGroups,
                setPage,
                setTotalPages,
                itemsPerPage: props.itemsPerPage,
                orders,
                page,
            }}>
            {children}
        </PointsHistoryContext.Provider>
    );
};

const usePointsHistoryContext = () => {
    const context = useContext(PointsHistoryContext);
    if (!context) {
        throw new Error(
            "usePointsHistoryContext must be used within a PointsHistoryProvider"
        );
    }
    return context;
};

const Root: FNCNChildren<IHistoryProviderProps> = ({
    children,
    className,
    groups,
    totalPages,
    orders,
    itemsPerPage,
}) => {
    return (
        <PoorTabs.Provider
            initial={{
                value: EFilterTabValueIDs.ALL,
            }}>
            <PointsHistoryProvider
                groups={groups}
                totalPages={totalPages}
                orders={orders}
                itemsPerPage={itemsPerPage}>
                <div
                    className={cn(
                        "flex flex-col py-10 px-10 bg-black-1 border border-white-10 rounded-xl",
                        className
                    )}>
                    {children}
                </div>
            </PointsHistoryProvider>
        </PoorTabs.Provider>
    );
};

const PointsFilter = () => {
    return (
        <PoorTabs.Root className="sm:w-max">
            <PoorTabs.Item value={EFilterTabValueIDs.ALL}>All</PoorTabs.Item>
            <PoorTabs.Item value={EFilterTabValueIDs.EARNED}>
                Earned
            </PoorTabs.Item>
            <PoorTabs.Item value={EFilterTabValueIDs.SPENT}>
                Spent
            </PoorTabs.Item>
        </PoorTabs.Root>
    );
};

interface ITransactionItemProps {
    id: number;
    date: string;
    status: string;
    cashback: number;
    cashbackUsed: number;
}

const TransactionItem: FC<ITransactionItemProps> = ({
    id,
    date,
    status,
    cashback = 0,
    cashbackUsed = 0,
}) => {
    const hasCashback = cashback > 0 || cashbackUsed > 0;
    const withoutBadge =
        ["error_payment", "waiting_payment"].includes(status) || !hasCashback;

    const isIncreased = cashback > 0;
    const pointsValue = hasCashback
        ? Math.round((cashback || cashbackUsed) * 10)
        : null;

    return (
        <li className="flex justify-between items-start sm:items-center w-full bg-black-dropdown p-4 rounded-xl">
            <div className="flex flex-col gap-1 sm:gap-6 sm:flex-row">
                <span className="text-white text-base font-medium w-32">
                    Order № {id}
                </span>
                <span className="text-white-40 text-base font-medium">
                    {formatDateToMMDDYYYYHHMMSS(date)}
                </span>
            </div>
            {!withoutBadge && (
                <LoyaltyPointsBadge
                    amount={`${isIncreased ? "+" : "-"}${pointsValue}`}
                    size="sm"
                    className="h-max sm:h-full [--bordered-box-linear-bg-1:theme(colors.black.dropdown)]"
                    view={isIncreased ? "bg" : "border"}
                />
            )}
        </li>
    );
};

const TransactionGroup: FC<{
    title: string;
    orders: Array<ICoinOrderTransactionData>;
}> = ({ title, orders }) => {
    return (
        <div className="flex flex-col items-start gap-3 w-full">
            <p className="font-bold text-white-40 text-xl">{title}</p>
            <ul className="flex flex-col gap-3 w-full">
                {orders.map(order => {
                    return (
                        <TransactionItem
                            key={order.id}
                            id={order.id}
                            status={order.status.toLowerCase()}
                            date={order.createdAt}
                            cashback={order.cashback}
                            cashbackUsed={order.cashbackUsed}
                        />
                    );
                })}
            </ul>
        </div>
    );
};

const Body = () => {
    const { groups, orders } = usePointsHistoryContext();

    return (
        <div className="mt-11 flex w-full flex-col gap-7">
            {orders.length === 0 ? (
                <span className="text-white-40 text-center text-2xl font-semibold">
                    No orders to display
                </span>
            ) : (
                Object.keys(groups).map(item => {
                    const orders = groups[item as ETimePeriod];
                    if (orders.length <= 0) return null;

                    const title = timePeriodLabelMap[item as ETimePeriod];

                    return (
                        <TransactionGroup
                            key={item}
                            title={title}
                            orders={orders}
                        />
                    );
                })
            )}
        </div>
    );
};

const Footer = () => {
    const { page, setPage, totalPages, itemsPerPage } =
        usePointsHistoryContext();

    if (totalPages / itemsPerPage <= 1) return null;

    return (
        <div className="flex justify-center mt-10">
            <Pagination
                currentPage={page}
                records={{
                    strategy: "jump",
                    totalItems: totalPages,
                    itemsPerPage,
                }}
                visiblePagesLimit={3}
                navigation={{
                    navigationMethod: "manual",
                    onPageChange: setPage,
                }}
            />
        </div>
    );
};

const Header = () => {
    return (
        <div className="flex w-full gap-4 flex-col justify-start items-start sm:justify-between sm:items-center sm:flex-row">
            <h5 className="text-2xl font-bold text-white">
                ROYAL Points History
            </h5>
            <PointsFilter />
        </div>
    );
};

export { Root, Body, Footer, Header };
