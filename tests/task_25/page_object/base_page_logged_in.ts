import { BasePage } from './base_page';
import { Footer } from './elements/footer';
import { Page } from '@playwright/test';

export class BasePageLoggedIn extends BasePage{
  readonly footer: Footer;

  constructor(page: Page, url: string)
  {
    super(page, url);
    this.footer = new Footer(page);
  }

}