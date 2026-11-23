# AI Test Case Generator

Minimal React + Node app for creating draft, traceable Jira test cases.

```bash
npm install
npm run dev
```

Open http://localhost:5175. The backend reads `.env` in this folder first, then `Chapter_04_AI_Agents_Basics/.env`. Supported values: `JIRA_URL`, `JIRA_EMAIL`, `JIRA_TOKEN`, and optional `GROQ_API_KEY`.

Output follows `Test_Case_Creation_Template.md`, keeps execution status as **Not Run**, and stops at the Human Review Gate.
