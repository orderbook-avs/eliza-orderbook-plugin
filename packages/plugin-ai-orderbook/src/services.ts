import { LatestBlockHeightResponse, GetAllOrdersResponse } from "./types";
import { ethers } from 'ethers';
import OrderBookTaskManagerABI from './abis/OrderBookTaskManagerABI.json';

import { OrderIndexes, Order, MinRatioTradeResponse } from "./types";

export const createOrderbookService = (rpc_url: string, orderbook_taskmanager_addr: string, ) => {


    async function getLastBlockHeight(): Promise<LatestBlockHeightResponse> {
        if (!rpc_url) {
            throw new Error("rpc_url is required")
        }
        let provider = new ethers.JsonRpcProvider(rpc_url)
        let result = provider.getBlockNumber()
        return { height: await result }
    }

    async function getAllOrders(): Promise<GetAllOrdersResponse> {
        if (!rpc_url) {
            throw new Error("rpc_url is required")
        }
        if (!orderbook_taskmanager_addr) {
            throw new Error("orderbook_taskmanager_addr is required")
        }
        let provider = new ethers.JsonRpcProvider(rpc_url)
        let contract = new ethers.Contract(orderbook_taskmanager_addr, OrderBookTaskManagerABI, provider)
        let result = contract.getAllOrders()
        console.log(await result)
        return { orders: await result }
    }

    async function getBestPrice(): Promise<MinRatioTradeResponse[]> {
        let orderResponse = await getAllOrders()
        let orders = orderResponse.orders
        let tokenA = orders[0][OrderIndexes.TokenAddressHeld]
        let tokenAMinRatio = await findMinOrder(orders, tokenA)
        let tokenB = orders[0][OrderIndexes.TokenAddressToBuy]
        let tokenBMinRatio = await findMinOrder(orders, tokenB)
        
        return [tokenAMinRatio, tokenBMinRatio];
    }

    async function findMinOrder(orders: Order[], tokenAddr: string): Promise<MinRatioTradeResponse> {
        let min = Number.MAX_VALUE
        //review the last five orders and determine the lowest priced trade
        for (let i = 0; i < Math.min(orders.length, 5); i++) {
            if (orders[i][OrderIndexes.TokenAddressHeld] !== tokenAddr && orders[i][OrderIndexes.Fulfilled] === "true") {
                let ratio = Number(orders[i][OrderIndexes.AmountOwned])/Number(orders[i][OrderIndexes.AmountToBuy])
                if (ratio < min) {
                    min = ratio;
                    //0.5 of Token not owned for 1 of token owned
                }
            }
        }
        return { tokenAddr, ratio: min}

    }

    return {
        getLastBlockHeight, getAllOrders, getBestPrice
    };
}

//swtich response to be latest block number
//add action and examples for latest block number