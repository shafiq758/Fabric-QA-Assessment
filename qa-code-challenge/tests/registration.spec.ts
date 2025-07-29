import { test, expect, request } from '@playwright/test';

import { RegistrationPage } from '../pages/RegistrationPage';
import {
  getRandomFirstName,
  getRandomLastName,
  getRandomUsername,
  getRandomPassword,
  getRandomAddress,
  getRandomAustralianCity,
  getRandomAustralianState,
  getRandomAustralianZip,
  getRandomAustralianPhone
} 


from '../utils/randomUtils';
import { getRowByAccountId } from '../utils/xpathUtils';
const firstName = getRandomFirstName();
const lastName = getRandomLastName();
let page;
let username, password, accountId;

test.describe('Test Case Execution for Fabric QA-code Challenge', () => {
  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    page = await context.newPage();

    const registrationPage = new RegistrationPage(page);
    const firstName = getRandomFirstName();
    const lastName = getRandomLastName();
    username = getRandomUsername();
    password = getRandomPassword();

    await registrationPage.navigate();
    await registrationPage.goToRegister();

    await registrationPage.fillRegistrationForm({
      firstName,
      lastName,
      address: getRandomAddress(),
      city: getRandomAustralianCity(),
      state: getRandomAustralianState(),
      zip: getRandomAustralianZip(),
      phone: getRandomAustralianPhone(),
      ssn: '466575981',
      username,
      password
    });

    await registrationPage.submitRegistration();
  });

  test('Verify registration success and logout', async () => {
    await expect(page.locator('h1')).toContainText(`Welcome ${username}`);
    await page.getByRole('link', { name: 'Log Out' }).click();
  });

  test('Login with newly created credentials', async () => {
    await page.locator('input[name="username"]').fill(username);
    await page.locator('input[name="password"]').fill(password);
    await page.getByRole('button', { name: 'Log In' }).click();
    await expect(page.getByRole('link', { name: 'Log Out' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Open New Account' })).toBeVisible({ timeout: 10000 });
  });

  test('Open new account and validate $100.00 balance', async () => {
    await page.getByRole('link', { name: 'Open New Account' }).click();
    await page.waitForTimeout(5000);
    await page.getByRole('button', { name: 'Open New Account' }).click();
    await page.waitForTimeout(5000);
    accountId = await page.locator('#newAccountId').innerText();
    await page.getByRole('link', { name: 'Accounts Overview' }).click();
    const accountRow = getRowByAccountId(page, accountId);
    const balanceText = await accountRow.locator('td').nth(1).innerText();
    expect(balanceText.trim()).toBe('$100.00');
  });

  test('Pay bill and validate $50.00 deduction', async () => {
   // const firstName = getRandomFirstName();
    //const lastName = getRandomLastName();

    await page.getByRole('link', { name: 'Bill Pay' }).click();
    await page.locator('input[name="payee.name"]').fill(`${firstName} ${lastName}`);
    await page.locator('input[name="payee.address.street"]').fill(getRandomAddress());
    await page.locator('input[name="payee.address.city"]').fill(getRandomAustralianCity());
    await page.locator('input[name="payee.address.state"]').fill(getRandomAustralianState());
    await page.locator('input[name="payee.address.zipCode"]').fill(getRandomAustralianZip());
    await page.locator('input[name="payee.phoneNumber"]').fill(getRandomAustralianPhone());
    await page.locator('input[name="payee.accountNumber"]').fill('14122');
    await page.locator('input[name="verifyAccount"]').fill('14122');
    await page.locator('input[name="amount"]').fill('50');

    await page.getByRole('combobox').selectOption(accountId);
    await page.getByRole('button', { name: 'Send Payment' }).dblclick();
      await page.waitForTimeout(10000); // wait for 5 seconds
    await expect(page.locator('#billpayResult')).toContainText(
      `Bill Payment to ${firstName} ${lastName} in the amount of $50.00 from account ${accountId} was successful.`
    );

    await page.getByRole('link', { name: 'Accounts Overview' }).click();
    const accountLink = page.locator(`//a[text()="${accountId}"]`);
    await expect(accountLink).toBeVisible({ timeout: 10000 });

    const accountRow = accountLink.locator('xpath=ancestor::tr');
    const balanceText = await accountRow.locator('td').nth(1).innerText();
          await page.waitForTimeout(10000); // wait for 5 seconds

    expect(balanceText.trim()).toBe('$50.00');
  });




test('Login via API and validate bill payment transaction', async () => {
 // const username = 'yourGeneratedUsername';
  //const password = 'yourPassword';
  //const accountId = 'yourAccountId'; // captured from UI step
  const amount = 50;
  //const expectedName = 'e'; // First name used in bill payment

  // Step 1: Create a request context
  const context = await request.newContext();

  // Step 2: Login via POST to /login.htm
  const loginResponse = await context.post('https://parabank.parasoft.com/parabank/login.htm', {
    form: {
      username,
      password
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });

  expect(loginResponse.ok()).toBeTruthy();

  // Step 3: Use same context to call the protected transaction API
  const url = `https://parabank.parasoft.com/parabank/services_proxy/bank/accounts/${accountId}/transactions/amount/${amount}?timeout=30000`;

  // Optional: wait to ensure transaction is indexed
  await new Promise(resolve => setTimeout(resolve, 5000));

  const transactionResponse = await context.get(url);
  expect(transactionResponse.ok()).toBeTruthy();

  const transactions = await transactionResponse.json();
  expect(Array.isArray(transactions)).toBe(true);
  expect(transactions.length).toBeGreaterThan(0);

  const transaction = transactions.find(t => t.amount === amount);

  expect(transaction).toBeDefined();
  expect(transaction.accountId).toBe(Number(accountId));
  expect(transaction.amount).toBe(amount);
  expect(transaction.type).toBe('Debit');
  expect(transaction.description).toContain(`Bill Payment to ${firstName}`);
});


  test.afterAll(async () => {
    await page.close();
  });
});