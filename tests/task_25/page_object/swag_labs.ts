import { Page } from '@playwright/test';
import { LoginPage } from './login_page';
import { InventoryPage } from './inventory_page';
import { CartPage } from './cart_page';
import { CeckoutStepOne } from './checkout_step_one_page';

export class SwagLabs {
  readonly loginPage: LoginPage;
  readonly inventoryPage: InventoryPage;
  readonly cartPage: CartPage;
  readonly checkoutStepOne: CeckoutStepOne;

  constructor(page: Page) {
    this.loginPage = new LoginPage(page);
    this.inventoryPage = new InventoryPage(page);
    this.cartPage = new CartPage(page);
    this.checkoutStepOne = new CeckoutStepOne(page);
  }
}
