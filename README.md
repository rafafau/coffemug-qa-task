# E-commerce Website Testing - Automation Test Store

Automated test suite for e-commerce flows using TypeScript and Playwright.

## 📋 Overview

This project implements automated tests for key e-commerce scenarios including:

- User registration with validation (18 test cases)
- Login/logout with session persistence
- Product discovery via search and category navigation
- Shopping cart operations (add, modify, remove)
- Coupon/discount validation

**Test Site:** [Automation Test Store](https://automationteststore.com/)

## 🔧 Prerequisites

- **Node.js** 22 or higher
- **pnpm** package manager

## 🛠️ Technologies

- **Test Framework:** Playwright
- **Language:** TypeScript (strict mode)
- **Test Data:** @faker-js/faker
- **Architecture:** Page Object Model (POM)
- **CI/CD:** GitHub Actions
- **Containerization:** Docker
- **Code Quality:** ESLint, Prettier, Husky
- **Secrets Management:** dotenvx

## 🚀 Quick Start

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Install Playwright Browsers

```bash
pnpm exec playwright install
```

### 3. Configure Environment Variables

```bash
# Copy environment files
cp .env.ci .env
cp .env.dist .env.keys
```

> **Note:** The `.env.keys` file contains encryption keys. You need to provide a valid decryption key to run tests locally.

Decrypt environment variables:

```bash
pnpm dotenvx decrypt -f .env.ci
```

### 4. Run Tests

```bash
# Run all tests
pnpm npx playwright test

# Run with UI mode (recommended for development)
pnpm npx playwright test --ui

# Run with visible browser
pnpm npx playwright test --headed

# Run specific test file
pnpm npx playwright test tests/testCorrectLogin.spec.ts
```

### Linting and Formatting

```bash
# Check for linting errors
pnpm lint

# Fix linting errors automatically
pnpm lint:fix
```

```bash
# Check code formatting
pnpm format:check

# Format code automatically
pnpm format
```

### Pre-commit Hooks

The project uses Husky for pre-commit hooks that automatically:

- Run ESLint on staged files
- Format code with Prettier
- Check TypeScript types

## 🐳 Docker

### Build Docker

```bash
docker build -t coffemug-qa-test:latest .
```

### Run tests in Docker

```bash
docker run --rm -v $(pwd):/app coffemug-qa-test:latest
```
