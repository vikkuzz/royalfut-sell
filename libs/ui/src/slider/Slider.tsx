"use client";

import { useCallback, useState, useEffect } from "react";
import RCSlider from "rc-slider";
import { CoinConverter, formatNumberShortView } from "@royalfut/utils";
import { ResizeIcon } from "@royalfut/icons";

/** @override rc-slider/assets/index.css */
import "./Slider.css";
import type { FC, ReactNode } from "react";
import type { SliderProps as RCSliderProps } from "rc-slider";

const Marker: FC<{ label: string }> = ({ label }) => {
    return (
        <span className="inline-block text-center align-middle cursor-pointer text-white-40 text-[0.625rem] whitespace-nowrap font-medium uppercase transition-colors duration-300">
            {label}
        </span>
    );
};

const markers: RCSliderProps["marks"] = CoinConverter.coinRanges.reduce<
    Record<number, ReactNode>
>((obj, range) => {
    const markValue = CoinConverter.convertInputToCoinValue(range.breakpoint);
    obj[markValue] = <Marker label={formatNumberShortView(range.breakpoint)} />;
    return obj;
}, {});

interface ISliderProps {
    value?: number;
    onSliderChange?(value: number): void;
}

const Slider: FC<ISliderProps> = ({
    value = CoinConverter.coinMinMax.min,
    onSliderChange = () => void 0,
}) => {
    const [sliderValue, setSliderValue] = useState(value);

    const onChange = useCallback(
        (value: number | Array<number>) => {
            const sliderValue = Array.isArray(value) ? value[0] : value;
            setSliderValue(sliderValue);

            const actualCoinValue =
                CoinConverter.calculateCoinsValue(sliderValue);
            onSliderChange(actualCoinValue);
        },
        [onSliderChange]
    );

    useEffect(() => {
        setSliderValue(value);
    }, [value]);

    return (
        <RCSlider
            dots={false}
            min={CoinConverter.coinMinMax.min}
            marks={markers}
            step={1}
            className="relative !mb-[1.875rem] flex items-center select-none left-[0.5%] sm:left-auto w-[99.5%] sm:w-full touch-none !h-3.5 !py-1 cursor-pointer"
            dotStyle={{
                display: "none",
            }}
            handleRender={({ props }) => {
                const left = props.style?.left;
                if (left) {
                    // NOTE: Hardcore solution for saving inside a design grid
                    const floatValue = Number.parseFloat(String(left));
                    const _left =
                        floatValue < 1.4
                            ? "1.4%"
                            : floatValue > 98.7
                              ? "98.7%"
                              : left;
                    props.style!.left = _left;
                }

                return (
                    <div {...props}>
                        <ResizeIcon className="text-white w-4 h-4" />
                    </div>
                );
            }}
            classNames={{
                track: "absolute h-[calc(100%_-_0.4375rem)] rounded-[7px] animate-backgroundPan linear-primary-pan-gradient",
                handle: "absolute cursor-grab touch-pan-x active:cursor-grabbing w-6 h-6 mt-0 bg-primary flex items-center justify-center border border-white-20 rounded-full focus:outline-none opacity-100",
                tracks: "absolute rounded-[7px]",
                rail: "bg-white-20 cursor-pointer relative grow rounded-[7px] h-[0.4375rem] absolute w-full",
            }}
            max={CoinConverter.coinMinMax.max}
            onChange={onChange}
            value={sliderValue}
            defaultValue={CoinConverter.coinMinMax.min}
        />
    );
};

export default Slider;
