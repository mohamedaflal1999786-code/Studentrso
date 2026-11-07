import fs from 'fs';

const inventory = JSON.parse(fs.readFileSync('scripts/all-modules-urls-inventory.json', 'utf8'));

console.log(`Starting live probe of ${inventory.length} unique URLs across Modules 02–10...`);

async function probe(item) {
  const started = Date.now();
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

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
    const finalUrl = res.url;
    const isRedirect = res.redirected;
    const httpStatus = res.status;

    let verdict = 'OK_200';
    if (httpStatus === 404) {
      verdict = 'BROKEN_404';
    } else if (httpStatus === 403) {
      verdict = 'PROTECTED_WAF_403';
    } else if (httpStatus >= 500) {
      verdict = 'SERVER_ERROR_5XX';
    } else if (httpStatus >= 400) {
      verdict = `HTTP_CLIENT_ERROR_${httpStatus}`;
    } else if (isRedirect) {
      verdict = 'REDIRECTED';
    }

    return {
      ...item,
      httpStatus,
      finalUrl,
      isRedirect,
      durationMs: duration,
      verdict
    };
  } catch (err) {
    clearTimeout(timeoutId);
    const duration = Date.now() - started;
    const isTimeout = err.name === 'AbortError';

    return {
      ...item,
      httpStatus: 0,
      finalUrl: item.url,
      isRedirect: false,
      durationMs: duration,
      verdict: isTimeout ? 'TIMEOUT' : 'CONNECTION_FAILED',
      error: err.message
    };
  }
}

// Concurrency pool
async function probeAll(items, concurrency = 8) {
  const results = [];
  const queue = [...items];
  let completed = 0;

  async function worker() {
    while (queue.length > 0) {
      const item = queue.shift();
      const res = await probe(item);
      results.push(res);
      completed++;
      if (res.verdict === 'BROKEN_404' || res.verdict === 'CONNECTION_FAILED') {
        console.log(`[${completed}/${items.length}] ❌ ${res.verdict}: ${res.url} (${res.modules.join(', ')})`);
      } else if (completed % 25 === 0 || completed === items.length) {
        console.log(`[${completed}/${items.length}] Probing progress...`);
      }
    }
  }

  const workers = Array.from({ length: concurrency }, () => worker());
  await Promise.all(workers);
  return results;
}

async function run() {
  const results = await probeAll(inventory, 8);

  const broken404 = results.filter(r => r.verdict === 'BROKEN_404');
  const connFailed = results.filter(r => r.verdict === 'CONNECTION_FAILED');
  const timeouts = results.filter(r => r.verdict === 'TIMEOUT');
  const serverErrors = results.filter(r => r.verdict === 'SERVER_ERROR_5XX');
  const waf403 = results.filter(r => r.verdict === 'PROTECTED_WAF_403');
  const ok200 = results.filter(r => r.verdict === 'OK_200');
  const redirected = results.filter(r => r.verdict === 'REDIRECTED');

  console.log('\n=============================================================================');
  console.log('MULTI-MODULE (02–10) AUDIT PROBE RESULTS');
  console.log('=============================================================================');
  console.log(`Total URLs Tested:       ${results.length}`);
  console.log(`Active 200 OK:           ${ok200.length}`);
  console.log(`Redirected Destinations: ${redirected.length}`);
  console.log(`WAF / Bot Protected 403: ${waf403.length}`);
  console.log(`404 Not Found (BROKEN):  ${broken404.length}`);
  console.log(`Connection Failed:       ${connFailed.length}`);
  console.log(`Timeouts:                ${timeouts.length}`);
  console.log(`Server Errors (5xx):     ${serverErrors.length}`);
  console.log('=============================================================================\n');

  fs.writeFileSync('scripts/audit-results-all-modules.json', JSON.stringify(results, null, 2), 'utf8');

  // Also print all broken and connection failed URLs
  console.log('=== URLs Requiring Immediate Fix (404 Not Found & Failed) ===');
  const badUrls = [...broken404, ...connFailed, ...serverErrors];
  console.log(JSON.stringify(badUrls.map(u => ({ url: u.url, verdict: u.verdict, modules: u.modules, file: u.sampleSourceFile })), null, 2));
}

run();
