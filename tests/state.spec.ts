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

  test('TC_007: Data Persistence', async ({ todoPage, page }) => {
    // Step 1: Add task
    await todoPage.addTodo(TODO_DATA.TC_007.itemText);
    // Step 2: Refresh page
    await page.reload();
    // Expected Result: Task remains after reload
    await expect(todoPage.todoItems).toHaveText([TODO_DATA.TC_007.itemText]);
  });
});