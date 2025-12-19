FROM node:24-bookworm-slim

WORKDIR /app

RUN npm install -g pnpm@10.26.1

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm npx playwright install --with-deps chromium 

# Command to run tests
CMD ["pnpm", "npx", "playwright", "test"]
