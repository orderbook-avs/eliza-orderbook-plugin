import { Action, HandlerCallback, IAgentRuntime, Memory, State, elizaLogger, } from "@elizaos/core";
import { createOrderbookService } from "../services";
import { validateOrderbookConfig } from "../environment";
import { getAllOrdersExamples } from "../examples";

export const getAllOrdersAction: Action = {
    name: "GET_ALL_ORDERS",
    similes: ["ALL ORDERS", "EVERY SINGLE ORDER", "HISTORY OF ALL ORDERS"],
    description: "Get all of the orders",
    validate: async (runtime: IAgentRuntime) => {
        await validateOrderbookConfig(runtime);
        return true;
    },
    examples: getAllOrdersExamples,
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
            const response = await service.getAllOrders();
            elizaLogger.success(
                `Successfully fetched all orders: ${response.orders}`
            );
            if (callback) {
                const indexToName = ["Order ID", "Address", "Price", "Quantity", "Timestamp"]; // Example mapping
                const prettyOrders = response.orders.map(order => 
                    order.map((value, index) => `${indexToName[index]}: ${typeof value === 'bigint' ? value.toString() : value}`).join('\n')
                ).join('\n\n');
                callback({
                    text: `Here are all of the orders that have occurred:\n\n${prettyOrders}`
                });
                return true;
            }
        } catch (error:any) {
            elizaLogger.error("Error in orderbook plugin handler:", error);
            callback({
                text: `Error fetching all orders: ${error.message}`,
                content: { error: error.message },
            });
            return false;
        }
    }
}