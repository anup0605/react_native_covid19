import { by, element, expect } from 'detox';

export function testWelcomeScreen() {
  describe('Test the welcome screen', () => {
    it('should show a map', async () => {
      await expect(element(by.id('map'))).toBeVisible();
    });

    it('should show a login button', async () => {
      await expect(element(by.id('login-link'))).toBeVisible();
    });

    it('should show a select country button', async () => {
      await expect(element(by.id('select-country'))).toBeVisible();
    });

    it('should show a create account button', async () => {
      await expect(element(by.id('create-account-1'))).toExist();
    });
  });
}
