import { Locator, Page } from '@playwright/test';
import { BasePageLoggedIn } from './base_page_logged_in';

export class CheckoutStepOne extends BasePageLoggedIn {
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly cancelButton: Locator;
  readonly continueButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page, 'https://www.saucedemo.com/checkout-step-one.html');
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.errorMessage = page.locator('.error-message-container.error');
  }
}
