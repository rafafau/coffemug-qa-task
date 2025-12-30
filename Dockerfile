FROM node:24-bookworm-slim

WORKDIR /app

RUN npm install -g pnpm@10.26.1

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile && \
    pnpm npx playwright install --with-deps chromium

COPY . . 

CMD ["pnpm", "npx", "playwright", "test"]
