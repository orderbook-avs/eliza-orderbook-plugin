export interface LatestBlockHeightResponse {
    height: number,
}

export type Order = [string, number, number, string, number, string, number, number, string, string];

export interface GetAllOrdersResponse {
    orders: Object[]
}