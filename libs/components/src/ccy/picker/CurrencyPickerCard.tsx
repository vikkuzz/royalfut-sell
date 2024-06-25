import Image from "next/image";
import { ccyCollection } from "@royalfut/collections";
import { cn } from "@royalfut/utils";

import type { FC } from "react";
import type { ECCYIDs } from "@royalfut/enums";

const CurrencyPickerCard: FC<{
    id: ECCYIDs;
    onChange: (id: ECCYIDs) => void;
    showFlag: boolean;
}> = ({ id, onChange, showFlag }) => {
    return (
        <div className="flex pointer-events-auto justify-start flex-wrap w-full">
            {Object.keys(ccyCollection).map(item => {
                const entity = ccyCollection[item as ECCYIDs];
                const isActive = entity.id === id;

                return (
                    <button
                        onClick={() => onChange(entity.id)}
                        key={entity.id}
                        className={cn(
                            "group flex items-center basis-1/2 py-1.5 justify-start max-w-[50%] hover:bg-white-10 rounded-lg",
                            {
                                "bg-white-10 cursor-default pointer-events-none":
                                    isActive,
                                "space-x-1 px-3": showFlag,
                                "space-x-3 px-4.5": !showFlag,
                            }
                        )}>
                        <div className="flex items-center relative justify-center flex-none w-4 h-4">
                            <Image
                                src={entity.image.symbol}
                                alt={entity.currency}
                                fill
                                priority={false}
                            />
                        </div>
                        {showFlag && (
                            <div className="flex items-center relative justify-center flex-none mr-3 w-4 h-4">
                                <Image
                                    src={entity.image.flag}
                                    alt={entity.currency}
                                    priority={false}
                                    fill
                                />
                            </div>
                        )}
                        <span
                            className={cn(
                                "font-medium text-base text-white-60 text-left group-hover:text-white/80",
                                {
                                    "text-white/80": isActive,
                                }
                            )}>
                            {entity.code}
                        </span>
                    </button>
                );
            })}
        </div>
    );
};

export default CurrencyPickerCard;
