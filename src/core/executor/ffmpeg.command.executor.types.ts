import {CommandExec} from "./command.types.js";

export interface FfmpgeCommandExecutorTypes {
    width: string;
    height: string;
    path: string;
    name: string;
}

export interface CommandExecFfmpeg extends CommandExec {
    output: string
}
