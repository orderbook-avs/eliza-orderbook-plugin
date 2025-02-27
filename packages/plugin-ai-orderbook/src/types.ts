export interface LatestBlockHeightResponse {
    height: number,
}

export type Order = [string, number, number, string, string, number, number, number, string, string];

export enum OrderIndexes {
    User = 0,
    AmountOwned,
    AmountToBuy,
    TokenAddressToBuy,
    TokenAddressHeld,
    Slippage,
    OrderPlaced,
    OrderMatched,
    PartiallyFulfilled,
    Fulfilled
}

export interface MinRatioTradeResponse {
    tokenAddr: string,
    ratio: number
}

export interface GetAllOrdersResponse {
    orders: Order[]
}