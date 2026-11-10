
# VWO Login Automation Framework

## AI Tester Blueprint 5X — RICE-POT Assignment

A Playwright automation framework developed using TypeScript and the Page Object Model (POM) design pattern.

This project is part of the AI Tester Blueprint 5X course assignment by Pramod Dutta.

## Application Under Test

URL: https://app.wingify.com/#/login

The framework is based on the provided VWO Login Dashboard Product Requirements Document.

## RICE-POT Method

The framework was developed using the RICE-POT prompt engineering approach:

- R — Role
- I — Instructions
- C — Context
- E — Example
- P — Parameters
- O — Output
- T — Tone

The complete prompt is available in:

`VWO_RICE_POT_Playwright_Prompt.md`

## Technology Stack

- Playwright
- TypeScript
- Node.js
- dotenv
- Page Object Model
- Playwright HTML Reporter

## Project Structure

```text
VWO-Login-Framework/
├── docs/
│   └── Product Requirements Document_ VWO Login Dashboard.pdf
├── pages/
│   └── LoginPage.ts
├── tests/
│   ├── vwo-login.spec.ts
│   └── vwo-valid-login.spec.ts
├── .env.example
├── .gitignore
├── playwright.config.ts
├── package.json
├── package-lock.json
├── tsconfig.json
├── VWO_RICE_POT_Playwright_Prompt.md
└── README.md
```

## Test Scenarios

| ID | Test Scenario | Status |
|---|---|---|
| TC01 | Invalid login credentials | Passed |
| TC02 | Empty email and password | Passed |
| TC03 | Invalid email format | Passed |
| TC04 | Valid login | Skipped |
| TC05 | Forgot Password navigation | Passed |

TC01–TC03 verify VWO's observed generic authentication error. TC03 does not establish dedicated email-format validation.

TC05 verifies navigation to the password recovery page, not the complete password-reset process.

TC04 requires an authorized VWO account.

## Installation

### 1. Install dependencies

```bash
npm ci
```

### 2. Install Chromium

```bash
npx playwright install chromium
```

### 3. Configure environment variables

Create a `.env` file using `.env.example` as a template.

```env
VWO_TEST_EMAIL=
VWO_TEST_PASSWORD=
```

Leave the values empty if valid test credentials are unavailable.

Never commit real credentials to GitHub.

## Running Tests

Run all Chromium tests:

```bash
npx playwright test --project=chromium
```

Run tests in headed mode:

```bash
npx playwright test --project=chromium --headed
```

Open the HTML report:

```bash
npx playwright show-report
```

Validate TypeScript:

```bash
npx tsc --noEmit
```

## Credential Handling

The framework uses dotenv to load environment variables.

The valid-login test automatically skips when either credential is unavailable.

Negative login tests use synthetic invalid credentials and do not require a registered VWO account.

## Test Execution

The individual negative-login and Forgot Password navigation tests were executed successfully using Chromium.

The valid-login test was verified to skip when credentials were unavailable.

After removing the default Playwright example tests, the expected Chromium suite contains:

- 4 passing tests
- 1 skipped test
- 0 failures

Verify these results with a fresh full-suite execution before submission.

## Limitations

- No authorized VWO account is currently available.
- Successful login and authenticated dashboard behavior remain unverified.
- Some PRD features require additional environment access.
- Security, performance, availability, and regulatory compliance are not established by these UI tests alone.
- The PRD references app.vwo.com, while the assignment specifies app.wingify.com.

## Future Improvements

- Authenticated dashboard testing
- Additional field validation scenarios
- Data-driven testing
- Cross-browser execution
- Accessibility checks
- CI/CD integration

## Acknowledgment

Created as a learning assignment for Pramod Dutta's AI Tester Blueprint 5X course.

The original VWO requirements document was provided as part of the assignment.
