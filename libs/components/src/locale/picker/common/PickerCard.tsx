// TODO: Make the Picker Card component polymorhic

import Image from "next/image";
import { cn } from "@royalfut/utils";

import type { FC, PropsWithChildren } from "react";
import type { ECCYIDs, EI18nIds } from "@royalfut/enums";
import type {
    CCYCollection,
    I18nCollection,
    IIdentifiable,
    FNCN,
} from "@royalfut/interfaces";

const PickerFlagImage: FNCN<{
    size?: "md" | "lg";
    image: {
        flag: string;
    };
    label: string;
}> = ({ image, label, size = "md", className }) => {
    return (
        <div
            className={cn(
                "flex items-center relative justify-center flex-none mr-3",
                {
                    "w-4 h-4": size === "md",
                    "w-6 h-6": size === "lg",
                },
                className
            )}>
            <Image src={image.flag} alt={label} priority={false} fill />
        </div>
    );
};

interface IPickerCCyCardImageProps {
    label: string;
    image: {
        symbol: string;
        flag: string;
    };
    showFlag: boolean;
}

const PickerCCyCardImage: FC<IPickerCCyCardImageProps> = ({
    label,
    image,
    showFlag,
}) => {
    return (
        <>
            <div className="flex items-center relative justify-center flex-none w-4 h-4">
                <Image src={image.symbol} alt={label} fill priority={false} />
            </div>
            {showFlag && (
                <PickerFlagImage image={{ flag: image.flag }} label={label} />
            )}
        </>
    );
};

const PickerLabel: FC<{ isActive: boolean; label: string }> = ({
    label,
    isActive,
}) => {
    return (
        <span
            className={cn(
                "font-medium text-base text-white-60 text-left group-hover:text-white/80",
                {
                    "text-white/80": isActive,
                }
            )}>
            {label}
        </span>
    );
};

interface IPickerCardBtnProps {
    isActive: boolean;
    label: string;
    showFlag: boolean;
    id: string;
    onChange: (id: string) => void;
}

const PickerCardBtn: FC<PropsWithChildren<IPickerCardBtnProps>> = ({
    isActive,
    onChange,
    id,
    label,
    showFlag,
    children,
}) => {
    return (
        <button
            onClick={() => onChange(id)}
            key={id}
            className={cn(
                "group flex items-center basis-1/2 py-1.5 justify-start max-w-[50%] hover:bg-white-10 rounded-lg",
                {
                    "bg-white-10 cursor-default pointer-events-none": isActive,
                    "space-x-1 px-3": showFlag,
                    "space-x-3 px-4.5": !showFlag,
                }
            )}>
            {children}
            <PickerLabel isActive={isActive} label={label} />
        </button>
    );
};

interface IPickerCardBaseProps extends IIdentifiable {
    showFlag: boolean;
    onChange: (id: string) => void;
}

interface IPickerCardCCyProps extends IPickerCardBaseProps {
    coll: CCYCollection;
    type: "ccy";
}

interface IPickerI18nProps extends IPickerCardBaseProps {
    coll: I18nCollection;
    type: "i18n";
}

type PickerCardProps = IPickerCardCCyProps | IPickerI18nProps;

const PickerCard: FC<PickerCardProps> = ({ id, showFlag, ...props }) => {
    return (
        <div className="flex pointer-events-auto justify-start flex-wrap w-full">
            {Object.keys(props.coll).map(item => {
                const entity =
                    props.type === "i18n"
                        ? props.coll[item as EI18nIds]
                        : props.coll[item as ECCYIDs];
                const label =
                    props.type === "ccy"
                        ? props.coll[entity.id as ECCYIDs].code
                        : props.coll[entity.id as EI18nIds].label;
                const isActive = entity.id === id;

                return (
                    <PickerCardBtn
                        key={entity.id}
                        id={entity.id}
                        isActive={isActive}
                        label={label}
                        onChange={props.onChange}
                        showFlag={showFlag}>
                        {props.type === "ccy" && (
                            <PickerCCyCardImage
                                label={label}
                                showFlag={showFlag}
                                image={
                                    entity.image as IPickerCCyCardImageProps["image"]
                                }
                            />
                        )}
                        {props.type === "i18n" && (
                            <PickerFlagImage
                                size="lg"
                                className="mr-2"
                                image={entity.image}
                                label={label}
                            />
                        )}
                    </PickerCardBtn>
                );
            })}
        </div>
    );
};

export default PickerCard;
