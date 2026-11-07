#!/usr/bin/env node
/**
 * Student RSO 2.0 — Scholarship URL health monitor
 * Node.js 18+. Reads scholarships-master.json from this directory.
 * Usage: node scholarship-link-monitor.mjs [path-to-json]
 * Outputs scholarship-link-health.json and scholarship-link-health.csv.
 * HTTP reachability is NOT proof of scholarship authenticity; manual/content review remains required.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
const input = process.argv[2] || new URL('./scholarships-master.json', import.meta.url);
const raw = await fs.readFile(input, 'utf8');
const db = JSON.parse(raw);
const schemes = db.scholarships || [];
const urls = new Map();
for (const s of schemes) {
  for (const [kind, url] of [['information', s.officialGuidelinesUrl], ['application', s.officialApplicationUrl]]) {
    if (!url || !/^https:\/\//i.test(url)) continue;
    const key = `${kind}|${url}`;
    if (!urls.has(key)) urls.set(key, { kind, url, schemes: [] });
    urls.get(key).schemes.push({ id: s.id, name: s.name });
  }
}
async function check(item) {
  const started = Date.now();
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15000);
  try {
    let response = await fetch(item.url, { method: 'GET', redirect: 'follow', signal: controller.signal, headers: { 'User-Agent': 'StudentRSO-ScholarshipLinkMonitor/1.0' } });
    const contentType = response.headers.get('content-type') || '';
    const result = { ...item, httpStatus: response.status, finalUrl: response.url, redirected: response.redirected, contentType, checkedAt: new Date().toISOString(), durationMs: Date.now()-started };
    result.status = response.status >= 200 && response.status < 400 ? (response.redirected ? 'REDIRECTED' : 'HTTP_OK_REQUIRES_CONTENT_REVIEW') : (response.status === 403 || response.status === 429 ? 'BLOCKED_RETRY_MANUALLY' : 'HTTP_ERROR');
    // Read a small prefix only; no full-page archival.
    if (/text\/html|application\/json/i.test(contentType)) {
      const text = await response.text();
      result.title = (text.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1] || '').trim().slice(0,200);
    }
    return result;
  } catch (e) {
    return { ...item, checkedAt: new Date().toISOString(), status: e.name === 'AbortError' ? 'TIMEOUT_RETRY_MANUALLY' : 'FETCH_FAILED_RETRY_MANUALLY', error: String(e).slice(0,300), durationMs: Date.now()-started };
  } finally { clearTimeout(timer); }
}
const results = [];
for (const item of urls.values()) results.push(await check(item));
const out = { generatedAt: new Date().toISOString(), scholarshipCount: schemes.length, uniqueUrlChecks: results.length, disclaimer: 'HTTP status and redirects do not establish that the destination is the correct official scholarship page. Content and authority must be reviewed.', results };
await fs.writeFile('scholarship-link-health.json', JSON.stringify(out, null, 2));
const csvRows = [['kind','url','httpStatus','finalUrl','redirected','status','title','schemeIds','schemeNames','checkedAt','error']];
for (const r of results) csvRows.push([r.kind,r.url,r.httpStatus ?? '',r.finalUrl ?? '',r.redirected ?? '',r.status,r.title ?? '',r.schemes.map(x=>x.id).join(';'),r.schemes.map(x=>x.name).join(';'),r.checkedAt,r.error ?? '']);
const esc = v => '"' + String(v).replaceAll('"','""') + '"';
await fs.writeFile('scholarship-link-health.csv', csvRows.map(row=>row.map(esc).join(',')).join('\n'));
console.log(JSON.stringify({ scholarshipCount: schemes.length, uniqueUrlChecks: results.length, output: ['scholarship-link-health.json','scholarship-link-health.csv'] }, null, 2));
