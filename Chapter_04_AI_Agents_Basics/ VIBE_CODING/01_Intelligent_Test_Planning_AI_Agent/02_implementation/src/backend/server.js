import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const implementation = path.resolve(here, '../..');
const chapterEnv = path.resolve(implementation, '../../../.env');
const localEnv = path.join(implementation, '.env');
const runtimeConfig = {};

function loadEnv(file) {
  if (!fs.existsSync(file)) return;
  for (const line of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (match && !process.env[match[1]]) process.env[match[1]] = match[2].replace(/^['"]|['"]$/g, '');
  }
}
loadEnv(localEnv);
loadEnv(chapterEnv);

function loadEnvText(text) {
  for (const line of String(text || '').split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (match) runtimeConfig[match[1]] = match[2].replace(/^['"]|['"]$/g, '');
  }
}

const clean = (value = '') => value.trim();
const cfg = () => ({
  jiraUrl: clean(runtimeConfig.JIRA_URL || process.env.JIRA_URL),
  jiraEmail: clean(runtimeConfig.JIRA_EMAIL || process.env.JIRA_EMAIL),
  jiraToken: clean(runtimeConfig.JIRA_TOKEN || process.env.JIRA_TOKEN),
  groqKey: clean(runtimeConfig.GROQ_API_KEY || process.env.GROQ_API_KEY)
});
const missing = (c) => ['jiraUrl', 'jiraEmail', 'jiraToken'].filter((key) => !c[key]);

function plain(value) {
  if (!value) return '';
  if (typeof value === 'string') return value.trim();
  if (Array.isArray(value)) return value.map(plain).filter(Boolean).join('\n');
  if (value.type === 'text') return value.text || '';
  return plain(value.content || value.children || value.value || '');
}

async function getIssue(key) {
  const c = cfg();
  const url = `${c.jiraUrl.replace(/\/$/, '')}/rest/api/3/issue/${encodeURIComponent(key)}?fields=summary,description,issuetype,priority,status,labels,assignee,reporter,created,updated`; 
  const response = await fetch(url, { headers: { Authorization: `Basic ${Buffer.from(`${c.jiraEmail}:${c.jiraToken}`).toString('base64')}`, Accept: 'application/json' } });
  if (!response.ok) { const error = new Error(response.status === 404 ? 'Issue not found or not accessible.' : `Jira returned HTTP ${response.status}.`); error.status = response.status; throw error; }
  return response.json();
}

function plan(issue) {
  const f = issue.fields || {};
  const description = plain(f.description) || 'Insufficient information to determine.';
  const title = f.summary || 'Insufficient information to determine.';
  const type = f.issuetype?.name || 'Insufficient information to determine.';
  const priority = f.priority?.name || 'Insufficient information to determine.';
  return `# Test Plan — ${issue.key}: ${title}\n\n> Status: **DRAFT — pending human review.** Not approved until a QA owner signs off.\n\n## 1. Scope & Objectives\n- **In scope:** ${description}\n- **Out of scope:** Insufficient information to determine.\n- **Objective:** Verify the requirements documented in Jira issue ${issue.key}.\n\n## 2. Gaps & Questions for the author\n| # | Area | Finding (⚠️/❌) | Question to author |\n|---|------|----------------|--------------------|\n| 1 | Acceptance criteria | ⚠️ Insufficient information to determine. | What are the measurable acceptance criteria? |\n\n## 3. Test Scenarios\n| ID | Priority | Type (pos/neg/boundary) | Scenario | Maps to (AC / gap) |\n|----|----------|-------------------------|----------|--------------------|\n| TS-1 | P0 | pos | Verify the documented requirement: ${title} | Jira requirement |\n| TS-2 | P1 | neg | Verify behavior for invalid or missing input related to the requirement | Proposed testing activity; exact behavior is unconfirmed |\n\n## 4. Test Data & Environment\n- **Data:** Insufficient information to determine.\n- **Environment / flags:** Insufficient information to determine.\n- **Roles / permissions:** Insufficient information to determine.\n\n## 5. Risks & Assumptions\n- **Assumptions made:** The Jira description is the source requirement. Issue type: ${type}; priority: ${priority}.\n- **Risks:** Missing acceptance criteria, test data, environment, and permission details may block sign-off.\n\n## 6. Entry / Exit criteria\n- **Entry:** Jira requirements and acceptance criteria are confirmed by the QA owner.\n- **Exit:** Proposed scenarios pass and all gaps are resolved or accepted.\n\n## 7. Resource Allocation\nInsufficient information to determine.\n\n## 8. Timelines, Sprint Details\nInsufficient information to determine.\n\n---\n## HUMAN REVIEW GATE\n- **I assumed:** The Jira description represents the available requirement.\n- **I could not confirm:** Acceptance criteria, environment, test data, roles, timeline, and sprint details.\n- **Open questions blocking sign-off:** Resolve the gaps above with the issue author.\n- **Approve, or edit, before I write test cases / automation.**`;
}

function json(res, status, body) { res.writeHead(status, { 'Content-Type': 'application/json' }); res.end(JSON.stringify(body)); }
export async function handleRequest(req, res) {
  try {
    const pathname = new URL(req.url || '/', 'http://localhost').pathname;
    if (req.method === 'GET' && pathname === '/api/settings') {
      const c = cfg(); return json(res, 200, { jiraConfigured: missing(c).length === 0, missing: missing(c), groqConfigured: Boolean(c.groqKey), jiraUrl: c.jiraUrl || '' });
    }
    if (req.method === 'GET' && pathname === '/api/health') return json(res, 200, { ok: true });
    if (req.method === 'POST' && pathname === '/api/config') {
      let body = ''; for await (const chunk of req) body += chunk;
      const text = JSON.parse(body).envText;
      if (!String(text || '').trim()) return json(res, 400, { error: 'Paste your .env contents first.' });
      loadEnvText(text);
      return json(res, 200, { ok: true, message: 'Configuration loaded for this running server.' });
    }
    if (req.method === 'POST' && pathname === '/api/test-plan') {
      let body = ''; for await (const chunk of req) body += chunk;
      const key = String(JSON.parse(body).issueKey || '').trim().toUpperCase();
      if (!/^[A-Z][A-Z0-9_]+-\d+$/.test(key)) return json(res, 400, { error: 'Enter a valid Jira issue ID, for example QA-123.' });
      const c = cfg(); if (missing(c).length) return json(res, 503, { error: 'Jira configuration is incomplete on the server.' });
      const issue = await getIssue(key); return json(res, 200, { issue: { key: issue.key, summary: issue.fields?.summary || '' }, plan: plan(issue), source: `${c.jiraUrl.replace(/\/$/, '')}/browse/${issue.key}` });
    }
    json(res, 404, { error: 'Not found.' });
  } catch (error) { json(res, error.status === 404 ? 404 : 500, { error: error.message || 'Unexpected server error.' }); }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const server = http.createServer(handleRequest);
  server.listen(3001, () => console.log('Backend listening on http://localhost:3001'));
}
