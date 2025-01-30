import { AutoClient } from "./auto-client";

export const AutoClientInterface = {
    name: 'auto',
    config: {},
    start: async (runtime: any) => new AutoClient(runtime) as any,
    stop: async (_runtime: any) => {
        console.warn("Direct client does not support stopping yet");
    },
};

export default AutoClientInterface;
