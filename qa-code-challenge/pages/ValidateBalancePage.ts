import { Page, expect } from '@playwright/test';
import { getRowByAccountId } from '../utils/xpathUtils';

export class ValidateBalancePage {
  constructor(private page: Page) {}

  async validateBalance(accountId: string, expectedAmount: string) {
    await this.page.getByRole('link', { name: 'Accounts Overview' }).click();
    const accountRow = getRowByAccountId(this.page, accountId);
    const balanceText = await accountRow.locator('td').nth(1).innerText();
    expect(balanceText.trim()).toBe(expectedAmount);
  }
}