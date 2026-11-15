# QA Prompt Engineering Library — Top 5 Tasks

**Assignment:** 14 November 2026 — Identify common QA activities, build reusable prompts using RICE-POT, CLEAR, CRISP, STAR, make them generic, publish to GitHub, and share with the QA team.

This library contains **10 common QA tasks**, **5 selected tasks**, and **20 reusable prompt templates** (four frameworks per selected task). The prompts are generic and are not tied to a single application or client. All AI-generated outputs require QA validation.

## Prompt library navigation

| # | Selected QA task | Purpose | Templates |
|---|---|---|---|
| 1 | Requirement Analysis & Gap Identification | Trace requirements and ask questions | [Open prompts.md](01_reuse-templates-requirements/prompts.md) |
| 2 | Manual/Functional Test Case Design | Generate positive, negative, and boundary tests | [Open prompts.md](02_reuse-templates-manual-testing/prompts.md) |
| 3 | UI Test Automation | Generate or review Selenium/Playwright code | [Open prompts.md](03_reuse-templates-automation/prompts.md) |
| 4 | Bug Reporting & Defect Analysis | Write reproducible defects without invented evidence | [Open prompts.md](04_reuse-templates-bugs/prompts.md) |
| 5 | API Test Design & Validation | Build contract-grounded API test matrices | [Open prompts.md](05_reuse-templates-api/prompts.md) |

**Prefer one file?** See [the consolidated `prompts.md`](prompts.md) containing all 20 prompts in one document.

## Quick start

1. Open the category you need, then choose **one** of its four prompting frameworks.
2. Copy the code-fenced prompt into your approved AI tool.
3. Replace all placeholders, such as `<url>`, `<module>`, `<requirements>`, `<test_data>`, and `<api_spec>`, and attach the corresponding approved evidence.
4. If information is missing, mark it **Unknown** and ask for clarification; do not invent expected outcomes, error messages, selectors, status codes, or test results.
5. Review the result with the QA team before using it as a release or implementation decision.

---

## Top 10 QA task inventory

| # | QA Task | Typical Output | Selected for Templates? |
|---|---|---|---|
| 1 | Analyze requirements and identify gaps | Requirement coverage / clarification questions | Yes |
| 2 | Design functional, negative, and boundary test cases | Traceable test case suite | Yes |
| 3 | Build or review UI automation scripts | Maintainable Selenium / Playwright tests | Yes |
| 4 | Report defects and analyze failures | Reproducible bug reports / triage notes | Yes |
| 5 | Design API test cases and validations | API test matrix / assertion plan | Yes |
| 6 | Select risk-based regression coverage | Prioritized regression suite | No |
| 7 | Run exploratory testing sessions | Exploratory charter / findings | No |
| 8 | Prepare and manage test data | Test-data matrix / cleanup approach | No |
| 9 | Summarize test execution and release risks | QA execution / release summary | No |
| 10 | Investigate CI/CD automation failures | Failure classification / next actions | No |

## Framework key

- **RICE-POT:** Role, Instructions, Context, Example, Parameters, Output, Tonality.
- **CLEAR:** Concise, Logical, Explicit, Adaptive, Reflective. Here, the five labels are used to structure the prompt and its quality checks.
- **CRISP:** Context, Role, Instruction, Specificity, Presentation. Framework acronyms can have multiple published expansions; this file consistently uses this five-part variant.
- **STAR:** Situation, Task, Action, Result. Used to describe the context, requested work, steps, and target deliverable.

### How to use a template

1. Choose the QA task and a framework variant. Copy **one** fenced prompt into your AI tool.
2. Replace placeholders such as `<url>`, `<module>`, `<requirements>`, `<test_data>`, and `<environment>`. Attach documents or paste the relevant text.
3. If a placeholder is unknown, write `Not provided` rather than inventing a value.
4. Validate every generated test, step, assertion, locator, and risk rating against actual requirements or execution evidence.
5. Never paste passwords, personal customer records, session tokens, or private company material into an unapproved AI tool.

### Shared definition of evidence

- **Specified:** Supported by the supplied PRD, story, acceptance criteria, API contract, or documented team rule.
- **Observed:** Supported by screenshots, logs, traces, or actual authorized execution.
- **Proposed:** A reasonable test idea, but not yet a confirmed expected result.
- **Blocked / Unknown:** Not enough information to construct or verify a reliable expected result.

Do not present proposed test ideas as implemented functionality, or generated code as executed/passing code.

---

## Generic template review checklist

- [x] Includes exactly **five selected QA tasks** out of a top-10 inventory.
- [x] Supplies **four usable framework variants per selected task** (20 prompts total).
- [x] Uses `<url>` and other generic placeholders instead of application-specific hardcoded values.
- [x] Defines input evidence, expected output structure, constraints, and quality checks.
- [x] Explicitly prevents invented requirements, error messages, locators, API contracts, and test results.
- [x] Does not embed credentials, customer data, or private organization names.
- [ ] Peer-review with QA team using a real approved PRD, story, defect, or API specification.
- [ ] Record feedback and update the templates after trial use.

## QA team sharing note

> Team — I have prepared a reusable `prompts.md` containing five frequently used QA tasks (requirements review, test case design, UI automation, defect reporting, and API testing). Each task includes RICE-POT, CLEAR, CRISP, and STAR prompt variants. Please replace placeholders with approved project context and review AI-generated outputs against evidence. Feedback and improvement suggestions are welcome through our normal review process.

## References and framework notes

Framework names and expansions can differ across publications. This library states the exact conventions it applies to avoid ambiguity.

- Pramod Dutta / The Testing Academy — *Prompt Engineering for QA: The RICEPOT Framework*: https://app.thetestingacademy.com/class/prompt-engineering-for-qa
- Pramod Dutta — *AITesterBlueprint2x*, Chapter 2 Prompt Engineering: https://github.com/PramodDutta/AITesterBlueprint2x
- Texas A&M University–Corpus Christi Library — *CLEAR Framework*: https://guides.library.tamucc.edu/prompt-engineering/clear
- Example CRISP five-part convention (Context, Role, Instruction, Specificity, Persona/Presentation): https://github.com/Yendoh-Derek/Prompt-Engineering-Framework/blob/main/framework/crisp-framework.md

**Publishing:** Push the `Chapter_03_Prompt_Engineering_QA/` folder to GitHub and share the README or individual category links. Do not claim team review is complete until it occurs.
