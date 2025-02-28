import { Action, HandlerCallback, IAgentRuntime, Memory, State, elizaLogger, } from "@elizaos/core";
import { createOrderbookService } from "../services";
import { validateOrderbookConfig } from "../environment";
import { getAllOrdersExamples } from "../examples";
import { Order } from "../types";

export const getPriceSuggestionButtonAction: Action = {
    name: "GET_PRICE_SUGGESTION_BUTTON",
    similes: ["BEST PRICE BUTTON", "BEST PRICE", "GET BEST PRICE"],
    description: "Get price suggestion after user clicks button",
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
        const service = createOrderbookService(config.UNICHAIN_RPC_URL, config.ORDERBOOK_TASKMANAGER_ADDR);
       
        try {
            const response = await service.getBestPrice();
            
            if (callback) {
                
                callback({
                    text: JSON.stringify({ ratio: response[0].ratio, tokenAddr: response[0].tokenAddr, tokenAddr2: response[1].tokenAddr, ratio2: response[1].ratio }),
                });
                return true;
            }
        } catch (error:any) {
            elizaLogger.error("Error in orderbook plugin handler:", error);
            callback({
                text: `Error determining best price: ${error.message}`,
                content: { error: error.message },
            });
            return false;
        }
    }
}