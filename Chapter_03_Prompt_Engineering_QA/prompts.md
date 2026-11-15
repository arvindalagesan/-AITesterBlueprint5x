# QA Prompt Library — Top 5 Reusable Tasks

**Assignment:** 14 November 2026 — Find Top 10 QA Tasks, Create Generic Prompt Templates, and Share with the QA Team  
**Deliverable:** `prompts.md` | **Version:** 1.0 | **Audience:** QA Engineers, Automation Engineers, SDETs

## Purpose

This is a reusable, framework-based prompt library for common QA workflows. It lists 10 realistic QA activities, selects 5 for templating, and supplies **20 copy-ready prompts**: one RICE-POT, one CLEAR, one CRISP, and one STAR prompt for each task. These are example QA workflows, not claims that any individual has executed all of them.

**All templates are application-agnostic.** Replace angle-bracket placeholders with authorized project information, attach supporting artifacts, and retain any unknown as an explicit information gap rather than inventing details. AI output is a draft until reviewed by a QA engineer.

## Browse templates by QA category

| QA category | Reusable prompt templates |
|---|---|
| Requirements & gap analysis | [01 — Requirements](01_reuse-templates-requirements/prompts.md) |
| Functional/manual test design | [02 — Manual Testing](02_reuse-templates-manual-testing/prompts.md) |
| UI automation | [03 — Automation](03_reuse-templates-automation/prompts.md) |
| Bug reports & triage | [04 — Bugs](04_reuse-templates-bugs/prompts.md) |
| API test design | [05 — API Testing](05_reuse-templates-api/prompts.md) |

> **Note:** This consolidated file contains all 20 prompts. The five category files contain the same prompts divided for easier team reuse.

## 1. Inventory: Top 10 Common QA Tasks

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

## 2. Framework Key

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

## 3. Task 1 — Requirement Analysis and Gap Identification

**Goal:** Convert a PRD or story into testable requirements and a clear list of questions for the product team.

### 1A. RICE-POT Template

```text
R — Role:
Act as a QA requirement analyst experienced in functional and risk-based testing.

I — Instructions:
1. Read <requirements> and <acceptance_criteria> for the module at <url>.
2. Extract testable behaviors, constraints, integrations, and out-of-scope items.
3. Identify ambiguities, contradictions, missing data, and external dependencies.
4. Suggest positive, negative, boundary, and integration scenarios only where supported.
5. Write one specific clarification question per distinct gap.

C — Context:
Application: <url>; module: <module>; environment: <environment>.
Source material: <requirements>; <acceptance_criteria>.

E — Example (format only, not a claimed requirement):
REQ-<id> | <behavior> | <source_reference> | <test_scenario> | <open_question>

P — Parameters:
Do not assume UI fields, messages, URL paths, timeouts, or business rules.
Label each item Specified, Proposed, or Blocked/Unknown. Keep source references exact.

O — Output:
Produce (1) requirement coverage table, (2) candidate scenarios,
(3) numbered gap register with count, severity/risk rationale, and questions.

T — Tonality:
Precise, neutral, audit-friendly, and suitable for a QA review meeting.
```

### 1B. CLEAR Template

```text
C — Concise:
Review <requirements> for <module> at <url>. Identify testable rules and missing information.
L — Logical:
First extract stated requirements, then map possible tests, then identify gaps.
E — Explicit:
Use columns: ID | Requirement | Source | Proposed test | Gap | Clarification owner.
A — Adaptive:
If <acceptance_criteria> or needed rules are absent, mark Unknown and ask focused questions.
R — Reflective:
Check the output for unsupported assumptions, duplicate gaps, and missing source links.
Return the gap count separately. Do not invent application behavior.
```

### 1C. CRISP Template

