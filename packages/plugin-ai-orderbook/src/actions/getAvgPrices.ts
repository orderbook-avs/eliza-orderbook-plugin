import { Action, HandlerCallback, IAgentRuntime, Memory, State, elizaLogger, } from "@elizaos/core";
import { createOrderbookService } from "../services";
import { validateOrderbookConfig } from "../environment";
import { Order } from "../types";

export const getAvgPriceAction: Action = {
    name: "GET_AVG_PRICE",
    similes: ["AVERAGE PRICE", "AVG PRICE", "FETCH AVERAGE PRICE"],
    description: "Get the average price of the token pair",
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
            const response = await service.getPairAvgs();
            
            if (callback) {
                
                callback({
                    text: `Here are the averages of the price of the tokens:\n
                    
                    Token A: ${response[0].tokenAddr}\n
                    What 1 token B might get you: ${response[0].avg}
                    \n\n
                    Token B: ${response[1].tokenAddr}\n
                    What 1 token A might get you: ${response[1].avg}
                    
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