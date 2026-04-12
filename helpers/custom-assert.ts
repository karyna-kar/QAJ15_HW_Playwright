import { expect as baseExpect } from '@playwright/test';
import { cartPageSelectors } from './selectors';

export const expect = baseExpect.extend({
  toMatchAddedItem: async (page, expectedItemName: string) => {
    try {
      const cartItems = await page.locator(cartPageSelectors.firstItemName);
      const actualItemName = await cartItems.first().textContent();

      if (actualItemName === null) {
        return {
          pass: false,
          message: () => 'Cart item is null'
        };
      }
      const ifTestPassed = actualItemName === expectedItemName;
      return ifTestPassed
        ? { message: () => 'Got expected cart item', pass: true }
        : { message: () => `Expected cart item to be "${expectedItemName}", but got "${actualItemName}"`, pass: false };
    } catch (error) {
      return {
        pass: false,
        message: () => `Error while checking cart item: ${error}`
      };
    }
  }
});

declare global {
  namespace PlaywrightTest {
    interface Matchers<R> {
      toMatchAddedItem(): R;
    }
  }
}