```text
C — Context: <module> on <url>; source: <requirements>; environment: <environment>.
R — Role: Act as a QA analyst preparing story refinement.
I — Instruction: Extract testable behaviors; flag ambiguities, missing acceptance criteria,
contradictions, dependencies, and candidate tests.
S — Specificity: Reference source sections. Do not invent behavior, policies, or validation messages.
For each gap include impact, specific question, and affected scenarios.
P — Presentation: Markdown tables titled Requirement Matrix and Gap Register, followed
by the number of distinct gaps and top clarification priorities.
```

### 1D. STAR Template

```text
S — Situation:
The QA team is evaluating <module> at <url> before implementation or testing.
The available source is <requirements> and <acceptance_criteria>.
T — Task:
Make the requirements testable and reveal missing information before test design.
A — Action:
Extract explicit requirements; map to potential scenarios; check conflicting/absent rules;
list exact source references; draft clarification questions.
R — Result:
Provide a coverage matrix and numbered gap register with a total gap count,
showing Verified-from-source versus Proposed versus Unknown. No fabricated answers.
```

---

## 4. Task 2 — Functional Test Case Generation

**Goal:** Create detailed, traceable test cases without hallucinated expected results.

### 2A. RICE-POT Template

```text
R — Role:
Act as a senior functional QA engineer.

I — Instructions:
1. Review <requirements> and <acceptance_criteria> for <module> at <url>.
2. Design <test_count> scenarios across happy path, invalid input, boundary, error,
and relevant accessibility/integration behavior.
3. Separate documented behavior from suggested exploratory tests.
4. Add preconditions, data, precise steps, and verifiable expected results.
5. Identify blocked cases and open questions.

C — Context:
Environment: <environment>; test data constraints: <test_data>;
source materials: <requirements> and <acceptance_criteria>.

E — Example (structure only):
TC-<id> | <requirement_id> | <scenario> | <preconditions> | <steps> | <expected_result>

P — Parameters:
No invented error text, statuses, redirects, numeric thresholds, or features.
If expected behavior is missing, say "Insufficient information to determine."
Priorities are proposed based on business impact, not claimed product rules.

O — Output:
Markdown table: ID | Requirement Reference | Scenario | Type | Preconditions |
Test Data | Steps | Expected Result | Priority | Readiness.
Also list coverage gaps and questions.

T — Tonality:
Concise, technical, executable, and traceable.
```

### 2B. CLEAR Template

```text
C — Concise:
Create <test_count> requirement-based tests for <module> at <url>.
L — Logical:
Map each requirement in <requirements> to scenarios, data, steps, and expected results.
E — Explicit:
Cover valid, invalid, boundary, and relevant integration paths. Output ID, source,
precondition, data, steps, expected result, priority, readiness.
A — Adaptive:
If <acceptance_criteria> lacks an expected result, flag Blocked/Unknown and ask what is missing.
R — Reflective:
Check for duplicate tests, untraceable assertions, made-up messages, and omitted boundaries.
Do not invent system behavior or claim any test was executed.
```

### 2C. CRISP Template

```text
C — Context: Application <url>, module <module>, inputs <requirements>,
<acceptance_criteria>, <test_data>.
R — Role: You are a functional test designer.
I — Instruction: Generate <test_count> prioritized positive, negative, edge,
and boundary tests aligned to the provided requirements.
S — Specificity: Every expected result needs a source. If it cannot be determined,
write "Insufficient information to determine" and add a clarification question.
Do not assume exact UI messages or backend responses.
P — Presentation: Output a test case table with ID, scenario, source, preconditions,
steps, test data, expected result, priority, and Ready/Blocked status.
```

### 2D. STAR Template

```text
S — Situation:
The feature <module> on <url> requires test coverage based on <requirements>.
T — Task:
Prepare <test_count> functional test cases for review and eventual execution.
A — Action:
Break down acceptance criteria; cover successful and unsuccessful paths; add
boundary tests; map every assertion to a provided requirement; mark missing rules.
R — Result:
Deliver a traceable Markdown test suite and an unresolved-requirements list.
Do not claim tests pass or fabricate expected outcomes not in the sources.
```

---

## 5. Task 3 — UI Test Automation Script Creation / Review

