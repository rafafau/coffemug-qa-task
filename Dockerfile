# Use Node.js LTS version with Playwright dependencies
FROM mcr.microsoft.com/playwright:v1.57.0-noble

# Set working directory
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy project files
COPY . .

# Install Playwright browsers (already included in the base image, but ensuring)
RUN pnpm exec playwright install --with-deps

# Command to run tests
CMD ["pnpm", "exec", "playwright", "test"]
