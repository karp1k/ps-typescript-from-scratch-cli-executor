import {CommandExecutor} from "./command.executor.js";
import {PromptService} from "../prompt/prompt.service.js";
import {StreamLogger} from "../handlres/stream-logger.interface.js";
import {DirBuilder} from "../../commands/dir/dir.builder.js";
import {CommandExec} from "./command.types.js";
import {ChildProcessWithoutNullStreams, spawn} from "child_process";
import {StreamHandler} from "../handlres/stream.handler.js";
import {DirCommandExecutorTypes} from "./dir.command.executor.types.js";

export class DirCommandExecutor extends CommandExecutor<DirCommandExecutorTypes> {

    private promptService = new PromptService();

    constructor(logger: StreamLogger) {
        super(logger);
    }

    protected build(input: DirCommandExecutorTypes): CommandExec {
        const args = DirBuilder.builder()
            .detailedOutput()
            .build();
        return {command: "ls", args: args.concat(input.path)};
    }

    protected processStream(stream: ChildProcessWithoutNullStreams, logger: StreamLogger): void {
        const handler = new StreamHandler(logger);
        handler.processOutput(stream);
    }

    protected async prompt(): Promise<DirCommandExecutorTypes> {
        const path = await this.promptService.input<string>("path", "input");
        return {path}
    }

    protected spawn(command: CommandExec): ChildProcessWithoutNullStreams {
        return spawn(command.command, command.args);
    }

}