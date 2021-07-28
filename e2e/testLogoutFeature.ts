import { by, element } from 'detox';

export function testLogoutFeature() {
  describe('Test the logout functionality', () => {
    it('should open the profile screen', async () => {
      await element(by.id('drawer-toggle')).tap();
    });
    it('should logout the user', async () => {
      await element(by.id('menu-item-logout')).tap();
    });
    // It would be better if the user directly goes to the home screen.
    it('should complete the select country screen (if present)', async () => {
      try {
        await element(by.id('select-country-GB')).tap();
      } catch (_) {}
    });
  });
}
