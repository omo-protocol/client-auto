// src/index.ts
import { elizaLogger } from "@elizaos/core";
var AutoClient = class {
  interval;
  runtime;
  constructor(runtime) {
    this.runtime = runtime;
    this.interval = setInterval(
      async () => {
        elizaLogger.log("running auto client...");
      },
      60 * 60 * 1e3
    );
  }
  async stop() {
    clearInterval(this.interval);
  }
};
var AutoClientInterface = {
  name: "auto",
  start: async (runtime) => {
    const client = new AutoClient(runtime);
    return client;
  }
};
var autoPlugin = {
  name: "auto",
  description: "Auto client plugin",
  clients: [AutoClientInterface]
};
var index_default = autoPlugin;
export {
  index_default as default
};
//# sourceMappingURL=index.js.map