"use client";
import * as HoverCard from "@radix-ui/react-hover-card";
import {
    ArrowDownFilledIcon,
    CheckVIcon,
    CopyTextIcon,
    FacebookIcon,
    ShareIcon,
    TelegramIcon,
} from "@royalfut/icons";
import { cn } from "@royalfut/utils";
import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { cnPickerContent } from "../locale/picker/common";
const Dropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
    const pathname = usePathname();
    const thisPage = pathname.split("/").pop();

    const onOpenChange = useCallback((open: boolean) => {
        setIsOpen(open);
    }, []);

    const handleCopy = () => {
        const currentUrl = window.location.href;
        navigator.clipboard.writeText(currentUrl).then(() => setIsCopied(true));
    };

    useEffect(() => {
        if (isCopied) {
            setTimeout(() => setIsCopied(false), 2000);
        }
    }, [isCopied]);

    return (
        <HoverCard.Root
            openDelay={100}
            open={isOpen}
            onOpenChange={onOpenChange}>
            <HoverCard.Trigger asChild>
                <button className="flex gap-2 text-base font-semibold items-center bg-white-5 w-fit py-3 px-10 rounded-2xl hover:bg-white-10">
                    <ShareIcon className="fill-white bg-transparent w-6" />
                    Share
                    <ArrowDownFilledIcon
                        className={cn(
                            "block text-white fill-white bg-transparent w-[24px] h-[24px] min-w-[24px] transition-transform duration-300 group-data-[state=open]:rotate-180 group-data-[state=closed]:rotate-0",
                            {
                                "rotate-180": isOpen,
                                "rotate-0": !isOpen,
                            }
                        )}
                    />
                </button>
            </HoverCard.Trigger>
            <HoverCard.Portal>
                <HoverCard.Content
                    className={cn(
                        cnPickerContent,
                        "flex w-auto flex-col gap-2 z-40"
                    )}
                    sideOffset={10}>
                    <a
                        href={`https://www.facebook.com/sharer/sharer.php?u=https%3A//royalfut.com/blog/${thisPage}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center pl-2 gap-2 rounded-xl hover:bg-white-10 py-2 pr-2">
                        <FacebookIcon className="w-9 fill-white bg-transparent" />
                        Facebook
                    </a>
                    <a
                        href={`https://twitter.com/intent/tweet?text=https%3A//royalfut.com/blog/${thisPage}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center pl-4 gap-2 rounded-xl hover:bg-white-10 py-2 pr-2">
                        <Image
                            alt="icon twitter"
                            src={"/image/prime_twitter.svg"}
                            width={24}
                            height={24}
                            className="w-6 h-6"
                        />
                        Twitter
                    </a>
                    <a
                        href={`https://t.me/share/url?url=https%3A//royalfut.com/blog/${thisPage}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center pl-4 gap-2 rounded-xl hover:bg-white-10 py-2 pr-2">
                        <TelegramIcon className="w-6 fill-white bg-transparent" />
                        Telegram
                    </a>
                    <button
                        onClick={handleCopy}
                        className="relative flex items-center pl-4 gap-2 rounded-xl hover:bg-white-10 py-2 pr-2">
                        <div
                            className={cn(
                                "absolute hidden transition-all duration-300 bg-white-20 w-full bor border-2 border-white-40 rounded-xl p-2 left-1/2 transform -translate-x-1/2 bottom-[40px]",
                                {
                                    flex: isCopied,
                                }
                            )}>
                            <CheckVIcon
                                width={16}
                                height={16}
                                className="text-green-500"
                            />
                            the URL has been copied
                        </div>
                        <CopyTextIcon className="w-6 fill-white bg-transparent" />
                        Copy Link
                    </button>
                </HoverCard.Content>
            </HoverCard.Portal>
        </HoverCard.Root>
    );
};

export default Dropdown;
