/* eslint-disable */
"use client";
import { ArrowChevronRightIcon } from "@royalfut/icons";
import { cn } from "@royalfut/utils";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Paginator({
    page,
    orders,
    route,
}: {
    page: number;
    orders: any;
    route: string;
}) {
    const [prev, setPrev] = useState("#");
    const [next, setNext] = useState("#");
    const [pages, setPages] = useState([1]);

    useEffect(() => {
        let currentPages = [1];
        for (let i = 2; i <= orders.totalPages; i++) {
            currentPages.push(i);
        }
        setPages(currentPages);
        if (+page >= 2) {
            setPrev(`${route}/${+page - 1}`);
        }
        if (+page < orders.totalPages) {
            setNext(`${route}/${+page + 1}`);
        }
        console.log(orders);
    }, [page, orders]);
    return (
        <div>
            <nav
                aria-label="Pagination"
                className="isolate inline-flex -space-x-px rounded-md shadow-sm gap-1"
            >
                <Link
                    href={prev}
                    className="relative inline-flex items-center w-9 h-9 bg-white/[.1] hover:bg-white/[.2] rounded-xl focus:z-20 focus:outline-offset-0"
                >
                    <span className="sr-only">Previous</span>
                    <ArrowChevronRightIcon className="text-white w-9 h-9 rotate-180" />
                </Link>
                {pages.map((el) => {
                    return (
                        <Link
                            href={`${route}/${el}`}
                            key={el}
                            //aria-current="page"
                            className={cn(
                                "relative z-10 px-2 py-2 w-9 h-9 inline-flex justify-center text-center items-center bg-white/[.1] hover:bg-white/[.2] rounded-xl text-base font-semibold text-white/[.6] focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
                                {
                                    "bg-gradient-to-r from-[#A82DF9] to-[#6678E9]":
                                        +page === el,
                                },
                            )}
                        >
                            {el}
                        </Link>
                    );
                })}

                <Link
                    href={next}
                    className="relative inline-flex items-center w-9 h-9 bg-white/[.1] hover:bg-white/[.2] rounded-xl focus:z-20 focus:outline-offset-0"
                >
                    <span className="sr-only">Next</span>
                    <ArrowChevronRightIcon className="text-white w-9 h-9 group-hover:animate-shake-r-sm group-hover:animate-infinite group-hover:animate-duration-[1300ms] group-hover:animate-ease-linear" />
                </Link>
            </nav>
        </div>
    );
}
