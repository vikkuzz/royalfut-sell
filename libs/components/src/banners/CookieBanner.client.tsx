"use client";

import { useState, useCallback } from "react";
import { Button, Checkbox } from "@royalfut/ui";
import { setCookieConsentStatus } from "@royalfut/actions";

import type { CookieConsentTypes } from "@royalfut/interfaces";

export const CookieBannerForm = () => {
    const [isOnAnalytics, setIsOnAnalytics] = useState(true);

    const onSumbit = (formData: FormData) => {
        const statusAnalytics = formData.get("analytics");
        let status: CookieConsentTypes = "granted";

        if (statusAnalytics === "on") {
            status = "granted_A";
        }

        setCookieConsentStatus(status);
    };

    const onRejectAll = useCallback(() => {
        setCookieConsentStatus("denied");
    }, []);

    return (
        <form className="flex flex-col mt-4" action={onSumbit}>
            <div className="flex items-center space-x-5">
                <Button
                    as="button"
                    type="submit"
                    className="[--bordered-box-linear-bg-1:hsl(var(--color-black-shape))] hover:text-white-60 transition-colors duration-300 border border-transparent rounded-md bordered-box-linear-accent-1 px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white-20">
                    Accept
                </Button>
                <Button
                    as="button"
                    onClick={onRejectAll}
                    type="button"
                    className="text-sm font-semibold leading-6 text-white hover:text-white-60">
                    Reject all
                </Button>
            </div>
            <div className="mt-4 flex items-center space-x-4">
                <div className="relative flex items-start">
                    <div className="flex h-6 items-center">
                        <Checkbox
                            id="cookie-necessary"
                            aria-describedby="necessary-description"
                            className="cursor-default"
                            name="necessary"
                            disabled
                            defaultChecked
                            checked
                        />
                    </div>
                    <label
                        htmlFor="cookie-necessary"
                        className="font-medium text-white ml-3 text-sm leading-6">
                        Necessary
                    </label>
                </div>
                <div className="relative flex items-start">
                    <div className="flex h-6 items-center">
                        <Checkbox
                            id="cookie-analytics"
                            aria-describedby="analytics-description"
                            name="analytics"
                            defaultChecked
                            checked={isOnAnalytics}
                            onCheckedChange={checked =>
                                setIsOnAnalytics(!!checked)
                            }
                        />
                    </div>
                    <label
                        htmlFor="cookie-analytics"
                        className="font-medium text-white ml-3 text-sm leading-6">
                        Analytics
                    </label>
                </div>
            </div>
        </form>
    );
};
