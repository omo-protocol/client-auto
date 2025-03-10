import { type Client, type IAgentRuntime, elizaLogger, type Plugin } from "@elizaos/core";

// Define parameter types
type MentionsParams = {
    keywords: string;
    from?: number;
    to?: number;
    limit?: number;
    searchType?: 'and' | 'or';
    cursor?: string;
};

type TopMentionsParams = {
    timeframe: string;
    limit: number;
    ticker: string;
};

type TrendingTokensParams = {
    timeframe: string;
    limit: number;
};

// Add a new type for POST_ELFA_DATA params
type PostElfaDataParams = {
    dataType: 'mentions' | 'topMentions' | 'trendingTokens';
    keywords?: string;
    timeframe?: string;
    limit?: number;
    from?: number;
    to?: number;
};

type ActionType = {
    name: string;
    trigger: string;
    params: MentionsParams | TopMentionsParams | TrendingTokensParams | PostElfaDataParams;
};

class AutoClient {
    interval: NodeJS.Timeout;
    runtime: IAgentRuntime;
    private readonly actionTypes: ActionType[] = [
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
        },
    ];

    constructor(runtime: IAgentRuntime) {
        this.runtime = runtime;

        // start a loop that runs every x seconds
        this.interval = setInterval(
            async () => {
                elizaLogger.log("running auto client...");
            },
            60 * 60 * 1000
        ); // 1 hour in milliseconds
    }

    async stop() {
        clearInterval(this.interval);
    }
}

const AutoClientInterface: Client = {
    name: 'auto',
    start: async (runtime: IAgentRuntime) => {
        const client = new AutoClient(runtime);
        return client;
    },
};

const autoPlugin: Plugin = {
    name: "auto",
    description: "Auto client plugin",
    clients: [AutoClientInterface],
};
export default autoPlugin;