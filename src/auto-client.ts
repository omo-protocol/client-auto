import { Client, IAgentRuntime } from "@elizaos/core";

export class AutoClient {
    interval: NodeJS.Timeout;
    runtime: IAgentRuntime;

    constructor(runtime: IAgentRuntime) {
        this.runtime = runtime;

        // start a loop that runs every x seconds
        this.interval = setInterval(
            async () => {
                console.log("running auto client...");
            },
            60 * 60 * 1000
        ); // 1 hour in milliseconds
    }
}