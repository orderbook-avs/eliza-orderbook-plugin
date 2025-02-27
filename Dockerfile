# Use a specific Node.js version for better reproducibility
FROM node:23.3.0-slim AS builder

# Install pnpm globally and necessary build tools
RUN npm install -g pnpm@9.15.4 && \
    apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y \
    git \
    python3 \
    python3-pip \
    curl \
    node-gyp \
    ffmpeg \
    libtool-bin \
    autoconf \
    automake \
    libopus-dev \
    make \
    gcc \
    g++ \
    build-essential \
    libcairo2-dev \
    libjpeg-dev \
    libpango1.0-dev \
    libgif-dev \
    openssl \
    libssl-dev libsecret-1-dev && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Set Python 3 as the default python
RUN ln -sf /usr/bin/python3 /usr/bin/python

# Set the working directory
WORKDIR /app

# Copy application code
COPY . .

# Install dependencies
RUN pnpm install

# Build the project
RUN pnpm run build && pnpm prune --prod

# Final runtime image
FROM node:23.3.0-slim

# Install runtime dependencies
RUN npm install -g pnpm@9.15.4 && \
    apt-get update && \
    apt-get install -y \
    git \
    python3 \
    ffmpeg && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Set the working directory
WORKDIR /app

# Copy built artifacts and production dependencies from the builder stage
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-workspace.yaml ./
COPY --from=builder /app/.npmrc ./
COPY --from=builder /app/turbo.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/agent ./agent
COPY --from=builder /app/client ./client
COPY --from=builder /app/lerna.json ./
COPY --from=builder /app/packages ./packages
COPY --from=builder /app/scripts ./scripts
COPY --from=builder /app/characters ./characters

# Expose necessary ports
EXPOSE 3000 5173

# Set up Gaianet through OpenAI env vars
ENV OPENAI_API_KEY=gaia-NDFhNzdmODYtMjE2Yi00ODY2LWE4MTQtNWZlMjQ4YmJmMzYw-IjRfSc56QyK1Ko0B
ENV SMALL_OPENAI_MODEL=Llama-3.2-3B-Instruct
ENV MEDIUM_OPENAI_MODEL=Llama-3.2-3B-Instruct
ENV LARGE_OPENAI_MODEL=Llama-3.2-3B-Instruct
ENV EMBEDDING_OPENAI_MODEL=Nomic-embed-text-v1.5
ENV USE_OPENAI_EMBEDDING=false
ENV UNICHAIN_RPC_URL=https://sepolia.unichain.org/
    
# Gaianet Embed Configuration
ENV GAIANET_EMBEDDING_MODEL=Nomic-embed-text-v1.5
ENV USE_GAIANET_EMBEDDING=true

# Command to start the application
CMD ["sh", "-c", "pnpm start & pnpm start:client"]
