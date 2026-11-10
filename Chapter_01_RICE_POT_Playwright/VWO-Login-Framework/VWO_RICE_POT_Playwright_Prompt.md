# RICE-POT Prompt - VWO Login Dashboard Playwright Framework

**Assignment:** AI 5X Batch - 1 November, RICE-POT Method for Playwright  
**Objective:** Generate a maintainable Playwright TypeScript automation framework for the login experience described in the attached *Product Requirements Document: VWO Login Dashboard* (7 pages), using the assignment URL as the starting point.

> **Input prerequisite:** Give the AI coding assistant access to the supplied PRD PDF. Prefer saving it at `docs/requirements/VWO-Login-Dashboard-PRD.pdf`. If the document is unavailable, request it before implementing requirement-specific assertions.

## R - Role

Act as a senior QA automation architect and Playwright TypeScript engineer. Think like a critical test designer: prioritize reliable tests, requirements traceability, accurate assertions, secure handling of credentials, and maintainability. Explain any assumptions rather than inventing product behavior.

## I - Instructions

1. Read the complete attached VWO Login Dashboard PRD and extract testable requirements. Build a traceability matrix referencing the original PRD section and page for each scenario. Do not present your own scenario IDs as official requirement IDs.
2. Start from `https://app.wingify.com/#/login` as explicitly given in the assignment. The PRD separately mentions `app.vwo.com`. Record this mismatch as an open question. Inspect the actual live UI before choosing selectors, expected error copy, or success URLs. If browser inspection is unavailable, clearly mark observations as unverified and do not pretend they have been checked.
3. Organize coverage into: (a) directly observable UI checks, (b) conditional tests needing a controlled test account or enabled feature, and (c) requirements requiring API, backend, security, accessibility, or performance validation outside ordinary UI tests.
4. Prioritize Phase 1 core authentication: login form, email/password validation, invalid credentials, actionable error feedback, and forgot-password navigation. Include appropriate positive, negative, empty-field, malformed-email, and keyboard navigation scenarios only when the live interface supports them.
5. Consider PRD-stated Remember Me, session handling, password recovery, mobile responsive layout, focus behavior, labels, loading feedback, accessibility, and dashboard transition. Mark each as implemented, blocked, or not observed. Do not falsely assert that all features are present on the live login page.
6. Plan separate conditional coverage for optional MFA, enterprise SSO, social login, light/dark mode, and high-contrast mode. Do not automate an MFA bypass, uncontrolled account creation, or sending password-reset messages to real accounts.
7. Build a maintainable Playwright framework in **TypeScript** using Playwright Test, Page Object Model (POM), reusable fixtures only where useful, environment-based configuration, robust semantic locators when verified, and Playwright `expect` assertions. Avoid fixed sleeps, unnecessary browser `waitForTimeout`, and brittle CSS selectors.
8. Use only synthetic invalid credentials for negative tests. Gate successful login and authenticated dashboard checks behind `VWO_TEST_EMAIL` and `VWO_TEST_PASSWORD` environment variables; skip them with a clear reason when no authorized test account exists. Never include any real token or password in code, logs, traces, screenshots, or Git history.
9. Configure local Chromium as the default; add Firefox and WebKit as optional projects if support and environment allow. Include retries appropriate for CI, HTML reporting, screenshots/traces on failure, sensible test isolation, and `.gitignore` entries for `.env`, reports, screenshots, and `test-results`.
10. Where the PRD specifies security, performance, availability, and compliance goals (HTTPS, hashed password storage, rate limiting, 2-second load, 99.9% uptime, WCAG 2.1 AA, GDPR/CCPA), describe the appropriate validation approach separately. Do not claim Playwright UI tests alone prove server-side hashing, compliance, uptime, security posture, or consistent performance across networks.
11. Produce the full source code for every file, installation commands, execution commands, expected prerequisites, and a README. Make the code runnable once dependencies are installed and verified selectors are supplied. Never claim tests have passed without actually executing them.
12. If a required implementation detail cannot be verified, explicitly say `Insufficient information to determine.` and mark the related test as blocked or skipped with an actionable TODO rather than inventing a passing test.

**Do NOT:** fabricate DOM locators, application error strings, dashboard URLs, API endpoints, security guarantees, test credentials, UI controls, successful test results, or unsupported functionality. Do not brute-force logins or run high-volume tests on the public application.

### Additional Instructions — Authentication and Credentials

- Use the `dotenv` package to read valid login credentials from a `.env` file.
- Store credentials in environment variables named `VWO_TEST_EMAIL` and `VWO_TEST_PASSWORD`.
- If either credential is missing or empty, skip the valid-login test using Playwright's `test.skip()`.
- Do not mark the skipped test as failed or passed.
- Execute all negative login tests without requiring valid credentials.
- Never hardcode credentials in test scripts.
- Add `.env` to `.gitignore` to prevent credentials from being pushed to GitHub.
- Provide a `.env.example` file containing empty credential placeholders.
- Document that valid-login and authenticated dashboard testing are pending until a valid VWO account is available.

