// src/auto-client.ts
var AutoClient = class {
  interval;
  runtime;
  constructor(runtime) {
    this.runtime = runtime;
    this.interval = setInterval(
      async () => {
        console.log("running auto client...");
      },
      60 * 60 * 1e3
    );
  }
};

// src/index.ts
var AutoClientInterface = {
  name: "auto",
  config: {},
  start: async (runtime) => new AutoClient(runtime),
  stop: async (_runtime) => {
    console.warn("Direct client does not support stopping yet");
  }
};
var index_default = AutoClientInterface;
export {
  AutoClientInterface,
  index_default as default
};
//# sourceMappingURL=index.js.map