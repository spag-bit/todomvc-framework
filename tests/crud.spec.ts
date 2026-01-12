import { test, expect } from "../fixtures/todo.fixture";
import { TODO_DATA } from "../test-data/todo.data";
test.describe("TodoMVC Technical Exam - State Suite", () => {
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
});


