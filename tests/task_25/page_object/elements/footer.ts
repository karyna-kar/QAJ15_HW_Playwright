import { Locator, Page } from '@playwright/test';

export class Footer {
  readonly footerContainer: Locator;
  readonly socialIconLinks: Locator;
  readonly socialIconTwitter: Locator;
  readonly socialIconFacebook: Locator;
  readonly socialIconlinkedin: Locator;
  readonly copyRightText: Locator;

  constructor(page: Page) {
    this.footerContainer = page.locator('.footer');
    this.socialIconLinks = this.footerContainer.locator('.social a');
    this.socialIconTwitter = this.footerContainer.locator('[data-test="social-twitter"]');
    this.socialIconFacebook = this.footerContainer.locator('[data-test="social-facebook"]');
    this.socialIconlinkedin = this.footerContainer.locator('[data-test="social-linkedin"]');
    this.copyRightText = this.footerContainer.locator('.footer_copy');
  }
}
