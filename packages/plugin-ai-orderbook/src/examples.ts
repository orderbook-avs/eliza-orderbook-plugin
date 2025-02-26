import { ActionExample } from '@elizaos/core'

export const getLatestBlockHeightExamples: ActionExample[][] = [
    [
        {
            user: "{{user1}}",
            content: {
                text: "What is the last limit order?",
            }

        },
        {
            user: "{{agent}}",
            content: {
                text: "Let me retrieve that data from on chain for you.",
                action: "getLastLimitOrder",
            }

        }
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "Can you get me the most recent limit order placed?",
            }

        },
        {
            user: "{{agent}}",
            content: {
                text: "Let me retrieve that data from on chain for you.",
                action: "getLastLimitOrder",
            }

        }
    ],
]

export const getLastLimitOrderExamples: ActionExample[][] = [
    [
        {
            user: "{{user1}}",
            content: {
                text: "What is the last limit order?",
            }

        },
        {
            user: "{{agent}}",
            content: {
                text: "Let me retrieve that data from on chain for you.",
                action: "getLastLimitOrder",
            }

        }
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "Can you get me the most recent limit order placed?",
            }

        },
        {
            user: "{{agent}}",
            content: {
                text: "Let me retrieve that data from on chain for you.",
                action: "getLastLimitOrder",
            }

        }
    ],
]