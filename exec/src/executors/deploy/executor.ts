import { runExecutor } from "@nx/devkit";
import { IDeployExecutorSchema } from "./schema";

import type { PromiseExecutor } from "@nx/devkit";

const deployExecutor: PromiseExecutor<IDeployExecutorSchema> = async (
    options,
    context
) => {
    if (!options.project) {
        throw new Error("Please, provide project name in options!");
    }
    const pname = options.pname || options.project;
    process.title = `nx.${pname}`;
    console.log(`Executor is running for ${options.project}`);
    console.log(`PNAME: ${pname}`);
    process.env.STATE = "deploy";
    process.env.PNAME = pname;
    let isSuccessed = true;

    for await (const s of await runExecutor(
        { project: options.project, target: "build" },
        {},
        context
    )) {
        isSuccessed = s.success;
    }

    for await (const s of await runExecutor(
        { project: options.project, target: "srun" },
        { port: options.port || 3000 },
        context
    )) {
        isSuccessed = s.success;
    }

    return {
        success: isSuccessed,
    };
};

export default deployExecutor;
