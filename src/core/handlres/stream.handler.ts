import {ChildProcess} from "child_process";
import {StreamLogger} from "./stream-logger.interface.js";

export class StreamHandler {

    constructor(private logger: StreamLogger) {
    }

    processOutput(stream: ChildProcess) {
        stream.stdout?.on("data", (data: any) =>  this.logger.log(data.toString()))

        stream.stderr?.on("data", (data: any) => this.logger.error(data.toString()))

        stream.on("close", () => this.logger.end())
    }
}