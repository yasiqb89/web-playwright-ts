# Web Playwright TypeScript

A test automation framework for web applications using Playwright and TypeScript with the Page Object Model pattern. Tests are demonstrated on the [SauceDemo](https://www.saucedemo.com) website.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Install browsers
npx playwright install

# Run all tests
npm test
```

## 📁 Project Structure

```
web-playwright-ts/
├── pages/              # Page Object Model classes
│   ├── base/          # BasePage with common methods
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
├── tests/e2e/         # End-to-end test specs
├── fixtures/          # Custom Playwright fixtures
├── data/              # Test data (JSON)
├── utils/             # Helper functions
└── .github/workflows/ # CI/CD pipeline
```

## 🧪 Running Tests

```bash
# Run all tests
npm test

# Run specific test suite
npm run test:e2e

# Run tagged tests
npx playwright test --grep @smoke

# Run with UI mode
npm run test:ui

# Debug mode
npm run test:debug
```

## ✨ Features

### Page Object Model
- **BasePage**: Reusable navigation and wait methods
- **Page Classes**: Encapsulated locators and interactions
- **Type Safety**: Full TypeScript support

### Custom Fixtures
- **loggedInPage**: Pre-configured page with login navigation
- Reusable across multiple test specs
- Defined in `fixtures/baseFixtures.ts`

### Test Organization
- **Tags**: `@smoke`, `@checkout`, `@formValidation`
- **Test Data**: JSON-based user credentials
- **Modular**: Separated by feature (login, cart, checkout)

### CI/CD
- GitHub Actions workflow
- Automated test execution on push/PR
- HTML report artifacts

## 📝 Test Coverage

| Feature | Tests | Tags |
|---------|-------|------|
| Login | Authentication flows | `@smoke` |
| Inventory | Add/remove products, cart badge | `@smoke` |
| Cart | Item management | `@smoke` |
| Checkout | Complete purchase flow | `@smoke`, `@checkout` |

## 📊 Reports

```bash
# View HTML report
npx playwright show-report
```

## 📄 License

ISC
