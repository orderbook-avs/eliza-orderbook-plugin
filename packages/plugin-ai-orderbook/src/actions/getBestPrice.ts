import { Action, HandlerCallback, IAgentRuntime, Memory, State, elizaLogger, } from "@elizaos/core";
import { createOrderbookService } from "../services";
import { validateOrderbookConfig } from "../environment";
import { getAllOrdersExamples } from "../examples";
import { Order } from "../types";

export const getBestPriceAction: Action = {
    name: "GET_BEST_PRICE",
    similes: ["BEST PRICE", "WHAT IS THE BEST PRICE", "FETCH BEST PRICE"],
    description: "Get best prices of a token pair trade",
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
                    text: `Here are all of the orders that have occurred:\n
                    
                    Token A: ${response[0].tokenAddr}\n
                    What 1 token B might get you: ${response[0].ratio}
                    \n\n
                    Token B: ${response[1].tokenAddr}\n
                    What 1 token A might get you: ${response[1].ratio}
                    
                    \n`
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