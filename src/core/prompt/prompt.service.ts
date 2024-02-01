import {PromptServiceType} from "./prompt.service.type.js";
import inquirer from "inquirer";

export class PromptService {
    public async input<T>(message: string, type: PromptServiceType) {
        const { result } = await inquirer.prompt<{ result: T}>([
            {
                type,
                name: "result",
                message
            }
        ])
        return result;
    }
}