## C - Context

- **Application under test:** VWO / Wingify login experience.
- **Assignment start URL:** `https://app.wingify.com/#/login`.
- **PRD label/domain:** *VWO Login Dashboard*, referencing `app.vwo.com`. The relationship between URLs must be verified.
- **Source of requirements:** Attached 7-page PRD, not assumptions about a typical login page.
- **PRD functional coverage:** Email and password authentication; blur/email validation; authentication errors; Remember Me; password reset; configurable sessions; optional MFA and SSO.
- **PRD UX/accessibility coverage:** Responsive UI; focus, clickable labels and keyboard navigation; feedback/loading states; screen-reader support; light/dark modes.
- **PRD integration/quality coverage:** Dashboard transition; login analytics; HTTPS and secure sessions; rate limiting; 2-second page-load target, 99.9% uptime, and WCAG 2.1 AA.
- **PRD rollout:** Phase 1 core authentication, Phase 2 enhanced UX/accessibility, Phase 3 enterprise/security/analytics.
- **Known gaps:** The PDF does not provide authorized test credentials, approved reset mailbox, official requirement IDs, exact selector attributes, expected error messages, definitive redirect destinations, test environment details, or which optional features are enabled on the assigned public URL.
- **Purpose:** A personal course assignment / GitHub portfolio demonstration, not a claim of company deployment or production security certification.

## E - Example

Target code organization and style (illustrative structure; do not treat method names as verified live UI facts):

```ts
import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test('login form is visible', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.expectLoginFormVisible(); // Implement using locators verified on the actual page.
});
```

Example traceability entry:

| PRD reference | Scenario | Test classification | Status |
|---|---|---|---|
| Functional Requirements > Authentication System > Login Process (page 2) | Login form displays verified required fields | UI smoke | Implement after inspecting live page |

## P - Parameters

- Use TypeScript, `@playwright/test`, and Node.js supported by the installed Playwright version.
- Prefer accessible `getByRole`, `getByLabel`, and `getByPlaceholder` locators only when their accessible names/labels have been confirmed. Use stable `data-testid` only if it actually exists.
- Favor deterministic tests with no cross-test account or session dependencies. Use `await` throughout.
- Map every expectation to either (i) explicit PRD text or (ii) separately labeled verified live behavior.
- If information is missing or unclear, write exactly: `Insufficient information to determine.`
- Label inferred suggestions as `Inference (low confidence)`; do not silently promote them to requirements.
- Separate *requirements*, *observations*, *assumptions*, *open questions*, and *blocked scenarios* in documentation.
- Use `.env.example` placeholders only. Never commit real `.env` values or credentials.
- Explain how to run smoke tests independently from optional authenticated tests.
- Do not include a CI job that sends real authentication traffic to the public site by default.

## O - Output

Provide these artifacts in this order:

1. **Requirements analysis:** Brief summary, requirement-to-test traceability matrix, gaps/assumptions, and a classified test inventory.
2. **Framework directory tree:** At minimum `package.json`, `playwright.config.ts`, `tsconfig.json`, `.gitignore`, `.env.example`, `pages/LoginPage.ts`, `tests/login/`, `docs/requirements-traceability.md`, `docs/assumptions-and-gaps.md`, `README.md`, and `prompts/RICE_POT_PROMPT.md`.
3. **Complete file contents:** Fully specified TypeScript source and configs, without omitted placeholder files. Feature-dependent code must be safely skipped or clearly marked pending if live selectors or credentials cannot be established.
4. **Scenarios:** Verified form/smoke tests; validation and invalid-login checks as supported by observed UI; recovery/navigation checks where present; gated valid-login/dashboard tests; conditional accessibility/mobile/remember-me/SSO/MFA cases.
5. **Commands:** `npm install`, `npx playwright install`, and documented `npx playwright test` examples for local execution and HTML reports. Add setup guidance when Playwright needs initialization.
6. **Quality evidence:** Commands actually executed, pass/fail/skip counts, known blockers, and any missing verification. If execution is not available, say `Not executed` and do not invent results.
7. **GitHub readiness:** Suggested commit message, a short description of the project, and a concise assignment comment containing the RICE-POT method used and the repository path (leave the final commit URL as a placeholder until it exists).

## T - Tone

Professional, precise, practical, and suitable for a QA engineering interview. Use clear explanations without excessive jargon. Prioritize truthful evidence and working code over exaggerated claims. Do not overstate the author's Playwright or API testing experience.
