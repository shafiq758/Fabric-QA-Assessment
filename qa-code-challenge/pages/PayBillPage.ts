import { Page, expect } from '@playwright/test';

export class PayBillPage {
  constructor(private page: Page) {}

  async payBill({
    fullName,
    street,
    city,
    state,
    zip,
    phone,
    accountNumber,
    amount,
    fromAccountId
  }: {
    fullName: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
    accountNumber: string;
    amount: string;
    fromAccountId: string;
  }) {
    await this.page.getByRole('link', { name: 'Bill Pay' }).click();
    await this.page.locator('input[name="payee.name"]').fill(fullName);
    await this.page.locator('input[name="payee.address.street"]').fill(street);
    await this.page.locator('input[name="payee.address.city"]').fill(city);
    await this.page.locator('input[name="payee.address.state"]').fill(state);
    await this.page.locator('input[name="payee.address.zipCode"]').fill(zip);
    await this.page.locator('input[name="payee.phoneNumber"]').fill(phone);
    await this.page.locator('input[name="payee.accountNumber"]').fill(accountNumber);
    await this.page.locator('input[name="verifyAccount"]').fill(accountNumber);
    await this.page.locator('input[name="amount"]').fill(amount);
    await this.page.getByRole('combobox').selectOption(fromAccountId);
    await this.page.getByRole('button', { name: 'Send Payment' }).click();
  }

  async verifyPaymentMessage(fullName: string, accountId: string, amount: string) {
    await expect(this.page.locator('#billpayResult')).toContainText(
      `Bill Payment to ${fullName} in the amount of $${amount} from account ${accountId} was successful.`
    );
  }
}