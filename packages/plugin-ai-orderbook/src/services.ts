import { LatestBlockHeightResponse, GetAllOrdersResponse } from "./types";
import { ethers } from 'ethers';
import OrderBookTaskManagerABI from './abis/OrderBookTaskManagerABI.json';

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

    return {
        getLastBlockHeight, getAllOrders
    };
}

//swtich response to be latest block number
//add action and examples for latest block number