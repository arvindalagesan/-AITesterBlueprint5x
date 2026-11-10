
import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;
  readonly forgotPasswordButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.emailInput = page.getByRole('textbox', {
      name: 'Email address'
    });

    this.passwordInput = page.getByRole('textbox', {
      name: 'Password'
    });

    this.signInButton = page.getByRole('button', {
      name: 'Sign in',
      exact: true
    });


this.forgotPasswordButton = page.getByRole('button', {
  name: 'Forgot Password?',
  exact: true
});

  }

  async navigateToLogin(): Promise<void> {
    await this.page.goto('/#/login');
  }

  async enterEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
  }

  async enterPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  async clickSignIn(): Promise<void> {
    await this.signInButton.click();
  }

  async login(email: string, password: string): Promise<void> {
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.clickSignIn();

  }


async clickForgotPassword(): Promise<void> {
  await this.forgotPasswordButton.click();
}

}
