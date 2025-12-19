FROM node:24-bookworm-slim

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    npm install -g pnpm@10.26.1 \
    && rm -rf /var/lib/apt/lists/*

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm npx playwright install --with-deps chromium 

# Command to run tests
CMD ["pnpm", "npx", "playwright", "test"]
