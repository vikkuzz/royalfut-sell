import { readdir, readFile, writeFile } from "node:fs/promises";
import { join, extname, basename, resolve } from "node:path";

type CollectedTranslationPaths = Record<string, Array<string>>;

async function collectTranslationPaths(
    paths: Array<string>
): Promise<CollectedTranslationPaths> {
    const translations: CollectedTranslationPaths =
        {} as CollectedTranslationPaths;

    for (const folderPath of paths) {
        const files = await readdir(folderPath);

        for (const file of files) {
            const ext = extname(file);
            const fileNameWithoutExt = basename(file, ext);

            if (!translations[fileNameWithoutExt]) {
                translations[fileNameWithoutExt] = [];
            }

            translations[fileNameWithoutExt].push(join(folderPath, file));
        }
    }

    return translations;
}

async function mergeTranslationFiles(
    translationPaths: CollectedTranslationPaths,
    outputPath: string
) {
    const merge = await import("lodash.merge").then(
        m => m as unknown as (typeof m)["default"]
    );
    for (const [language, filePaths] of Object.entries(translationPaths)) {
        let mergedData = {};

        for (const filePath of filePaths) {
            const fullPath = resolve(filePath);
            try {
                const fileData = await readFile(fullPath, "utf-8");
                const jsonData = JSON.parse(fileData);

                mergedData = merge(mergedData, jsonData);
            } catch (error) {
                console.error(
                    `Error reading or parsing file: ${fullPath}`,
                    error
                );
            }
        }

        const outputFilePath = join(resolve(outputPath), `${language}.json`);

        try {
            await writeFile(
                outputFilePath,
                JSON.stringify(mergedData, null, 2)
            );
            console.log(
                `Successfully merged ${language} files into ${outputFilePath}`
            );
        } catch (error) {
            console.error(`Error writing merged file for ${language}`, error);
        }
    }
}

export const i18nAccsParser = async (
    rootPath: string,
    keyPaths: Array<string>
) => {
    const translationPaths = await collectTranslationPaths(keyPaths);
    await mergeTranslationFiles(translationPaths, rootPath);
};
