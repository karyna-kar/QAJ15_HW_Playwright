import { Locator, Page } from '@playwright/test';
import { BasePageLoggedIn } from './base_page_logged_in';

export class InventoryPage extends BasePageLoggedIn {
  readonly pageTitle: Locator;
  readonly inventoryItems: Locator;

  constructor(page: Page) {
    super(page, 'https://www.saucedemo.com/inventory.html');
    this.pageTitle = page.locator('.title');
    this.inventoryItems = page.locator('.inventory_item');
  }

  async addRandomItemToTheCart() {
    const count = await this.inventoryItems.count();
    const randomIndex = Math.floor(Math.random() * count);
    const randomItem = this.inventoryItems.nth(randomIndex);
    const addButton = randomItem.locator('button');
    await addButton.click();
    return randomItem;
  }

  async getItemRemoveButton(randomItem: Locator): Promise<Locator> {
    const removeButton = randomItem.locator('[data-test^="remove-"]');
    return removeButton;
  }

  async getItemAddButton(randomItem: Locator): Promise<Locator> {
    const addButton = randomItem.locator('[data-test^="add-to-cart-"]');
    return addButton;
  }
}
