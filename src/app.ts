import {PromptService} from "./core/prompt/prompt.service.js";

export class App {
    async run() {
        const service = new PromptService();
        const res = await service.input<number>("Number", "number");
    }
}

const app = new App();
app.run();