**Goal:** Create or improve maintainable UI automation while respecting existing framework conventions. Use Selenium/Java or Playwright/TypeScript according to supplied project context; do not pretend both are already implemented.

### 3A. RICE-POT Template

```text
R — Role:
Act as a UI automation engineer specializing in <framework> and <language>.

I — Instructions:
1. Review <test_cases>, <existing_code>, and <project_structure>.
2. Identify reusable page objects/components, locators, setup, fixtures, and assertions.
3. Produce or revise code for <module> at <url> using project conventions.
4. Avoid sleeps, duplicate locators, brittle selectors, and hidden dependencies.
5. Include commands to run and a short code-review checklist.

C — Context:
Framework: <framework>; language: <language>; app: <url>;
environment: <environment>; project structure: <project_structure>;
verified locators/DOM evidence: <ui_evidence>.

E — Example (format only):
Test: <scenario_name> -> Page method: <action> -> Assertion: <documented_outcome>

P — Parameters:
Use only confirmed locators and behavior. If DOM or config is absent, use explicit
TODO placeholders and ask for evidence; don't invent selectors or credentials.
Prefer robust waits and independent tests. Keep secrets in approved environment config.

O — Output:
(1) File tree/changed files, (2) complete code blocks per file,
(3) commands and prerequisites, (4) assumptions/TODOs, (5) review checklist.

T — Tonality:
Practical, precise, maintainable, and review-ready.
```

### 3B. CLEAR Template

```text
C — Concise:
Implement or review <test_cases> for <url> using <framework>/<language>.
L — Logical:
Inspect <project_structure>, map scenarios to page methods, implement assertions,
then describe how to run and troubleshoot.
E — Explicit:
Follow <coding_standards>; prefer reusable locators and proper waits; output full
changed files and exact run commands.
A — Adaptive:
If selectors, dependencies, or expected results are absent, write TODOs and request
<ui_evidence> rather than guessing.
R — Reflective:
Review the code for flaky waits, hardcoded secrets, poor isolation, and unsupported
assertions. State clearly that generated code has not been executed.
```

### 3C. CRISP Template

```text
C — Context: <url>, <module>, <test_cases>, <existing_code>, <project_structure>.
R — Role: Act as a code-review-focused <framework>/<language> automation engineer.
I — Instruction: Generate/refactor maintainable test and page-object code for the
supplied scenarios, with fixtures and assertions consistent with the project.
S — Specificity: No hardcoded credentials, guessed locators, fixed delays, or invented
page flows. Flag unknown DOM/config inputs as TODOs. Respect <coding_standards>.
P — Presentation: File paths and complete code blocks, followed by run commands,
verification steps, and a list of missing inputs. Do not claim a successful run.
```

### 3D. STAR Template

```text
S — Situation:
The team needs stable UI automation for <module> at <url>. Existing framework:
<framework> / <language>; starter code: <existing_code>.
T — Task:
Implement or improve <test_cases> without increasing flakiness.
A — Action:
Review <project_structure> and <ui_evidence>, choose verified locators, implement
page methods and independent tests, avoid arbitrary sleeps, add documented assertions.
R — Result:
Provide proposed files, code, run commands, assumptions, and a review checklist.
Mark unresolved locators/flows explicitly; generated tests are not reported as passed.
```

---

## 6. Task 4 — Bug Report Generation and Defect Analysis

**Goal:** Convert actual observations into reproducible defect reports, and distinguish verified causes from hypotheses.

### 4A. RICE-POT Template

