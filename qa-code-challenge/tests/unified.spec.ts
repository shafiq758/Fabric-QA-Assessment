import { test } from '@playwright/test';
import { RegistrationPage } from '../pages/RegistrationPage';
import { LoginPage } from '../pages/LoginPage';
import { LogoutPage } from '../pages/LogoutPage';
import { OpenAccountPage } from '../pages/OpenAccountPage';
import { ValidateBalancePage } from '../pages/ValidateBalancePage';
import { PayBillPage } from '../pages/PayBillPage';
import {
  getRandomFirstName,
  getRandomLastName,
  getRandomUsername,
  getRandomPassword,
  getRandomAddress,
  getRandomAustralianCity,
  getRandomAustralianState,
  getRandomAustralianZip,
  getRandomAustralianPhone,
} from '../utils/randomUtils';

test('User journey: register, login, open account, validate balance, pay bill, logout', async ({ page }) => {
  const registrationPage = new RegistrationPage(page);
  const loginPage = new LoginPage(page);
  const logoutPage = new LogoutPage(page);
  const openAccountPage = new OpenAccountPage(page);
  const validateBalancePage = new ValidateBalancePage(page);
  const payBillPage = new PayBillPage(page);

  // Generate random user data
  const firstName = getRandomFirstName();
  const lastName = getRandomLastName();
  const username = getRandomUsername();
  const password = getRandomPassword();
  const address = getRandomAddress();
  const city = getRandomAustralianCity();
  const state = getRandomAustralianState();
  const zip = getRandomAustralianZip();
  const phone = getRandomAustralianPhone();
  const ssn = '123-45-6789'; // Dummy value

  // Registration
  await registrationPage.navigate();
  await registrationPage.goToRegister();
  await registrationPage.fillRegistrationForm({
    firstName,
    lastName,
    address,
    city,
    state,
    zip,
    phone,
    ssn,
    username,
    password,
  });
  await registrationPage.submitRegistration();

  // Login
  await loginPage.login(username, password);

  // Open new account with hardcoded account ID
  //await openAccountPage.openNewAccount('SAVINGS', '12345');

  // Validate balance using hardcoded account number
  await validateBalancePage.validateBalance('12345678');

  // Pay bill using random data except account number
  await payBillPage.payBill({
    payee: `${firstName} ${lastName}`,
    account: '12345678',
    amount: '100.00',
    date: '2025-08-01',
  });

  // Logout
  await logoutPage.logout();
});