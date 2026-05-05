import { Locator, Page } from '@playwright/test';

export class BurgerMenu {
  readonly burgerMenuContainer: Locator;
  readonly allItemLink: Locator;
  readonly aboutLink: Locator;
  readonly logoutLink: Locator;
  readonly resetLink: Locator;
  readonly closeButton: Locator;
  readonly burgerMenuButton: Locator;

  constructor(page: Page) {
    this.burgerMenuContainer = page.locator('.bm-menu-wrap');
    this.allItemLink = this.burgerMenuContainer.locator('[data-test="inventory-sidebar-link"]');
    this.aboutLink = this.burgerMenuContainer.locator('[data-test="about-sidebar-link"]');
    this.logoutLink = this.burgerMenuContainer.locator('[data-test="logout-sidebar-link"]');
    this.resetLink = this.burgerMenuContainer.locator('[data-test="reset-sidebar-link"]');
    this.closeButton = this.burgerMenuContainer.locator('#react-burger-cross-btn');
    this.burgerMenuButton = page.locator('#react-burger-menu-btn');
  }

  async isMenuOpen() {
    return (await this.burgerMenuContainer.getAttribute('aria-hidden')) === 'false';
  }

  async openMenu() {
    if ((await this.isMenuOpen()) === false) {
      await this.burgerMenuButton.click();
      return await this.burgerMenuContainer.waitFor({ state: 'visible', timeout: 3000 });
    }
    throw new Error('Burger menu is alredy opened');
  }

  async closeMenu() {
    if (await this.isMenuOpen()) {
      await this.closeButton.click();
      return await this.burgerMenuContainer.waitFor({ state: 'hidden', timeout: 3000 });
    }
    throw new Error('Burger menu is alredy closed');
  }
}
