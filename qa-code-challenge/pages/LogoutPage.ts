import { Page } from '@playwright/test';

export class LogoutPage {
  constructor(private page: Page) {}

  async logout() {
    await this.page.getByRole('link', { name: 'Log Out' }).click();
  }
}