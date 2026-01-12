import { test, expect } from "../fixtures/todo.fixture";
import { TODO_DATA } from "../test-data/todo.data";

test.describe("TodoMVC Technical Exam - State Suite", () => {
  test('TC_005: Multi-tab Sync (Refresh)', async ({ context, todoPage, page }) => {
    // Step 1: Open second tab
    const pageTwo = await context.newPage();
    const todoPageTwo = new (require('../pages/todo.page').TodoPage)(pageTwo);
    await todoPageTwo.goto();

    // Step 2: Add task in Tab 1
    await todoPage.addTodo(TODO_DATA.TC_005.itemText);
    
    // Step 3: Check Tab 2 (should not show yet)
    await expect(pageTwo.getByText(TODO_DATA.TC_005.itemText)).not.toBeVisible();
    
    // Step 4: Refresh Tab 2
    await pageTwo.reload();
    // Expected Result: Task is now visible in Tab 2
    await expect(pageTwo.getByText(TODO_DATA.TC_005.itemText)).toBeVisible();
  });
  test('TC_006: XPath/Locator Stability', async ({ todoPage }) => {
    // Step 1: Interact using the XPath-defined locator in the Page Object
    await todoPage.todoInput.fill(TODO_DATA.TC_006.itemText);
    await todoPage.todoInput.press('Enter');
    // Expected Result: Element found and task added correctly
    await expect(todoPage.todoItems).toContainText([TODO_DATA.TC_006.itemText]);
  });

  test('TC_007: Data Persistence', async ({ todoPage, page }) => {
    // Step 1: Add task
    await todoPage.addTodo(TODO_DATA.TC_007.itemText);
    // Step 2: Refresh page
    await page.reload();
    // Expected Result: Task remains after reload
    await expect(todoPage.todoItems).toHaveText([TODO_DATA.TC_007.itemText]);
  });
});