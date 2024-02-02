export class DirBuilder {
    private options: Map<string, string> = new Map();

    static builder() {
        return new DirBuilder();
    }

    detailedOutput() {
        this.options.set("-l", "");
        return this;
    }

    build(): string[] {
        const args: string[] = [];
        this.options.forEach((v, k) => {
            args.push(k);
            args.push(v);
        })
        return args;
    }
}