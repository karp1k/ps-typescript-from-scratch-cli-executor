import inquirer from "inquirer";
import {spawn} from "child_process";

(async function convert() {
    const {result: width} = await inquirer.prompt([{
        type: "number",
        name: "result",
        message: "width"
    }])

    const {result: height} = await inquirer.prompt([{
        type: "number",
        name: "result",
        message: "height"
    }])

    const {result: path} = await inquirer.prompt([{
        type: "input",
        name: "result",
        message: "path"
    }])

    const { result: name} = await inquirer.prompt([{
        type: "input",
        name: "result",
        message: "name"
    }])

    const res = spawn('ffmpeg', [
        "-i", path,
        "-c:v", "libx264",
        "-s", `${width}x${height}`,
        path + name + ".mp4"
    ])

    res.stdout.on("data", (data: any) => {
        console.log(data.toString())
    })

    res.stderr.on("data", (data: any) => {
        console.log(data.toString())
    })

    res.on("close", () => {
        console.log("Finish")
    })
})();