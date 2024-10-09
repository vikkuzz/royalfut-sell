// prettier-ignore
/* eslint-disable max-lines */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import {
    BlogCard,
    H1WithBackImg,
    PaginatorBlog,
    RedirectCard,
    SearchBtn,
    Tags,
} from "@royalfut/components";
import { ICard } from "@royalfut/interfaces";
import { Input } from "@royalfut/ui";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SetStateAction, useEffect, useState } from "react";

import { posts, redirectedCard, tags } from "@royalfut/collections";

const Index = () => {
    const url = usePathname();
    const params = useSearchParams();
    const router = useRouter();
    const [currentTags, setCurrentTags] = useState(tags);
    const [filteredPosts, setFilteredPosts] = useState(posts);
    const [page, setPage] = useState<any>(1);
    const [routesPagination, setRoutesPagination] = useState<
        Array<string> | undefined
    >();
    const [slicedPosts, setSlicedPosts] = useState<any>();

    function updatePageInUrl(url: string, newPage: number) {
        const regex = /([?&]page=)(\d+)/;
        const updatedUrl = url.replace(regex, `$1${newPage}`);

        return updatedUrl;
    }

    const prev = (page: number) => {
        const currentUrl = new URL(window.location.href);
        if (page > 1) {
            currentUrl.searchParams.set(`page`, String(page - 1));
            router.push(currentUrl.toString());
        }
    };
    const next = (page: number, totalPages: number) => {
        const currentUrl = new URL(window.location.href);
        if (page < totalPages) {
            currentUrl.searchParams.set(`page`, String(page + 1));
            router.push(currentUrl.toString());
        }
    };
    const goto = (page: string) => {
        const currentUrl = new URL(window.location.href);
        currentUrl.searchParams.set(`page`, page);
        router.push(currentUrl.toString());
    };

    useEffect(() => {
        const tagsValues = params.getAll("tag");

        if (tagsValues.length === 0) {
            const updatedTags = tags.map((tag) => {
                if (tag.slug === "all") {
                    return { ...tag, active: true };
                }
                return tag;
            });

            setCurrentTags(updatedTags);
            posts.sort((a, b) => {
                return new Date(b.date).getTime() - new Date(a.date).getTime();
            });
            setFilteredPosts(posts);
        } else {
            const updatedTags = tags.map((tag) => {
                for (let i = 0; i < tagsValues.length; i++) {
                    if (tag.slug === tagsValues[i]) {
                        return { ...tag, active: true };
                    }
                }
                return tag;
            });

            setCurrentTags(updatedTags);
            posts.sort((a, b) => {
                return new Date(b.date).getTime() - new Date(a.date).getTime();
            });
            const filteredCards = [...posts].filter((card) => {
                return card.tags.some((tag) => tagsValues.includes(tag));
            });
            setFilteredPosts(filteredCards);
        }

        if (params.get("page")) {
            router.push(`${url}?${params}`);
        } else {
            router.push(`${url}?${params}&page=1`);
        }
    }, [url, params]);

    useEffect(() => {
        const pageParam = params.get("page");
        const currentPage = pageParam ? parseInt(pageParam, 9) : 1;
        const itemsPerPage = 9;
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const totalPages = Math.ceil(filteredPosts.length / 9);
        const pagesNumb = Array.from(
            { length: totalPages },
            (_, index) => index + 1
        );
        const routes: SetStateAction<Array<string> | undefined> = [];

        setPage(pageParam);
        const tposts = [...filteredPosts]
            .slice(startIndex, endIndex)
            .map((el, i) => {
                if (i === 0 || i % 8 === 0 || i % 9 === 0) {
                    el.width = "2";
                } else {
                    el.width = "1";
                }
                return el;
            });
        tposts.splice(3, 0, redirectedCard);
        setSlicedPosts(tposts);
        for (let i = 1; i <= pagesNumb.length; i++) {
            const route = `${url}?${params}`;
            const updatedUrl = updatePageInUrl(route, i);
            if (!routes.includes(updatedUrl)) {
                routes.push(updatedUrl);
            }
        }
        setRoutesPagination(routes);
    }, [filteredPosts, currentTags]);

    // useEffect(() => {
    //     const getTranslates = async () => {
    //         await getTranslatesFromCsv(posts);
    //     };
    //     getTranslates();
    // }, []);

    const clickOnTag = (id: string) => {
        const currentUrl = new URL(window.location.href);

        if (!params.has("tag", id)) {
            currentUrl.searchParams.append(`tag`, id.toString());
            currentUrl.searchParams.set(`page`, "1");
            router.push(currentUrl.toString());
        }
        if (params.has("tag", id)) {
            currentUrl.searchParams.delete(`tag`, id.toString());
            currentUrl.searchParams.set(`page`, "1");
            router.push(currentUrl.toString());
        }
        if (id === "all") {
            router.push(`${url}?page=1`);
        }
    };

    return (
        <div className="block w-auto h-auto bg-transparent">
            <div className="block w-auto h-auto bg-transparent md:hidden">
                <H1WithBackImg
                    img={"/img/backH1mobile.png"}
                    text={"Блог о спорте, играх и бла бла"}
                />
            </div>
            <div className="hidden md:flex md:w-full md:h-auto md:opacity-100">
                <H1WithBackImg
                    img={"/img/backH1desk.png"}
                    text={"Блог о спорте, играх и бла бла"}
                />
            </div>
            <div className="flex flex-col w-auto h-auto bg-transparent gap-4 md:flex-row-reverse justify-between">
                <div className="block w-auto min-h-[48px]">
                    <Input
                        placeholder="Search"
                        icon={{
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-expect-error
                            "<>": SearchBtn,
                            props: {
                                centered: true,
                            },
                        }}
                        borderType="box"
                        cnBox="w-full min-h-[48px] relative group inline-flex items-center justify-center z-[1] bg-transparent"
                        className="block w-full min-h-[48px] text-xs pl-12 pr-4 font-medium bg-[#12142b] border border-white-70 rounded-xl"
                    />
                </div>
                <Tags action={clickOnTag} tags={currentTags} />
            </div>
            <div className="flex flex-wrap w-auto gap-4 pt-10">
                {slicedPosts?.map((card: ICard) => {
                    if (card.tags[0] === "redirect") {
                        return <RedirectCard key={card.slug} card={card} />;
                    } else {
                        return (
                            <BlogCard key={card.slug} card={card} tags={tags} />
                        );
                    }
                })}
            </div>
            <div className="flex w-auto justify-center pt-7">
                {Math.ceil(filteredPosts.length / 10) > 1 && (
                    <PaginatorBlog
                        totalPages={Math.ceil(filteredPosts.length / 10)}
                        page={+page}
                        routes={routesPagination}
                        prev={prev}
                        next={next}
                        goto={goto}
                    />
                )}
            </div>
        </div>
    );
};

export default Index;
