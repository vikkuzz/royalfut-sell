"use server";

import { getTranslations } from "next-intl/server";
import { excludeProps, deepClone } from "@royalfut/utils";

import type { IUIGlobalState } from "@royalfut/interfaces";

type TGetMessageLabelArgs =
    | {
          t: Awaited<ReturnType<typeof getTranslations<string>>>;
          key: string;
          fallback?: string;
      }
    | {
          t: null;
          nsI18n: string;
          key: string;
          fallback?: string;
      };

export const localizeGlobalState = async (
    data: IUIGlobalState
): Promise<IUIGlobalState> => {
    const filteredData = excludeProps(deepClone(data), ["local"]);

    const getMessageLabel = async (props: TGetMessageLabelArgs) => {
        if (!props.t) {
            const t = await getTranslations(props.nsI18n);
            return t(props.key) || props.fallback || props.key;
        }

        return props.t(props.key) || props.fallback || props.key;
    };

    const localizeRecursive = async (
        obj: any,
        parentNsI18n: string | undefined = undefined
    ): Promise<any> => {
        if (Array.isArray(obj)) {
            return await Promise.all(
                obj.map(item => localizeRecursive(item, parentNsI18n))
            );
        }

        if (typeof obj === "object" && obj !== null) {
            const currentNsI18n = obj.nsI18n || parentNsI18n;

            if (obj.localized !== false && "label" in obj) {
                if (currentNsI18n) {
                    const t = await getTranslations(currentNsI18n);

                    obj.label = await getMessageLabel({
                        t,
                        key: obj.label,
                    });
                } else {
                    console.warn(
                        `No namespace found for localized object:`,
                        obj
                    );
                }
            }

            // Recursively localize child objects
            for (const key of Object.keys(obj)) {
                if (typeof obj[key] === "object" && obj[key] !== null) {
                    obj[key] = await localizeRecursive(obj[key], currentNsI18n);
                }
            }
        }

        return obj;
    };

    return { local: data.local, ...(await localizeRecursive(filteredData)) };
};
