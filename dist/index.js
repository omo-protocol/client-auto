// src/index.ts
import { elizaLogger } from "@elizaos/core";
var AutoClient = class {
  interval;
  runtime;
  actionTypes = [
    {
      name: "GET_MENTIONS",
      trigger: "Show me recent mentions of hyperliquid, $stHYPE, $HYPE, and $BUDDY",
      params: {
        keywords: "HYPE, bitcoin, hyperliquid, $BUDDY, $stHYPE",
        limit: 20
      }
    },
    {
      name: "GET_TOP_MENTIONS",
      trigger: "What are the top mentions?",
      params: {
        timeframe: "24h",
        limit: 10,
        ticker: "HYPE"
      }
    },
    {
      name: "GET_TRENDING_TOKENS",
      trigger: "Show me trending tokens",
      params: { timeframe: "24h", limit: 5 }
    },
    // Add our new POST_ELFA_DATA action
    {
      name: "POST_ELFA_DATA",
      trigger: "Post a tweet about trending tokens",
      params: {
        dataType: "trendingTokens",
        timeframe: "24h",
        limit: 5
      }
    },
    {
      name: "POST_ELFA_DATA",
      trigger: "Share the top mentions on Twitter",
      params: {
        dataType: "topMentions",
        timeframe: "24h",
        limit: 5
      }
    },
    {
      name: "POST_ELFA_DATA",
      trigger: "Tweet about recent HYPE mentions",
      params: {
        dataType: "mentions",
        keywords: "HYPE, bitcoin, hyperliquid, $BUDDY, $stHYPE",
        limit: 10
      }
    }
  ];
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