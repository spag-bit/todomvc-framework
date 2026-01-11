# TodoMVC Framework

A Playwright-based automated testing framework for TodoMVC applications.

## Setup Instructions

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Install Playwright browsers**
   ```bash
   npx playwright install
   ```

## Running Tests

**Run all tests**
```bash
npx playwright test
```

**Run tests in headed mode (see browser)**
```bash
npx playwright test --headed
```

**Run specific test file**
```bash
npx playwright test tests/todo.spec.ts
```

**Run tests in debug mode**
```bash
npx playwright test --debug
```

**View test report**
```bash
npx playwright show-report
```

## Project Structure

```
TodoMVC-framework/
├── fixtures/          # Test fixtures and setup
├── pages/             # Page Object Models
├── tests/             # Test specifications
├── test-data/         # Test data files
└── playwright.config.ts
```

## Prerequisites

- Node.js 16+ 
- npm or yarn
