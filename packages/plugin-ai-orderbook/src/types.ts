export interface LatestBlockHeightResponse {
    height: number,
}

export type Order = [string, number, number, string, string, number, number, number, string, string];

export interface GetAllOrdersResponse {
    orders: Object[]
}