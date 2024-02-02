import {StreamLogger} from "../core/handlres/stream-logger.interface.js";

export class ConsoleLogger implements StreamLogger {

    static logger: ConsoleLogger = new ConsoleLogger();

    public static getInstance() {
        return this.logger;
    }

    end(): void {
        console.log("end of process")
    }

    error(...args: any[]): void {
        console.log(args)
    }

    log(...args: any[]): void {
        console.log(args)
    }

}