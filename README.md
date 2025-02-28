# Eliza Fork Containing Custom Plugin
## Special thank you to Nader for his amazing [plugin tutorial](https://www.youtube.com/watch?v=25FxjscBHuo)

To learn more about Eliza (AI Agent Framework), visit the [official github](https://github.com/elizaos/eliza)

You can find the custom orderbook plugin created for the project under /packages/plugin-ai-orderbook

There are four different actions created for the AI agent in the plugin: getAllOrders, getAvgPrice, getBestPrice, getPriceSuggestionButton (for frontend), and getLatestBlockHeight (for testing).

To install this repository, please clone it, run `pnpm install` and `pnpm build`, .

Our setup used a Gaia local node to host our AI, as well as other custom environment variables. We used the Gaia node's url in the OpenAI environment variables, as Gaia's API is nearly the same as OpenAI's API. Our environment configuration involved setting the variables below to make this work:

```
# OpenAI/Gaia Configuration
OPENAI_API_KEY=gaia-NDFhNzdmODYtMjE2Yi00ODY2LWE4MTQtNWZlMjQ4YmJmMzYw-IjRfSc56QyK1Ko0B
OPENAI_API_URL=https://0xa54bf247699c76f19698b10a3fe49e55997d9515.gaia.domains/v1
SMALL_OPENAI_MODEL=Llama-3.2-3B-Instruct  # Default: gpt-4o-mini
MEDIUM_OPENAI_MODEL=Llama-3.2-3B-Instruct    # Default: gpt-4o
LARGE_OPENAI_MODEL=Llama-3.2-3B-Instruct     # Default: gpt-4o
EMBEDDING_OPENAI_MODEL=Nomic-embed-text-v1.5 # Default: text-embedding-3-small
USE_OPENAI_EMBEDDING=false # Set to TRUE for OpenAI/1536, leave blank for local

UNICHAIN_RPC_URL=http://localhost:55068 # set this to the rpc of you local testnet
ORDERBOOK_TASKMANAGER_ADDR=0xc0F115A19107322cFBf1cDBC7ea011C19EbDB4F8 # set to the address of the deployed OrderBookTaskManager smart contract on your local testnet

# Gaianet Configuration
GAIANET_MODEL=
GAIANET_SERVER_URL=https://0xa54bf247699c76f19698b10a3fe49e55997d9515.gaia.domains/v1 # same as OPENAI_API_URL, necessary so that Gaia embedding can be accessed
SMALL_GAIANET_MODEL=
SMALL_GAIANET_SERVER_URL=
MEDIUM_GAIANET_MODEL=
MEDIUM_GAIANET_SERVER_URL=
LARGE_GAIANET_MODEL=
LARGE_GAIANET_SERVER_URL=
GAIANET_EMBEDDING_MODEL=Nomic-embed-text-v1.5
USE_GAIANET_EMBEDDING=true # Set to TRUE for GAIANET/768, leave blank for local
```

Run `pnpm start` to start the AI agent! Make sure your 

NOTE: When running `pnpm start`, or other pnpm commands, you may encounter a "Node version mismatch" error. Try deleting your `node_modules/` folder and running `pnpm install` again to fix the issue.
