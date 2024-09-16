"use client";
import { ArrowChevronRightIcon } from "@royalfut/icons";
import { cn } from "@royalfut/utils";

export default function PaginatorBlog({
    totalPages,
    page,
    routes,
    prev,
    next,
    goto,
}: {
    totalPages: number;
    page: number;
    routes: Array<string> | undefined;
    prev: (page: number) => void;
    next: (page: number, totalPages: number) => void;
    goto: (route: string) => void;
}) {
    return (
        <div className="w-auto h-auto">
            <nav
                // aria-label="Pagination"
                className="isolate inline-flex -space-x-px rounded-md shadow-sm gap-1 w-auto h-auto"
            >
                <button
                    onClick={() => prev(page)}
                    className="relative inline-flex items-center w-9 h-9 bg-white/[.1] hover:bg-white/[.2] rounded-xl focus:z-20 focus:outline-offset-0"
                >
                    <span className="sr-only">Previous</span>
                    <ArrowChevronRightIcon className="text-white w-9 h-9 rotate-180" />
                </button>
                {routes?.map((route, i) => {
                    return (
                        <button
                            onClick={() => goto(String(i + 1))}
                            key={route}
                            className={cn(
                                "relative z-10 px-2 py-2 w-9 h-9 inline-flex justify-center text-center items-center bg-white/[.1] hover:bg-white/[.2] rounded-xl text-base font-semibold text-white/[.6] focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
                                {
                                    "bg-gradient-to-r from-[#A82DF9] to-[#6678E9]":
                                        +page === i + 1,
                                },
                            )}
                        >
                            {i + 1}
                        </button>
                    );
                })}

                <button
                    onClick={() => next(page, totalPages)}
                    className="relative inline-flex items-center w-9 h-9 bg-white/[.1] hover:bg-white/[.2] rounded-xl focus:z-20 focus:outline-offset-0"
                >
                    <span className="sr-only">Next</span>
                    <ArrowChevronRightIcon className="text-white w-9 h-9 group-hover:animate-shake-r-sm group-hover:animate-infinite group-hover:animate-duration-[1300ms] group-hover:animate-ease-linear" />
                </button>
            </nav>
        </div>
    );
}
