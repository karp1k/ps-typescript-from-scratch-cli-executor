import {CommandExecutor} from "./command.executor.js";
import {ChildProcessWithoutNullStreams, spawn} from "child_process";
import {StreamLogger} from "../handlres/stream-logger.interface.js";
import {CommandExecFfmpeg, FfmpgeCommandExecutorTypes} from "./ffmpeg.command.executor.types.js";
import {FileService} from "../files/file.service.js";
import {PromptService} from "../prompt/prompt.service.js";
import {FfmpegBuilder} from "../../commands/ffmpeg/ffmpeg.builder.js";
import {StreamHandler} from "../handlres/stream.handler.js";

export class FfmpegCommandExecutor extends CommandExecutor<FfmpgeCommandExecutorTypes> {

    private fileService: FileService = new FileService();
    private promptService: PromptService = new PromptService();

    constructor(logger: StreamLogger) {
        super(logger);
    }

    protected build(input: FfmpgeCommandExecutorTypes): CommandExecFfmpeg {
        const output = this.fileService.getFilePath(input.path, input.name, "mp4");
        const args = new FfmpegBuilder(input.path)
            .height(input.height)
            .width(input.width)
            .output(output)
            .build();
        return {command: "ffmpeg", args, output};
    }

    protected processStream(stream: ChildProcessWithoutNullStreams, logger: StreamLogger): void {
        const handler = new StreamHandler(logger);
        handler.processOutput(stream);
    }

    protected async prompt(): Promise<FfmpgeCommandExecutorTypes> {
        const width = await this.promptService.input<string>("width", "input");
        const height = await this.promptService.input<string>("height", "input");
        const path = await this.promptService.input<string>("path to file", "input");
        const name = await this.promptService.input<string>("name", "input");
        return {width, height, path, name};
    }

    protected spawn(command: CommandExecFfmpeg): ChildProcessWithoutNullStreams {
        this.fileService.deleteFileIfExists(command.output);
        return spawn(command.command, command.args);
    }

}