```text
R — Role:
Act as a software QA engineer experienced in defect reporting and triage.

I — Instructions:
1. Read <observed_behavior>, <expected_behavior>, <reproduction_steps>, and <evidence>.
2. Determine whether the evidence establishes a discrepancy with a requirement.
3. Rewrite reproduction steps so another engineer can follow them.
4. Suggest severity/priority with a short rationale, distinguishing the two.
5. List missing data and possible investigation areas, not invented root causes.

C — Context:
Module: <module>; application: <url>; environment: <environment>;
build: <build_version>; evidence: <evidence>; source: <requirements>.

E — Example (structure only):
BUG-<id> | <short_summary> | <steps> | <observed> | <expected> | <evidence_link>

P — Parameters:
Do not invent logs, stack traces, screenshots, occurrence frequency, business
impact, defect IDs, or a confirmed root cause. If the requirement is unavailable,
mark expected behavior Unverified and recommend clarification.

O — Output:
A Jira-ready bug report: Title | Environment | Build | Preconditions |
Steps | Actual | Expected | Evidence | Reproducibility | Proposed severity |
Proposed priority | Open questions. Add hypothesis separately if useful.

T — Tonality:
Objective, concise, neutral, and developer-friendly.
```

### 4B. CLEAR Template

```text
C — Concise:
Draft a reproducible defect report for <module> at <url> from <evidence>.
L — Logical:
Check the requirement, summarize the discrepancy, write numbered steps, and
assess impact only from supplied information.
E — Explicit:
Include environment, build, actual, expected, evidence, reproducibility, severity,
priority, and next questions.
A — Adaptive:
If <expected_behavior> is undocumented or reproduction details are missing, mark
Unverified/Needs clarification; do not fill gaps with invented facts.
R — Reflective:
Check for neutral wording, independently actionable steps, and unsupported root-cause
claims. Clearly label technical hypotheses as hypotheses.
```

### 4C. CRISP Template

```text
C — Context: <url>, <module>, <environment>, <build_version>, <evidence>.
R — Role: Act as a QA defect triage analyst.
I — Instruction: Convert <observed_behavior> and <reproduction_steps> into a concise,
reproducible issue; compare with <expected_behavior> from <requirements>.
S — Specificity: Suggest severity and priority with rationale; never invent evidence,
frequency, reproducibility, logs, or a confirmed cause. State missing inputs.
P — Presentation: Jira-style issue with title, preconditions, steps, actual,
expected, evidence, impact, proposed severity/priority, and open questions.
```

### 4D. STAR Template

```text
S — Situation:
A suspected defect was observed on <module> at <url> in <environment>.
Evidence: <evidence>. Reproduction steps: <reproduction_steps>.
T — Task:
Prepare a complete defect report suitable for engineering review.
A — Action:
Compare <observed_behavior> with <expected_behavior> and <requirements>; write
reproduction steps; propose an impact-based severity; list unknowns and hypotheses.
R — Result:
Return a Jira-ready issue with traceable evidence and clear uncertainty labels.
Do not fabricate observed data or assert a root cause without evidence.
```

---

## 7. Task 5 — API Test Design and Validation

**Goal:** Design an API validation matrix and optional automation examples grounded in the supplied contract rather than assumed status codes.

### 5A. RICE-POT Template

```text
R — Role:
Act as an API testing engineer with expertise in contract and functional validation.

I — Instructions:
1. Read <api_spec> and the relevant endpoint contract.
2. Identify documented method, inputs, authentication, schema, and response rules.
3. Draft positive, negative, boundary, auth, and contract tests.
4. Add assertions for only documented status codes, fields, types, and headers.
5. List missing contract details and, if requested, propose <api_framework> examples.

C — Context:
API base URL: <url>; endpoint: <endpoint>; method: <http_method>;
environment: <environment>; spec: <api_spec>;
request schema: <request_schema>; response schema: <response_schema>;
auth: <auth_scheme>.

E — Example (format only):
API-TC-<id> | <method> | <path> | <test_condition> | <documented_expectation>

P — Parameters:
Do not guess status codes, response fields, tokens, rate limits, or server behavior.
Use synthetic/test data only. Never send live requests without authorization.
If a contract value is missing, mark it Unknown and ask a clarification question.

O — Output:
API test matrix: ID | Requirement | Method/Path | Setup | Request Variation |
Expected Status | Expected Body/Headers | Assertion | Priority | Readiness.
Then list information gaps and optional code outline for <api_framework>.

T — Tonality:
Clear, precise, and implementation-neutral unless a framework is supplied.
```

