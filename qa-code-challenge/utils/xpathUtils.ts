import { Page, Locator } from '@playwright/test';

export function getRowByAccountId(page: Page, accountId: string): Locator {
  return page.locator(`//a[text()='${accountId}']/ancestor::tr`);
}