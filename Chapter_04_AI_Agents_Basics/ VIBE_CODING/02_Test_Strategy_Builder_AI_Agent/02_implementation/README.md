# Test Strategy Builder

Minimal React + Node app matching the supplied Test Strategy Generator design.

```bash
npm install
npm run dev
```

Open http://localhost:5174. The backend reads `.env` in this folder first, then the chapter `.env` as a fallback. Supported values are `JIRA_URL`, `JIRA_EMAIL`, `JIRA_TOKEN`, and optional `GROQ_API_KEY`.

The app reads Jira, generates with Groq when configured, and uses a deterministic draft fallback when Groq is unavailable. The reusable structure is in `Test_Strategy_Template.md`. No Jira content is modified.
