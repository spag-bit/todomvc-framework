import { test, expect } from '../fixtures/todo.fixture';
import { TODO_DATA } from '../test-data/todo.data';

test.describe('TodoMVC Technical Exam - Automated Suite', () => {

  test('TC_001: Add New Todo Item and Verify UI State', async ({ todoPage }) => {
  const { itemText, placeholderText, expectedCountText } = TODO_DATA.TC_001;

  // --- STEP 1: Check Input Field State ---
  await test.step('Step 1: Verify input field is active and has correct placeholder', async () => {
    // Validation 1: Input field should be visible and editable
    await expect(todoPage.todoInput).toBeVisible();
    await expect(todoPage.todoInput).toBeEditable();

    // Validation 2: Verify placeholder text "What needs to be done?"
    await expect(todoPage.todoInput).toHaveAttribute('placeholder', placeholderText);
  });

  // --- STEP 2: Type Data ---
  await test.step(`Step 2: Type "${itemText}" into the input field`, async () => {
    await todoPage.todoInput.fill(itemText);
    
    // Validation: Verify text is inside the input before pressing Enter
    await expect(todoPage.todoInput).toHaveValue(itemText);
  });

  // --- STEP 3: Press Enter and Verify Results ---
  await test.step('Step 3: Press Enter and verify list, count, and input clearing', async () => {
    await todoPage.todoInput.press('Enter');

    // Validation 1: "Buy Groceries" should appear in the list
    await expect(todoPage.todoItems).toContainText([itemText]);

    // Validation 2: "Items left" count shows "1"
    // (Note: Ensure your Page Object has 'todoCount' defined from our previous steps)
    await expect(todoPage.todoCount).toContainText(expectedCountText);

    // Validation 3: Input field should be cleared (empty)
    await expect(todoPage.todoInput).toBeEmpty();

    // Validation 4: Placeholder "What needs to be done?" should return
    await expect(todoPage.todoInput).toHaveAttribute('placeholder', placeholderText);
  });
});

  test('TC_002: Verify user can edit tasks in All, Active, and Completed filters', async ({ todoPage, page }) => {
  const { initialTasks, editInAll, editInActive, editInCompleted } = TODO_DATA.TC_002;

  // --- PRECONDITIONS ---
  await test.step('Precondition: Ensure at least 2 tasks exist in the list', async () => {
    for (const task of initialTasks) {
      await todoPage.addTodo(task);
    }
    await expect(todoPage.todoItems).toHaveCount(2);
  });

  // --- TEST STEPS ---
  await test.step('Steps 1-3: Edit task in "All" filter', async () => {
    // 1. Double click and 2. Modify text
    await todoPage.editTask(editInAll.oldText, editInAll.newText);
    
    // 3. Verify update
    await expect(todoPage.todoItems).toContainText([editInAll.newText]);
    await expect(todoPage.todoItems).not.toContainText([editInAll.oldText]);
  });

 
  await test.step('Steps 4-7: Navigate to Active and edit task', async () => {
    // 4. Navigate to Active
    await todoPage.selectFilter('Active');
    await expect(page).toHaveURL(/.*active/);

    // 5. Double click and 6. Modify text
    await todoPage.editTask(editInActive.oldText, editInActive.newText);

    // 7. Verify update in Active view
    await expect(todoPage.todoItems).toContainText([editInActive.newText]);
  });

  await test.step('Steps 8-12: Complete task, Navigate to Completed, and Edit', async () => {
    // 8. Click circular checkbox (Mark 'Walk the dog' as completed)
    await todoPage.toggleTask(editInActive.newText);
    await expect(todoPage.todoItems).not.toContainText([editInActive.newText]);

    // 9. Navigate to Completed
    await todoPage.selectFilter('Completed');
    await expect(page).toHaveURL(/.*completed/);
    
    // Verify the task is visible here before editing
    await expect(todoPage.todoItems).toContainText([editInCompleted.oldText]);

    // 10. Double click and 11. Modify text (Walk the dog -> Go jogging)
    await todoPage.editTask(editInCompleted.oldText, editInCompleted.newText);

    // 12. Verify update
    await expect(todoPage.todoItems).toContainText([editInCompleted.newText]);
    });
  });

  test('TC_003: Mark task as completed and verify filter behavior', async ({ todoPage, page }) => {
  const { taskName } = TODO_DATA.TC_003;

  // --- PRECONDITION ---
  await test.step('Precondition: Create at least one task', async () => {
    await todoPage.addTodo(taskName);
    await expect(todoPage.todoItems).toHaveCount(1);
    // Initial State: 1 item left, Clear Completed button is HIDDEN
    await expect(todoPage.todoCount).toContainText('1 item left');
    await expect(todoPage.clearCompletedButton).toBeHidden();
  });

  // --- STEP 1: Mark as Completed ---
  await test.step('Step 1: Click the circular checkbox to complete the task', async () => {
    await todoPage.toggleTask(taskName);

    // Validation 1: Task text has strike-through (CSS class 'completed')
    const todoRow = todoPage.todoItems.filter({ hasText: taskName });
    await expect(todoRow).toHaveClass(/completed/);

    // Validation 2: "Items left" count decreases (should be 0)
    await expect(todoPage.todoCount).toContainText('0 items left');

    // Validation 3: "Clear completed" button pops out
    await expect(todoPage.clearCompletedButton).toBeVisible();
  });

  // --- STEP 2: Navigate to Active ---
  await test.step('Step 2: Navigate to "Active" filter', async () => {
    await todoPage.selectFilter('Active');
    await expect(page).toHaveURL(/.*active/);

    // Validation: Completed tasks must NOT be visible
    await expect(todoPage.todoItems).toHaveCount(0);
  });

  // --- STEP 3: Navigate to Completed ---
  await test.step('Step 3: Navigate to "Completed" filter', async () => {
    await todoPage.selectFilter('Completed');
    await expect(page).toHaveURL(/.*completed/);

    // Validation 1: Completed tasks SHOULD be visible
    await expect(todoPage.todoItems).toHaveCount(1);
    await expect(todoPage.todoItems).toHaveText([taskName]);

    // Validation 2: Checkbox should be checked (green check mark)
    const checkbox = todoPage.todoItems.first().locator('.toggle');
    await expect(checkbox).toBeChecked();
  });

  // --- STEP 4: Navigate to All ---
  await test.step('Step 4: Navigate to "All" filter', async () => {
    await todoPage.selectFilter('All');
    await expect(page).toHaveURL(/\/$/); // Matches root URL ending in /

    // Standard Behavior: Task should be visible but crossed out
    // (Note: Adjusted from manual test which said "removed")
    await expect(todoPage.todoItems).toHaveCount(1);
    const todoRow = todoPage.todoItems.filter({ hasText: taskName });
    await expect(todoRow).toHaveClass(/completed/);
  });

  // --- STEP 5: Navigate to Active (Again) ---
  await test.step('Step 5: Navigate to "Active" filter again', async () => {
    await todoPage.selectFilter('Active');
    
    // Validation: "Clear completed" tasks must not be visible
    await expect(todoPage.todoItems).not.toContainText([taskName]);
    });
  });
  test('TC_004: Delete specific task from multiple entries', async ({ todoPage }) => {
    const { initialItems, targetToDelete } = TODO_DATA.TC_004;
    
    // Step 1: Add multiple tasks
    await test.step('Step 1: Add initial tasks to the list', async () => {
      for (const item of initialItems) {
        await todoPage.addTodo(item);
      }
      await expect(todoPage.todoItems).toHaveCount(initialItems.length);
    });

    // Step 2: Hover over the specific task
    await test.step(`Step 2: Hover over "${targetToDelete}" to reveal delete button`, async () => {
      const targetRow = todoPage.todoItems.filter({ hasText: targetToDelete });
      await targetRow.hover();
    });

    // Step 3: Click the 'X' button
    await test.step(`Step 3: Click the 'X' button for "${targetToDelete}"`, async () => {
      // Calling the deleteTask method we built in the Page Object
      await todoPage.deleteTask(targetToDelete);
    });

    // Step 4: Verify results
    await test.step('Step 4: Verify only the target task was removed', async () => {
      // 1. Confirm the target is no longer in the list
      await expect(todoPage.todoItems).not.toContainText([targetToDelete]);

      // 2. Confirm other tasks are still present and in order
      const expectedRemaining = initialItems.filter(item => item !== targetToDelete);
      await expect(todoPage.todoItems).toHaveText(expectedRemaining);

      // 3. Confirm count is exactly 2
      await expect(todoPage.todoItems).toHaveCount(initialItems.length - 1);
    });
  });

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