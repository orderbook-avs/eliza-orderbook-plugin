import { Plugin } from "@elizaos/core";
import { getLatestBlockHeightAction } from "./actions/getLatestBlockHeight";
import { getAllOrdersAction } from "./actions/getAllOrders";
import { getBestPriceAction } from "./actions/getBestPrice";
import { getAvgPriceAction } from "./actions/getAvgPrices";

export const orderbookPlugin: Plugin = {
    name: "ai-orderbook",
    description: "Plugin to interact with custom Uniswap-based orderbook",
    actions: [getLatestBlockHeightAction, getAllOrdersAction, getBestPriceAction, getAvgPriceAction],
    // evaluators analyze the situations and actions taken by the agent. they run after each agent action
    // allowing the agent to reflect on what happened and potentially trigger additional actions or modifications
    evaluators: [],
    // providers supply information and state to the agent's context, help agent access necessary data
    providers: [],
};
export default orderbookPlugin;