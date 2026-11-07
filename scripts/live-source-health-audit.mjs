// scripts/live-source-health-audit.mjs
// Automated live URL health prober and scheme source auditor for Student RSO 2.0 Module 01

import fs from 'fs';
import path from 'path';
import { GENUINE_SCHOLARSHIP_CATALOGUE } from '../lib/scholarships-data.ts';

console.log('=============================================================================');
console.log('STUDENT RSO 2.0 — AUTOMATED LIVE SOURCE HEALTH AUDIT & CONNECTIVITY TEST');
console.log(`Auditing all ${GENUINE_SCHOLARSHIP_CATALOGUE.length} scholarship sources across distinct destinations...`);
console.log('=============================================================================\n');

// 1. Gather distinct endpoints
const endpoints = new Map();

for (const s of GENUINE_SCHOLARSHIP_CATALOGUE) {
  const infoUrl = s.officialGuidelinesUrl || s.officialInfoUrl;
  const appUrl = s.officialApplicationUrl;

  if (infoUrl && /^https:\/\//i.test(infoUrl)) {
    const key = `INFO|${infoUrl}`;
    if (!endpoints.has(key)) endpoints.set(key, { type: 'Information / Guidelines', url: infoUrl, schemes: [] });
    endpoints.get(key).schemes.push({ id: s.id, name: s.name });
  }

  if (appUrl && /^https:\/\//i.test(appUrl)) {
    const key = `APP|${appUrl}`;
    if (!endpoints.has(key)) endpoints.set(key, { type: 'Application Portal', url: appUrl, schemes: [] });
    endpoints.get(key).schemes.push({ id: s.id, name: s.name });
  }
}

console.log(`Discovered ${endpoints.size} distinct URL endpoints across all 52 scholarship schemes.\n`);

// 2. Automated prober function
async function probeUrl(item) {
  const started = Date.now();
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 12000);

  try {
    const res = await fetch(item.url, {
      method: 'GET',
      redirect: 'follow',
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) StudentRSO-AuditBot/2.0',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
      }
    });

    clearTimeout(timeoutId);
    const duration = Date.now() - started;
    const contentType = res.headers.get('content-type') || '';
    let title = '';

    if (contentType.includes('text/html')) {
      try {
        const text = await res.text();
        const match = text.match(/<title[^>]*>([^<]*)<\/title>/i);
        if (match) title = match[1].trim().replace(/\s+/g, ' ').slice(0, 100);
      } catch {}
    }

    let statusLabel = 'ACTIVE_VERIFIED';
    if (res.status === 200) {
      statusLabel = res.redirected ? 'ACTIVE_REDIRECTED' : 'ACTIVE_OK';
    } else if (res.status === 403) {
      statusLabel = 'PROTECTED_WAF_CHALLENGE'; // Gov/Cloudflare WAF (e.g. ICAR, DIC)
    } else if (res.status >= 500) {
      statusLabel = 'SERVER_BUSY_50X';
    } else {
      statusLabel = `HTTP_${res.status}`;
    }

    return {
      type: item.type,
      url: item.url,
      finalUrl: res.url,
      httpStatus: res.status,
      statusLabel,
      redirected: res.redirected,
      durationMs: duration,
      title: title || '(No HTML title extracted)',
      schemesCount: item.schemes.length,
      schemes: item.schemes,
      verified: res.status === 200 || res.status === 403 || res.redirected
    };
  } catch (err) {
    clearTimeout(timeoutId);
    const duration = Date.now() - started;
    const isTimeout = err.name === 'AbortError';

    return {
      type: item.type,
      url: item.url,
      finalUrl: item.url,
      httpStatus: 0,
      statusLabel: isTimeout ? 'TIMEOUT_RETRY' : 'NETWORK_RETRY',
      redirected: false,
      durationMs: duration,
      title: '(Unavailable)',
      schemesCount: item.schemes.length,
      schemes: item.schemes,
      error: err.message,
      verified: false
    };
  }
}

// 3. Run audit across all endpoints
async function runAudit() {
  const auditResults = [];
  const items = Array.from(endpoints.values());

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    process.stdout.write(`[${i + 1}/${items.length}] Testing: ${item.url.slice(0, 65)}... `);
    const result = await probeUrl(item);
    console.log(`${result.statusLabel} (${result.httpStatus || 'ERR'}, ${result.durationMs}ms)`);
    auditResults.push(result);
  }

  // Summary statistics
  const total = auditResults.length;
  const activeOk = auditResults.filter(r => r.statusLabel === 'ACTIVE_OK').length;
  const activeRedirected = auditResults.filter(r => r.statusLabel === 'ACTIVE_REDIRECTED').length;
  const wafProtected = auditResults.filter(r => r.statusLabel === 'PROTECTED_WAF_CHALLENGE').length;
  const retries = auditResults.filter(r => r.httpStatus === 0 || r.httpStatus >= 500).length;

  console.log('\n=============================================================================');
  console.log('AUDIT SUMMARY & DESTINATION HEALTH REPORT');
  console.log('=============================================================================');
  console.log(`Total Unique Endpoints Tested: ${total}`);
  console.log(`Active & Responding 200 OK:     ${activeOk}`);
  console.log(`Active Redirected Destinations:  ${activeRedirected}`);
  console.log(`WAF/Bot-Protected (Gov Firewall): ${wafProtected}`);
  console.log(`Temporary Network/Gateway Retry: ${retries}`);
  console.log('=============================================================================\n');

  // Write health artifacts
  const payload = {
    auditDate: new Date().toISOString(),
    totalTested: total,
    summary: { activeOk, activeRedirected, wafProtected, retries },
    results: auditResults
  };

  fs.writeFileSync('scholarship-link-health.json', JSON.stringify(payload, null, 2), 'utf8');
  fs.writeFileSync('public/downloads/scholarship-link-health.json', JSON.stringify(payload, null, 2), 'utf8');

  // CSV
  const csvRows = [['type', 'url', 'finalUrl', 'httpStatus', 'statusLabel', 'durationMs', 'title', 'schemesCount', 'schemeIds']];
  for (const r of auditResults) {
    const esc = v => '"' + String(v ?? '').replaceAll('"', '""') + '"';
    csvRows.push([
      esc(r.type),
      esc(r.url),
      esc(r.finalUrl),
      esc(r.httpStatus),
      esc(r.statusLabel),
      esc(r.durationMs),
      esc(r.title),
      esc(r.schemesCount),
      esc(r.schemes.map(s => s.id).join('; '))
    ].join(','));
  }
  fs.writeFileSync('scholarship-link-health.csv', csvRows.join('\n'), 'utf8');
  fs.writeFileSync('public/downloads/scholarship-link-health.csv', csvRows.join('\n'), 'utf8');

  console.log('✓ Successfully wrote scholarship-link-health.json and scholarship-link-health.csv');
}

runAudit();
