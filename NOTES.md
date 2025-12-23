# NOTES.md

## 📋 Kluczowe decyzje projektowe

### 1. Wybór frameworka: Playwright

**Decyzja:** Użycie Playwright zamiast Cypress  
**Uzasadnienie:**

- Mam większe doświadczenie w pracy z Playwright

### 2. Architektura: Page Object Model (POM)

**Decyzja:** Implementacja wzorca Page Object Model  
**Uzasadnienie:**

- Separation of concerns - logika testów oddzielona od lokatorów
- Reużywalność kodu - jedna zmiana w POM aktualizuje wszystkie testy
- Łatwiejsze utrzymanie przy zmianach w UI
- Lepsza czytelność testów - testy opisują "co" zamiast "jak"

**Struktura:**

```
pageObjects/     # Page Object classes
dataObjects/     # Test data generators (Faker.js)
interfaces/      # TypeScript interfaces
types/           # Enums i custom types
tests/           # Test specifications
```

### 3. Generowanie danych testowych: Faker.js

**Decyzja:** Użycie @faker-js/faker z polską lokalizacją  
**Uzasadnienie:**

- Automatyczne generowanie unikalnych danych (email, username, phone)
- Redukcja kolizji w testach rejestracji
- Realistyczne dane testowe (polskie imiona, miasta, kody pocztowe)
- Eliminacja hardcoded test data

### 4. Zarządzanie zmiennymi środowiskowymi

**Decyzja:** Szyfrowanie credentials za pomocą dotenvx  
**Uzasadnienie:**

- Bezpieczne przechowywanie credentials w repozytorium
- Różne konfiguracje dla local/CI bez duplikacji kodu
- Brak ryzyka wycieków credentials w logach CI/CD
- Łatwe zarządzanie sekretami w zespole

### 5. Walidacja API responses

**Decyzja:** Weryfikacja status codes dla krytycznych operacji (logowanie, aktualizacja koszyka)  
**Uzasadnienie:**

- Wcześniejsze wykrywanie problemów backendowych
- Testy są bardziej deterministyczne (nie czekają na aktualizacje UI)
- Lepsze error messages przy błędach

### 6. Obsługa asynchroniczności

**Decyzja:** Kombinacja auto-waiting + explicit waits  
**Uzasadnienie:**

- Auto-waiting Playwright dla większości przypadków
- Explicit `waitForRequest` dla operacji AJAX
- `waitForLoadState` dla nawigacji

### 7. Organizacja testów

**Decyzja:** Jeden plik = jeden scenariusz testowy  
**Uzasadnienie:**

- Łatwiejsze uruchamianie pojedynczych testów
- Lepsze raportowanie (każdy test ma swój report)
- Możliwość równoległego uruchomienia

### 8. CI/CD Pipeline

**Decyzja:** GitHub Actions + Docker + cache'owanie  
**Uzasadnienie:**

- Spójność środowiska (Docker)
- Szybkie buildy dzięki cache'owaniu dependencies
- Automatyczne uruchamianie na PR i push
- Przechowywanie artefaktów (raporty) przez 30 dni

### 9. Linting i formatowanie

**Decyzja:** ESLint + Prettier + Husky pre-commit hooks  
**Uzasadnienie:**

- Wymuszenie standardów kodowania
- Automatyczne formatowanie przed commitem
- Łapanie błędów TypeScript w czasie developmentu
- Spójny styl kodu w zespole

### 10. TypeScript strict mode

**Decyzja:** Włączony strict mode + interfaces dla wszystkich data objects  
**Uzasadnienie:**

- Type safety - eliminacja runtime errors
- Lepsze IDE autocomplete i refactoring
- Wymuszone obsługiwanie null/undefined
- Dokumentacja przez typy

---

## 🚫 Co świadomie nie zaimplementowano

### Valid Coupon Code Testing

**Decyzja:** Zaimplementowano tylko test **invalid coupon code** (`testInvalidCouponInCart.spec.ts`)

