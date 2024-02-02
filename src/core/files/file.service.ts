import {dirname, isAbsolute, join } from "path";
import {promises} from "fs";

export class FileService {

    public getFilePath(path: string, name: string, ext: string) {
        if (!isAbsolute(path)) {
            path = join(__dirname + "/" + path);
        }
        return join(dirname(path) + "/" + name + "." + ext);
    }

    async deleteFileIfExists(path: string) {
        if (await this.isExist(path)) {
            promises.unlink(path);
        }
    }

    private async isExist(path: string): Promise<boolean> {
        try {
            await promises.stat(path);
            return true;
        } catch {
            return false;
        }
    }
}