import { Page } from '@playwright/test';

export class OpenAccountPage {
  constructor(private page: Page) {}

  async openNewAccount() {
    await this.page.getByRole('link', { name: 'Open New Account' }).click();
    await this.page.waitForTimeout(5000);
    await this.page.getByRole('button', { name: 'Open New Account' }).click();
    await this.page.waitForTimeout(5000);
  }

  async getNewAccountId(): Promise<string> {
    return await this.page.locator('#newAccountId').innerText();
  }
}