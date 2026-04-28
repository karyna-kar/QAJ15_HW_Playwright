import { Locator, Page } from '@playwright/test';

export class Footer {
  readonly footerContainer: Locator;
  readonly socialIconLinks: Locator;
  readonly socialIconTwitter:Locator;
  readonly socialIconFacebook:Locator;
  readonly socialIconlinkedin:Locator;
  readonly copyRightText:Locator;

  constructor(page: Page) {
    this.footerContainer = page.locator('.footer');
    this.socialIconLinks = this.footerContainer.locator('.social');
    this.socialIconTwitter = this.socialIconLinks.locator('.social_twitter');
    this.socialIconFacebook = this.socialIconLinks.locator('.social_facebook');
    this.socialIconlinkedin = this.socialIconLinks.locator('.social_linkedin');
    this.copyRightText = this.footerContainer.locator('.footer_copy');
  }
}