**Uzasadnienie:**

1. **Brak dostępu do valid coupon codes** - sklep testowy (automationteststore.com) nie udostępnia publicznie aktywnych kodów promocyjnych

---

## ⚠️ Znane ograniczenia

### 1. Brak Auto Cleanup

**Ograniczenie:** Utworzone konta testowe pozostają w systemie bez automatycznego czyszczenia  
**Impact:**

- Rosnąca liczba test users w bazie danych
- Potencjalne konflikty przy wielokrotnym uruchomieniu tego samego testu (jeśli email nie jest unique)
- Brak możliwości usunięcia konta przez API (sklep testowy nie udostępnia takiej funkcjonalności)
  **Mitigation:**
- Faker.js generuje unique emails przy każdym uruchomieniu
- Testy rejestracji zawsze tworzą nowe, unikalne konta

### 2. Browser Coverage

**Ograniczenie:** Domyślnie testy uruchamiane tylko na Chrome/Chromium  
**Impact:** Możliwe miss bugs specyficzne dla Firefox/Safari  
**Mitigation:** Playwright config pozwala łatwo dodać multi-browser testing (zakomentowane w config)

### 3. Brak API Tests

**Ograniczenie:** Wszystkie testy są end-to-end przez UI  
**Impact:** Wolniejsze wykonanie, większa podatność na flaky tests  
**Mitigation:**

- Używamy API validation (sprawdzanie response status)
- Możliwość rozszerzenia o pure API tests w przyszłości

### 4. Credentials Management

**Ograniczenie:** Wymaga poprawnej konfiguracji dotenvx i .env.keys  
**Impact:** Nowi członkowie zespołu muszą otrzymać klucz deszyfrujący  
**Mitigation:** Dokumentacja w README.md + możliwość użycia .env lokalnie

---

## 📊 Pokrycie wymagań z PDF

### ✅ Zaimplementowane scenariusze:

1. **User Registration**
   - `testCreateNewAccount.spec.ts`
   - `testRegistrationValidation.spec.ts` (18 walidacji)

2. **Login / Session**
   - `testCorrectLogin.spec.ts` (z session persistence - reload)
   - `testCorrectLogout.spec.ts`

3. **Product Discovery - Path A (Search + Filter)**
   - `testSearchProduct.spec.ts` (search + sorting + category filter)
   - `testSearchNonExistentProduct.spec.ts` (edge case: 0 results)

4. **Product Discovery - Path B (Category)**
   - `testFindProductUsingCategory.spec.ts`

5. **Add to Cart**
   - `testAddToCart.spec.ts`

6. **Cart Mutations**
   - `testModifyProductQuantityInCart.spec.ts`
   - `testRemoveProductFromCart.spec.ts`

7. **Coupon / Discount**
   - `testInvalidCouponInCart.spec.ts` ⚠️ (tylko invalid - uzasadnienie powyżej)

### ✅ "Deliberate Complexity" handled:

- **Asynchronous loading:** `waitForRequest`, `waitForLoadState`
- **Unstable ordering:** Dynamic selectors, nie zakładamy kolejności produktów
- **Dynamic/responsive UI:** Auto-waiting Playwright
- **Cart updates via background requests:** Weryfikacja response status 200
- **Test data uniqueness:** Faker.js generuje unique emails/usernames
- **Real-world organization:** POM pattern, TypeScript, CI/CD, Docker

---

## 📝 Założenia

1. **Test environment:** Sklep testowy jest stabilny i dostępny 24/7
2. **User permissions:** Nie ma rate limiting na rejestrację nowych userów
3. **Data persistence:** Utworzone test accounts pozostają w systemie (nie ma opcji usunięcia konta)
4. **Product availability:** Testowane produkty są zawsze dostępne w sklepie
5. **Browser support:** Główna przeglądarka to Chromium
6. **Network stability:** CI/CD ma stabilne połączenie z automationteststore.com
