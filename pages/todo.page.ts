import { Page, Locator } from '@playwright/test';

export class TodoPage {
  readonly page: Page;
  readonly todoInput: Locator;
  readonly todoItems: Locator;
  readonly mainSection: Locator;
  readonly filterAll: Locator;
  readonly filterActive: Locator;
  readonly filterCompleted: Locator;
  readonly todoCount: Locator;
  readonly clearCompletedButton: Locator;

  
  constructor(page: Page) {
    this.page = page;
    
    // TC_006: Using XPath for the main input field to ensure stability
    this.todoInput = page.locator('xpath=//input[@class="new-todo"]');
    
    // Locating the list of todo items
    this.todoItems = page.locator('.todo-list li');
    
    // Main section is used to check visibility of the list
    this.mainSection = page.locator('.main');

    this.filterAll = page.getByRole('link', { name: 'All' });
    this.filterActive = page.getByRole('link', { name: 'Active' });
    this.filterCompleted = page.getByRole('link', { name: 'Completed' });
    this.todoCount = page.locator('.todo-count');
    this.clearCompletedButton = page.locator('.clear-completed');

  }

  /**
   * Navigates to the TodoMVC demo application
   */
  async goto() {
    await this.page.goto('https://demo.playwright.dev/todomvc/#/');
  }

  /**
   * Adds a new todo item to the list
   * @param text The string to be added
   */
  async addTodo(text: string) {
    await this.todoInput.fill(text);
    await this.todoInput.press('Enter');
  }

  /**
   * Edits an existing todo item
   * @param oldText The current text of the item
   * @param newText The new text to replace it with
   */

  async editTask(oldText: string, newText: string) {
    const todo = this.todoItems.filter({ hasText: oldText });
    await todo.dblclick(); // Enters edit mode
    
    const editInput = todo.locator('.edit');
    await editInput.fill(newText);
    await editInput.press('Enter');
  }

  /**
   * Toggles the completion checkbox of a specific task
   * @param text The text of the task to toggle
   */

  async toggleTask(text: string) {
    const todo = this.todoItems.filter({ hasText: text });
    // Using XPath for the checkbox within the list item
    await todo.locator('xpath=.//input[@type="checkbox"]').click();
  }

  /**
   * Deletes a task by clicking the destroy (X) button
   * @param text The text of the task to delete
   */
  
  async deleteTask(text: string) {
    const todo = this.todoItems.filter({ hasText: text });
    // The destroy button is only visible on hover in TodoMVC
    await todo.hover();
    await todo.locator('.destroy').click();
  }

  async selectFilter(filter: 'All' | 'Active' | 'Completed') {
    if (filter === 'All') await this.filterAll.click();
    if (filter === 'Active') await this.filterActive.click();
    if (filter === 'Completed') await this.filterCompleted.click();
  }
}