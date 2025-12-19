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

3. **Skonfiguruj zmienne środowiskowe**

   ```bash
   cp .env.ci .env
   cp .env.dist .env.keys
   ```

   > **Uwaga:** Plik `.env.keys` zawiera klucze szyfrowania. Musisz uzupełnić go poprawnym kluczem deszyfrującym, aby uruchomić aplikację lokalnie.

   ```bash
   pnpm dotenvx decrypt -f .env.ci
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

## 🐳 Docker

### Budowanie obrazu Docker

```bash
docker build -t coffemug-qa-test:latest .
```

### Uruchomienie testów w kontenerze Docker

```bash
docker run --rm coffemug-qa-test:latest
```

### Uruchomienie z montowaniem lokalnych plików

```bash
docker run --rm -v $(pwd):/app coffemug-qa-test:latest
```

## 🔄 CI/CD - GitHub Actions

Projekt zawiera automatyczny pipeline CI/CD, który uruchamia się przy każdym pushu i pull requeście.

### Pipeline wykonuje następujące kroki:

1. **Checkout kodu** - pobiera kod z repozytorium
2. **Budowanie obrazu Docker** - tworzy obraz Docker z cache'owaniem warstw
3. **Instalacja zależności** - instaluje pnpm i zależności projektu
4. **Linting** - uruchamia ESLint do sprawdzenia kodu
5. **Formatowanie** - sprawdza formatowanie kodu przez Prettier
6. **Instalacja przeglądarek** - instaluje przeglądarki Playwright
7. **Uruchomienie testów** - wykonuje testy Playwright
8. **Upload artefaktów** - zapisuje raporty z testów (dostępne przez 30 dni)

### Konfiguracja

Pipeline znajduje się w pliku `.github/workflows/ci.yml` i uruchamia się dla branchy:

- `main`
- `poc-ecom-store`

### Dostęp do raportów

Po zakończeniu pipeline'a, raporty testów są dostępne w zakładce "Actions" w GitHub:

- `playwright-report` - HTML raport z testów
- `test-results` - szczegółowe wyniki testów
