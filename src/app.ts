import {FfmpegCommandExecutor} from "./core/executor/ffmpeg.command.executor.js";
import {ConsoleLogger} from "./out/console-logger.js";
import {DirCommandExecutor} from "./core/executor/dir.command.executor.js";

export class App {
    async run() {
        new DirCommandExecutor(ConsoleLogger.getInstance()).execute();
    }
}

const app = new App();
app.run();