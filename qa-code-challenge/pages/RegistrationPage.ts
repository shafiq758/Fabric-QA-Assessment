import { Page, expect } from '@playwright/test';

export class RegistrationPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto('https://parabank.parasoft.com/');
  }

  async goToRegister() {
    await this.page.getByRole('link', { name: 'Register' }).click();
    await expect(this.page.locator('h1')).toContainText('Signing up is easy!');
  }

  async fillRegistrationForm(data: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
    ssn: string;
    username: string;
    password: string;
  }) {
    await this.page.locator('input[name="customer.firstName"]').fill(data.firstName);
    await this.page.locator('input[name="customer.lastName"]').fill(data.lastName);
    await this.page.locator('input[name="customer.address.street"]').fill(data.address);
    await this.page.locator('input[name="customer.address.city"]').fill(data.city);
    await this.page.locator('input[name="customer.address.state"]').fill(data.state);
    await this.page.locator('input[name="customer.address.zipCode"]').fill(data.zip);
    await this.page.locator('input[name="customer.phoneNumber"]').fill(data.phone);
    await this.page.locator('input[name="customer.ssn"]').fill(data.ssn);
    await this.page.locator('input[name="customer.username"]').fill(data.username);
    await this.page.locator('input[name="customer.password"]').fill(data.password);
    await this.page.locator('input[name="repeatedPassword"]').fill(data.password);
  }

  async submitRegistration() {
    await this.page.getByRole('button', { name: 'Register' }).click();
    await expect(this.page.locator('#rightPanel')).toContainText('Your account was created successfully');
  }
}