# coffemug-qa-task

## 🚀 Instalacja projektu

### Wymagania

- Node.js (wersja 18 lub wyższa)
- pnpm (menedżer pakietów)

### Kroki instalacji

1. **Zainstaluj zależności**

   ```bash
   pnpm install
   ```

2. **Zainstaluj przeglądarki Playwright**
   ```bash
   pnpm npx playwright install
   ```

## 🧪 Uruchamianie testów

### Uruchomienie wszystkich testów

```bash
pnpm npx playwright test
```

### Uruchomienie testów w trybie UI

```bash
pnpm npx playwright test --ui
```

### Uruchomienie testów w trybie headed (z widoczną przeglądarką)

```bash
pnpm npx playwright test --headed
```

### Uruchomienie konkretnego testu

```bash
pnpm npx playwright test tests/testCorrectLogin.spec.ts
```

## 🎨 Linting i formatowanie

### ESLint

#### Sprawdzenie kodu pod kątem błędów

```bash
pnpm lint
```

#### Automatyczne naprawienie błędów

```bash
pnpm lint:fix
```

### Prettier

#### Sprawdzenie formatowania kodu

```bash
pnpm format:check
```

#### Automatyczne sformatowanie kodu

```bash
pnpm format
```
