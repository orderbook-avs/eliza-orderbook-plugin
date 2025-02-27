import { IAgentRuntime } from "@elizaos/core";
import { z } from "zod";

export const orderbookEnvSchema = z.object({
    UNICHAIN_RPC_URL: z.string().min(1, "Unichain RPC url is required"),
    ORDERBOOK_TASKMANAGER_ADDR: z.string().min(1, "Address of OrderBookTaskManager is required"),
});

export type orderbookConfig = z.infer<typeof orderbookEnvSchema>;

export async function validateOrderbookConfig(
    runtime: IAgentRuntime
): Promise<orderbookConfig> {
    try {
        const config = {
            UNICHAIN_RPC_URL: runtime.getSetting("UNICHAIN_RPC_URL"),
            ORDERBOOK_TASKMANAGER_ADDR: runtime.getSetting("ORDERBOOK_TASKMANAGER_ADDR")
        };
        console.log('config: ', config)
        return orderbookEnvSchema.parse(config);
    } catch (error) {
        console.log("error::::", error)
        if (error instanceof z.ZodError) {
            const errorMessages = error.errors
                .map((err) => `${err.path.join(".")}: ${err.message}`)
                .join("\n");
            throw new Error(
                `Unichain configuration validation failed:\n${errorMessages}`
            );
        }
        throw error;
    }
}