### 5B. CLEAR Template

```text
C — Concise:
Design API tests for <http_method> <endpoint> under <url> using <api_spec>.
L — Logical:
Extract contract rules, enumerate request partitions, and assign verifiable assertions.
E — Explicit:
Include success, invalid input, authentication/authorization, boundaries, and response
schema checks where documented. Output IDs, request variations, expected results, priority.
A — Adaptive:
If status codes, error models, or auth scopes are not specified, mark Unknown instead
of guessing and identify the exact missing contract field.
R — Reflective:
Check test independence, schema coverage, absence of real secrets, and traceability.
Do not claim the endpoints were called or tests executed.
```

### 5C. CRISP Template

```text
C — Context: Base <url>; endpoint <endpoint>; method <http_method>;
contract <api_spec>; environment <environment>; auth <auth_scheme>.
R — Role: Act as an API QA analyst.
I — Instruction: Produce contract-based positive, negative, boundary, auth, and
response-validation tests and optional <api_framework> assertion examples.
S — Specificity: Derive expectations strictly from <api_spec>, <request_schema>, and
<response_schema>. Never invent codes, fields, policies, or credentials.
P — Presentation: Markdown test matrix with request, expected result, assertion,
source reference, priority, readiness, and a separate list of contract gaps.
```

### 5D. STAR Template

```text
S — Situation:
The team is validating <http_method> <endpoint> on <url> using <api_spec>.
T — Task:
Prepare an API test plan that checks correctness, validation, security boundaries,
and contract conformance.
A — Action:
Extract documented schemas and authentication rules; identify representative request
variations; define source-backed assertions; flag missing status/error contracts.
R — Result:
Return a traceable test matrix and open-question list, with optional <api_framework>
examples only if requested. No fabricated responses and no claim of test execution.
```

---

## 8. Generic Template Review Checklist

- [x] Includes exactly **five selected QA tasks** out of a top-10 inventory.
- [x] Supplies **four usable framework variants per selected task** (20 prompts total).
- [x] Uses `<url>` and other generic placeholders instead of application-specific hardcoded values.
- [x] Defines input evidence, expected output structure, constraints, and quality checks.
- [x] Explicitly prevents invented requirements, error messages, locators, API contracts, and test results.
- [x] Does not embed credentials, customer data, or private organization names.
- [ ] Peer-review with QA team using a real approved PRD, story, defect, or API specification.
- [ ] Record feedback and update the templates after trial use.

## 9. QA Team Sharing Note

> Team — I have prepared a reusable `prompts.md` containing five frequently used QA tasks (requirements review, test case design, UI automation, defect reporting, and API testing). Each task includes RICE-POT, CLEAR, CRISP, and STAR prompt variants. Please replace placeholders with approved project context and review AI-generated outputs against evidence. Feedback and improvement suggestions are welcome through our normal review process.

## 10. References and Framework Notes

Framework names and expansions can differ across publications. This library states the exact conventions it applies to avoid ambiguity.

- Pramod Dutta / The Testing Academy — *Prompt Engineering for QA: The RICEPOT Framework*: https://app.thetestingacademy.com/class/prompt-engineering-for-qa
- Pramod Dutta — *AITesterBlueprint2x*, Chapter 2 Prompt Engineering: https://github.com/PramodDutta/AITesterBlueprint2x
- Texas A&M University–Corpus Christi Library — *CLEAR Framework*: https://guides.library.tamucc.edu/prompt-engineering/clear
- Example CRISP five-part convention (Context, Role, Instruction, Specificity, Persona/Presentation): https://github.com/Yendoh-Derek/Prompt-Engineering-Framework/blob/main/framework/crisp-framework.md

**Publishing:** Keep this file and the five category folders together under `Chapter_03_Prompt_Engineering_QA/` in the authorized GitHub repository. Commit, push, and share the category links with the QA team. Do not claim team review is complete until it occurs.
