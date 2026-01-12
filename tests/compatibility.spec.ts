import { test, expect } from "../fixtures/todo.fixture";
import { TODO_DATA } from "../test-data/todo.data";

test.describe("TodoMVC Technical Exam - Compatibility Suite", () => {

    test("TC_006: XPath/Locator Stability", async ({ todoPage }) => {
    // Step 1: Interact using the XPath-defined locator in the Page Object
    await todoPage.todoInput.fill(TODO_DATA.TC_006.itemText);
    await todoPage.todoInput.press('Enter');
    // Expected Result: Element found and task added correctly
    await expect(todoPage.todoItems).toContainText([TODO_DATA.TC_006.itemText]);
    });
});