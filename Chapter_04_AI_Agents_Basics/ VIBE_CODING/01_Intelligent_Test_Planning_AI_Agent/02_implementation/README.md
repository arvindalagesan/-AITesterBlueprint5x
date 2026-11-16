# Jira Test Plan Creator

Small React + Node app for turning a Jira issue into a review-ready draft test plan.

## Run

Prerequisites: Node.js 20+ and Jira credentials.

The backend reads `02_implementation/.env` first, then the existing chapter-level `.env` at `Chapter_04_AI_Agents_Basics/.env`. Supported variables are `JIRA_URL`, `JIRA_EMAIL`, `JIRA_TOKEN`, and optional `GROQ_API_KEY`. Keep these files private; secrets never go to the browser. The Settings page also accepts pasted `.env` contents; these are held only in the active server instance and are not stored in browser storage.

```bash
npm install
npm run dev
```

Open http://localhost:5173, enter a Jira key such as `QA-123`, and generate the draft. The app only reads Jira issues.

## Verification and limits

- Verified the frontend production build and backend health endpoint.
- Jira retrieval requires a reachable Jira instance and valid permissions; live access was not assumed.
- Generation follows the supplied `Testplan_Template.md` deterministically and uses `Insufficient information to determine.` for missing inputs.
- The supplied design mentions Groq/Ollama, but no Ollama endpoint or model was specified, so the app exposes server-side configuration status and uses the deterministic template generator.
