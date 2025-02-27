import { ActionExample } from '@elizaos/core'

export const getLatestBlockHeightExamples: ActionExample[][] = [
    [
        {
            user: "{{user1}}",
            content: {
                text: "What is the last block height?",
            }

        },
        {
            user: "{{agent}}",
            content: {
                text: "Let me retrieve that data from on chain for you.",
                action: "GET_LATEST_BLOCK_HEIGHT",
            }

        }
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "Can you get me the most recent block height?",
            }

        },
        {
            user: "{{agent}}",
            content: {
                text: "Let me retrieve that data from on chain for you.",
                action: "GET_LATEST_BLOCK_HEIGHT",
            }

        }
    ],
]