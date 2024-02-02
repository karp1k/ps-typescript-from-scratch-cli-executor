import {StreamLogger} from "../handlres/stream-logger.interface.js";
import {ChildProcess, ChildProcessWithoutNullStreams} from "child_process";
import {CommandExec} from "./command.types.js";

export abstract class CommandExecutor<Input> {

    constructor(private logger: StreamLogger) {}

    protected abstract prompt(): Promise<Input>;
    protected abstract build(input: Input): CommandExec;
    protected abstract spawn(command: CommandExec): ChildProcessWithoutNullStreams;
    protected abstract processStream(stream: ChildProcessWithoutNullStreams, logger: StreamLogger): void;

    public async execute() {
        const input = await this.prompt();
        const command = this.build(input);
        const stream = this.spawn(command);
        this.processStream(stream, this.logger);
    }
}