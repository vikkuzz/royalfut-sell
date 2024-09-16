import { useCallback } from "react";
import { Slider } from "@royalfut/ui";
import { CoinConverter } from "@royalfut/utils";
import { useTransferSelectorStore } from "@royalfut/store";

const SliderPicker = () => {
    const coinUT = useTransferSelectorStore.use.coinUT();
    const setUTCoin = useTransferSelectorStore.use.setUTCoin();
    const sliderValue = CoinConverter.convertInputToCoinValue(coinUT);

    const onChange = useCallback(
        (value: number) => {
            setUTCoin(String(value));
        },
        [setUTCoin],
    );

    return <Slider value={sliderValue} onSliderChange={onChange} />;
};

export default SliderPicker;
