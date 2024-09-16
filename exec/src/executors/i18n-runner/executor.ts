import { runExecutor } from "@nx/devkit";
import { execSync } from "node:child_process";
import { rm } from "node:fs/promises";
import { resolve, join } from "node:path";
import { i18nAccsParser } from "./parser/i18nAccsParser";

import type { PromiseExecutor } from "@nx/devkit";
import type { II18nRunnerExecutorSchema } from "./schema";

async function removeFolder(folderPath) {
    try {
        await rm(folderPath, { recursive: true, force: true });
        console.log(`${folderPath} has been removed`);
    } catch (error) {
        console.error(`Error removing ${folderPath}:`, error);
    }
}

const i18nRunnerExecutor: PromiseExecutor<II18nRunnerExecutorSchema> = async (
    options,
    context
) => {
    if (!options.project) {
        throw new Error("Please, provide project name in options!");
    }
    console.log("Executor ran for I18nRunner", options);
    let isSuccessed = true;

    if (!options.i18nKeys || options.i18nKeys.length === 0) {
        execSync(
            `${resolve(join("node_modules", ".bin", "i18nexus"))} pull -p apps/${options.project}/messages --clean`,
            { stdio: "inherit", encoding: "utf-8" }
        );
    } else if (options.i18nKeys.length === 1) {
        const apiKey = options.i18nKeys[0];
        execSync(
            `${resolve(join("node_modules", ".bin", "i18nexus"))} pull -k ${apiKey}`,
            { stdio: "inherit", encoding: "utf-8" }
        );
    } else {
        const keyPaths = [];
        const rootPath = `apps/${options.project}/messages`;
        const accsFolder = "accs";
        await removeFolder(resolve(rootPath));

        options.i18nKeys.forEach(apiKey => {
            const apiPath = `${rootPath}/${accsFolder}/${apiKey}`;

            execSync(
                `${resolve(join("node_modules", ".bin", "i18nexus"))} pull -k ${apiKey} -p ${apiPath} --clean`,
                { stdio: "inherit", encoding: "hex" }
            );
            keyPaths.push(apiPath);
        });

        await i18nAccsParser(rootPath, keyPaths);
        await removeFolder(resolve(`${rootPath}/${accsFolder}`));
    }

    for await (const s of await runExecutor(
        { project: options.project, target: options.target },
        {},
        context
    )) {
        isSuccessed = s.success;
    }

    return {
        success: isSuccessed,
    };
};

export default i18nRunnerExecutor;
