import { Locator, Page } from '@playwright/test';
import { BasePageLoggedIn } from './base_page_logged_in';

export class CartPage extends BasePageLoggedIn {
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;
  readonly cartList: Locator;
  readonly deleteButtons: Locator;

  constructor(page: Page) {
    super(page, 'https://www.saucedemo.com/cart.html');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    this.cartList = page.locator('[data-test="inventory-item"]');
    this.deleteButtons = this.cartList.locator('[data-test^="remove-"]');
  }

  async addSeveralItems(ids: number[]) {
    const addingItemsIds = ids;
    await this.page.evaluate(items => {
      localStorage.setItem('cart-contents', JSON.stringify(items));
    }, addingItemsIds);

    await this.page.reload();
  }
}
