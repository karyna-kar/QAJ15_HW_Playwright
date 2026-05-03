import { BasePage } from './base_page';
import { Footer } from './elements/footer';
import { Locator, Page } from '@playwright/test';
import { Header } from './elements/header';

export class BasePageLoggedIn extends BasePage {
  readonly footer: Footer;
  readonly header: Header;
  readonly pageTitle: Locator;

  constructor(page: Page, url: string) {
    super(page, url);
    this.footer = new Footer(page);
    this.header = new Header(page);
    this.pageTitle = page.locator('.title');
  }

  async logOut() {
    this.header.burgerMenu.openMenu();
    this.header.burgerMenu.logoutLink.click();
  }
}
