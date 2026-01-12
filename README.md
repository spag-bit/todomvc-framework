# TodoMVC Framework

A Playwright-based automated testing framework for TodoMVC applications with comprehensive test coverage using the Page Object Model pattern.

## Prerequisites

- Node.js 16+ 
- npm or yarn

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

## Test Cases

- **TC_001**: Add New Todo Item and Verify UI State
- **TC_002**: Verify user can edit tasks in All, Active, and Completed filters
- **TC_003**: Mark task as completed and verify filter behavior

## Architecture

This framework follows the **Page Object Model (POM)** pattern for better maintainability and reusability of test code.