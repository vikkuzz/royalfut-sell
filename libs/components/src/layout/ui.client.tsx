"use client";

import { I18nPickerHover, CurrencyPickerHover } from "../locale";
import { useUIGlobalStore } from "@royalfut/store";

export const LocalePicker = () => {
    const { ccy, lng } = useUIGlobalStore(state => state.header.local);

    return (
        <div className="flex items-center gap-6">
            {lng.isEnable && (
                <I18nPickerHover
                    showCountryFlag={lng.style?.showFlag ?? false}
                    className="space-x-3"
                />
            )}
            {ccy.isEnable && (
                <CurrencyPickerHover
                    showCountryFlag={ccy.style?.showFlag ?? false}
                    className="space-x-3"
                />
            )}
        </div>
    );
};
