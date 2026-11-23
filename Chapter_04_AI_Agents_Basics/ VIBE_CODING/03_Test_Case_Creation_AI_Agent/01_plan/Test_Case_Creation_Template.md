# Test Cases — <JIRA-KEY>: <issue_title>

> **Status: DRAFT — Pending QA Review**  
> These are proposed test cases. They are **not executed** and must not be marked Passed/Failed without execution evidence.

## 1. Requirement Details

| Field | Value |
|---|---|
| Jira Issue | `<JIRA-KEY>` |
| Issue Title | `<issue_title>` |
| Issue Type / Priority | `<issue_type>` / `<jira_priority>` |
| Application / Feature | `<application_name>` / `<feature_name>` |
| Test Environment | `<url>` |
| Requirements Source | `<jira_description_or_prd_reference>` |
| Acceptance Criteria | `<AC-1>, <AC-2>, ...` (use actual IDs, or label locally if none exist) |
| Prepared By / Date | `<qa_owner>` / `<date>` |

## 2. Scope & Coverage

- **In scope:** `<features_and_behaviors_under_test>`
- **Out of scope:** `<excluded_features>`
- **Test types:** `<positive / negative / boundary / integration / security / accessibility / etc.>`
- **Dependencies:** `<dependent_services_or_tickets>`

## 3. Test Case Summary

| Test Case ID | Scenario | Type | Priority | Maps to (AC / Gap) | Readiness |
|---|---|---|---|---|---|
| TC-001 | `<scenario_name>` | Positive | P0 | `<AC-1>` | Ready / Needs Verification / Blocked |
| TC-002 | `<scenario_name>` | Negative | P1 | `<AC-2 or GAP-1>` | Ready / Needs Verification / Blocked |

> Add only scenarios supported by the retrieved requirements. Do not force a particular test-case count.

## 4. Detailed Test Cases

### TC-001 — <test_case_title>

| Field | Details |
|---|---|
| **Objective** | `<what_behavior_is_being_verified>` |
| **Type** | `<positive / negative / boundary / ...>` |
| **Priority** | `<P0 / P1 / P2>` |
| **Requirement Mapping** | `<AC-1 / Jira section / PRD page / GAP-1>` |
| **Preconditions** | `<required_application_state_or_account>` |
| **Test Data** | `<safe_synthetic_test_data_or_data_reference>` |
| **Environment** | `<url>` |
| **Readiness** | `Ready / Needs UI Verification / Blocked — Clarification Required` |

**Test Steps**

| Step | Action | Expected Result |
|---|---|---|
| 1 | `<open_page_or_prepare_state>` | `<observable_outcome>` |
| 2 | `<perform_action>` | `<expected_behavior_supported_by_requirements>` |
| 3 | `<submit_or_complete_flow>` | `<expected_behavior_supported_by_requirements>` |

**Postconditions / Cleanup:** `<cleanup_or_reset_steps>`  
**Notes / Evidence Needed:** `<question_or_evidence_reference>`

<!-- Duplicate the detailed test-case section for TC-002, TC-003, etc. -->

## 5. Test Data & Environment

| Item | Required Detail | Availability |
|---|---|---|
| Base URL | `<url>` | `<confirmed / pending>` |
| Test Account / Roles | `<test_account_reference_and_role>` | `<confirmed / pending>` |
| Valid Data | `<valid_synthetic_values>` | `<confirmed / pending>` |
| Invalid / Boundary Data | `<invalid_or_boundary_values>` | `<confirmed / pending>` |
| Browser / Device | `<supported_browser_and_device>` | `<confirmed / pending>` |
| Feature Flags / Dependencies | `<flags_and_integrations>` | `<confirmed / pending>` |

**Security:** Never include passwords, API keys, tokens, or production personal data in this document. Refer to approved secret storage or test fixtures instead.

## 6. Gaps & Questions for Jira Author

| Gap ID | Severity | Missing or Ambiguous Information | Affected Test Cases | Clarification Question |
|---|---|---|---|---|
| GAP-1 | Warning / Critical | `<missing_detail>` | `<TC-002>` | `<specific_question>` |

**Total distinct gaps:** `<count>`

If a requirement does not specify an expected outcome, write **"Not specified — clarification required"** and mark the affected test case **Blocked**. Do not invent error messages, URLs, thresholds, timeouts, permissions, or other application behavior.

## 7. Requirement Traceability

| Requirement / AC | Related Test Cases | Coverage Status |
|---|---|---|
| `<AC-1>` | `<TC-001>` | Covered / Partial / Blocked |
| `<AC-2>` | `<TC-002>` | Covered / Partial / Blocked |

## 8. Execution Record (Fill Only After Running Tests)

| Test Case ID | Execution Status | Actual Result | Evidence / Defect Link | Executed By / Date |
|---|---|---|---|---|
| TC-001 | Not Run | — | — | — |
| TC-002 | Not Run | — | — | — |

**Allowed statuses:** Not Run / Passed / Failed / Blocked / Skipped.  
**Rule:** Never mark a case Passed or Failed based only on AI-generated content.

---

## HUMAN REVIEW GATE

- **Assumptions made:** `<assumptions_or_none>`
- **I could not confirm:** `<unverified_details>`
- **Open questions blocking sign-off:** `<blocking_questions>`
- **QA Reviewer:** `<reviewer_name_or_unassigned>`
- **Approval Status:** **PENDING**

**Action Required:** Review or edit the test cases and approve them before treating them as finalized or generating automation scripts.

---

### Instructions for AI Test Case Generator

1. Fetch the provided `<JIRA-KEY>` with the connected Jira tool **before** generating test cases. If retrieval fails, report the error and stop.
2. Use retrieved acceptance criteria as the primary source; use an attached PRD only if accessible and relevant. Identify conflicts explicitly.
3. Follow this template, replacing placeholders with verified information. Keep unspecified details as open questions.
4. Generate high-value positive, negative, and boundary cases appropriate to the feature; include other test types only when relevant.
5. Map each case to an actual acceptance criterion or identified gap.
6. Keep all new cases in **DRAFT** and all execution results as **Not Run**.
7. Stop at the Human Review Gate; do not fabricate Jira tool results or claim QA approval.
