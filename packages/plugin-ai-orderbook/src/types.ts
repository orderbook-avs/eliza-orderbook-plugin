export interface OrderbookTradeResponse {
    ask: number,
    bid: number,
    address: string,
    token: string,
}

export interface LatestBlockHeightResponse {
    height: number,
}