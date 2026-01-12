# 🚀 TodoMVC Playwright Framework

A Playwright + TypeScript test framework for the TodoMVC demo app. Built with Page Object Model (POM), custom fixtures, and data-driven tests to be clear, maintainable, and easy to extend.

---

## Quick overview

- Playwright tests written in TypeScript  
- Page objects live in `pages/`  
- Fixtures live in `fixtures/` and provide the `todoPage` object to tests  
- Test data in `test-data/` for reproducible scenarios

---

## Prerequisites

- Node.js 16+  
- npm (or yarn)

---

## Setup

1. Clone repo
   ```bash
   git clone https://github.com/spag-bit/todomvc-framework.git
   cd todomvc-framework
   ```
2. Install dependencies
   ```bash
   npm install
   ```
3. Install Playwright browsers
   ```bash
   npx playwright install
   ```

---

## Run tests

- Run full suite (default)
  ```bash
  npx playwright test
  ```
- Run all tests in headed mode
  ```bash
  npx playwright test --headed
  ```
- Run a single spec
  ```bash
  npx playwright test tests/todo.spec.ts
  ```
- Debug mode (Playwright inspector)
  ```bash
  npx playwright test --debug
  ```
- Show HTML report after run
  ```bash
  npx playwright show-report
  ```

If your package.json defines helper scripts, you can also use:
- npm run test:crud — core add/edit/delete scenarios  
- npm run test:filters — filter-specific scenarios  
- npm run test:edge — multi-tab / compatibility / persistence tests

---

## Test cases mapped

- TC_001 — Add Todo: placeholder, auto-clear, items left count  
- TC_002 — Edit Todo: edit across All, Active, Completed filters  
- TC_003 — Filters: complete flow, Clear Completed visibility, count  
- TC_004 — Delete: hover → click delete (item removal)  
- TC_005 — Multi-Tab: sync between tabs  
- TC_006 — Compatibility: XPath/locator checks across browsers  
- TC_007 — Storage: LocalStorage persistence after reload

---

## Project structure

```
.
├── .github/workflows/    # CI (Playwright workflow)
├── fixtures/             # Custom Playwright fixtures
├── pages/                # Page Object Models
├── test-data/            # Test data (DDT)
├── tests/                # Test specs
├── playwright.config.ts  # Playwright config
└── README.md
```

---

## Reporting & artifacts

On failures the framework captures:
- HTML report (use `npx playwright show-report`)  
- Trace Viewer (timeline with DOM and network)  
- Videos/screenshots saved under `test-results/` (when enabled)

---