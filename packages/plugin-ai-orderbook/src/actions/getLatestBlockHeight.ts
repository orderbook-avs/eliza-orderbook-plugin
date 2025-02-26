import { Action, HandlerCallback, IAgentRuntime, Memory, State, elizaLogger, } from "@elizaos/core";
import { createOrderbookService } from "../services";
import { validateOrderbookConfig } from "../environment";

export const getLatestBlockHeightAction: Action = {
    name: "GET_LATEST_BLOCK_HEIGHT",
    similes: ["BLOCK HEIGHT", "LATEST BLOCK HEIGHT", "BLOCK NUMBER"],
    description: "Get the latest block height of a EVM chain",
    validate: async (runtime: IAgentRuntime) => {
        await validateOrderbookConfig(runtime);
        return true;
    },
    examples: [],
    handler: async (
        runtime: IAgentRuntime,
        message: Memory,
        state: State,
        _options: { [key: string]: unknown },
        callback: HandlerCallback
    ) => {
    
        const config = await validateOrderbookConfig(runtime);
        const service = createOrderbookService(config.UNICHAIN_RPC_URL);
       
        try {
            const response = await service.getLastBlockHeight();
            elizaLogger.success(
                `Successfully fetched APOD`
            );
            if (callback) {
                callback({
                    text: `Here is the latest block height: ${response.height}`
                });
                return true;
            }
        } catch (error:any) {
            elizaLogger.error("Error in NASA plugin handler:", error);
            callback({
                text: `Error fetching APOD: ${error.message}`,
                content: { error: error.message },
            });
            return false;
        }
    }
}