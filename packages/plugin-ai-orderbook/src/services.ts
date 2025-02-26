import { LatestBlockHeightResponse } from "./types";
import { ethers } from 'ethers';

export const createOrderbookService = (rpc_url: string) => {


    async function getLastBlockHeight(): Promise<LatestBlockHeightResponse> {
        if (!rpc_url) {
            throw new Error("rpc_url is required");
        }
        let provider = new ethers.JsonRpcProvider(rpc_url);
        let result = provider.getBlockNumber()
        return { height: await result }
    }

    return {
        getLastBlockHeight,
    };
}

//swtich response to be latest block number
//add action and examples for latest block number