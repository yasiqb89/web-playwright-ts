# Web Playwright TypeScript

A test automation framework for [Sauce Demo](https://www.saucedemo.com) using Playwright and TypeScript with the Page Object Model pattern.

## 📋 Prerequisites

- Node.js (LTS version 18 or newer)
- npm or yarn

## 🚀 Installation

1. Clone the repository:
```bash
git clone https://github.com/yasiqb89/web-playwright-ts.git
cd web-playwright-ts
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npx playwright install
```

## 📁 Project Structure

```
web-playwright-ts/
├── pages/              # Page Object Model classes
│   ├── base/          # Base page class
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
├── tests/             # Test specifications
│   └── e2e/          # End-to-end tests
├── data/              # Test data (users, user info)
├── fixtures/          # Test fixtures
├── utils/             # Utility functions
└── config/            # Configuration files
```

## 🧪 Running Tests

```bash
# Run all tests
npm test

# Run E2E tests only
npm run test:e2e

# Run tests in UI mode
npm run test:ui

# Run tests in headed mode (see browser)
npm run test:headed

# Run tests in debug mode
npm run test:debug
```

## 📝 Test Coverage

- **Login Tests**: User authentication scenarios
- **Inventory Tests**: Product browsing, sorting, and cart operations
- **Cart Tests**: Cart management and item removal
- **Checkout Tests**: Complete purchase flow

## 🏗️ Page Object Model

Each page is represented by a class that encapsulates:
- Locators for page elements
- Methods for user interactions
- Reusable page-specific logic

Example:
```typescript
const loginPage = new LoginPage(page);
await loginPage.open();
await loginPage.login(username, password);
```

## ⚙️ Configuration

- **Base URL**: `https://www.saucedemo.com`
- **Browser**: Chromium (configurable in `playwright.config.ts`)
- **Test Directory**: `./tests`
- **Reporters**: List, HTML

## 📊 Test Reports

After running tests, view the HTML report:
```bash
npx playwright show-report
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

ISC
