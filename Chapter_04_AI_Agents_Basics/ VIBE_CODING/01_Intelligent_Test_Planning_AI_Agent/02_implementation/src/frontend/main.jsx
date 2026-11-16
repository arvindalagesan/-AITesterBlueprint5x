import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const initial = { jiraUrl: '', jiraConfigured: false, groqConfigured: false, missing: [] };
function App() {
  const [page, setPage] = useState('main');
  const [issueKey, setIssueKey] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState(initial);
  useEffect(() => { fetch('/api/settings').then((r) => r.json()).then(setSettings).catch(() => setError('Backend is not running.')); }, []);
  async function submit(e) { e.preventDefault(); setError(''); setResult(null); setLoading(true); try { const r = await fetch('/api/test-plan', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ issueKey }) }); const data = await r.json(); if (!r.ok) throw new Error(data.error); setResult(data); } catch (e) { setError(e.message); } finally { setLoading(false); } }
  return <main className="shell">
    <header><div className="brand"><span className="mark">✓</span><span>Test Plan <em>Creator</em></span></div><nav><button className={page === 'main' ? 'active' : ''} onClick={() => setPage('main')}>Generator</button><button className={page === 'settings' ? 'active' : ''} onClick={() => setPage('settings')}>Settings</button></nav></header>
    {page === 'settings' ? <Settings settings={settings} /> : <section className="content"><div className="hero"><p className="eyebrow">JIRA → QA WORKFLOW</p><h1>Reply with a<br /><span>test plan.</span></h1><p className="sub">Turn one Jira ticket into a clear, review-ready test plan.</p></div><form onSubmit={submit} className="prompt"><label htmlFor="issue">Jira issue ID</label><div className="inputRow"><input id="issue" value={issueKey} onChange={(e) => setIssueKey(e.target.value)} placeholder="e.g. QA-123" disabled={loading} /><button disabled={loading || !issueKey.trim()}>{loading ? 'Building…' : 'Generate plan ↗'}</button></div><small>Requirements stay on the server. Nothing is written back to Jira.</small></form>{error && <div className="notice error">{error}</div>}{result && <article className="result"><div className="resultHead"><div><p className="eyebrow">GENERATED DRAFT</p><h2>{result.issue.key}: {result.issue.summary}</h2></div><a href={result.source} target="_blank" rel="noreferrer">Open Jira ↗</a></div><pre>{result.plan}</pre></article>}</section>}
  </main>;
}
function Settings({ settings }) {
  const [envText, setEnvText] = useState('');
  const [message, setMessage] = useState('');
  async function save(e) {
    e.preventDefault(); setMessage('');
    const response = await fetch('/api/config', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ envText }) });
    const data = await response.json(); setMessage(response.ok ? data.message : data.error);
    if (response.ok) window.location.reload();
  }
  return <section className="settings"><div className="hero compact"><p className="eyebrow">CONFIGURATION</p><h1>Settings.</h1><p className="sub">Connections are read from the server environment.</p></div><div className="cards"><div className="card"><div className="cardTitle"><span>01</span><h2>Jira connection</h2></div><p>Base URL</p><code>{settings.jiraUrl || 'Not configured'}</code><p>Credentials</p><code>{settings.jiraConfigured ? 'Configured securely on server' : `Missing: ${settings.missing.join(', ') || 'server configuration'}`}</code><div className={`status ${settings.jiraConfigured ? 'ok' : ''}`}>{settings.jiraConfigured ? '● Ready' : '● Needs configuration'}</div></div><div className="card"><div className="cardTitle"><span>02</span><h2>LLM configuration</h2></div><p>Optional provider</p><code>{settings.groqConfigured ? 'Groq configured on server' : 'Deterministic template mode'}</code><p>Local Ollama</p><code>Insufficient information to determine.</code><div className="status">● Server-only configuration</div></div></div><form className="envForm" onSubmit={save}><label htmlFor="envText">Paste .env file contents</label><textarea id="envText" value={envText} onChange={(e) => setEnvText(e.target.value)} placeholder={'JIRA_URL=https://your-domain.atlassian.net\nJIRA_EMAIL=you@example.com\nJIRA_TOKEN=...'} /><button type="submit">Load configuration ↗</button><small>Values are sent to the backend and are not stored in browser storage.</small>{message && <div className="notice">{message}</div>}</form></section>;
}
createRoot(document.getElementById('root')).render(<App />);
