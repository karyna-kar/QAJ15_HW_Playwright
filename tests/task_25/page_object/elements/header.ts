import { Locator, Page } from '@playwright/test';
import { BurgerMenu } from './burgerMenu';

export class Header {
  readonly headerContainer: Locator;
  readonly appLogo: Locator;
  readonly shoppingCartLink: Locator;
  readonly shoppingCartCounter: Locator;
  readonly burgerMenu: BurgerMenu;

  constructor(page: Page) {
    this.headerContainer = page.locator('.header_label');
    this.appLogo = this.headerContainer.locator('.app_logo');
    this.shoppingCartLink = this.headerContainer.locator('[data-test="shopping-cart-link"]');
    this.shoppingCartCounter = page.locator('[data-test="shopping-cart-badge"]');
    this.burgerMenu = new BurgerMenu(page);
  }
}
