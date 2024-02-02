
export class FfmpegBuilder {

    private _width: string;
    private _height: string;
    private _outputPath: string;

    constructor(private _path: string) {
    }

    static builder(path: string) {
        return new FfmpegBuilder(path);
    }

    height(height: string) {
        this._height = height;
        return this;
    }

    width(width: string) {
        this._width = width;
        return this;
    }

    output(outputPath: string) {
        this._outputPath = outputPath;
        return this;
    }

    build(): string[] {
        return [
            "-i", this._path,
            "-c:v", "libx264",
            "-s", `${this._width}x${this._height}`,
            this._outputPath
        ]
    }

}