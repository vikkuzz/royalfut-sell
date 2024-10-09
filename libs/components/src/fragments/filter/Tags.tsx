"use client";
import { cn } from "@royalfut/utils";
import React from "react";

interface ITag {
    text: string;
    slug: string;
    active: boolean;
}
interface IProps {
    action: (slug: string) => void;
    tags: Array<ITag>;
}

const Tags: React.FC<IProps> = ({ action, tags }) => {
    return (
        <div className="flex gap-2 overflow-auto w-auto max-w-[320px] md:max-w-5xl h-auto bg-transparent">
            {tags.map(tag => (
                <button
                    className={cn(
                        "text-[16px] w-autoleading-normal px-3 py-2 h-fit rounded-full bg-[#2B2D43] whitespace-nowrap hover:bg-white-20",
                        {
                            "bg-primary": tag.active,
                        }
                    )}
                    data-id={tag.slug}
                    onClick={e => {
                        e.preventDefault();
                        action(tag.slug);
                    }}
                    key={tag.slug}>
                    {tag.text}
                </button>
            ))}
        </div>
    );
};

export default Tags;
