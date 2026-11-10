
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('VWO Login Tests', () => {

  // TEST CASE 1: Invalid Login
  test('Verify invalid login credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigateToLogin();

    await expect(loginPage.emailInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.signInButton).toBeVisible();

    await loginPage.login(
      'invalid@example.com',
      'WrongPassword123!'
    );

    const errorMessage = page.getByText(
      'Your email, password, IP address or location did not match'
    );

    await expect(errorMessage).toBeVisible();
    await expect(loginPage.signInButton).toBeVisible();
  });


  // TEST CASE 2: Empty Email and Password
  // ADD THE NEW TEST HERE

test('Verify login with empty email and password', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.navigateToLogin();

  // Verify both fields are initially empty
  await expect(loginPage.emailInput).toBeEmpty();
  await expect(loginPage.passwordInput).toBeEmpty();

  // Attempt login without credentials
  await loginPage.clickSignIn();

  // Verify the observed error message
  await expect(
    page.getByText(
      'Your email, password, IP address or location did not match'
    )
  ).toBeVisible();

  // Verify login form remains available
  await expect(loginPage.signInButton).toBeVisible();
});


  // TEST CASE 3: Invalid Email Format
  test('Verify login with invalid email format', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Navigate to VWO login page
    await loginPage.navigateToLogin();

    // Enter invalid email format
    await loginPage.enterEmail('invalidemail');

    // Enter synthetic invalid password
    await loginPage.enterPassword('WrongPassword123!');

    // Click Sign in
    await loginPage.clickSignIn();

    // Verify the observed error message
    await expect(
      page.getByText(
        'Your email, password, IP address or location did not match'
      )
    ).toBeVisible();

    // Verify the login form remains available
    await expect(loginPage.signInButton).toBeVisible();
  });


  // TEST CASE 5: Forgot Password Navigation
  test('Verify Forgot Password navigation', async ({ page }) => {

    const loginPage = new LoginPage(page);

    // Navigate to the VWO login page
    await loginPage.navigateToLogin();

    // Verify Forgot Password button is visible
    await expect(loginPage.forgotPasswordButton).toBeVisible();

    // Click Forgot Password
    await loginPage.clickForgotPassword();

    // Verify navigation to the password recovery page
    await expect(page).toHaveURL(
      'https://app.wingify.com/#/forgot-password'
    );

  });


});
