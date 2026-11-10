
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

// File-level configuration for authenticated tests
test.use({
  trace: 'off',
  screenshot: 'off',
  video: 'off'
});

test('Verify valid login with credentials', async ({ page }) => {

  const email = process.env.VWO_TEST_EMAIL?.trim() ?? '';
  const password = process.env.VWO_TEST_PASSWORD ?? '';

  // Skip when no authorized test account is available
  test.skip(
    !email || !password,
    'Valid VWO credentials unavailable. Test skipped.'
  );

  const loginPage = new LoginPage(page);

  await loginPage.navigateToLogin();
  await loginPage.login(email, password);

  // Preliminary check; verify dashboard once an account is available
  await expect(page).not.toHaveURL(/#\/login(?:\?|$)/);
});
