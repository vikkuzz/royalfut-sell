"use server";

import { EProjects } from "@royalfut/enums";

export const getAppSettings = async () => {
    return {
        project: process.env["NEXT_PUBLIC_PROJECT"] as EProjects,
    };
};
